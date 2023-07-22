import { Component, OnInit } from '@angular/core';
import { CHART_HEIGHT } from '../../constants/dimension.const';
import { SharedChartComponent } from '../shared-chart.component';

@Component({
  selector: 'app-polar-area',
  templateUrl: './polar-area.component.html',
  styleUrls: ['./polar-area.component.scss'],
})
export class PolarAreaComponent
  extends SharedChartComponent
  implements OnInit
{
  ngOnInit() {
    this.series = [14, 23, 21, 17, 15, 10, 12, 17, 21];

    this.chartOptions = {
      chart: {
        type: 'polarArea',
        height: CHART_HEIGHT,
      },
      stroke: {
        colors: ['#fff'],
      },
      fill: {
        opacity: 0.8,
      },
      legend: {
        position: 'bottom',
      },
      series: this.series,
      title: {
        text: this.chartTitle,
      },
    };
  }
}
