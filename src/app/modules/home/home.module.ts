import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { DashboardFilterModalComponent } from './components/dashboard-filter-modal/dashboard-filter-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [HomeComponent, DashboardFilterModalComponent],
  imports: [
    HomeRoutingModule,
    CommonModule,
    COMPONENTS_MATERIALS,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
})
export class HomeModule {}
