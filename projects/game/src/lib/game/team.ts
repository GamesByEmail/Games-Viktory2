import { IBaseTeamSave, BaseTeam } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Board, IBoardSave } from './board';
import { Territory, ITerritorySave } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';

import { Piece } from './piece';

export interface ITeamSave extends IBaseTeamSave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  captures: Piece[];
}

export class Team extends BaseTeam<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  captures: Piece[] = [];
  constructor(game: Game, id: TeamId) {
    super(game, id);
  }
  capture(piece: Piece): void {
    piece.changeTerritory(undefined);
    this.captures.push(piece);
  }
  get title(): string {
    return this.id;
  }
  setState(state: string): string {
    state=super.setState(state);
    return state;
  }
  getState(): string {
    let state = super.getState();
    return state;
  }
  save() {
    super.save();
    this.captures.forEach(capture => capture.save());
  }
  saving() {
    const saving = super.saving();
    saving.captures = this.captures.slice(0);
    return saving;
  }
  restore(depth: number) {
    super.restore(depth);
    this.captures.forEach(capture => capture.restore(depth));
  }
  restoring(saved: ITeamSave) {
    super.restoring(saved);
    this.captures = saved.captures;
  }
  commit() {
    super.commit();
    this.captures.forEach(capture => capture.commit());
  }
  beginningMove() {
    super.beginningMove();
    this.captures.forEach(capture => capture.beginningMove());
  }
}

