import { Component, Output, EventEmitter } from '@angular/core';
import { Types } from '../../interfaces/filter-data.interface';

@Component({
  selector: 'app-columns-modal',
  templateUrl: './columns-modal.component.html',
  styleUrls: ['./columns-modal.component.scss'],
})
export class ColumnsModalComponent {
  searchText = '';
  selectAll = false;
  isIndeterminate = false;

  @Output() applyChanges = new EventEmitter<Types[]>();

  readonly types: Types[] = [
    { name: 'Type1', selected: false },
    { name: 'Type2', selected: false },
    { name: 'Type3', selected: false },
    { name: 'Type4', selected: false },
    { name: 'Type5', selected: false },
    { name: 'Type6', selected: false },
    { name: 'Type1', selected: false },
    { name: 'Type2', selected: false },
    { name: 'Type3', selected: false },
    { name: 'Type4', selected: false },
    { name: 'Type5', selected: false },
    { name: 'Type6', selected: false },
    { name: 'Type1', selected: false },
    { name: 'Type2', selected: false },
    { name: 'Type3', selected: false },
    { name: 'Type4', selected: false },
    { name: 'Type5', selected: false },
    { name: 'Type6', selected: false },
  ];

  previousState: Types[] = this.types.map((type) => ({ ...type }));

  get filteredTypes() {
    return this.previousState.filter((type) =>
      type.name.toLowerCase().includes(this.searchText.toLowerCase()),
    );
  }

  selectAllTypes() {
    this.previousState = this.previousState.map((type) => ({
      ...type,
      selected: this.selectAll,
    }));
    this.isIndeterminate = false;
  }

  updateAllComplete() {
    const selectedTypes = this.filteredTypes.filter(
      (type) => type.selected,
    );
    this.selectAll =
      selectedTypes.length === this.filteredTypes.length;
    this.isIndeterminate =
      selectedTypes.length > 0 && !this.selectAll;
  }

  handleCancel() {
    this.previousState = this.types.map((type) => ({ ...type }));

    this.searchText = '';
  }

  handleApply() {
    this.applyChanges.emit(this.previousState);
    this.types.forEach((type, index) => {
      type.selected = this.previousState[index].selected;
    });

    this.searchText = '';
  }
}
