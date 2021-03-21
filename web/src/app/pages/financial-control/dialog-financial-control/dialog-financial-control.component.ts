import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-financial-control',
  templateUrl: './dialog-financial-control.component.html',
  styleUrls: ['./dialog-financial-control.component.scss']
})
export class DialogFinancialControlComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogFinancialControlComponent>,
    @Inject(MAT_DIALOG_DATA) public isIncome: number) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
