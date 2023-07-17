import { Component } from '@angular/core';
import * as moment from 'moment';
import { DatepickerService } from 'src/app/shared/datepicker.service';

@Component({
  selector: 'app-custom-timepicker',
  templateUrl: './custom-timepicker.component.html',
  styleUrls: ['./custom-timepicker.component.scss'],
})
export class CustomTimepickerComponent {
  selectedHours = '00 H';
  selectedMinutes = '00 Min';

  onHoursChange() {
    // Add your logic here for when the hours value changes
    console.log(this.selectedHours);
    this.updateSelectedTime();
  }

  onMinutesChange() {
    // Add your logic here for when the minutes value changes
    this.updateSelectedTime();
  }

  incrementHours() {
    const hours = moment(this.selectedHours, 'HH').add(1, 'hours');
    this.selectedHours = hours.format('HH') + ' H';
    this.onHoursChange();
  }

  decrementHours() {
    const hours = moment(this.selectedHours, 'HH').subtract(
      1,
      'hours',
    );
    this.selectedHours = hours.format('HH') + ' H';
    this.onHoursChange();
  }

  incrementMinutes() {
    const minutes = moment(this.selectedMinutes, 'mm').add(
      1,
      'minutes',
    );
    this.selectedMinutes = minutes.format('mm') + ' Min';
    this.onMinutesChange();
  }

  decrementMinutes() {
    const minutes = moment(this.selectedMinutes, 'mm')
      .subtract(1, 'minutes')
      .add(60, 'minutes');
    this.selectedMinutes = minutes.format('mm') + ' Min';
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

  constructor(private _datepickerService: DatepickerService) {}

  updateSelectedTime() {
    console.log(this.selectedHours, this.selectedMinutes);

    const hours = this.selectedHours;
    const minutes = this.selectedMinutes;
    let time = '';
    time = hours + ' ' + minutes;
    this._datepickerService.changeSelectedTime(time);
  }
}
