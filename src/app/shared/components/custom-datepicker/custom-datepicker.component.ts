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
  selectedTime: Date | null = null;
  isShowTime!: boolean;
  isDatePicker = true;

  constructor(
    private _datepickerService: DatepickerService,
    private _timeService: TimeService,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _dateAdapter: DateAdapter<any>,
  ) {
    this.pendingSelectedDate = new Date();

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

  inputValue = '';

  // Call this function whenever time or pendingSelectedDate changes

  getInputValue(): string {
    let value = '';
    if (this.pendingSelectedDate) {
      value = this._dateAdapter.format(
        this.pendingSelectedDate,
        'input',
      );
    }

    if (this.isShowTime && this._timeService.time) {
      const formattedTime = this.formatTime(this._timeService.time);
      value = formattedTime + ' ' + value; // swap the order here
    }

    return value;
  }

  // Converts time in format "HH H MM Min" to "HH:MM"
  formatTime(time: string): string {
    const parts = time.split(' ');
    return parts[0] + ':' + parts[2];
  }

  // selectedDate: string | null = null;
  selectedDate: Date | null = null;
  formattedDate: string | null = null;

  originalDate: Date = new Date();

  private subscription: Subscription | null = null;

  rangeForm: FormGroup;
  startDate!: Date;
  endDate!: Date;

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
      .subscribe(() => {
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
  pendingSelectedDate: Date | null = null;

  // updateSelectedDate(event: MatDatepickerInputEvent<Date>): void {
  //   const selectedDate = event.value;
  //   this.pendingSelectedDate = selectedDate;

  //   this.updateFormattedDate();
  //   this._datepickerService.formattedDate = this.formattedDate;
  //   this.inputValue = this.getInputValue();
  //   this._cdr.markForCheck();
  // }
  updateSelectedDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.pendingSelectedDate = event.value;
      this.inputValue = this.getInputValue();
    }
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
      .subscribe(() => {
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
  applyDateChange(): void {
    if (this.pendingSelectedDate) {
      // combine the selected date and the selected time
      const timeParts = this._timeService.time.split(' ');
      const hours = Number(timeParts[0]);
      const minutes = Number(timeParts[2]);

      // set the time for the selected date
      this.pendingSelectedDate.setHours(hours, minutes);

      // convert the date with time to ISO string

      this.selectedDate = this.pendingSelectedDate;

      this.updateInputValue();

      this._cdr.markForCheck(); // instead of detectChanges()
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
