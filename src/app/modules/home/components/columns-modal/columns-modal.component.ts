import {
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { ColumnsInterface } from '../../interfaces/columns.interface';

@Component({
  selector: 'app-columns-modal',
  templateUrl: './columns-modal.component.html',
  styleUrls: ['./columns-modal.component.scss'],
})
export class ColumnsModalComponent {
  searchText = '';
  isAllSelected!: boolean;
  updatedColumns: ColumnsInterface[];
  @Input() columns: ColumnsInterface[] = [];
  @Output() applyChanges = new EventEmitter<ColumnsInterface[]>();

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
      { name: 'ID Number', selected: false },
      { name: 'Status', selected: false },
      { name: 'Total', selected: false },
      { name: 'Last Updated', selected: false },
      { name: 'Owner', selected: false },
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
