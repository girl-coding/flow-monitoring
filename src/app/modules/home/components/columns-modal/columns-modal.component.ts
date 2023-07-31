import { Component } from '@angular/core';

@Component({
  selector: 'app-columns-modal',
  templateUrl: './columns-modal.component.html',
  styleUrls: ['./columns-modal.component.scss'],
})
export class ColumnsModalComponent {
  searchText = '';
  selectAll = false;
  isIndeterminate = false;

  types: any[] = [
    { name: 'Type1', selected: false },
    { name: 'Type2', selected: false },
    { name: 'Type3', selected: false },
    { name: 'Type4', selected: false },
    { name: 'Type5', selected: false },
    { name: 'Type6', selected: false },
  ];

  previousState: any[] = JSON.parse(JSON.stringify(this.types)); // Deep copy of the initial state

  get filteredTypes() {
    const filtered = this.searchText
      ? this.types.filter((type) =>
          type.name
            .toLowerCase()
            .includes(this.searchText.toLowerCase()),
        )
      : this.types;

    return filtered;
  }

  onInputFocus() {
    const placeholder = document.querySelector('.custom-placeholder');
    placeholder?.classList.add('active');
  }

  onInputBlur() {
    if (!this.searchText) {
      const placeholder = document.querySelector(
        '.custom-placeholder',
      );
      placeholder?.classList.remove('active');
    }
  }

  selectAllTypes() {
    this.types.forEach((type) => (type.selected = this.selectAll));
    this.isIndeterminate = false; // if all checkboxes are selected, indeterminate state should be false
  }
  updateAllComplete() {
    const selectedTypes = this.types.filter((type) => type.selected);
    this.selectAll = selectedTypes.length === this.types.length; // all checkboxes are selected
    this.isIndeterminate =
      selectedTypes.length > 0 && !this.selectAll; // not all checkboxes are selected
  }
  handleCancel() {
    this.types = JSON.parse(JSON.stringify(this.previousState)); // Restore to previous state
    this.searchText = '';
  }

  handleApply() {
    this.previousState = JSON.parse(JSON.stringify(this.types)); // Save the current state
    this.searchText = '';
  }
}
