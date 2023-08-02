import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-charts-header',
  templateUrl: './charts-header.component.html',
  styleUrls: ['./charts-header.component.scss'],
})
export class ChartsHeaderComponent implements AfterViewInit {
  @ViewChild('spark1', { static: false })
  spark1ElementRef!: ElementRef;

  @ViewChild('spark2', { static: false })
  spark2ElementRef!: ElementRef;

  @ViewChild('spark3', { static: false })
  spark3ElementRef!: ElementRef;

  @ViewChild('spark4', { static: false })
  spark4ElementRef!: ElementRef;

  ngAfterViewInit(): void {
    this._renderChart(
      'spark1',
      [
        {
          data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61],
        },
      ],
      this.spark1ElementRef,
    );

    this._renderChart(
      'spark2',
      [
        {
          data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19],
        },
      ],
      this.spark2ElementRef,
    );

    this._renderChart(
      'spark3',
      [
        {
          data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69],
        },
      ],
      this.spark3ElementRef,
    );

    this._renderChart(
      'spark4',
      [
        {
          data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21],
        },
      ],
      this.spark4ElementRef,
    );
  }

  private _renderChart(
    id: string,
    series: ApexAxisChartSeries | ApexNonAxisChartSeries,
    elementRef: ElementRef,
  ): void {
    const chartOptions: ApexCharts.ApexOptions = {
      series,
      chart: {
        id,
        group: 'sparks',
        type: 'line',
        height: 80,
        sparkline: {
          enabled: true,
        },
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 2,
          opacity: 0.2,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      markers: {
        size: 0,
      },
      grid: {
        padding: {
          top: 20,
          bottom: 10,
          left: 110,
        },
      },
      colors: ['#fff'],
      xaxis: {
        crosshairs: {
          width: 1,
        },
      },
      tooltip: {
        x: {
          show: false,
        },
      },
    };

    new ApexCharts(elementRef?.nativeElement, chartOptions).render();
  }
}
