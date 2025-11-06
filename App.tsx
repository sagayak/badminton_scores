
import React, { useState } from 'react';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import type { GameSettings } from './types';

export default function App() {
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);

  const handleGameStart = (settings: GameSettings) => {
    setGameSettings(settings);
  };

  const handleNewMatch = () => {
    setGameSettings(null);
  };

  return (
    <main className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-lime-400">
            Badminton Scorekeeper
          </h1>
          <p className="text-slate-400 mt-2">
            Focus on the game, we'll handle the score.
          </p>
        </header>

        {gameSettings ? (
          <GameScreen settings={gameSettings} onNewMatch={handleNewMatch} />
        ) : (
          <SetupScreen onGameStart={handleGameStart} />
        )}
      </div>
       <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>Built by a world-class senior frontend React engineer.</p>
        </footer>
    </main>
  );
}
