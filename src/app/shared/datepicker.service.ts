import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatepickerService {
  private _selectedDate: string | null = null;

  private _dateSubject = new Subject<string | null>();

  get selectedDate(): string | null {
    return this._selectedDate;
  }

  set selectedDate(value: string | null) {
    this._selectedDate = value;
    this._dateSubject.next(value);
  }

  onSelectedDateChange(): Observable<string | null> {
    return this._dateSubject.asObservable();
  }
  //for the formatted date in input header
  private _formattedDate: string | null = null;
  private _formattedDateSubject = new Subject<string | null>();

  get formattedDate(): string | null {
    return this._formattedDate;
  }

  set formattedDate(value: string | null) {
    this._formattedDate = value;
    this._formattedDateSubject.next(value);
  }

  onFormattedDateChange(): Observable<string | null> {
    return this._formattedDateSubject.asObservable();
  }

  //show input for date range picker

  private _isRangePickerSource = new BehaviorSubject<boolean>(false);
  isRangePicker$ = this._isRangePickerSource.asObservable();

  setRangePicker(isRangePicker: boolean) {
    this._isRangePickerSource.next(isRangePicker);
  }
  private _selectedDateRange: {
    start: string | null;
    end: string | null;
  } | null = null;
  private _dateRangeSubject = new Subject<{
    start: string | null;
    end: string | null;
  } | null>();

  get selectedDateRange(): {
    start: string | null;
    end: string | null;
  } | null {
    return this._selectedDateRange;
  }

  set selectedDateRange(
    value: { start: string | null; end: string | null } | null,
  ) {
    console.log('Setting selectedDateRange', value);
    this._selectedDateRange = value;
    this._dateRangeSubject.next(value);
  }

  onSelectedDateRangeChange(): Observable<{
    start: string | null;
    end: string | null;
  } | null> {
    return this._dateRangeSubject.asObservable();
  }
}
