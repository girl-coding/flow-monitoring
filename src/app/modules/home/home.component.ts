import { Component } from '@angular/core';
import { DashboardFilterModalComponent } from './components/dashboard-filter-modal/dashboard-filter-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterDataInterface } from './interfaces/filter-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  openModal = false;
  filterData!: FilterDataInterface;

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
