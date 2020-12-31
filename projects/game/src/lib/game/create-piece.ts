import { Frigate } from './pieces/frigate';
import { Artillery } from './pieces/artillery';
import { Infantry } from './pieces/infantry';
import { City } from './pieces/city';
import { Town } from './pieces/town';
import { Cavalry } from './pieces/cavalry';
import { Piece } from './piece';
import { Game } from './game';
import { TeamId, teamIdFromIndex } from './team-id';

const types=[Frigate,Artillery,Infantry,Cavalry,City,Town];

export function createPiece(game: Game, state: string): Piece {
  const stateChar=state.charAt(0);
  state=state.substr(1);
  for (let i = 0; i < types.length; i++)
    if (types[i].stateChar===stateChar)
      return new types[i](game, state);
  throw("Bad piece type char: '"+stateChar+"'");
}

export function pieceNameFromState(stateChar: string): string {
  for (let i = 0; i < types.length; i++)
    if (types[i].stateChar===stateChar)
      return types[i].type;
  throw("Bad piece type char: '"+stateChar+"'");
}

export function teamIdFromState(state: string): TeamId {
  return teamIdFromIndex(parseInt(state.charAt(1),10));
}