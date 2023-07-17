import { Component } from '@angular/core';
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
    let hours = parseInt(this.selectedHours, 10);
    hours = (hours % 24) + 1;
    this.selectedHours = hours.toString().padStart(2, '0') + ' H';
    this.onHoursChange();
  }

  decrementHours() {
    let hours = parseInt(this.selectedHours, 10);
    hours = ((hours - 2 + 24) % 24) + 1;
    this.selectedHours = hours.toString().padStart(2, '0') + ' H';
    this.onHoursChange();
  }

  incrementMinutes() {
    let minutes = parseInt(this.selectedMinutes, 10);
    minutes = (minutes + 1) % 60;
    this.selectedMinutes =
      minutes.toString().padStart(2, '0') + ' Min';
    this.onMinutesChange();
  }

  decrementMinutes() {
    let minutes = parseInt(this.selectedMinutes, 10);
    minutes = (minutes - 1 + 60) % 60;
    this.selectedMinutes =
      minutes.toString().padStart(2, '0') + ' Min';
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
