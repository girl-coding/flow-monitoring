import { Component, Input } from '@angular/core';
import { CHART_HEIGHT } from '../../constants/dimension.const';
import { SharedChartComponent } from '../shared-chart.component';

@Component({
  selector: 'app-radial-bar',
  templateUrl: './radial-bar.component.html',
  styleUrls: ['./radial-bar.component.scss'],
})
export class RadialBarComponent extends SharedChartComponent {
  @Input() chartTitle = '';
  @Input() labels: string[];
  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries;

  constructor() {
    super();

    this.series = [90, 85, 92, 83];
    this.labels = ['Apples', 'Oranges', 'Bananas', 'Berries'];

    this.chartOptions = {
      chart: {
        height: CHART_HEIGHT,
        type: 'radialBar',
        animations: {
          speed: 100,
        },
      },

      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function () {
                // By default this function returns the average of all series.
                //The below is just an example to show the use of custom formatter function
                return '249';
              },
            },
          },
        },
      },
      labels: this.labels,
      series: this.series,
    };
  }
}
