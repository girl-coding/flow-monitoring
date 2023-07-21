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
    const spark1Options1 = this._createChartOption('spark1', [
      {
        data: [15, 75, 47, 65, 14, 32, 19, 54, 44, 61],
      },
    ]);

    const spark1Options2 = this._createChartOption('spark2', [
      {
        data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19],
      },
    ]);

    const spark1Options3 = this._createChartOption('spark3', [
      {
        data: [12, 14, 2, 47, 32, 44, 14, 55, 41, 69],
      },
    ]);

    const spark1Options4 = this._createChartOption('spark4', [
      {
        data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21],
      },
    ]);

    new ApexCharts(
      this.spark1ElementRef?.nativeElement,
      spark1Options1,
    ).render();

    new ApexCharts(
      this.spark2ElementRef?.nativeElement,
      spark1Options2,
    ).render();

    new ApexCharts(
      this.spark3ElementRef?.nativeElement,
      spark1Options3,
    ).render();

    new ApexCharts(
      this.spark4ElementRef?.nativeElement,
      spark1Options4,
    ).render();
  }

  private _createChartOption(
    id: string,
    series: ApexAxisChartSeries | ApexNonAxisChartSeries,
  ): ApexCharts.ApexOptions {
    return {
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
  }
}
