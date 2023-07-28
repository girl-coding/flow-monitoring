import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
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
} from '@angular/material/core';
import { DatepickerService } from 'src/app/shared/datepicker.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APP_DATE_FORMATS } from '../../constants/app-date-formats.const';
import { ExampleHeaderComponent } from './example-header.component';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { TimeService } from '../../time.service';
import { DateFormatPipe } from '../../pipes/dateFormat.pipe';
import { AppDateAdapter } from './app-date-adapter';

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
export class CustomDatepickerComponent implements OnInit, OnDestroy {
  @Input() selectedTime?: Date;
  @Input() isShowTime!: boolean;
  isDatePicker = true;
  @Input() selectedDate?: Date;
  formattedDate: string | null = null;

  originalDate: Date = new Date();
  startDateDisplayValue = '';
  endDateDisplayValue = '';
  startTime = '';
  endTime = '';
  inputValue = '';
  pendingSelectedDate?: Date;

  private _subscription: Subscription | null = null;

  rangeForm: FormGroup;
  startDate!: Date;
  endDate!: Date;
  exampleHeader = ExampleHeaderComponent;
  private _subscriptions: Subscription[] = [];
  dateFormatPipe = new DateFormatPipe();

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

    this.rangeForm.controls['start'].valueChanges.subscribe(
      (value) => {
        if (value) {
          this.startDateDisplayValue =
            this.dateFormatPipe.transform(value);
          if (this.isShowTime == true) {
            this.startDateDisplayValue += ' ' + this.endTime;
          }
        }
      },
    );

    this.rangeForm.controls['end'].valueChanges.subscribe((value) => {
      if (value) {
        this.endDateDisplayValue =
          this.dateFormatPipe.transform(value);
        if (this.isShowTime == true) {
          this.endDateDisplayValue += ' ' + this.startTime;
        }
      }
    });
    this._timeService.endTime$.subscribe((time) => {
      if (time && this.isShowTime == true) {
        this.endTime = time;
        this.endDateDisplayValue =
          this.dateFormatPipe.transform(
            this.rangeForm.controls['end'].value,
          ) +
          ' ' +
          this.endTime;
      }
      if (time && this.isShowTime == false) {
        this.endTime = time;
        this.endDateDisplayValue = this.dateFormatPipe.transform(
          this.rangeForm.controls['end'].value,
        );
      }
    });

    this._timeService.startTime$.subscribe((time) => {
      if (time && this.isShowTime == true) {
        this.startTime = time;
        this.startDateDisplayValue =
          this.dateFormatPipe.transform(
            this.rangeForm.controls['start'].value,
          ) +
          ' ' +
          this.startTime;
      }
      if (time && this.isShowTime == false) {
        this.startTime = time;
        this.startDateDisplayValue = this.dateFormatPipe.transform(
          this.rangeForm.controls['start'].value,
        );
      }
    });
  }

  updateStartTime(newTime: string) {
    this._timeService.updateStartTime(newTime);
  }

  updateEndTime(newTime: string) {
    this._timeService.updateEndTime(newTime);
  }

  getInputValue(): string {
    let value = '';
    if (this.pendingSelectedDate) {
      value = this._dateAdapter.format(
        this.pendingSelectedDate,
        'input',
      );
    }

    if (this.isShowTime && this._timeService.time) {
      value = value + ' ' + this._timeService.time;
    }

    return value;
  }

  openRangePicker() {
    this._datepickerService.setRangePicker(true);
  }

  openDatePicker() {
    this._datepickerService.setRangePicker(false);
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

  ngOnInit(): void {
    const datepickerSubscription = this._datepickerService
      .onSelectedDateChange()
      .subscribe((date: string | null) => {
        this.selectedDate = date ? new Date(date) : this.selectedDate;

        this._datepickerService.formattedDate = this.formattedDate;
      });
    this._subscriptions.push(datepickerSubscription);

    const timeSubscription = this._timeService
      .getTimeObservable()
      .subscribe(() => {
        this.updateInputValue();
      });
    this._subscriptions.push(timeSubscription);

    const showTimeSubscription =
      this._timeService.isShowTime$.subscribe(() => {
        this.updateInputValue();
      });
    this._subscriptions.push(showTimeSubscription);
  }

  updateSelectedDate(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.pendingSelectedDate = event.value;
      this.inputValue = this.getInputValue();
    }
  }

  updateInputValue(): void {
    this.inputValue = this.getInputValue();

    this._cdr.detectChanges();
  }

  applyDateChange(): void {
    if (this.pendingSelectedDate) {
      this.selectedDate = this.pendingSelectedDate;

      this.updateInputValue();

      this._cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
