import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlanningRequest } from 'src/app/models/request/planningRequest.model';
import { PlanningService } from 'src/app/services/planning.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dialog-planning',
  templateUrl: './dialog-planning.component.html',
  styleUrls: ['./dialog-planning.component.scss'],
})
export class DialogPlanningComponent implements OnInit {
  public form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private planningService: PlanningService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<DialogPlanningComponent>
  ) {}

  ngOnInit(): void {
    this.intitForm();
  }

  intitForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      initialValue: [null, [Validators.required, Validators.min(0)]],
      dateFinal: [null, [Validators.required]],
    });
  }

  get name() {
    return this.form.get('name')?.value;
  }

  get initialValue() {
    return this.form.get('initialValue')?.value;
  }

  get dateFinal() {
    return this.form.get('dateFinal')?.value;
  }

  async savePlanning() {
    const request = this.getPlanningRequest();

    if (request) {
      await (
        await this.planningService.create(request)
      ).subscribe((result) => {
        if (result) {
          this.snackbarService.showMessage('Planejamento criado com sucesso');
          this.dialogRef.close();
        } else {
          this.snackbarService.showMessage(
            'Não foi possível criar o planejamento'
          );
          this.dialogRef.close();
        }
      });
    }
  }

  getPlanningRequest(): PlanningRequest | undefined {
    if (this.form.invalid) return undefined;

    if (!this.name || !this.initialValue) return undefined;

    const valueDateFinal = new Date(this.dateFinal);
    const currentDate = new Date();

    if (
      valueDateFinal.getFullYear() < currentDate.getFullYear() ||
      valueDateFinal.getMonth() < currentDate.getMonth() ||
      valueDateFinal.getDate() < currentDate.getDate()
    ) {
      return undefined;
    }
    
    return {
      name: this.name,
      value: this.initialValue,
      dateFinal: this.dateFinal,
      isGrouped: false,
      planningItems: [],
    };
  }
}
