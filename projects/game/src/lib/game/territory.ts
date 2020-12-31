import { IBaseTerritorySave, BaseGridTerritory, Player } from '@gamesbyemail/base';
import { Game, IGameOptions, IGameState, IGameSave } from './game';
import { Board, IBoardSave } from './board';
import { Team, ITeamSave } from './team';
import { TeamId } from './team-id';
import { Move, IModMove } from './move';

import { Piece } from './piece';
import { TERRITORY_DELIMETER, TERRITORY_INFO_DELIMETER, TERRITORY_PIECE_DELIMETER } from './delimeter';

export interface ITerritorySave extends IBaseTerritorySave<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  highlight: boolean;
  dark:boolean;
  pieces: Piece[];
}

export class Territory extends BaseGridTerritory<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> {
  edges:boolean[]=[];
  public terrain!:string;
  public pieces: Piece[]=[];
  public isEdge:boolean=false;
  constructor(board: Board, index: number) {
    super(board, index);
  }
  addPiece(piece: Piece) {
    const last=this.findLastPieceOfType(piece.type);
    piece.offset=last ? last.offset+1 : 0;
    this.pieces.push(piece);
  }
  findLastPieceOfType(type:string){
    for (let i=this.pieces.length-1;i>=0;i--)
      if (this.pieces[i].type===type)
        return this.pieces[i];
    return;
  }
  removePiece(piece: Piece) {
    const index=this.pieces.indexOf(piece);
    if (index>=0) {
      piece.offset=-1;
      this.pieces.splice(index,1);
      for (let i=index;i<this.pieces.length;i++)
        if (this.pieces[i].type===piece.type)
          this.pieces[i].offset--;
    }
  }
  public highlight = false;
  public dark = false;
  clearFlags(team?: Team): void {
    super.clearFlags(team);
    this.highlight = false;
  }
  setState(state: string): string {
    const endIndex=state.indexOf(TERRITORY_DELIMETER);
    let [terrain,pieceStates]=state.substr(0,endIndex).split(TERRITORY_INFO_DELIMETER);
    if (this.isEdge) {
      pieceStates=terrain;
      this.terrain="Water";
    } else
      this.terrain=deserializeTerrain(terrain);
    if (pieceStates && pieceStates.length>0)
      pieceStates.split(TERRITORY_PIECE_DELIMETER).forEach(pieceState=>{
        console.log(pieceState);
        this.addPiece(this.board.createPiece(pieceState));
      });
    return state.substr(endIndex+1);
  }
  getState():string {
    let state="";
    if (this.isEdge)
      state+=serializeTerrain(this.terrain)+TERRITORY_INFO_DELIMETER;
    state+=this.pieces.map(piece=>piece.getState()).join(TERRITORY_PIECE_DELIMETER);
    state+=TERRITORY_DELIMETER;
    return state;
  }
  save() {
    super.save();
    this.pieces.forEach(piece=>piece.save());
  }
  saving(): ITerritorySave {
    const saving = super.saving();
    saving.highlight = this.highlight;
    saving.dark = this.dark;
    saving.pieces = this.pieces.slice();
    return saving;
  }
  restore(depth: number) {
    super.restore(depth);
    this.pieces.forEach(piece=>piece.restore(depth));
  }
  restoring(saved: ITerritorySave) {
    super.restoring(saved);
    this.highlight = saved.highlight;
    this.dark = saved.dark;
    this.pieces = saved.pieces;
  }
  commit() {
    super.commit();
    this.pieces.forEach(piece=>piece.commit());
  }

  isEmpty(): boolean {
    return this.pieces.length === 0;
  }
  isEnemy(ofPiece: Piece): boolean {
    return false;
    //return this.piece !== undefined && this.piece.team.id !== ofPiece.team.id;
  }
  isFriendly(ofPiece: Piece): boolean {
    return true;
    //return this.piece !== undefined && this.piece.team.id === ofPiece.team.id;
  }
  isUs(team?:Team){
    return true;
    //return team ? this.piece && this.piece.team===team : this.piece && this.piece.team.isUs;
  }
  beginningMove() {
    super.beginningMove();
    this.highlight = false;
    this.pieces.forEach(piece=>piece.beginningMove());
  }
  setDark(player: Player<Game, IGameOptions, IGameState, IGameSave, Board, IBoardSave, Territory, ITerritorySave, Team, TeamId, ITeamSave, Move, IModMove> | undefined) {
    let dark=false;
    this.dark=dark;
  }
}

function deserializeTerrain(state:string){
  switch (state){
    case 'p' : return "Plain";
    case 'g' : return "Grassland";
    case 'f' : return "Forest";
    case 'm' : return "Mountain";
    case 'w' : return "Water";
    case 'u' : return "Unknown";
    case '' : return "";
  }
  throw new Error("Unknown terrain state: "+state);
}
function serializeTerrain(terrain:string){
  return terrain ? terrain.charAt(0).toLowerCase() : '';
}