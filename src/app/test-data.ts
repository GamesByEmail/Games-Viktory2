import {
  IStartGame,
  testMes
} from '@gamesbyemail/base';


export const testData:{[key:string]:IStartGame} = {
  viktory2: {
    title: "VIKTORY II game",
    teams: [
      {
        title: "White",
        player: {
          title: testMes.basic.friends[0].handle,
          user: testMes.basic.friends[0]
        }
      },
      {
        title: "Black",
        player: {
          user: undefined
        }
      }
    ],
    options: {}
  },
  darkChess: {
    title: "Dark VIKTORY II game",
    teams: [
      {
        title: "White",
        player: {
          title: testMes.basic.friends[0].handle,
          user: testMes.basic.friends[0]
        }
      },
      {
        title: "Black",
        player: {
          user: undefined
        }
      }
    ],
    options: {
      dark: "true",
      independentExploration: "true"
    }
  }
};
