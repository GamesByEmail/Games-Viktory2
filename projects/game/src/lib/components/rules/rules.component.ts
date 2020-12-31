import { Component, Input } from '@angular/core';
import { TeamId } from '../../game/team-id';


interface IImageCtx {
  team:TeamId
}

@Component({
  selector: 'gamesbyemail-games-viktory2-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent {

  teamCtx:IImageCtx={team:TeamId.Red};
  oppoCtx:IImageCtx={team:TeamId.Yellow};
  @Input('team') set _team(value:TeamId){
    this.teamCtx={team:TeamId.Red};
    this.oppoCtx={team:TeamId.Yellow};
  };
}
