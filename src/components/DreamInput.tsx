import React, { useState } from 'react';
import { Sparkles, Music, BookOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { createDream } from '../lib/api';
import { toast } from 'sonner';

const moods = [
  'Mysterious',
  'Happy',
  'Adventurous',
  'Calm',
  'Energetic',
  'Melancholic',
  'Dreamy',
  'Romantic',
];

interface DreamInputProps {
  onDreamCreated: (dream: {
    imageUrl?: string;
    audioUrl?: string;
    story?: string;
  }) => void;
}

export function DreamInput({ onDreamCreated }: DreamInputProps) {
  const [dream, setDream] = useState('');
  const [mood, setMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createDream(dream, mood);
      onDreamCreated({
        imageUrl: result.imageUrl,
        audioUrl: result.audioUrl,
        story: result.story,
      });
      toast.success('Your dream has been woven into reality!');
      setDream('');
      setMood('');
    } catch (error: any) {
      console.error('Error creating dream:', error);
      toast.error(error.message || 'Failed to weave your dream. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
      <div className="space-y-2">
        <label
          htmlFor="dream"
          className="block text-lg font-medium text-gray-700 dark:text-gray-200"
        >
          Describe your dream
        </label>
        <textarea
          id="dream"
          value={dream}
          onChange={(e) => setDream(e.target.value)}
          className="w-full h-32 p-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-dream-lavender focus:border-transparent resize-none"
          placeholder="I was flying over a glowing forest with dragons..."
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="mood"
          className="block text-lg font-medium text-gray-700 dark:text-gray-200"
        >
          Select a mood
        </label>
        <select
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-dream-lavender focus:border-transparent"
        >
          <option value="">Select mood...</option>
          {moods.map((m) => (
            <option key={m} value={m.toLowerCase()}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading || !dream || !mood}
          className={cn(
            'px-8 py-3 rounded-full font-medium text-white transition-all',
            'bg-gradient-to-r from-dream-lavender via-dream-blue to-dream-pink',
            'hover:shadow-lg hover:scale-105',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isLoading && 'animate-shimmer bg-[length:200%_100%]'
          )}
        >
          {isLoading ? 'Weaving dreams...' : 'Create Dream'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
        <div className="flex flex-col items-center space-y-1">
          <Sparkles className="w-5 h-5" />
          <span>Dream to Art</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <Music className="w-5 h-5" />
          <span>Emotion Soundscape</span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <BookOpen className="w-5 h-5" />
          <span>Story Enhancement</span>
        </div>
      </div>
    </form>
  );
}