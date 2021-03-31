import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent | undefined;
  public chartOptions: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'Receitas',
          data: [
            8000,
            8100,
            8035,
            9050,
            9500,
            9852,
            10268,
            11563,
            11832,
            12163,
            12330,
            13523,
          ],
          color: '#0bcc0b',
        },
        {
          name: 'Despesas',
          data: [
            10026,
            9063,
            11269,
            9851,
            7596,
            7003,
            6495,
            6103,
            5986,
            5236,
            5003,
            4896,
          ],
          color: '#fb5454',
        },
      ],
      chart: {
        height: 350,
        type: 'line',
      },
      title: {
        text: 'Progresso do último ano',
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
          'Ago',
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
