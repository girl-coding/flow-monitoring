import { Component } from '@angular/core';
import {
  DashboardFilterModalComponent,
  FilterData,
} from './components/dashboard-filter-modal/dashboard-filter-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  openModal = false;
  filterData!: FilterData;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(
      DashboardFilterModalComponent,
      { hasBackdrop: true, disableClose: false },
    );

    dialogRef.afterClosed().subscribe((result) => {
      this.filterData = result;
    });
  }
}
