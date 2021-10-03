import { Component, Input, OnInit } from '@angular/core';
import { LineChartResponse } from 'src/app/models/response/lineChartResponse';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @Input() chartOptions: LineChartResponse;

  constructor() {
    this.chartOptions = {
      title: { text: '' },
      chart: {
        height: 350,
        type: 'line',
      },
      series: [
        { name: 'Receitas', color: '#0bcc0b', data: [] },
        { name: 'Despesas', color: '#fb5454', data: [] },
      ],
      xaxis: {
        categories: [],
      },
    };
  }
  ngOnInit(): void {}
}
