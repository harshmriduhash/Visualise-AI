import { openai } from './openai';
import { supabase } from './supabase';
import { z } from 'zod';

const dreamSchema = z.object({
  description: z.string().min(10).max(1000),
  mood: z.string().min(1),
});

export type Dream = {
  id: string;
  description: string;
  mood: string;
  imageUrl?: string;
  audioUrl?: string;
  story?: string;
  createdAt: Date;
};

export async function createDream(description: string, mood: string): Promise<Dream> {
  const parsed = dreamSchema.parse({ description, mood });

  try {
    // Generate image using DALL-E
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A dreamy, artistic interpretation of: ${parsed.description}. Style: ethereal, ${parsed.mood}`,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    const imageUrl = imageResponse.data[0]?.url;

    // Generate story using GPT-4
    const storyResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a creative writer who specializes in turning dream descriptions into vivid, engaging stories. Keep the tone matching the specified mood.",
        },
        {
          role: "user",
          content: `Write a short, vivid story based on this dream. Mood: ${parsed.mood}. Dream: ${parsed.description}`,
        },
      ],
      max_tokens: 500,
    });

    const story = storyResponse.choices[0]?.message.content;

    // For the MVP, we'll generate a placeholder audio URL
    // In production, you would integrate with a music generation API
    const audioUrl = `https://example.com/audio/${mood}.mp3`;

    // Save to Supabase
    const { data: dream, error } = await supabase
      .from('dreams')
      .insert([
        {
          description: parsed.description,
          mood: parsed.mood,
          image_url: imageUrl,
          audio_url: audioUrl,
          story,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error('Failed to save dream to database');
    }

    return {
      id: dream.id,
      description: dream.description,
      mood: dream.mood,
      imageUrl: dream.image_url,
      audioUrl: dream.audio_url,
      story: dream.story,
      createdAt: new Date(dream.created_at),
    };
  } catch (error: any) {
    if (error?.error?.code === 'billing_hard_limit_reached') {
      throw new Error('The AI service is currently unavailable. Please try again later.');
    }
    throw error;
  }
}

export async function getDreams(): Promise<Dream[]> {
  const { data: dreams, error } = await supabase
    .from('dreams')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return dreams.map((dream) => ({
    id: dream.id,
    description: dream.description,
    mood: dream.mood,
    imageUrl: dream.image_url,
    audioUrl: dream.audio_url,
    story: dream.story,
    createdAt: new Date(dream.created_at),
  }));
}