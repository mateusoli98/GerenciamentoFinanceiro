import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getChartFinancialControl,
  getGridFinancialControl,
} from 'src/app/actions/financialControl.action';
import {
  FinancialControlBalance,
  FinancialControlResponse,
} from 'src/app/models/response/financialControlResponse.model';
import { LineChartResponse } from 'src/app/models/response/lineChartResponse';
import { FinancialControlService } from 'src/app/services/financial-control.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DialogFinancialControlComponent } from './dialog-financial-control/dialog-financial-control.component';

export interface balance {
  name: string;
  value: number;
  isIncome: boolean;
}

@Component({
  selector: 'app-financial-control',
  templateUrl: './financial-control.component.html',
  styleUrls: ['./financial-control.component.scss'],
})
export class FinancialControlComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value', 'indicator', 'action'];
  dataSource = [];
  financialControlState$: Observable<any> | undefined;
  chartOptions: LineChartResponse | undefined;
  balance: FinancialControlBalance = {
    total: 0,
    totalOutgoing: 0,
    totalRevenue: 0,
  };

  constructor(
    public dialog: MatDialog,
    private store: Store<{ FinancialControlReducer: FinancialControlResponse }>,
    private financialControlService: FinancialControlService,
    private snackbarService: SnackbarService
  ) {}

  async openDialog(isIncome: boolean) {
    const dialogRef = this.dialog.open(DialogFinancialControlComponent, {
      width: '400px',
      data: isIncome,
    });

    dialogRef.afterClosed().subscribe(async () => {
      this.getGridFinancialControls();
      this.getChartFinancialControls();
      this.getBalance();
    });
  }

  ngOnInit(): void {
    this.financialControlState$ = this.store.pipe(
      select('FinancialControlReducer')
    );

    this.financialControlState$.subscribe((res) => {
      if (res.gridFinancialControl) {
        this.dataSource = res.gridFinancialControl;
      }

      if (res.chartFinancialControl) {
        this.chartOptions = JSON.parse(
          JSON.stringify(res.chartFinancialControl)
        );
      }
    });

    this.getGridFinancialControls();
    this.getChartFinancialControls();
    this.getBalance();
  }

  async getGridFinancialControls() {
    (await this.financialControlService.getByUser()).subscribe(
      (response: Array<FinancialControlResponse>) => {
        this.store.dispatch(getGridFinancialControl({ response }));
      }
    );
  }

  async getChartFinancialControls() {
    (
      await this.financialControlService.getChartCurrentMonth(this.currentDate)
    ).subscribe((response: LineChartResponse) => {
      this.store.dispatch(getChartFinancialControl({ response }));
    });
  }

  get currentDate() {
    const currentDate = new Date();

    return `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`;
  }

  async deleteFinancialControl(financialControlGuid: string, income: boolean) {
    (
      await this.financialControlService.deleteFinancialControl(
        financialControlGuid
      )
    ).subscribe(() => {
      this.snackbarService.showMessage(
        `${income ? 'Receita' : 'Despesa'} foi excluida com sucesso`
      );

      this.getGridFinancialControls();
      this.getChartFinancialControls();
      this.getBalance();
    });
  }

  editFinancialControl(financialControl: FinancialControlResponse) {
    const dialogRef = this.dialog.open(DialogFinancialControlComponent, {
      width: '400px',
      data: financialControl,
    });

    dialogRef.afterClosed().subscribe(async () => {
      this.getGridFinancialControls();
      this.getChartFinancialControls();
      this.getBalance();
    });
  }

  async getBalance() {
    (await this.financialControlService.getBalance()).subscribe(
      (response: FinancialControlBalance) => {
        this.balance = response;
      }
    );
  }

  getFormatCurrency(value: number) {
    return new Intl.NumberFormat('pt-br', {
      currency: 'BRL',
    }).format(value);
  }
}
