import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogNewObjectivesComponent } from './dialog-new-objectives/dialog-new-objectives.component';

import {dataObjetctives} from './mockups';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss'],
})
export class ObjectivesComponent implements OnInit {
  
  public listDataObjetctives = dataObjetctives;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(event: boolean) {
    if (event) {
      this.dialog.open(DialogNewObjectivesComponent,{
        width: '400px'
      });
    }
  }
}
