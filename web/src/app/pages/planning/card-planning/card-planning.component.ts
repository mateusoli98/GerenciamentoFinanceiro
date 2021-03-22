import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { DialogNewItemComponent } from './dialog-new-item/dialog-new-item.component';

@Component({
  selector: 'app-card-planning',
  templateUrl: './card-planning.component.html',
  styleUrls: ['./card-planning.component.scss'],
})
export class CardPlanningComponent implements OnInit {
  @Input() data: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(DialogNewItemComponent);
  }
}
