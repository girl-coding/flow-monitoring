import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeService {
  private _isShowTimeSubject = new BehaviorSubject<boolean>(false);
  public isShowTime$ = this._isShowTimeSubject.asObservable();
  isShowTime = true;

  setIsShowTime(value: boolean) {
    this._isShowTimeSubject.next(value);
  }

  getIsShowTime(): boolean {
    return this.isShowTime;
  }

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
