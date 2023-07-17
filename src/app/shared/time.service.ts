import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private _time = '00 H 00 Min';
  private _timeSubject: Subject<string> = new Subject<string>();

  get time(): string {
    return this._time;
  }

  set time(value: string) {
    this._time = value;
    this._timeSubject.next(value);
  }

  getTimeObservable(): Observable<string> {
    return this._timeSubject.asObservable();
  }
}
