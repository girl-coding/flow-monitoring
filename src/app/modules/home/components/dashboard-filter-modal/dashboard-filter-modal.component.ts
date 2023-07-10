import { Component, EventEmitter, Output } from '@angular/core';

interface FilterData {
  selectedPlatform: string;
  selectedStatus: string;
  nomDomaine: string;
  nomFlux: string;
  flowUID: string;
  startDate: string;
  endDate: string;
  nomCle: string;
  valueCle: string;
}

@Component({
  selector: 'app-dashboard-filter-modal',
  templateUrl: './dashboard-filter-modal.component.html',
  styleUrls: ['./dashboard-filter-modal.component.scss'],
})
export class DashboardFilterModalComponent {
  selectedPlatform = '';
  selectedStatus = '';
  nomDomaine = '';
  nomFlux = '';
  flowUID = '';
  startDate = new Date().toLocaleString('en-UK');
  // Set endDate as startDate + 1
  endDate = new Date(
    new Date().setHours(new Date().getHours() + 1),
  ).toLocaleString('en-UK');
  nomCle = '';
  valueCle = '';
  filteredOptions: string[] = ['one', 'two', 'three', 'four'];
  @Output() closeModalBtn = new EventEmitter();
  @Output() clickOutsideModal = new EventEmitter();

  onClick(): void {
    this.closeModalBtn.emit();
  }

  onClickOutside(): void {
    this.clickOutsideModal.emit();
  }

  onSubmit(): FilterData {
    const filterData: FilterData = {
      selectedPlatform: this.selectedPlatform,
      selectedStatus: this.selectedStatus,
      nomDomaine: this.nomDomaine,
      nomFlux: this.nomFlux,
      flowUID: this.flowUID,
      startDate: this.startDate.replace(',', ''),
      endDate: this.endDate.replace(',', ''),
      nomCle: this.nomCle,
      valueCle: this.valueCle,
    };

    return filterData;
  }
}
