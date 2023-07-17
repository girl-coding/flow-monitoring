import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatepickerService {
  private _selectedDateSource = new Subject<Date | null>();
  selectedDate$ = this._selectedDateSource.asObservable();

  private _selectedTimeSource = new Subject<string>();

  changeSelectedDate(date: Date | any) {
    this._selectedDateSource.next(date);
  }

  onSelectedDateChange() {
    return this._selectedDateSource.asObservable();
  }

  changeSelectedTime(time: any) {
    // Add your logic here for when the time value changes
    this._selectedTimeSource.next(time);
  }

  onSelectedTimeChange() {
    return this._selectedTimeSource.asObservable();
  }
}
