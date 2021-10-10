import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getObjectives } from 'src/app/actions/objective.action';
import { ObjectiveResponse } from 'src/app/models/response/objectiveResponse.model';
import { ObjectiveService } from 'src/app/services/objective.service';
import { DialogNewObjectivesComponent } from './dialog-new-objectives/dialog-new-objectives.component';

@Component({
  selector: 'app-objectives',
  templateUrl: './objectives.component.html',
  styleUrls: ['./objectives.component.scss'],
})
export class ObjectivesComponent implements OnInit {
  public objectiveState$: Observable<any> | undefined;
  public listDataObjetctives: Array<ObjectiveResponse> | undefined;

  constructor(
    public dialog: MatDialog,
    private store: Store<{ ObjectiveReducer: any }>,
    private objectiveService: ObjectiveService
  ) {}

  ngOnInit(): void {
    this.objectiveState$ = this.store.pipe(select('ObjectiveReducer'));

    this.objectiveState$.subscribe((result) => {
      if (result.objectives) {
        this.listDataObjetctives = result.objectives;
      }
    });

    this.getObjetives();
  }

  openDialog(event: boolean) {
    if (event) {
      const dialogRef = this.dialog.open(DialogNewObjectivesComponent, {
        width: '400px',
      });

      dialogRef.afterClosed().subscribe(() => {
        this.getObjetives();
      });
    }
  }

  async getObjetives() {
    await (
      await this.objectiveService.getByUser()
    ).subscribe((response: Array<ObjectiveResponse>) => {
      if (response) {
        this.store.dispatch(getObjectives({ response }));
      }
    });
  }

  reloadScreen(event: any) {
    if (event) {
      this.getObjetives();
    }
  }
}
