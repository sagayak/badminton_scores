
import React from 'react';
import TrophyIcon from './icons/TrophyIcon';

interface MatchWinnerOverlayProps {
  winner: 'A' | 'B';
  teamName: string;
  onNewMatch: () => void;
}

const MatchWinnerOverlay: React.FC<MatchWinnerOverlayProps> = ({ winner, teamName, onNewMatch }) => {
  return (
    <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in z-20">
      <TrophyIcon className="w-32 h-32 text-yellow-400" />
      <h2 className="text-6xl font-extrabold text-white mt-6">Match Over!</h2>
      <p className="text-4xl mt-4 text-lime-400">{teamName} wins the match!</p>
      <button
        onClick={onNewMatch}
        className="mt-10 bg-lime-500 hover:bg-lime-600 text-slate-900 font-bold py-4 px-8 rounded-md text-xl transition-transform transform hover:scale-105"
      >
        Start New Match
      </button>
    </div>
  );
};

export default MatchWinnerOverlay;
