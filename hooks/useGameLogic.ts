
import { useState, useCallback } from 'react';
import type { GameSettings, GameState } from '../types';

const SCORE_CAP = 30;

export const useGameLogic = (settings: GameSettings) => {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [gamesWonA, setGamesWonA] = useState(0);
  const [gamesWonB, setGamesWonB] = useState(0);
  const [server, setServer] = useState<'A' | 'B' | null>(Math.random() > 0.5 ? 'A' : 'B');
  const [winner, setWinner] = useState<'A' | 'B' | null>(null);
  const [matchWinner, setMatchWinner] = useState<'A' | 'B' | null>(null);
  const [history, setHistory] = useState<GameState[]>([]);

  const checkWinner = useCallback((currentScoreA: number, currentScoreB: number) => {
    const { maxScore, bestOf } = settings;
    const gamesToWin = Math.ceil(bestOf / 2);

    const hasWonGame = (score: number, opponentScore: number) => {
      if (score === SCORE_CAP) return true;
      if (score >= maxScore && score >= opponentScore + 2) return true;
      return false;
    };

    if (hasWonGame(currentScoreA, currentScoreB)) {
      setWinner('A');
      const newGamesWonA = gamesWonA + 1;
      setGamesWonA(newGamesWonA);
      if (newGamesWonA === gamesToWin) {
        setMatchWinner('A');
      }
    } else if (hasWonGame(currentScoreB, currentScoreA)) {
      setWinner('B');
      const newGamesWonB = gamesWonB + 1;
      setGamesWonB(newGamesWonB);
      if (newGamesWonB === gamesToWin) {
        setMatchWinner('B');
      }
    }
  }, [settings, gamesWonA, gamesWonB]);

  const handlePoint = (team: 'A' | 'B') => {
    if (winner) return;

    setHistory(prev => [...prev, { scoreA, scoreB, server, gamesWonA, gamesWonB }]);

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
      setGamesWonA(lastState.gamesWonA);
      setGamesWonB(lastState.gamesWonB);
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

  return {
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
  };
};
