import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatepickerService {
  private _selectedDateSource = new Subject<Date | null>();
  selectedDate$ = this._selectedDateSource.asObservable();

  changeSelectedDate(date: Date | any) {
    this._selectedDateSource.next(date);
  }

  onSelectedDateChange() {
    return this._selectedDateSource.asObservable();
  }
}
