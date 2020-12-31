import { Territory } from '../territory';
import { Unit } from './unit';

export class Infantry extends Unit {
  public static readonly stateChar="I"
  public static readonly type="Infantry"
  public readonly type="Infantry"
  getState(){
    return super.getState();
  }
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    const delta = this.territory!.delta(toTerritory);
    return (2 * delta.x === delta.y || delta.x === 2 * delta.y || delta.x === -delta.y) && this.territory!.pathIsEmpty(toTerritory);
  }
}
