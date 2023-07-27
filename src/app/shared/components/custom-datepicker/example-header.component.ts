import {
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
import { MatCalendar } from '@angular/material/datepicker';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { DatepickerService } from '../../datepicker.service';
import { TimeService } from '../../time.service';
import { DateFormatPipe } from '../../pipes/dateFormat.pipe';

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
  formattedDate!: string | null;

  selectedDate = new Date();
  time = '00 H 00 Min';
  private _subscriptions: Subscription[] = [];
  isShowTime!: boolean;
  isRangePicker = false;
  startTime!: string;
  endTime!: string;
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;

  dateFormatPipe = new DateFormatPipe();

  private _startTimeSub: Subscription | undefined;
  private _endTimeSub: Subscription | undefined;

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    private _cdr: ChangeDetectorRef, // Add private access specifier
    private _datepickerService: DatepickerService,
    private _timeService: TimeService,
    private _dateFormatPipe: DateFormatPipe,
  ) {
    this.selectedDate = new Date();

    this.formattedDate = this.dateFormatPipe.transform(
      this.selectedDate,
    );
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._cdr.markForCheck();

        const selectedDate = this._calendar.selected;
        if (selectedDate && 'start' in selectedDate) {
          const startDate = selectedDate.start
            ? (selectedDate.start as any)
            : null;
          const endDate = selectedDate.end
            ? (selectedDate.end as any)
            : null;

          this._datepickerService.selectedStartDate =
            DateFormatPipe.formatDate(new Date(startDate));

          if (endDate) {
            this._datepickerService.selectedEndDate =
              DateFormatPipe.formatDate(new Date(endDate));
          }
        } else {
          const dateString = selectedDate
            ? (selectedDate as any).toISOString()
            : null;
          this._datepickerService.selectedDate = dateString;
        }
      });

    const now = new Date();
    this.selectedStartDate = DateFormatPipe.formatDate(now);
    this.selectedEndDate = DateFormatPipe.formatDate(
      new Date(now.getTime() + 24 * 60 * 60 * 1000),
    ); // This will add 1 day to the current date

    this._datepickerService.selectedStartDate =
      this.selectedStartDate;
    this._datepickerService.selectedEndDate = this.selectedEndDate;

    this._timeService.getTimeObservable().subscribe((time) => {
      this.time = time;
      this._cdr.detectChanges();
    });

    this._datepickerService
      .onSelectedDateChange()
      .subscribe((date) => {
        this.selectedDate = date ? new Date(date) : new Date();
        this.formattedDate = this.dateFormatPipe.transform(
          this.selectedDate,
        );
        this._cdr.detectChanges();
      });

    this._timeService.getTimeObservable().subscribe((time) => {
      this.time = time;
      this.formattedDate = this.dateFormatPipe.transform(
        this.selectedDate,
      );
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
      this.selectedStartDate = date;
    });

    this._datepickerService.onEndDateChange$.subscribe((date) => {
      this.selectedEndDate = date;
    });
  }

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

  shouldShowDateRangeApplied(): boolean {
    return this.isRangePicker;
  }
  shouldShowDateApplied(): boolean {
    return !this.isRangePicker;
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
    return this._dateFormatPipe
      .transform(formattedDate)
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
