import React from 'react';
import { Play, Pause, Download } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResultsDisplayProps {
  image?: string;
  story?: string;
  audioUrl?: string;
}

export function ResultsDisplay({ image, story, audioUrl }: ResultsDisplayProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = async (url: string, type: 'image' | 'audio') => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `dreamweaver-${type}-${Date.now()}${type === 'image' ? '.png' : '.mp3'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
    }
  };

  if (!image && !story && !audioUrl) return null;

  return (
    <div className="w-full max-w-4xl space-y-8 animate-in fade-in duration-700">
      {image && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Your Dream Visualized</h3>
          <div className="relative group">
            <img
              src={image}
              alt="AI Generated Dream"
              className="w-full rounded-lg shadow-lg"
            />
            <button
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDownload(image, 'image')}
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {audioUrl && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Emotional Soundscape</h3>
          <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
            <button
              onClick={handlePlayPause}
              className={cn(
                'p-3 rounded-full transition-colors',
                'bg-gradient-to-r from-dream-lavender to-dream-blue',
                'hover:shadow-lg'
              )}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div className="h-full w-0 bg-dream-blue rounded-full transition-all duration-200" />
            </div>
            <button
              onClick={() => handleDownload(audioUrl, 'audio')}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <Download className="w-5 h-5" />
            </button>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        </div>
      )}

      {story && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Your Story Enhanced</h3>
          <div className="p-6 bg-white rounded-lg shadow-lg prose max-w-none">
            <p className="text-gray-700 leading-relaxed">{story}</p>
          </div>
        </div>
      )}
    </div>
  );
}