import { NgModule } from '@angular/core';
import { COMPONENTS } from './components/components.const';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [COMPONENTS],
  imports: [FlexLayoutModule, CommonModule, COMPONENTS_MATERIALS],
  exports: [COMPONENTS, CommonModule, FlexLayoutModule],
})
export class SharedModule {}
