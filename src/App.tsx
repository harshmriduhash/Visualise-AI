import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { DreamInput } from "./components/DreamInput";
import { ResultsDisplay } from "./components/ResultsDisplay";
import { Toaster } from "sonner";

function App() {
  const [results, setResults] = useState<{
    imageUrl?: string;
    audioUrl?: string;
    story?: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-dream-lavender/20">
      <div className="container mx-auto px-4 py-12 space-y-12">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-dream-blue" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-dream-blue via-dream-lavender to-dream-pink bg-clip-text text-transparent">
              Visualise AI
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your dreams into art, music, and stories using the power
            of AI
          </p>
        </header>

        <main className="flex flex-col items-center space-y-12">
          <DreamInput onDreamCreated={setResults} />
          {results && (
            <ResultsDisplay
              image={results.imageUrl}
              audioUrl={results.audioUrl}
              story={results.story}
            />
          )}
        </main>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
