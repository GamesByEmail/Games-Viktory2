import { Territory } from '../territory';
import { Unit } from './unit';

export class Artillery extends Unit {
  public static readonly stateChar="A"
  public static readonly type="Artillery"
  public readonly type="Artillery"
  getState(){
    return super.getState();
  }
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    const delta = this.territory!.delta(toTerritory);
    return ((delta.x === -3 && (delta.y === -2 || delta.y === -1)) ||
      (delta.x === -2 && (delta.y === -3 || delta.y === 1)) ||
      (delta.x === -1 && (delta.y === -3 || delta.y === 2)) ||
      (delta.x === 1 && (delta.y === -2 || delta.y === 3)) ||
      (delta.x === 2 && (delta.y === -1 || delta.y === 3)) ||
      (delta.x === 3 && (delta.y === 1 || delta.y === 2)));
  }
}