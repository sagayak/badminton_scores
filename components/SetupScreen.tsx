
import React, { useState } from 'react';
import { GameMode } from '../types';
import type { GameSettings } from '../types';

interface SetupScreenProps {
  onGameStart: (settings: GameSettings) => void;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onGameStart }) => {
  const [teamAName, setTeamAName] = useState('Team A');
  const [teamBName, setTeamBName] = useState('Team B');
  const [maxScore, setMaxScore] = useState(21);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.Doubles);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamAName.trim() && teamBName.trim() && maxScore > 0) {
      onGameStart({
        teamAName: teamAName.trim(),
        teamBName: teamBName.trim(),
        maxScore,
        gameMode,
      });
    }
  };

  return (
    <div className="bg-slate-800 p-8 rounded-xl shadow-2xl animate-fade-in w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">
        Match Setup
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="gameMode" className="block text-sm font-medium text-slate-300 mb-2">
            Game Mode
          </label>
          <select
            id="gameMode"
            value={gameMode}
            onChange={(e) => setGameMode(e.target.value as GameMode)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-lime-500 focus:border-lime-500 transition"
          >
            <option value={GameMode.Singles}>Singles</option>
            <option value={GameMode.Doubles}>Doubles</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="teamAName" className="block text-sm font-medium text-slate-300 mb-2">
                Team 1 Name
              </label>
              <input
                type="text"
                id="teamAName"
                value={teamAName}
                onChange={(e) => setTeamAName(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-lime-500 focus:border-lime-500 transition"
              />
            </div>
            <div>
              <label htmlFor="teamBName" className="block text-sm font-medium text-slate-300 mb-2">
                Team 2 Name
              </label>
              <input
                type="text"
                id="teamBName"
                value={teamBName}
                onChange={(e) => setTeamBName(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-lime-500 focus:border-lime-500 transition"
              />
            </div>
        </div>

        <div>
          <label htmlFor="maxScore" className="block text-sm font-medium text-slate-300 mb-2">
            Winning Score
          </label>
          <select
            id="maxScore"
            value={maxScore}
            onChange={(e) => setMaxScore(Number(e.target.value))}
            className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:ring-lime-500 focus:border-lime-500 transition"
          >
            <option value={11}>11</option>
            <option value={15}>15</option>
            <option value={21}>21</option>
            <option value={30}>30</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-lime-500 hover:bg-lime-600 text-slate-900 font-bold py-3 px-4 rounded-md transition-transform transform hover:scale-105"
        >
          Start Match
        </button>
      </form>
    </div>
  );
};

export default SetupScreen;
