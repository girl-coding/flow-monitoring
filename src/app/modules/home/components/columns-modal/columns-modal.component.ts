import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import { ColumnsInterface } from '../../interfaces/columns.interface';

@Component({
  selector: 'app-columns-modal',
  templateUrl: './columns-modal.component.html',
  styleUrls: ['./columns-modal.component.scss'],
})
export class ColumnsModalComponent implements OnInit {
  searchText = '';
  isAllSelected!: boolean;
  updatedColumns: ColumnsInterface[];
  @Input() columns: ColumnsInterface[] = [];
  @Output() applyChanges = new EventEmitter<ColumnsInterface[]>();
  ngOnInit() {
    this.handleApply();
  }

  get filteredColumns(): ColumnsInterface[] {
    return this.updatedColumns.filter((col) =>
      col.name.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  get isSomeSelected(): boolean {
    return (
      !this.isAllSelected &&
      this.filteredColumns.some((col) => col.selected)
    );
  }

  get columnsClone(): ColumnsInterface[] {
    return this.columns.map((col) => ({ ...col }));
  }

  constructor() {
    this.columns = [
      { name: 'ID Number', selected: true },
      { name: 'Status', selected: true },
      { name: 'Total', selected: true },
      { name: 'Last Updated', selected: true },
      { name: 'Owner', selected: true },
    ];
    this.updatedColumns = this.columnsClone;
  }

  selectAllTypes(): void {
    this.updatedColumns.forEach((col) => {
      col.selected = this.isAllSelected;
    });
  }

  onCheckboxChange(): void {
    this.isAllSelected = this.filteredColumns.every(
      (col) => col.selected,
    );
  }

  handleCancel(): void {
    this.updatedColumns = this.columnsClone;
    this.searchText = '';
  }

  handleApply(): void {
    this.columns = this.updatedColumns.map((column) => ({
      ...column,
    }));

    this.applyChanges.emit(this.columns);

    this.handleCancel();
  }
}
