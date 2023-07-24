import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';
import { DateRange, MatCalendar } from '@angular/material/datepicker';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DatepickerService } from '../../datepicker.service';
import { TimeService } from '../../time.service';
import { DateFormatPipe } from '../../pipes/dateFormat.pipe';
import { DateFormatEnum } from '../../constants/app-date-formats.const';

/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  templateUrl: './example-header.component.html',
  styleUrls: ['./example-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeaderComponent<D> implements OnInit, OnDestroy {
  @ViewChild(MatCalendar, { static: false }) calendar!: MatCalendar<
    Date | string
  >;

  private _destroyed = new Subject<void>();
  formattedDate: string | null;

  selectedDate = new Date();
  time = '00 H 00 Min';
  private _subscriptions: Subscription[] = [];
  isShowTime!: boolean;
  isRangePicker = false;
  startTime!: string;
  endTime!: string;
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    private _cdr: ChangeDetectorRef, // Add private access specifier
    private _datepickerService: DatepickerService,
    private _timeService: TimeService,
    private _dateFormatPipe: DateFormatPipe,
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._cdr.markForCheck();

        const selectedDate = this._calendar.selected;
        if (selectedDate && 'start' in selectedDate) {
          console.log(selectedDate.start);
          console.log(selectedDate.end);
          const startDate = selectedDate.start
            ? (selectedDate.start as any).toISOString()
            : null;
          const endDate = selectedDate.end
            ? (selectedDate.end as any).toISOString()
            : null;
          this._datepickerService.selectedStartDate = startDate;

          this._datepickerService.selectedEndDate = endDate;
        } else {
          const dateString = selectedDate
            ? (selectedDate as any).toISOString()
            : null;
          this._datepickerService.selectedDate = dateString;
        }
      });

    this._timeService.getTimeObservable().subscribe((time) => {
      this.time = time;
      this._cdr.detectChanges(); // Trigger time change detection
    });

    this._datepickerService
      .onSelectedDateChange()
      .subscribe((date) => {
        this.selectedDate = date ? new Date(date) : new Date();
        this._cdr.detectChanges();
      });
    this.formattedDate = this.formatDate(new Date());

    this._datepickerService
      .onFormattedDateChange()
      .subscribe((formattedDate) => {
        this.formattedDate = formattedDate;
        this._cdr.detectChanges();
      });
    this._timeService.isShowTime$.subscribe((value) => {
      this.isShowTime = value;
    });
    this.isShowTime = this._timeService.getIsShowTime();

    this._datepickerService.isRangePicker$.subscribe(
      (isRangePicker) => {
        this.isRangePicker = isRangePicker;
      },
    );

    this._timeService.startTime$.subscribe((time) => {
      this.startTime = time;
      this._cdr.markForCheck();
    });

    this._timeService.endTime$.subscribe((time) => {
      this.endTime = time;
      this._cdr.markForCheck();
    });

    this._datepickerService.onStartDateChange$.subscribe((date) => {
      console.log('Start Date:', date);

      this.selectedStartDate = date;
    });

    this._datepickerService.onEndDateChange$.subscribe((date) => {
      console.log('End Date:', date);

      this.selectedEndDate = date;
    });
  }

  private _startTimeSub: Subscription | undefined;
  private _endTimeSub: Subscription | undefined;

  ngOnInit() {
    this._startTimeSub = this._timeService.startTime$.subscribe(
      (time) => {
        this.startTime = time;
        this._cdr.markForCheck();
      },
    );

    this._endTimeSub = this._timeService.endTime$.subscribe(
      (time) => {
        this.endTime = time;
        this._cdr.markForCheck();
      },
    );
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    Promise.resolve().then(() => {
      if (this.calendar) {
        console.log('guyhjk');

        this.calendar.stateChanges
          .pipe(takeUntil(this._destroyed))
          .subscribe(() => {
            const selectedDates = this.calendar.selected;

            if (selectedDates instanceof DateRange<Date>) {
              const dateRange = selectedDates as DateRange<Date>;

              if (dateRange.start && dateRange.end) {
                this.selectedStartDate = (
                  dateRange.start as Date
                ).toISOString();
                this.selectedEndDate = (
                  dateRange.end as Date
                ).toISOString();

                console.log(
                  'selectedStartDate:',
                  this.selectedStartDate,
                );
                console.log('selectedEndDate:', this.selectedEndDate);

                const dateString = `${this.selectedStartDate} - ${this.selectedEndDate}`;
                this._datepickerService.selectedDate = dateString;
              }
            }
          });
      }
    });
  }

  shouldShowDateRangeApplied(): boolean {
    return this.isRangePicker;
  }
  shouldShowDateApplied(): boolean {
    return !this.isRangePicker;
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this._startTimeSub?.unsubscribe();
    this._endTimeSub?.unsubscribe();
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

  get periodLabel() {
    const formattedDate = this._dateAdapter.format(
      this._calendar.activeDate,
      this._dateFormats.display.monthYearLabel,
    );
    // Use the DateFormatPipe to format the date string
    return this._dateFormatPipe
      .transform(formattedDate, DateFormatEnum.MEDIUM)
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
