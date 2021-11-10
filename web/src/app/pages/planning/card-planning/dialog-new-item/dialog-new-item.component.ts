import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeyValue } from 'src/app/models/common/keyValue.model';
import { PlanningRequest } from 'src/app/models/request/planningRequest.model';
import { PlanningResponse } from 'src/app/models/response/planningResponse.model';
import { PlanningService } from 'src/app/services/planning.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dialog-new-item',
  templateUrl: './dialog-new-item.component.html',
  styleUrls: ['./dialog-new-item.component.scss'],
})
export class DialogNewItemComponent implements OnInit {
  categories: Array<KeyValue>;
  form: FormGroup = new FormGroup({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public planning: PlanningResponse,
    private dialogRef: MatDialogRef<DialogNewItemComponent>,
    private fb: FormBuilder,
    private planningService: PlanningService,
    private snackbarService: SnackbarService
  ) {
    this.categories = [
      {
        key: 'Alimentação',
        value: 1,
      },
      {
        key: 'Escola',
        value: 2,
      },
      {
        key: 'Custos fixos',
        value: 3,
      },
      {
        key: 'Livros',
        value: 4,
      },
      {
        key: 'Transporte',
        value: 5,
      },
      {
        key: 'Mensalidade',
        value: 6,
      },
      {
        key: 'Outro',
        value: 0,
      },
    ];
  }

  ngOnInit(): void {
    this.intialForm();
  }

  intialForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      totalValue: [null, [Validators.required, Validators.min(0)]],
      entryValue: [null, [Validators.min(0)]],
      category: [null, Validators.required],
    });
  }

  get name() {
    return this.form.get('name')?.value;
  }

  get totalValue() {
    return this.form.get('totalValue')?.value;
  }

  get entryValue() {
    return this.form.get('entryValue')?.value;
  }

  get category() {
    return this.form.get('category')?.value;
  }

  async savePlanning() {
    const request = this.getRequest();

    if (request) {
      await (
        await this.planningService.update(request)
      ).subscribe((result) => {
        if (result) {
          this.snackbarService.showMessage(
            'Planejamento atualizado com sucesso'
          );

          this.dialogRef.close();
        } else {
          this.snackbarService.showMessage('Erro ao atualizar o planejamento');
        }
      });
    }
  }

  getRequest(): PlanningRequest | undefined {
    if (this.form.invalid) return undefined;

    if (!this.name || !this.category || !this.totalValue) return undefined;

    return {
      ...this.planning,
      planningItems: [
        {
          name: this.name,
          category: this.category,
          totalValue: this.totalValue,
          entryValue: this.entryValue ?? 0,
        },
      ],
    };
  }
}
