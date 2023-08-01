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

  previousState: any[] = JSON.parse(JSON.stringify(this.types));

  get filteredTypes() {
    return this.types.filter((type) =>
      type.name.toLowerCase().includes(this.searchText.toLowerCase()),
    );
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
    this.isIndeterminate = false;
  }

  updateAllComplete() {
    const selectedTypes = this.types.filter((type) => type.selected);
    this.selectAll = selectedTypes.length === this.types.length;
    this.isIndeterminate =
      selectedTypes.length > 0 && !this.selectAll;
  }

  menuClosed() {
    this.types = JSON.parse(JSON.stringify(this.previousState));

    this.searchText = '';
  }
  handleCancel() {
    this.types = JSON.parse(JSON.stringify(this.previousState));
    this.searchText = '';
  }

  handleApply() {
    this.previousState = JSON.parse(JSON.stringify(this.types));
    this.searchText = '';
  }
}
