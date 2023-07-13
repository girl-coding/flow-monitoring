import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { DashboardFilterModalComponent } from './components/dashboard-filter-modal/dashboard-filter-modal.component';

@NgModule({
  declarations: [HomeComponent, DashboardFilterModalComponent],
  imports: [HomeRoutingModule, CommonModule, COMPONENTS_MATERIALS],
})
export class HomeModule {}
