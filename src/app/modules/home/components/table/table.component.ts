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
import { MatPaginatorIntl } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';

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

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private httpClient: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('columns' in changes) {
      // Fetch data from JSON server when columns change
      this.httpClient
        .get<any[]>('http://localhost:3000/data')
        .subscribe(
          (data) => {
            // Filter data based on selected columns
            const filteredData = data.map((item) => {
              const newItem: any = {};
              for (const column of this.columns) {
                if (column.selected) {
                  newItem[column.name] = item[column.name];
                }
              }
              return newItem;
            });

            this.dataSource = new MatTableDataSource<any>(
              filteredData,
            );
          },
          (error) => {
            console.error('Error: ' + error);
          },
        );
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

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
