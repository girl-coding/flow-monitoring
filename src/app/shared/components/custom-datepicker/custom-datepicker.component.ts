import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
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
  MatDateFormats,
  NativeDateAdapter,
} from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatepickerService } from 'src/app/shared/datepicker.service';
import { FormBuilder, FormGroup } from '@angular/forms';

//format date
// your code for the adapter here

export class AppDateAdapter extends NativeDateAdapter {
  override format(
    date: Date,
    displayFormat: string | object,
  ): string {
    if (displayFormat === 'input') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return (
        this._to2digit(day) + '/' + this._to2digit(month) + '/' + year
      );
    }
    return date.toDateString();
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  // your code for the date formats here
  parse: {
    dateInput: { month: 'short', year: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'short' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'numeric' },
    monthYearA11yLabel: { year: 'numeric', month: 'long' },
  },
};

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
export class CustomDatepickerComponent implements OnInit {
  constructor(
    private _datepickerService: DatepickerService,
    private _fb: FormBuilder,
  ) {
    this.rangeForm = this._fb.group({
      start: [new Date()],
      end: [new Date()],
    });

    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.startDate.getDate() + 1);

    this.rangeForm.patchValue({
      end: this.startDate,
      start: this.endDate,
    });
  }
  showInputs = true;

  openDatepicker(): void {
    this.showInputs = false;
  }

  formatDate(date: Date): string {
    return (
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear()
    );
  }

  rangeForm: FormGroup;
  startDate!: Date;
  endDate!: Date;

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

  single = true;
  exampleHeader = ExampleHeaderComponent;
  selectedDate: Date | null = null;

  ngOnInit(): void {
    this.selectedDate = new Date();
  }

  updateSelectedDate() {
    this._datepickerService.changeSelectedDate(this.selectedDate);
    console.log(this.selectedDate);
  }
}

/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  templateUrl: './example-header.html',
  styleUrls: ['./example-header.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeaderComponent<D> implements OnDestroy, OnInit {
  private _destroyed = new Subject<void>();

  selectedDate: Date | null = null;
  time = '00 H 00 Min';
  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
    private _datepickerService: DatepickerService,
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
  }

  ngOnInit(): void {
    this.selectedDate = new Date();

    this._datepickerService
      .onSelectedDateChange()
      .subscribe((date) => {
        this.selectedDate = date;
        console.log(this.selectedDate);
      });

    this._datepickerService
      .onSelectedTimeChange()
      .subscribe((time) => {
        this.time = time.toString();
        console.log(time, this.time);
      });
  }

  showInputs = true;

  openDatepicker(): void {
    this.showInputs = false;
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(
        this._calendar.activeDate,
        this._dateFormats.display.monthYearLabel,
      )
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(
            this._calendar.activeDate,
            -1,
          )
        : this._dateAdapter.addCalendarYears(
            this._calendar.activeDate,
            -1,
          );
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(
            this._calendar.activeDate,
            1,
          )
        : this._dateAdapter.addCalendarYears(
            this._calendar.activeDate,
            1,
          );
  }
}
