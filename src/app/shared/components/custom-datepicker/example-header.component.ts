import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { DatepickerService } from '../../datepicker.service';
import { TimeService } from '../../time.service';

/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  templateUrl: './example-header.component.html',
  styleUrls: ['./example-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeaderComponent<D> implements OnDestroy, OnInit {
  private _destroyed = new Subject<void>();

  selectedDate = new Date();
  time = '00 H 00 Min';
  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    private _cdr: ChangeDetectorRef, // Add private access specifier
    private _datepickerService: DatepickerService,
    private _timeService: TimeService,
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => {
        this._cdr.markForCheck();

        const selectedDate = this._calendar.selected;
        const dateString = selectedDate
          ? (selectedDate as any).toISOString()
          : null;
        this._datepickerService.selectedDate = dateString;
      });

    this._timeService.getTimeObservable().subscribe((time) => {
      this.time = time;
      this._cdr.detectChanges(); // Trigger change detection
    });

    this._datepickerService
      .onSelectedDateChange()
      .subscribe((date) => {
        this.selectedDate = date ? new Date(date) : new Date();
        this._cdr.detectChanges();
      });
  }

  ngOnInit(): void {
    this.selectedDate = new Date();
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
