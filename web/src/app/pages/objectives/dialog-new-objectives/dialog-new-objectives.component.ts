import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ObjectiveRequest } from 'src/app/models/request/objectiveRequest.model';
import { ObjectiveResponse } from 'src/app/models/response/objectiveResponse.model';
import { ObjectiveService } from 'src/app/services/objective.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dialog-new-objectives',
  templateUrl: './dialog-new-objectives.component.html',
  styleUrls: ['./dialog-new-objectives.component.scss'],
})
export class DialogNewObjectivesComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  public objectiveState$: Observable<any> | undefined;

  constructor(
    private store: Store<{ ObjectiveReducer: any }>,
    private fb: FormBuilder,
    private objectiveService: ObjectiveService,
    public dialogRef: MatDialogRef<DialogNewObjectivesComponent>,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public objectiveResponse: ObjectiveResponse
  ) {}

  ngOnInit(): void {
    this.objectiveState$ = this.store.pipe(select('ObjectiveReducer'));
    this.intitForm();
  }

  intitForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      totalValue: [null, [Validators.min(0), Validators.required]],
      entryValue: [null, [Validators.min(0), Validators.required]],
      dateFinal: [null, [Validators.required]],
    });

    if (this.objectiveResponse) {
      const { name, description, totalValue, entryValue, dateFinal } =
        this.objectiveResponse;

      this.name?.setValue(name);
      this.description?.setValue(description);
      this.totalValue?.setValue(totalValue);
      this.entryValue?.setValue(entryValue);
      this.dateFinal?.setValue(new Date(dateFinal));

      this.name?.disable();
      this.description?.disable();
      this.totalValue?.disable();
      this.dateFinal?.disable();
    }
  }

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get totalValue() {
    return this.form.get('totalValue');
  }
  get entryValue() {
    return this.form.get('entryValue');
  }
  get dateFinal() {
    return this.form.get('dateFinal');
  }

  onActionObjetive() {
    if (this.objectiveResponse) {
      this.updatedObjetive();
    } else {
      this.createObjective();
    }
  }

  async createObjective() {
    const request = this.getObjectiveRequest();

    if (request) {
      await (
        await this.objectiveService.create(request)
      ).subscribe((result: ObjectiveResponse) => {
        if (result) {
          this.dialogRef.close();
          this.snackbarService.showMessage('Objetivo cadastrado com sucesso');
        } else {
          this.snackbarService.showMessage(
            'Não foi possível cadastrar o objetivo'
          );
        }
      });
    }
  }

  async updatedObjetive() {
    const request = this.getObjectiveRequest();

    if (request) {
      await (
        await this.objectiveService.update(request)
      ).subscribe((result) => {
        if (result) {
          this.dialogRef.close();
          this.snackbarService.showMessage('Objetivo atualizado com sucesso');
        } else {
          this.snackbarService.showMessage(
            'Não foi possível atualizar o objetivo'
          );
        }
      });
    }
  }

  getObjectiveRequest(): ObjectiveRequest | undefined {
    if (
      !this.name?.value ||
      !this.totalValue?.value ||
      !this.entryValue?.value ||
      !this.dateFinal?.value
    )
      return undefined;

    return {
      objectiveGuid: this.objectiveResponse
        ? this.objectiveResponse.objectiveGuid
        : undefined,
      name: this.name.value,
      description: this.description?.value,
      totalValue: Number(this.totalValue.value),
      entryValue: Number(this.entryValue.value),
      dateFinal: new Date(this.dateFinal.value),
    };
  }
}
