import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  DateRange,
  MatCalendar,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { DatepickerService } from 'src/app/shared/datepicker.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APP_DATE_FORMATS } from '../../constants/app-date-formats.const';
import { ExampleHeaderComponent } from './example-header.component';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { TimeService } from '../../time.service';

export class AppDateAdapter extends NativeDateAdapter {
  override format(
    date: Date,
    displayFormat: string | object,
  ): string {
    if (displayFormat === 'input') {
      const formattedDate = moment(date).format('DD/MM/YYYY');
      return formattedDate;
    }
    return moment(date).format('ddd MMM DD YYYY');
  }
}

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatCalendar,
      useClass: MatCalendar,
    },
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class CustomDatepickerComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  selectedTime?: Date;
  isShowTime!: boolean;
  isDatePicker = true;
  selectedDate?: Date;
  formattedDate: string | null = null;
  rangeForm: FormGroup;
  startDate!: Date;
  endDate!: Date;
  inputValue = '';
  pendingSelectedDate?: Date;
  pendingSelectedTime = '00 H 00 Min';
  tempSelectedTime!: string;

  constructor(
    private _datepickerService: DatepickerService,
    private _timeService: TimeService,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _dateAdapter: DateAdapter<any>,
  ) {
    this.pendingSelectedDate = new Date();
    this.tempSelectedTime = this.pendingSelectedTime;

    this.startDate = moment().toDate();
    this.endDate = moment(this.startDate).add(1, 'days').toDate();

    this.rangeForm = this._fb.group({
      end: [this.startDate],
      start: [this.endDate],
    });
    this.selectedDate = new Date();
    this.pendingSelectedDate = new Date();
    this._timeService.isShowTime$.subscribe((value) => {
      this.isShowTime = value;
    });
    this.isShowTime = this._timeService.getIsShowTime();
  }

  updateStartTime(newTime: string) {
    this._timeService.updateStartTime(newTime);
  }

  updateEndTime(newTime: string) {
    this._timeService.updateEndTime(newTime);
  }

  // getInputValue(): string {
  //   let value = '';
  //   if (this.pendingSelectedDate) {
  //     value = this._dateAdapter.format(
  //       this.pendingSelectedDate,
  //       'input',
  //     );
  //   }

  //   if (this.isShowTime && this.pendingSelectedTime) {
  //     const formattedTime = this.formatTime(this.pendingSelectedTime);
  //     value = formattedTime + ' ' + value; // swap the order here
  //   }

  //   return value;
  // }

  getInputValue(): string {
    let value = '';
    if (this.pendingSelectedDate) {
      value = this._dateAdapter.format(
        this.pendingSelectedDate,
        'input',
      );
    }

    if (this.isShowTime && this.tempSelectedTime) {
      value = this.tempSelectedTime + ' ' + value; // swap the order here
    }

    return value;
  }

  // Converts time in format "HH H MM Min" to "HH:MM"
  formatTime(time: string): string {
    const parts = time.split(':');
    return parts[0] + ' H ' + parts[1] + ' Min';
  }

  private subscription: Subscription | null = null;

  openRangePicker() {
    this._datepickerService.setRangePicker(true);
    // Open range picker here
  }

  openDatePicker() {
    this._datepickerService.setRangePicker(false);
    // Open date picker here
  }
  onDateChange(event: MatDatepickerInputEvent<DateRange<Date>>) {
    if (event.value?.start && event.value.end) {
      this.rangeForm.setValue({
        start: event.value.start,
        end: event.value.end,
      });
    }
  }

  updateDateRange() {
    this.rangeForm.patchValue({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  exampleHeader = ExampleHeaderComponent;
  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.updateFormattedDate();

    const datepickerSubscription = this._datepickerService
      .onSelectedDateChange()
      .subscribe((date: string | null) => {
        this.selectedDate = date ? new Date(date) : this.selectedDate;
        this.updateFormattedDate();
        this._datepickerService.formattedDate = this.formattedDate;
      });
    this.subscriptions.push(datepickerSubscription);

    const timeSubscription = this._timeService
      .getTimeObservable()
      .subscribe((time) => {
        this.pendingSelectedTime = time;
        this.updateInputValue();
      });
    this.subscriptions.push(timeSubscription);

    const showTimeSubscription =
      this._timeService.isShowTime$.subscribe(() => {
        this.updateInputValue();
      });
    this.subscriptions.push(showTimeSubscription);
  }

  //make the input field of header  format dd//MM/YYYY
  updateFormattedDate(): void {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    this.formattedDate = this.selectedDate
      ? new Intl.DateTimeFormat('en-GB', options).format(
          this.selectedDate,
        )
      : null;
  }

  updateSelectedDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.pendingSelectedDate = event.value;
      this.inputValue = this.getInputValue();
    }
  }
  // updateSelectedTime(event: any) {
  //   this.pendingSelectedTime = this.formatTime(event.value);
  //   this.updateInputValue();
  // }
  updateSelectedTime(event: any) {
    this.tempSelectedTime = this.formatTime(event.value);

    if (this.pendingSelectedDate) {
      const timeParts = this.tempSelectedTime.split(' ');

      const hours = Number(timeParts[0]);
      const minutes = Number(timeParts[2]);

      this.pendingSelectedDate.setHours(hours, minutes, 0, 0);
    }

    this.updateTempInputValue();
  }

  updateTempInputValue(): void {
    let value = '';
    if (this.pendingSelectedDate) {
      value = this._dateAdapter.format(
        this.pendingSelectedDate,
        'input',
      );
    }

    if (this.isShowTime && this.tempSelectedTime) {
      const formattedTime = this.formatTime(this.tempSelectedTime);
      value = `${formattedTime} ${value}`; // swap the order here
    }

    this.inputValue = value;
    this._cdr.detectChanges();
  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Get the hours and minutes
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Use `padStart` method to add leading zeros if necessary
    return `${day.toString().padStart(2, '0')}/${month
      .toString()
      .padStart(2, '0')}/${year} ${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  updateInputValue(): void {
    this.inputValue = this.getInputValue();
    this._cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    const timeSubscription = this._timeService
      .getTimeObservable()
      .subscribe((time) => {
        this.pendingSelectedTime = time;
        this.updateInputValue();
      });
    this.subscriptions.push(timeSubscription);

    const showTimeSubscription =
      this._timeService.isShowTime$.subscribe(() => {
        this.updateInputValue();
      });
    this.subscriptions.push(showTimeSubscription);
    this._cdr.markForCheck();
  }
  // applyDateChange(): void {
  //   if (this.pendingSelectedDate) {
  //     // combine the selected date and the selected time
  //     const timeParts = this.pendingSelectedTime.split(' ');
  //     const hours = Number(timeParts[0]);
  //     const minutes = Number(timeParts[2]);

  //     // set the time for the selected date
  //     this.pendingSelectedDate.setHours(hours, minutes);

  //     this.selectedDate = this.pendingSelectedDate;
  //     this._timeService.time = this.pendingSelectedTime;

  //     this.updateInputValue();

  //     this._cdr.markForCheck(); // instead of detectChanges()
  //   }
  // }
  applyDateChange(): void {
    if (this.pendingSelectedDate) {
      this.selectedDate = new Date(this.pendingSelectedDate);

      const hours = this.selectedDate.getHours();
      const minutes = this.selectedDate.getMinutes();

      this._timeService.time = `${hours
        .toString()
        .padStart(2, '0')} H ${minutes
        .toString()
        .padStart(2, '0')} Min`;

      this.updateInputValue();
      this._cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
