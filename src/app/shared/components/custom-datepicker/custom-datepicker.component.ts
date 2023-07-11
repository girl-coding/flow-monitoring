import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-custom-datepicker',
  templateUrl: './custom-datepicker.component.html',
  styleUrls: ['./custom-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDatepickerComponent {
  single = true;
  exampleHeader = ExampleHeaderComponent;
  customHeader = CustomCalendarHeaderComponent;

  showDatepicker = false;

  openDatepicker(): void {
    this.showDatepicker = true;
  }

  closeDatepicker(): void {
    this.showDatepicker = false;
  }

  applyDatepicker(): void {
    // Implement the logic for applying the selected date range
    this.closeDatepicker();
  }

  cancelDatepicker(): void {
    // Implement the logic for canceling the date selection
    this.closeDatepicker();
  }
}

/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  styles: [
    `
      .example-header {
        display: flex;
        align-items: center;
        padding: 0.5em;
        font-size: 15px;
        font-family: 'Helvetica Neue', sans-serif;
      }

      .example-header-label {
        flex: 1;
        height: 1em;
        font-weight: 500;
        text-align: center;
      }

      .example-single-arrow {
        box-shadow: none;
      }

      .example-double-arrow {
        background: transparent;
        box-shadow: none;
        height: fit-content;
      }

      .example-double-arrow .mat-icon {
        border: none;
        margin: -32%;
        margin-left: -10px;
        background-color: transparent;
      }
    `,
  ],
  template: `
    <div class="example-header">
      <button
        mat-icon-button
        class="example-double-arrow"
        (click)="previousClicked('year')"
      >
        <mat-icon>keyboard_arrow_left</mat-icon>
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <button
        mat-icon-button
        class="example-single-arrow"
        (click)="previousClicked('month')"
      >
        <mat-icon>keyboard_arrow_left</mat-icon>
      </button>
      <span class="example-header-label">{{
        periodLabel | date : 'MMMM yyyy'
      }}</span>

      <button
        class="example-single-arrow"
        mat-icon-button
        (click)="nextClicked('month')"
      >
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
      <button
        mat-icon-button
        class="example-double-arrow"
        (click)="nextClicked('year')"
      >
        <mat-icon>keyboard_arrow_right</mat-icon>
        <mat-icon>keyboard_arrow_right</mat-icon>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeaderComponent<D> implements OnDestroy {
  private _destroyed = new Subject<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    _calendar.stateChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => cdr.markForCheck());
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

@Component({
  selector: 'app-custom-calendar-header',
  template: `
    <div class="calendar-header">
      <button mat-icon-button (click)="cancelDatepicker()">
        <mat-icon>cancel</mat-icon>
      </button>
      <span class="calendar-title">{{ periodLabel }}</span>
      <button
        mat-raised-button
        color="primary"
        (click)="applyDatepicker()"
      >
        Apply
      </button>
    </div>
  `,
  styles: [
    `
      .calendar-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px;
        background-color: #f5f5f5;
      }

      .calendar-title {
        font-weight: bold;
      }
    `,
  ],
})
export class CustomCalendarHeaderComponent<D> {
  @Output() apply: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
  ) {}

  get periodLabel(): string {
    return this._dateAdapter
      .format(
        this._calendar.activeDate,
        this._dateFormats.display.monthYearLabel,
      )
      .toLocaleUpperCase();
  }

  applyDatepicker(): void {
    this.apply.emit();
  }

  cancelDatepicker(): void {
    this.cancel.emit();
  }
}
