import { MatDateFormats } from '@angular/material/core';

export const APP_DATE_FORMATS: MatDateFormats = {
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

export enum DateFormatEnum {
  SHORT = 'dd/MM/yyyy',
  MEDIUM = 'MMMM yyyy',
  LONG = 'EEEE, MMMM d, yyyy',
}
