import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'My-series',
          data: [
            1900,
            2698,
            2585,
            3112,
            3895,
            5500,
            7502,
            10023,
            17356,
            26358,
            29631,
            33268,
          ],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'Saldo no último ano',
      },
      xaxis: {
        categories: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Aug',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ],
      },
    };
  }

  ngOnInit(): void {}
}
