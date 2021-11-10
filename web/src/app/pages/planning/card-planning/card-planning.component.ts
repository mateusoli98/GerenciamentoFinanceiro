import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DialogNewItemComponent } from './dialog-new-item/dialog-new-item.component';
import {
  PlanningItemsResponse,
  PlanningResponse,
} from 'src/app/models/response/planningResponse.model';
import { CategoryPlanningItem } from 'src/app/enums/categoryPlanningItem.enum';
import { PlanningService } from 'src/app/services/planning.service';

@Component({
  selector: 'app-card-planning',
  templateUrl: './card-planning.component.html',
  styleUrls: ['./card-planning.component.scss'],
})
export class CardPlanningComponent implements OnInit {
  @Input() data: PlanningResponse | undefined;
  @Output() reload = new EventEmitter<boolean>();

  constructor(
    private dialog: MatDialog,
    private planningService: PlanningService
  ) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogNewItemComponent, {
      data: this.data,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.reload.emit(true);
    });
  }

  getIcon(planningItem: PlanningItemsResponse) {
    let icon: string = '';

    if (planningItem) {
      switch (planningItem.category) {
        case CategoryPlanningItem.Food:
          icon = 'fastfood';
          break;
        case CategoryPlanningItem.School:
          icon = 'book';
          break;
        case CategoryPlanningItem.FixedCosts:
          icon = 'assignment';
          break;
        case CategoryPlanningItem.Books:
          icon = 'book';
          break;
        case CategoryPlanningItem.Transportation:
          icon = 'directions_bus';
          break;
        case CategoryPlanningItem.Tuition:
          icon = 'payments';
          break;
        case CategoryPlanningItem.Other:
          icon = 'pending_outlined';
          break;

        default:
          break;
      }
    }

    return icon;
  }

  getPercentage(planningItem: PlanningItemsResponse) {
    let percentage: string = '--';

    if (planningItem) {
      percentage = `${Number(
        ((planningItem.entryValue / planningItem.totalValue) * 100).toFixed(2)
      )}`;
    }

    return percentage;
  }

  async deletePlanning() {
    if (this.data) {
      const { planningGuid } = this.data;

      await (
        await this.planningService.delete(planningGuid)
      ).subscribe((result) => {
        if (result) {
          this.reload.emit(true);
        }
      });
    }
  }
}
