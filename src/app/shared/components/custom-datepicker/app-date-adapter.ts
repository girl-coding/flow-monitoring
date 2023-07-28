import { NativeDateAdapter } from '@angular/material/core';
import { DateFormatPipe } from '../../pipes/dateFormat.pipe';
import * as moment from 'moment';

export class AppDateAdapter extends NativeDateAdapter {
  override format(
    date: Date,
    displayFormat: string | object,
  ): string {
    if (displayFormat === 'input') {
      return DateFormatPipe.formatDate(date);
    }
    return moment(date).format('ddd MMM DD YYYY');
  }
}
