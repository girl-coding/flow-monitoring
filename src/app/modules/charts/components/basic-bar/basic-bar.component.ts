import { Component, Input } from '@angular/core';
import { CHART_HEIGHT } from '../../constants/dimension.const';
import { SharedChartComponent } from '../shared-chart.component';

@Component({
  selector: 'app-basic-bar',
  templateUrl: './basic-bar.component.html',
  styleUrls: ['./basic-bar.component.scss'],
})
export class BasicBarComponent extends SharedChartComponent {
  @Input() chartTitle = '';
  @Input() xAxis: ApexXAxis;
  @Input() series: ApexAxisChartSeries;

  constructor() {
    super();

    this.series = [
      {
        name: 'Series 1',
        data: [45, 52, 38, 45, 19, 23, 2],
      },
      {
        name: 'Series 2',
        data: [45, 19, 52, 38, 45, 23, 2],
      },
      {
        name: 'Series 3',
        data: [45, 23, 2, 45, 19, 52, 45, 19, 38],
      },
    ];

    this.xAxis = {
      categories: [
        '01 Jan',
        '02 Jan',
        '03 Jan',
        '04 Jan',
        '05 Jan',
        '06 Jan',
        '07 Jan',
      ],
    };

    this.chartOptions = {
      chart: {
        height: CHART_HEIGHT,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
      series: this.series,
      xaxis: this.xAxis,
      title: {
        text: this.chartTitle,
      },
    };
  }
}
