import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
  NativeDateAdapter,
} from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatepickerService } from 'src/app/shared/datepicker.service';
import { FormControl, FormGroup } from '@angular/forms';

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
  constructor(private _datepickerService: DatepickerService) {
    this.rangeForm = new FormGroup({
      dateRange: new FormControl(),
    });
    this.startDate = new Date();
    this.endDate = new Date(this.startDate);
    this.endDate.setDate(this.startDate.getDate() + 1);
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

  toggleDatepickers() {
    // Code to toggle the visibility of the datepickers
  }

  updateDateRange() {
    const startFormatted = this.startDate.toISOString().split('T')[0];
    const endFormatted = this.endDate.toISOString().split('T')[0];
    this.rangeForm.patchValue({
      dateRange: `${startFormatted} - ${endFormatted}`,
    });
  }

  single = true;
  exampleHeader = ExampleHeaderComponent;
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
}

/** Custom header component for datepicker. */
@Component({
  selector: 'example-header',
  styles: [
    `
      /* :host {
        display: flex;
        flex-direction: row;
        justify-content: start; // Or another value depending on your layout needs
        align-items: center;
      } */
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
        display: flex;
        justify-content: space-between;
        gap: 15px;
        padding: 0 10px;
      }

      .date_applied input {
        width: 80%;

        padding: 5px;
      }

      .date_applied input:first-child {
        flex: 2;
      }

      .date_applied input:nth-child(2) {
        flex: 1;
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
        <input type="text" [(ngModel)]="selectedDate" readonly />
        <input *ngIf="true" type="text" readonly [(ngModel)]="time" />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeaderComponent<D> implements OnDestroy, OnInit {
  private _destroyed = new Subject<void>();

  selectedDate!: Date | null;
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
    // this.selectedDate = new Date();
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
