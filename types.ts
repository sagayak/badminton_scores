
export enum GameMode {
  Singles = 'SINGLES',
  Doubles = 'DOUBLES',
}

export interface GameSettings {
  maxScore: number;
  teamAName: string;
  teamBName: string;
  gameMode: GameMode;
  bestOf: number;
}

export interface GameState {
    scoreA: number;
    scoreB: number;
    server: 'A' | 'B' | null;
    gamesWonA: number;
    gamesWonB: number;
}
