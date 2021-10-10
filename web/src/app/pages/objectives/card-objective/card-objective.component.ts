import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ObjectiveResponse } from 'src/app/models/response/objectiveResponse.model';
import { ObjectiveService } from 'src/app/services/objective.service';
import { DialogNewObjectivesComponent } from '../dialog-new-objectives/dialog-new-objectives.component';

@Component({
  selector: 'app-card-objective',
  templateUrl: './card-objective.component.html',
  styleUrls: ['./card-objective.component.scss'],
})
export class CardObjectiveComponent implements OnInit {
  @Input() data: ObjectiveResponse | undefined;

  @Output() updateData = new EventEmitter<boolean>();

  constructor(
    private objectiveService: ObjectiveService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  async deleteObjective() {
    if (!this.data) return;

    const { objectiveGuid } = this.data;

    await (
      await this.objectiveService.delete(objectiveGuid)
    ).subscribe((result) => {
      if (result) {
        this.updateData.emit(true);
      }
    });
  }

  updateObjective() {
    const dialogRef = this.dialog.open(DialogNewObjectivesComponent, {
      width: '400px',
      data: this.data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateData.emit(true);
    });
  }

  get dateFinalFormater() {
    let dateFormater = '';

    if (this.data) {
      const dateFinal = new Date(this.data.dateFinal);

      const day = dateFinal.getDate();
      const month = dateFinal.getMonth() + 1;
      const year = dateFinal.getFullYear();

      dateFormater = `${day}/${month}/${year}`;
    }

    return dateFormater;
  }

  get percentage() {
    let percentageValue = 0;

    if (this.data) {
      const { entryValue, totalValue } = this.data;

      percentageValue = Number(((entryValue / totalValue) * 100).toFixed(2));
    }

    return percentageValue;
  }

  get priceActual() {
    let value = 'R$ --';

    if (this.data) {
      const { entryValue } = this.data;

      value = `R$ ${entryValue}`;
    }

    return value;
  }
}
