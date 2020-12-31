import { Component, OnInit } from '@angular/core';
import { IGameData } from '@gamesbyemail/base';
import { TERRITORY_DELIMETER } from '../../game/delimeter';
import { Game, IGameOptions, IGameState } from '../../game/game';
import { TeamId } from '../../game/team-id';

@Component({
  selector: 'gamesbyemail-games-viktory2-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  game: Game = new Game();
  constructor() {
  }

  ngOnInit() {
    const gameData: IGameData<IGameOptions, IGameState, TeamId> = {
      over: false,
      players: [
        { title: "David", id: "ASDFASDF" },
        { title: "Jennifer", id: "ASDFASDF" }
      ],
      options: {
        dark: false
      },
      perspective: TeamId.Red,
      states: [
        {
          moveNumber: 0,
          //board: "  prqb   pnbk    pbnr     pppp                      p        PPPP     RNBP    QBNP   BKRP  ",
          board: "",
          teams: [
            '@',
            ''
          ],
          moves: []
        }
      ]
    };
    const board:string[]=[];
    for (let i=0;i<61;i++)
      board.push("");
    board[0]="F0";
    gameData.states[0].board=board.join(TERRITORY_DELIMETER);
    this.game.setGameData(gameData);
  }

}
