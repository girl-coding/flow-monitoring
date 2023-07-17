import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

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
}
