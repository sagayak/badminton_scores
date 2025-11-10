
import React from 'react';
import TrophyIcon from './icons/TrophyIcon';

interface WinnerOverlayProps {
  winner: 'A' | 'B';
  teamName: string;
  scoreA: number;
  scoreB: number;
  onNextGame: () => void;
}

const WinnerOverlay: React.FC<WinnerOverlayProps> = ({ winner, teamName, scoreA, scoreB, onNextGame }) => {
  return (
    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in z-10">
      <TrophyIcon className="w-24 h-24 text-yellow-400" />
      <h2 className="text-5xl font-extrabold text-white mt-4">Game Over!</h2>
      <p className="text-3xl mt-2 text-lime-400">{teamName} wins!</p>
      <p className="text-2xl mt-1 text-white">{scoreA} - {scoreB}</p>
      <button
        onClick={onNextGame}
        className="mt-8 bg-lime-500 hover:bg-lime-600 text-slate-900 font-bold py-3 px-6 rounded-md text-lg transition-transform transform hover:scale-105"
      >
        Next Game
      </button>
    </div>
  );
};

export default WinnerOverlay;
