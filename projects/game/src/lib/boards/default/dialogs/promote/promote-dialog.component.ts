import { Component, Inject } from '@angular/core';
import { SvgDialogRef, SVG_DIALOG_DATA } from '@packageforge/svg-dialog';

@Component({
  selector: "svg[gbe-games-viktory2-promote-dialog][xmlns=http://www.w3.org/2000/svg]",
  templateUrl: './promote-dialog.component.html',
  styleUrls: ['./promote-dialog.component.css']
})
export class PromoteDialogComponent {
  constructor(public dialogRef: SvgDialogRef<string | undefined>, @Inject(SVG_DIALOG_DATA) public data: any) {
  }
  close(value?: string) {
    this.dialogRef.close(value);
  }
  dialogSize={
    width:400,
    height:170
  };
}
