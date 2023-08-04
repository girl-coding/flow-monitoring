import {
  Component,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ColumnsInterface } from '../../interfaces/columns.interface';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges, OnDestroy {
  @Input() columns: ColumnsInterface[] = [];
  expandedElements = new Set<string | number>();
  dataSource = new MatTableDataSource<any>([]);
  private static readonly _columnsProperty = 'columns';
  private static readonly _idProperty = 'ID Number';
  private _unsubscribe$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  toggleDetails(element: any) {
    const id = element[TableComponent._idProperty];
    if (this.expandedElements.has(id)) {
      this.expandedElements.delete(id);
    } else {
      this.expandedElements.add(id);
    }
  }

  get displayColumns(): string[] {
    return ['expand', ...this.columnNames];
  }

  get columnNames(): string[] {
    return this.columns
      ? this.columns
          .filter((col) => col.selected)
          .map((col) => col.name)
      : [];
  }

  constructor(private _httpClient: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    if (TableComponent._columnsProperty in changes) {
      this.fetchData();
    }
  }
  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  async fetchData() {
    this._httpClient
      .get<any[]>('http://localhost:3000/data')
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe(
        (data) => {
          const filteredData = data.map((item) => {
            const newItem: any = {};
            for (const column of this.columns) {
              if (column.selected) {
                newItem[column.name] = item[column.name];
              }
            }
            return newItem;
          });

          this.dataSource = new MatTableDataSource<any>(filteredData);
          this.dataSource.paginator = this.paginator;
        },
        (error) => {
          console.error('Error: ' + error);
        },
      );
  }
  applyFilter(column: string, event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const val = data[column];
      return val != null && val.toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
