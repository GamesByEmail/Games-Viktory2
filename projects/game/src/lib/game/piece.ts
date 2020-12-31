import { IProjectedEntity } from '@packageforge/template-projection';
import { IBindableTarget, StateStore } from '@gamesbyemail/base';
import { Game } from './game';
import { Territory } from './territory';
import { Team } from './team';
import { indexFromTeamId, TeamId, teamIdFromIndex } from './team-id';
import { IPieceKey } from './i-piece-key';
import { ElementRef } from '@angular/core';
import { Rectangle2D } from '@packageforge/geometry2d';
import { Deferred } from '@packageforge/deferred';

export interface IPieceSave {
  territory: number;
}

export abstract class Piece implements IProjectedEntity, IBindableTarget {
  public get game(): Game {
    return this._game;
  }
  private _team: Team;
  public get team(): Team {
    return this._team;
  }
  private _territory: Territory | undefined;
  public get territory(): Territory | undefined {
    return this._territory;
  }
  public set territory(value: Territory | undefined) {
    if (this.elementRef)
      this.lastClientRect = new Rectangle2D(this.elementRef.nativeElement.getBoundingClientRect());
    this._territory = value;
    this.templateKey.small = this._territory === undefined;
  }
  private templateKey: IPieceKey;
  private stateStore = new StateStore<IPieceSave>();
  public showCheck = false;
  public offset=-1;
  constructor(private _game: Game, state: string) {
    this._team = this.game.findTeam(teamIdFromIndex(parseInt(state.charAt(0))));
    console.log("name",this.constructor.name);
    this.templateKey = { type: <any>(this.constructor.name+"Active"), team: this.team.id, small: true, resigned: this.team.resigned };
  }
  elementRef: ElementRef<SVGElement> | undefined;
  private lastClientRect: Rectangle2D | undefined;
  bindElement(elementRef: ElementRef<SVGElement>): Rectangle2D | undefined {
    if (this.elementRef && this.elementRef !== elementRef)
      this.unbindElement(this.elementRef);
    this.elementRef = elementRef;
    const r = this.lastClientRect;
    this.lastClientRect = undefined;
    return r;
  }
  unbindElement(elementRef: ElementRef<SVGElement>): void {
    if (this.elementRef === elementRef)
      this.elementRef = undefined;
  }
  getTemplateKey(key?: IPieceKey): IPieceKey {
    return this.templateKey;
  }
  canMove(): boolean {
    return this.team.myTurn;
  }
  save(): IPieceSave {
    const saved = this.saving();
    this.stateStore.push(saved);
    return saved;
  }
  saving(): IPieceSave {
    return {
      territory: this.territory ? this.territory.index : -1
    };
  }
  restore(depth: number) {
    const saved = this.stateStore.pop(depth);
    this.restoring(saved);
  }
  restoring(saved: IPieceSave | undefined) {
    this.territory = saved && saved.territory >= 0 ? this.team.game.board.territories[saved.territory] : undefined;
  }
  commit() {
    this.stateStore.commit();
  }
  abstract canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean;
  abstract readonly type:string;
  makeMove(toTerritory: Territory, logIt?: boolean): boolean {
    this.changeTerritory(toTerritory);
    return true;
  }
  completeMove(fromTerritory: Territory): Promise<boolean> {
    return Promise.resolve(true);
  }
  async attemptMove(toTerritory: Territory | undefined) {
    return true;
  }
  changeTerritory(toTerritory: Territory | undefined): void {
    if (this.territory)
      this.territory.removePiece(this);
    this.territory = toTerritory;
    if (this.territory)
      this.territory.addPiece(this);
  }
  isUs(team?: Team): boolean {
    return team ? this.team === team : this.team.isUs();
  }
  replaceWith(replacement: Piece) {
    const territory = this.territory;
    this.changeTerritory(undefined);
    replacement.changeTerritory(territory);
    replacement.lastClientRect = this.lastClientRect;
  }
  beginningMove() {
  }
  getState(){
    return this.type.charAt(0)+indexFromTeamId(this.team.id);
  }
}
