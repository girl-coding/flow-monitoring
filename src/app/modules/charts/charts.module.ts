import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsRoutingModule } from './charts-routing.module';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { BasicBarComponent } from './components/basic-bar/basic-bar.component';
import { LineComponent } from './components/line/line.component';
import { PolarAreaComponent } from './components/polar-area/polar-area.component';
import { SharedChartComponent } from './components/shared-chart.component';
import { RadialBarComponent } from './components/radial-bar/radial-bar.component';
import { ChartsHeaderComponent } from './components/charts-header/charts-header.component';

@NgModule({
  declarations: [
    ChartsComponent,
    BasicBarComponent,
    LineComponent,
    PolarAreaComponent,
    SharedChartComponent,
    RadialBarComponent,
    ChartsHeaderComponent,
  ],
  imports: [
    ChartsRoutingModule,
    SharedModule,
    CommonModule,
    COMPONENTS_MATERIALS,
  ],
  exports: [ChartsHeaderComponent],
})
export class ChartsModule {}
