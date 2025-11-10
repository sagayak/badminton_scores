
import React from 'react';
import UndoIcon from './icons/UndoIcon';
import ResetIcon from './icons/ResetIcon';

interface GameControlsProps {
  onUndo: () => void;
  onReset: () => void;
  onNewMatch: () => void;
  canUndo: boolean;
  winner: 'A' | 'B' | null;
}

const GameControls: React.FC<GameControlsProps> = ({ onUndo, onReset, onNewMatch, canUndo, winner }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={onUndo}
        disabled={!canUndo || !!winner}
        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        <UndoIcon className="w-5 h-5" /> Undo
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        <ResetIcon className="w-5 h-5" /> Reset Game
      </button>
      <button
        onClick={onNewMatch}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        New Match
      </button>
    </div>
  );
};

export default GameControls;
