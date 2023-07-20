import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsRoutingModule } from './charts-routing.module';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { BasicBarComponent } from './basic-bar/basic-bar.component';

@NgModule({
  declarations: [ChartsComponent, BasicBarComponent],
  imports: [
    ChartsRoutingModule,
    SharedModule,
    CommonModule,
    COMPONENTS_MATERIALS,
  ],
  exports: [BasicBarComponent],
})
export class ChartsModule {}
