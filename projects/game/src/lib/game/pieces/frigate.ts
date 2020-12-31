import { Territory } from '../territory';
import { Unit } from './unit';

export class Frigate extends Unit {
  public static readonly stateChar="F"
  public static readonly type="Frigate"
  public readonly type="Frigate"
  getState(){
    return super.getState();
  }
  canMoveTo(toTerritory: Territory, darkTest?: boolean): boolean {
    return true;
  }
}
