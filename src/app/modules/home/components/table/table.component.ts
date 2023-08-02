import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../../interfaces/filter-data.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'status',
    'total',
    'date',
    'owner',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(elementData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

const elementData: PeriodicElement[] = [
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
  {
    position: 'KFC',
    status: 'Blocked',
    total: 1.0079,
    date: '02/08/2023',
    owner: 'Tara',
  },
];
