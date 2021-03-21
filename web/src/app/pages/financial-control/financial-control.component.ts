import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogFinancialControlComponent } from './dialog-financial-control/dialog-financial-control.component';

export interface balance {
  name: string;
  value: number;
  isIncome: boolean;
}

const ELEMENT_DATA: balance[] = [
  { name: 'Sálario', value: 4500, isIncome: true },
  { name: 'Refeição', value: 50, isIncome: false },
  { name: 'Abastacimento', value: 150, isIncome: false },
  { name: 'Venda de tênis', value: 150, isIncome: true },
  { name: 'Roupa', value: 25, isIncome: false },
  { name: 'Freelance 1', value: 550, isIncome: true },
  { name: 'Alugel', value: 1050, isIncome: false },
  { name: 'Freelance 2', value: 200, isIncome: true },
  { name: 'Revisão do carro', value: 1570, isIncome: false },
];

@Component({
  selector: 'app-financial-control',
  templateUrl: './financial-control.component.html',
  styleUrls: ['./financial-control.component.scss'],
})
export class FinancialControlComponent implements OnInit {
  displayedColumns: string[] = ['name', 'value', 'indicator'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  openDialog(isIncome: boolean) {
    this.dialog.open(DialogFinancialControlComponent, {
      width: '400px',
      data: isIncome,
    });
  }

  ngOnInit(): void {}
}
