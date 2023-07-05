import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { COMPONENTS_MATERIALS } from './component.const';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    COMPONENTS_MATERIALS,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
