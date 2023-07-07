import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-filter-modal',
  templateUrl: './dashboard-filter-modal.component.html',
  styleUrls: ['./dashboard-filter-modal.component.scss'],
})
export class DashboardFilterModalComponent {
  selectedPlatform = '';
  selectedStatus = '';
  nomDomaine = '';
  @Output() closeModalBtn = new EventEmitter();

  onClick() {
    this.closeModalBtn.emit();
  }
}
