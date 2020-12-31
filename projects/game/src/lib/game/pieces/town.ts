import { Territory } from '../territory';
import { Piece } from '../piece';

export class Town extends Piece {
  public static readonly stateChar="t"
  public static readonly type="Town"
  public readonly type="Town"
  getState(){
    return super.getState();
  }
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    const delta = this.territory!.delta(toTerritory);
    return (delta.x === 0 || delta.y === 0 || delta.x === delta.y || 2 * delta.x === delta.y || 
      delta.x === 2 * delta.y || -delta.x === delta.y) &&
      this.territory!.pathIsEmpty(toTerritory);
  }
}