import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components/components.const';
import { COMPONENTS_MATERIALS } from './components-materials.const';

@NgModule({
  declarations: [COMPONENTS],
  exports: [COMPONENTS, COMPONENTS_MATERIALS],
  imports: [CommonModule, COMPONENTS_MATERIALS],
})
export class SharedModule {}
