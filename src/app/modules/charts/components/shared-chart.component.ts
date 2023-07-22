import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  template: ``,
})
export class SharedChartComponent implements AfterViewInit {
  @ViewChild('chartElement', { static: false })
  chartElementRef!: ElementRef;

  @Input() chartTitle = '';
  @Input() xAxis?: ApexXAxis;
  @Input() yAxis?: ApexYAxis | ApexYAxis[];
  @Input() series?: ApexAxisChartSeries | ApexNonAxisChartSeries;
  @Input() isAnnotationsLine?: boolean;
  @Input() labels?: string[];

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
