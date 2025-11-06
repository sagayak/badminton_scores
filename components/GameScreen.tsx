
import React, { useState, useEffect, useCallback } from 'react';
import type { GameSettings, GameState } from '../types';
import ShuttlecockIcon from './icons/ShuttlecockIcon';
import UndoIcon from './icons/UndoIcon';
import ResetIcon from './icons/ResetIcon';
import TrophyIcon from './icons/TrophyIcon';

interface GameScreenProps {
  settings: GameSettings;
  onNewMatch: () => void;
}

const SCORE_CAP = 30;

const GameScreen: React.FC<GameScreenProps> = ({ settings, onNewMatch }) => {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [gamesWonA, setGamesWonA] = useState(0);
  const [gamesWonB, setGamesWonB] = useState(0);
  const [server, setServer] = useState<'A' | 'B' | null>(Math.random() > 0.5 ? 'A' : 'B');
  const [winner, setWinner] = useState<'A' | 'B' | null>(null);
  const [history, setHistory] = useState<GameState[]>([]);

  const checkWinner = useCallback((currentScoreA: number, currentScoreB: number) => {
    const { maxScore } = settings;
    
    const hasWon = (score: number, opponentScore: number) => {
      if (score === SCORE_CAP) return true;
      if (score >= maxScore && score >= opponentScore + 2) return true;
      return false;
    };

    if (hasWon(currentScoreA, currentScoreB)) {
      setWinner('A');
      setGamesWonA(g => g + 1);
    } else if (hasWon(currentScoreB, currentScoreA)) {
      setWinner('B');
      setGamesWonB(g => g + 1);
    }
  }, [settings]);

  const handlePoint = (team: 'A' | 'B') => {
    if (winner) return;
    
    setHistory(prev => [...prev, { scoreA, scoreB, server }]);

    if (team === 'A') {
      const newScoreA = scoreA + 1;
      setScoreA(newScoreA);
      checkWinner(newScoreA, scoreB);
    } else {
      const newScoreB = scoreB + 1;
      setScoreB(newScoreB);
      checkWinner(scoreA, newScoreB);
    }
    setServer(team);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      if (winner) setWinner(null);
      const lastState = history[history.length - 1];
      setScoreA(lastState.scoreA);
      setScoreB(lastState.scoreB);
      setServer(lastState.server);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  const handleNextGame = () => {
    setScoreA(0);
    setScoreB(0);
    setServer(winner);
    setWinner(null);
    setHistory([]);
  };

  const handleResetGame = () => {
    setScoreA(0);
    setScoreB(0);
    setServer(Math.random() > 0.5 ? 'A' : 'B');
    setWinner(null);
    setHistory([]);
  }

  const CourtVisualization = ({ servingTeamScore }: { servingTeamScore: number }) => {
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

  return (
    <div className="w-full relative">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold text-slate-300">Games Won</h3>
        <p className="text-2xl font-bold text-white">
          <span className={gamesWonA > gamesWonB ? 'text-lime-400' : ''}>{settings.teamAName}: {gamesWonA}</span>
          <span className="mx-2 text-slate-500">|</span>
          <span className={gamesWonB > gamesWonA ? 'text-lime-400' : ''}>{settings.teamBName}: {gamesWonB}</span>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Team A Panel */}
        <div className="bg-slate-800 p-6 rounded-xl text-center flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-lime-400 truncate">{settings.teamAName}</h2>
            <div className="my-4 text-8xl font-black tracking-tighter text-white transition-all duration-300">{scoreA}</div>
          </div>
          <button
            onClick={() => handlePoint('A')}
            disabled={!!winner}
            className="w-full bg-slate-700 hover:bg-lime-500 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-md transition-all duration-300"
          >
            +1 Point
          </button>
          {server === 'A' && <div className="mt-4"><ShuttlecockIcon className="h-8 w-8 mx-auto text-lime-400" /><CourtVisualization servingTeamScore={scoreA} /></div>}
        </div>

        {/* Team B Panel */}
        <div className="bg-slate-800 p-6 rounded-xl text-center flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-lime-400 truncate">{settings.teamBName}</h2>
            <div className="my-4 text-8xl font-black tracking-tighter text-white transition-all duration-300">{scoreB}</div>
          </div>
          <button
            onClick={() => handlePoint('B')}
            disabled={!!winner}
            className="w-full bg-slate-700 hover:bg-lime-500 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-4 rounded-md transition-all duration-300"
          >
            +1 Point
          </button>
          {server === 'B' && <div className="mt-4"><ShuttlecockIcon className="h-8 w-8 mx-auto text-lime-400" /><CourtVisualization servingTeamScore={scoreB} /></div>}
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-4 mt-8">
        <button onClick={handleUndo} disabled={history.length === 0 || !!winner} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-md transition">
            <UndoIcon className="w-5 h-5"/> Undo
        </button>
        <button onClick={handleResetGame} className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-md transition">
            <ResetIcon className="w-5 h-5"/> Reset Game
        </button>
        <button onClick={onNewMatch} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition">
          New Match
        </button>
      </div>

      {/* Winner Overlay */}
      {winner && (
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex flex-col items-center justify-center animate-fade-in z-10">
            <TrophyIcon className="w-24 h-24 text-yellow-400"/>
            <h2 className="text-5xl font-extrabold text-white mt-4">Game Over!</h2>
            <p className="text-3xl mt-2 text-lime-400">{winner === 'A' ? settings.teamAName : settings.teamBName} wins!</p>
            <p className="text-2xl mt-1 text-white">{scoreA} - {scoreB}</p>
            <button
                onClick={handleNextGame}
                className="mt-8 bg-lime-500 hover:bg-lime-600 text-slate-900 font-bold py-3 px-6 rounded-md text-lg transition-transform transform hover:scale-105"
            >
                Next Game
            </button>
        </div>
      )}

    </div>
  );
};

export default GameScreen;
