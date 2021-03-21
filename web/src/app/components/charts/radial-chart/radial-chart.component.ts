import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ChartComponent,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-radial-chart',
  templateUrl: './radial-chart.component.html',
  styleUrls: ['./radial-chart.component.scss'],
})
export class RadialChartComponent implements OnInit {
  @Input() percentage: number = 0;
  @Input() label: string = '';

  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: any;

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      series: [this.percentage],
      chart: {
        height: 200,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
        },
      },
      labels: [this.label],
    };
  }
}
