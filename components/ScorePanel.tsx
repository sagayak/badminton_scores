
import React from 'react';
import ShuttlecockIcon from './icons/ShuttlecockIcon';

interface CourtVisualizationProps {
  servingTeamScore: number;
}

const CourtVisualization: React.FC<CourtVisualizationProps> = ({ servingTeamScore }) => {
  const isEven = servingTeamScore % 2 === 0;
  return (
    <div className="w-full max-w-xs mx-auto mt-4">
        <div className="grid grid-cols-2 border-2 border-slate-600 h-24">
            <div className={`border-r border-slate-600 transition-colors duration-300 ${!isEven ? 'bg-lime-500/20' : ''}`}></div>
            <div className={`transition-colors duration-300 ${isEven ? 'bg-lime-500/20' : ''}`}></div>
        </div>
        <div className="text-center text-xs text-slate-400 mt-1">
            Service Area: {!isEven ? 'Left' : 'Right'}
        </div>
    </div>
  );
};


interface ScorePanelProps {
  teamName: string;
  score: number;
  isServing: boolean;
  onPoint: () => void;
  winner: 'A' | 'B' | null;
  servingTeamScore: number;
}

const ScorePanel: React.FC<ScorePanelProps> = ({
  teamName,
  score,
  isServing,
  onPoint,
  winner,
  servingTeamScore,
}) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl text-center flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-bold text-lime-400 truncate">{teamName}</h2>
        <div className="my-4 text-8xl font-black tracking-tighter text-white transition-all duration-300">{score}</div>
      </div>
      <button
        onClick={onPoint}
        disabled={!!winner}
        className="w-full bg-slate-700 hover:bg-lime-500 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-md transition-all duration-300"
      >
        +1 Point
      </button>
      {isServing && (
        <div className="mt-4">
          <ShuttlecockIcon className="h-8 w-8 mx-auto text-lime-400" />
          <CourtVisualization servingTeamScore={servingTeamScore} />
        </div>
      )}
    </div>
  );
};

export default ScorePanel;
