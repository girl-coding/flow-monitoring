import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

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

  private _isInputs: BehaviorSubject<boolean> = new BehaviorSubject(
    true,
  );
  getShowInputs(): Observable<boolean> {
    return this._isInputs.asObservable();
  }

  setShowInputs(value: boolean): void {
    this._isInputs.next(value);
  }
}
