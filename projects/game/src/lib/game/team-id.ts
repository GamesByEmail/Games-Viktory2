export enum TeamId {
  'Red' = 'Red',
  'Yellow' = 'Yellow',
  'Green' = 'Green',
  'Cyan' = 'Cyan',
  'Blue' = 'Blue',
  'Magenta' = 'Magenta',
  'Orange' = 'Orange',
  'Brown' = 'Brown'
}

const teamIds=[
  TeamId.Red,
  TeamId.Yellow,
  TeamId.Green,
  TeamId.Cyan,
  TeamId.Blue,
  TeamId.Magenta,
  TeamId.Orange,
  TeamId.Brown
];
export function indexFromTeamId(teamId: TeamId){
  const index=teamIds.indexOf(teamId);
  if (index<0)
    throw new Error("Invalid team id "+teamId);
  return index;
}
export function teamIdFromIndex(index: number){
  if (index<0 || index>=teamIds.length || !teamIds[index])
    throw new Error("Invalid team index "+index);
  return teamIds[index];
}