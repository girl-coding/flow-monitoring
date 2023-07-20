import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  template: ``,
})
export class SharedChartComponent implements AfterViewInit {
  @ViewChild('chartElement', { static: false })
  chartElementRef!: ElementRef;

  protected chartOptions!: ApexCharts.ApexOptions;
  private _chart!: ApexCharts;

  ngAfterViewInit() {
    this._renderChart();
  }

  private _renderChart(): void {
    this._chart = new ApexCharts(
      this.chartElementRef?.nativeElement,
      this.chartOptions,
    );

    this._chart.render();
  }
}
