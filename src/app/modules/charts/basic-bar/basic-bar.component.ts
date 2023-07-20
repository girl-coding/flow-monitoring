import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-basic-bar',
  templateUrl: './basic-bar.component.html',
  styleUrls: ['./basic-bar.component.scss'],
})
export class BasicBarComponent implements AfterViewInit {
  @ViewChild('chartElement', { static: false })
  chartElementRef!: ElementRef;

  private _chart!: ApexCharts;

  @Input() chartTitle = '';
  @Input() xAxis: ApexXAxis = {
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
  @Input() series: ApexAxisChartSeries = [
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

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const options: ApexCharts.ApexOptions = {
      chart: {
        height: 280,
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

    this._chart = new ApexCharts(
      this.chartElementRef?.nativeElement,
      options,
    );

    this._chart.render();
  }
}
