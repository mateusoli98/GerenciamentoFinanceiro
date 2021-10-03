import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FinancialControlRequest } from 'src/app/models/request/financialControl.model';
import { FinancialControlResponse } from 'src/app/models/response/financialControlResponse.model';
import { FinancialControlService } from 'src/app/services/financial-control.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-dialog-financial-control',
  templateUrl: './dialog-financial-control.component.html',
  styleUrls: ['./dialog-financial-control.component.scss'],
})
export class DialogFinancialControlComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  public financialControlState$: Observable<any> | undefined;

  constructor(
    private store: Store<{ FinancialControlReducer: any }>,
    public dialogRef: MatDialogRef<DialogFinancialControlComponent>,
    @Inject(MAT_DIALOG_DATA) public isIncome: boolean,
    @Inject(MAT_DIALOG_DATA) public financialControl: FinancialControlResponse,
    private fb: FormBuilder,
    private financialControlService: FinancialControlService,
    private snackbarService: SnackbarService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.financialControlState$ = this.store.pipe(
      select('FinancialControlReducer')
    );
    this.intitForm();
  }

  intitForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null],
      value: [null, [Validators.min(0), Validators.required]],
    });

    if (this.financialControl) {
      const { name, description, value } = this.financialControl;

      this.name?.setValue(name);
      this.description?.setValue(description);
      this.value?.setValue(value);
    }
  }

  get name() {
    return this.form.get('name');
  }
  get description() {
    return this.form.get('description');
  }
  get value() {
    return this.form.get('value');
  }

  async createFinancialControl() {
    const request = this.getRequestFinancialControl();

    if (request) {
      if (request.financialControlGuid) {
        (
          await this.financialControlService.updateFinancialControl(request)
        ).subscribe((result: FinancialControlResponse) => {
          if (result) {
            let message = request.income
              ? 'Receita atualizada com sucesso'
              : 'Despesa atualizada com sucesso';

            this.dialogRef.close();
            this.snackbarService.showMessage(message);
          } else {
            this.snackbarService.showMessage(
              'Não foi possível realizar a operação'
            );
          }
        });
      } else {
        (await this.financialControlService.create(request)).subscribe(
          (result: FinancialControlResponse) => {
            if (result) {
              let message = this.isIncome
                ? 'Receita criada com sucesso'
                : 'Despesa criada com sucesso';

              this.dialogRef.close();
              this.snackbarService.showMessage(message);
            } else {
              this.snackbarService.showMessage(
                'Não foi possível realizar a operação'
              );
            }
          }
        );
      }
    } else {
      this.snackbarService.showMessage(
        'Dados invalidos. Preencha os campos corretamente'
      );
    }
  }

  getRequestFinancialControl(): FinancialControlRequest | undefined {
    if (this.form.invalid) return undefined;

    if (!this.name || !this.description || !this.value) return undefined;

    if (this.financialControl.financialControlGuid) {
      return {
        financialControlGuid: this.financialControl?.financialControlGuid,
        name: this.name.value,
        description: this.description.value,
        income: this.financialControl?.income,
        value: this.value.value,
      };
    } else {
      return {
        name: this.name.value,
        description: this.description.value,
        income: this.isIncome,
        value: this.value.value,
      };
    }
  }
}
