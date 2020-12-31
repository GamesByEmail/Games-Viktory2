import { Territory } from '../territory';
import { Piece } from '../piece';

export class Capitol extends Piece {
  public static readonly stateChar="c"
  public static readonly type="Capitol"
  public readonly type="Capitol"
  getState(){
    return super.getState();
  }
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    return false;
  }
}