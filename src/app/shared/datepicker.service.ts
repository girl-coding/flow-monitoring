import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatepickerService {
  private _selectedDate: string | null = null;

  private _dateSubject = new Subject<string | null>();
  private _formattedDate: string | null = null;
  private _formattedDateSubject = new Subject<string | null>();

  private _isRangePickerSource = new BehaviorSubject<boolean>(false);
  private _selectedStartDate: string | null = null;
  private _selectedEndDate: string | null = null;
  private _startDateSubject = new BehaviorSubject<string | null>(
    null,
  );
  private _endDateSubject = new BehaviorSubject<string | null>(null);
  isRangePicker$ = this._isRangePickerSource.asObservable();
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

  setRangePicker(isRangePicker: boolean) {
    this._isRangePickerSource.next(isRangePicker);
  }

  onStartDateChange$: Observable<string | null> =
    this._startDateSubject.asObservable();
  onEndDateChange$: Observable<string | null> =
    this._endDateSubject.asObservable();

  setStartDate(value: string | null) {
    this._startDateSubject.next(value);
  }

  setEndDate(value: string | null) {
    this._endDateSubject.next(value);
  }

  get selectedStartDate(): string | null {
    return this._selectedStartDate;
  }

  set selectedStartDate(value: string | null) {
    this._selectedStartDate = value;
    this._startDateSubject.next(value);
  }

  get selectedEndDate(): string | null {
    return this._selectedEndDate;
  }

  set selectedEndDate(value: string | null) {
    this._selectedEndDate = value;
    this._endDateSubject.next(value);
  }

  onStartDateChange(): Observable<string | null> {
    return this._startDateSubject.asObservable();
  }

  onEndDateChange(): Observable<string | null> {
    return this._endDateSubject.asObservable();
  }
}
