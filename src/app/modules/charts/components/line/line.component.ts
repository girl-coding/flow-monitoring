import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { CHART_HEIGHT } from '../../constants/dimension.const';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent implements AfterViewInit {
  @ViewChild('chartElement', { static: false })
  chartElementRef!: ElementRef;

  private _chart!: ApexCharts;

  @Input() chartTitle = '';
  @Input() xAxis: ApexXAxis = {
    categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
  };
  @Input() yAxis: ApexYAxis | ApexYAxis[] = [
    {
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#FF1654',
      },
      labels: {
        style: {
          colors: '#FF1654',
        },
      },
      title: {
        text: 'Series A',
        style: {
          color: '#FF1654',
        },
      },
    },
    {
      opposite: true,
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
        color: '#247BA0',
      },
      labels: {
        style: {
          colors: '#247BA0',
        },
      },
      title: {
        text: 'Series B',
        style: {
          color: '#247BA0',
        },
      },
    },
  ];
  @Input() series: ApexAxisChartSeries = [
    {
      name: 'Series A',
      data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
    },
    {
      name: 'Series B',
      data: [20, 29, 37, 36, 44, 45, 50, 58],
    },
  ];

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const options: ApexCharts.ApexOptions = {
      chart: {
        height: CHART_HEIGHT,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ['#FF1654', '#247BA0'],
      stroke: {
        width: [4, 4],
      },
      plotOptions: {
        bar: {
          columnWidth: '20%',
        },
      },
      tooltip: {
        shared: false,
        intersect: true,
        x: {
          show: false,
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      },
      series: this.series,
      xaxis: this.xAxis,
      yaxis: this.yAxis,
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
