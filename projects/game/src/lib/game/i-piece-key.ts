import { TeamId } from "./team-id";

export interface IPieceKey {
  type: 'Town' | 'City' | 'Capitol' | 'Infantry' | 'Cavalry' | 'Artillery' | 'Frigate' | 'Flag' | 'Pennant' | 'Ensign' | 'Pillage' | 'Vassal' | 'Plain' | 'Mountain' | 'Grassland' | 'Forest' | 'Water' | 'Die';
  team: TeamId;
  small?: boolean;
  resigned?: boolean;
}
