import {
  AfterViewInit,
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnsInterface } from '../../interfaces/columns.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() columns: ColumnsInterface[] = [];

  get columnNames(): string[] {
    return this.columns
      ? this.columns
          .filter((col) => col.selected)
          .map((col) => col.name)
      : [];
  }

  dataSource = new MatTableDataSource<any>([]); // Empty dataSource

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnChanges(changes: SimpleChanges) {
    if ('columns' in changes) {
      // Whenever column selection changes, we reset the data source
      // As we have no data to display, it remains empty
      this.dataSource = new MatTableDataSource<any>([]);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

import { MatPaginatorIntl } from '@angular/material/paginator';

export class MatPaginatorIntlCustom extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Showing';

  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number,
  ): string => {
    return ` of ${length} results`;
  };
}
