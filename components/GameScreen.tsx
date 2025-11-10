
import React from 'react';
import type { GameSettings } from '../types';
import { useGameLogic } from '../hooks/useGameLogic';
import ScorePanel from './ScorePanel';
import GameControls from './GameControls';
import WinnerOverlay from './WinnerOverlay';
import MatchWinnerOverlay from './MatchWinnerOverlay';

interface GameScreenProps {
  settings: GameSettings;
  onNewMatch: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ settings, onNewMatch }) => {
  const {
    scoreA,
    scoreB,
    gamesWonA,
    gamesWonB,
    server,
    winner,
    matchWinner,
    history,
    handlePoint,
    handleUndo,
    handleNextGame,
    handleResetGame,
  } = useGameLogic(settings);

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
        <ScorePanel
          teamName={settings.teamAName}
          score={scoreA}
          isServing={server === 'A'}
          onPoint={() => handlePoint('A')}
          winner={winner}
          servingTeamScore={scoreA}
        />
        <ScorePanel
          teamName={settings.teamBName}
          score={scoreB}
          isServing={server === 'B'}
          onPoint={() => handlePoint('B')}
          winner={winner}
          servingTeamScore={scoreB}
        />
      </div>

      <GameControls
        onUndo={handleUndo}
        onReset={handleResetGame}
        onNewMatch={onNewMatch}
        canUndo={history.length > 0}
        winner={winner}
      />

      {winner && (
        <WinnerOverlay
          winner={winner}
          teamName={winner === 'A' ? settings.teamAName : settings.teamBName}
          scoreA={scoreA}
          scoreB={scoreB}
          onNextGame={handleNextGame}
        />
      )}

      {matchWinner && (
        <MatchWinnerOverlay
          winner={matchWinner}
          teamName={matchWinner === 'A' ? settings.teamAName : settings.teamBName}
          onNewMatch={onNewMatch}
        />
      )}
    </div>
  );
};

export default GameScreen;
