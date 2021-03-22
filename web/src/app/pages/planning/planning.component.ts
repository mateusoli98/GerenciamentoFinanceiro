import { Component, OnInit } from '@angular/core';
import { dataPlannings, dataPlanningGroups } from './mockup';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  public plannings = dataPlannings;
  public planningGroup = dataPlanningGroups;
  constructor() {}

  ngOnInit(): void {}
  openDialog(event: boolean) {}
}
