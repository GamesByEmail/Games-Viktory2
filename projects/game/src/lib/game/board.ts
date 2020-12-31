import { BaseGridBoard, IBaseBoardSave, Player } from '@gamesbyemail/base';
import { HexHelper } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Team, ITeamSave } from './team';
import { Territory, ITerritorySave } from './territory';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';
import { Piece } from './piece';
import { createPiece } from './create-piece';
import { IPoint2D } from '@packageforge/geometry2d';

export interface IBoardSave extends IBaseBoardSave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
}
export class Board extends BaseGridBoard<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove>  {
  public controller: any;
  sides!:number[]
  constructor(game: Game) {
    super(game);
  }
  setState(state:string){
    this.setTerritories();
    state=super.setState(state);
    return state;
  }
  setTerritories(){
    this.sides=HexHelper.extrapolateHexSides(8);
    const hexCount=HexHelper.getHexCount(this.sides);
    if (this._territories.length>hexCount)
      this._territories.length=hexCount;
    else
      while (this._territories.length<hexCount)
        this._territories.push(new Territory(this, this._territories.length));
    HexHelper.calculateAdjacents(this.territories);
    this._territories.forEach((t,i)=>t.isEdge=t.adjacents.indexOf(undefined)>=0);
  }
  positionFromIndex(index: number): IPoint2D {
    return HexHelper.getHexPositionFromIndex(index,this.sides);
  }
  calculateRotation(id: TeamId): number {
    return id === TeamId.Yellow ? 210 : 30;
  }
  createPiece(state: string): Piece {
    return createPiece(this.game, state);
  }
  setDark(player: Player<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> | undefined) {
    for (let i = 0; i < this.territories.length; i++)
      this.territories[i].setDark(player);
  }
}
