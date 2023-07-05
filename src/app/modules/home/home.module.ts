import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { COMPONENTS_MATERIALS } from './components-materials.const';

@NgModule({
  declarations: [HomeComponent],
  imports: [HomeRoutingModule, CommonModule, COMPONENTS_MATERIALS],
})
class HomeModule {}
