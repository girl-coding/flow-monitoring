import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
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
import { DatepickerService } from 'src/app/shared/datepicker.service';

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
  ],
})
export class CustomDatepickerComponent implements OnInit {
  constructor(private _datepickerService: DatepickerService) {}

  single = true;
  exampleHeader = ExampleHeaderComponent;
  customHeader = CustomCalendarHeaderComponent;
  showDatepicker = false;
  selectedDate: Date | null = null;

  ngOnInit(): void {
    this.selectedDate = new Date();
  }
  updateSelectedDate(): void {
    this._datepickerService.changeSelectedDate(this.selectedDate);
  }

  openDatepicker(): void {
    this.showDatepicker = true;
  }

  closeDatepicker(): void {
    this.showDatepicker = false;
  }

  applyDatepicker(): void {
    // Implement the logic for applying the selected date
    this.closeDatepicker();
  }

  cancelDatepicker(): void {
    // Implement the logic for canceling the date selection
    this.closeDatepicker();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        justify-content: center; // Or another value depending on your layout needs
        align-items: center;
      }
      .example-header {
        display: flex;
        flex-direction: column;
        padding: 0.5em;
        font-size: 15px;
        font-family: 'Helvetica Neue', sans-serif;
      }

      .example-date {
        display: flex;
        justify-content: space-between; /* Add this line */
        align-items: center;
        padding: 0.5em;
        font-size: 15px;
        font-family: 'Helvetica Neue', sans-serif;
      }
      .date_applied {
        width: 100%;
      }

      .date_applied input {
        width: 80%;
        margin-left: 20px;
        padding: 5px;
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
      <div class="example-date">
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
          mat-icon-buttons
          class="example-double-arrow"
          (click)="nextClicked('year')"
        >
          <mat-icon>keyboard_arrow_right</mat-icon>
          <mat-icon>keyboard_arrow_right</mat-icon>
        </button>
      </div>
      <div class="date_applied">
        <input
          type="text"
          [value]="selectedDate | date : 'dd/MM/yyyy'"
          readonly
        />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeaderComponent<D> implements OnDestroy, OnInit {
  private _destroyed = new Subject<void>();

  selectedDate!: Date | null;
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

    this._datepickerService
      .onSelectedDateChange()
      .subscribe((date) => {
        this.selectedDate = date;
        console.log(this.selectedDate);
      });
  }

  ngOnInit(): void {
    // this.selectedDate = new Date();
    this._datepickerService
      .onSelectedDateChange()
      .subscribe((date) => {
        this.selectedDate = date;
        console.log(this.selectedDate);
      });
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

/** Custom Calendar header component for datepicker. */

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
