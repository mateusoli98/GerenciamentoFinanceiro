import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { dataPlannings, dataPlanningGroups } from './mockup';
import { DialogPlanningComponent } from './dialog-planning/dialog-planning.component';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  public plannings = dataPlannings;
  public planningGroup = dataPlanningGroups;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(event: boolean) {
    if (event) {
      this.dialog.open(DialogPlanningComponent,{
        width: '40%'
      });
    }
  }
}
