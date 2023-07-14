import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { FilterDataInterface } from '../../interfaces/filter-data.interface';

@Component({
  selector: 'app-dashboard-filter-modal',
  templateUrl: './dashboard-filter-modal.component.html',
  styleUrls: ['./dashboard-filter-modal.component.scss'],
})
export class DashboardFilterModalComponent {
  formGroup!: FormGroup;

  filteredOptions: string[] = ['one', 'two', 'three', 'four'];

  constructor(
    public dialogRef: MatDialogRef<DashboardFilterModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FilterDataInterface,
  ) {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      selectedPlatform: new FormControl(''),
      selectedStatus: new FormControl(''),
      domaineName: new FormControl(''),
      flowName: new FormControl(''),
      flowUID: new FormControl(''),
      startDate: new FormControl(new Date().toLocaleString('en-UK')),
      endDate: new FormControl(
        new Date(
          new Date().setHours(new Date().getHours() + 1),
        ).toLocaleString('en-UK'),
      ),
      keyName: new FormControl(''),
      keyValue: new FormControl(''),
    });
  }

  onClickOutside(): void {
    this.dialogRef.close();
  }

  onSubmit(): Partial<FilterDataInterface> {
    return this.formGroup.value;
  }
}
