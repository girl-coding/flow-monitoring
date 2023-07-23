import { Component, Output } from '@angular/core';
import * as moment from 'moment';
import { debounceTime } from 'rxjs/operators';

import { TimeService } from '../../time.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-custom-timepicker',
  templateUrl: './custom-timepicker.component.html',
  styleUrls: ['./custom-timepicker.component.scss'],
})
export class CustomTimepickerComponent {
  selectedHours = '00 H';
  selectedMinutes = '00 Min';

  // @Output() timeChange = new EventEmitter<string>();
  private _timeChangeSubject = new Subject<string>();
  @Output() timeChange = this._timeChangeSubject.pipe(
    debounceTime(50),
  );

  onHoursChange() {
    this.updateSelectedTime();
  }

  onMinutesChange() {
    this.updateSelectedTime();
  }

  incrementHours() {
    const hours = moment(this.selectedHours, 'HH').add(1, 'hours');
    this.selectedHours = hours.format('HH [H]');
    this.updateSelectedTime();
  }

  decrementHours() {
    const hours = moment(this.selectedHours, 'HH').subtract(
      1,
      'hours',
    );
    this.selectedHours = hours.format('HH [H]');
    this.updateSelectedTime();
  }

  incrementMinutes() {
    const minutes = moment(this.selectedMinutes, 'mm').add(
      1,
      'minutes',
    );
    this.selectedMinutes = minutes.format('mm [Min]');
    this.onMinutesChange();
  }

  decrementMinutes() {
    const minutes = moment(this.selectedMinutes, 'mm')
      .subtract(1, 'minutes')
      .add(60, 'minutes');
    this.selectedMinutes = minutes.format('mm [Min]');
    this.onMinutesChange();
  }

  formatHourInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  formatMinuteInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }

  constructor(private _timeService: TimeService) {}

  updateSelectedTime() {
    const hours = this.selectedHours;
    const minutes = this.selectedMinutes;

    const time = `${hours} ${minutes}`;
    this._timeService.time = time;
    this._timeChangeSubject.next(time);
  }
}
