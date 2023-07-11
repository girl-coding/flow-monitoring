import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components/components.const';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [COMPONENTS],
  exports: [
    CommonModule,
    COMPONENTS,
    COMPONENTS_MATERIALS,
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    COMPONENTS_MATERIALS,
  ],
})
export class SharedModule {}
