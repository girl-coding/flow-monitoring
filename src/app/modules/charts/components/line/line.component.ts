import { Component, OnInit } from '@angular/core';
import { CHART_HEIGHT } from '../../constants/dimension.const';
import { SharedChartComponent } from '../shared-chart.component';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
})
export class LineComponent
  extends SharedChartComponent
  implements OnInit
{
  ngOnInit() {
    if (this.isAnnotationsLine) {
      this._initAnnotationsChart();
    } else {
      this._initSimpleChart();
    }
  }

  private _initSimpleChart(): void {
    this.series = [
      {
        name: 'Series A',
        data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6],
      },
      {
        name: 'Series B',
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ];

    this.xAxis = {
      categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
    };

    this.yAxis = [
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

    this.chartOptions = {
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
  }

  private _initAnnotationsChart(): void {
    this.series = [
      {
        data: [20, 19, 27, 36, 44, 45, 50, 58], // Sample data for the 'prices' property
      },
    ];

    this.chartOptions = {
      series: this.series,
      labels: [
        '20 Nov 2017',
        '24 Nov 2017',
        '25 Nov 2017',
        '26 Nov 2017',
        '27 Nov 2017',
        '28 Nov 2017',
        '29 Nov 2017',
        '1 Dec 2017',
      ], // Sample data for 'series.monthDataSeries1.dates'
      chart: {
        height: 350,
        type: 'line',
      },
      annotations: {
        yaxis: [
          {
            y: 8200,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396',
              },
              text: 'Support',
            },
          },
          {
            y: 8600,
            y2: 9000,
            borderColor: '#000',
            fillColor: '#FEB019',
            opacity: 0.2,
            label: {
              borderColor: '#333',
              style: {
                fontSize: '10px',
                color: '#333',
                background: '#FEB019',
              },
              text: 'Y-axis range',
            },
          },
        ],
        xaxis: [
          {
            x: new Date('23 Nov 2017').getTime(),
            strokeDashArray: 0,
            borderColor: '#775DD0',
            label: {
              borderColor: '#775DD0',
              style: {
                color: '#fff',
                background: '#775DD0',
              },
              text: 'Anno Test',
            },
          },
          {
            x: new Date('26 Nov 2017').getTime(),
            x2: new Date('28 Nov 2017').getTime(),
            fillColor: '#B3F7CA',
            opacity: 0.4,
            label: {
              borderColor: '#B3F7CA',
              style: {
                fontSize: '10px',
                color: '#fff',
                background: '#00E396',
              },
              offsetY: -10,
              text: 'X-axis range',
            },
          },
        ],
        points: [
          {
            x: new Date('30 Nov 2017').getTime(),
            y: 8607.55,
            marker: {
              size: 8,
              fillColor: '#fff',
              strokeColor: 'red',
              radius: 2,
              cssClass: 'apexcharts-custom-class',
            },
            label: {
              borderColor: '#FF4560',
              offsetY: 0,
              style: {
                color: '#fff',
                background: '#FF4560',
              },

              text: 'Point Annotation',
            },
          },
          {
            x: new Date('28 Nov 2017').getTime(),
            y: 9340.85,
            marker: {
              size: 0,
            },
            image: {
              path: 'assets/svg/profile.svg',
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      grid: {
        padding: {
          right: 30,
          left: 20,
        },
      },
      title: {
        text: this.chartTitle,
        align: 'left',
      },
      xaxis: {
        type: 'datetime',
      },
    };
  }
}
