import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { COMPONENTS_MATERIALS } from './components-materials.const';
import { DashboardFilterModalComponent } from './components/dashboard-filter-modal/dashboard-filter-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeHeaderComponent } from './home-header/home-header.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from '../charts/charts.module';
import { TableComponent } from './components/table/table.component';
import { ColumnsModalComponent } from './components/columns-modal/columns-modal.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCustom } from './components/table/mat-paginator-intl-custom';

@NgModule({
  declarations: [
    HomeComponent,
    HomeHeaderComponent,
    HomeContentComponent,
    DashboardFilterModalComponent,
    TableComponent,
    ColumnsModalComponent,
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    CommonModule,
    COMPONENTS_MATERIALS,
    ChartsModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCustom },
  ],
})
export class HomeModule {}
