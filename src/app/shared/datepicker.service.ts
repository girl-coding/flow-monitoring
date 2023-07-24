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

  private _selectedStartDate: string | null = null;
  private _selectedEndDate: string | null = null;
  private _startDateSubject = new BehaviorSubject<string | null>(
    null,
  );
  private _endDateSubject = new BehaviorSubject<string | null>(null);

  // Directly use Observables for change detection
  onStartDateChange$: Observable<string | null> =
    this._startDateSubject.asObservable();
  onEndDateChange$: Observable<string | null> =
    this._endDateSubject.asObservable();

  // Removed getters and setters as they are no longer needed

  // Methods to set new values
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
