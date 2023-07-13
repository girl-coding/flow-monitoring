import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

export interface FilterData {
  selectedPlatform: string | null;
  selectedStatus: string | null;
  nomDomaine: string | null;
  nomFlux: string | null;
  flowUID: string | null;
  startDate: string | null;
  endDate: string | null;
  nomCle: string | null;
  valueCle: string | null;
}

@Component({
  selector: 'app-dashboard-filter-modal',
  templateUrl: './dashboard-filter-modal.component.html',
  styleUrls: ['./dashboard-filter-modal.component.scss'],
})
export class DashboardFilterModalComponent {
  formGroup = new FormGroup({
    selectedPlatform: new FormControl(''),
    selectedStatus: new FormControl(''),
    nomDomaine: new FormControl(''),
    nomFlux: new FormControl(''),
    flowUID: new FormControl(''),
    startDate: new FormControl(new Date().toLocaleString('en-UK')),
    endDate: new FormControl(
      new Date(
        new Date().setHours(new Date().getHours() + 1),
      ).toLocaleString('en-UK'),
    ),
    nomCle: new FormControl(''),
    valueCle: new FormControl(''),
  });

  filteredOptions: string[] = ['one', 'two', 'three', 'four'];

  constructor(
    public dialogRef: MatDialogRef<DashboardFilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterData,
  ) {}

  onClickOutside(): void {
    this.dialogRef.close();
  }

  onSubmit(): Partial<FilterData> {
    return this.formGroup.value;
  }
}
