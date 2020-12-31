import { Territory } from '../territory';
import { Unit } from './unit';

export class Cavalry extends Unit {
  public static readonly stateChar="C"
  public static readonly type="Cavalry"
  public readonly type="Cavalry"
  getState(){
    return super.getState();
  }
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    const delta = this.territory!.delta(toTerritory);
    return (Math.abs(delta.x) <= 1 && Math.abs(delta.y) <= 1) ||
      (Math.abs(delta.x) === 2 && delta.x === delta.y * 2) ||
      (Math.abs(delta.y) === 2 && delta.x * 2 === delta.y);
  }
}
