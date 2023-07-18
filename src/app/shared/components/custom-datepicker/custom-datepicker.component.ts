import {
  ChangeDetectionStrategy,
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
export class CustomDatepickerComponent implements OnInit, OnDestroy {
  constructor(
    private _datepickerService: DatepickerService,
    private _timeService: TimeService,
    private _fb: FormBuilder,
  ) {
    this.rangeForm = this._fb.group({
      start: [moment().toDate()],
      end: [moment().toDate()],
    });

    this.startDate = moment().toDate();
    this.endDate = moment(this.startDate).add(1, 'days').toDate();

    this.rangeForm = this._fb.group({
      end: [this.startDate],
      start: [this.endDate],
    });
    this.selectedDate = new Date();
    this.pendingSelectedDate = new Date();
  }
  showInputs = true;
  // selectedDate: string | null = null;
  selectedDate: Date | null = null;
  formattedDate: string | null = null;

  originalDate: Date = new Date();

  private subscription: Subscription | null = null;
  openDatepicker(): void {
    this.showInputs = false;
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

  exampleHeader = ExampleHeaderComponent;

  ngOnInit(): void {
    this.updateFormattedDate();

    this.subscription = this._datepickerService
      .onSelectedDateChange()
      .subscribe((date: string | null) => {
        this.selectedDate = date ? new Date(date) : this.selectedDate;
        this.updateFormattedDate();
        this._datepickerService.formattedDate = this.formattedDate;
      });
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

  updateSelectedDate(event: MatDatepickerInputEvent<Date>): void {
    const selectedDate = event.value;
    // const dateString = selectedDate
    //   ? selectedDate.toISOString()
    //   : null;
    // this._datepickerService.selectedDate = dateString;

    this.pendingSelectedDate = selectedDate;

    this.updateFormattedDate();
    this._datepickerService.formattedDate = this.formattedDate;
  }

  applyDateChange(): void {
    const dateString = this.pendingSelectedDate
      ? this.pendingSelectedDate.toISOString()
      : null;
    this._datepickerService.selectedDate = dateString;
    this.selectedDate = this.pendingSelectedDate;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
