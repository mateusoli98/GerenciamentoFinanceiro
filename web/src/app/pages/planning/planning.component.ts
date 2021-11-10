import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { dataPlannings, dataPlanningGroups } from './mockup';
import { DialogPlanningComponent } from './dialog-planning/dialog-planning.component';
import { Observable } from 'rxjs';
import { PlanningResponse } from 'src/app/models/response/planningResponse.model';
import { select, Store } from '@ngrx/store';
import { getPlannings } from 'src/app/actions/planning.action';
import { PlanningService } from 'src/app/services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent implements OnInit {
  public planningsState$: Observable<any> | undefined;
  public plannings: Array<PlanningResponse> | undefined;

  constructor(
    private dialog: MatDialog,
    private store: Store<{ PlanningReducer: any }>,
    private planningService: PlanningService
  ) {}

  ngOnInit(): void {
    this.planningsState$ = this.store.pipe(select('PlanningReducer'));

    this.planningsState$.subscribe((result) => {
      if (result.plannings) {
        this.plannings = result.plannings;
      }
    });

    this.getPlannings();
  }

  openDialog(event: boolean) {
    if (event) {
      const dialogRef = this.dialog.open(DialogPlanningComponent, {
        width: '40%',
      });

      dialogRef.afterClosed().subscribe(() => {
        this.getPlannings();
      });
    }
  }

  async getPlannings() {
    await (
      await this.planningService.getByUser()
    ).subscribe((response: Array<PlanningResponse>) => {
      if (response) {
        this.store.dispatch(getPlannings({ response }));
      }
    });
  }
}
