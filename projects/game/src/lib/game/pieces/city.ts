import { Territory } from '../territory';
import { Piece } from '../piece';

export class City extends Piece {
  public static readonly stateChar="T"
  public static readonly type="City"
  public readonly type="City"
  getState(){
    return super.getState();
  }
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    const delta = this.territory!.delta(toTerritory);
    return (delta.x === 0 || delta.y === 0 || delta.x === delta.y) && this.territory!.pathIsEmpty(toTerritory);
  }
}
