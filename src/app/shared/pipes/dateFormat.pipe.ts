import { Pipe, PipeTransform } from '@angular/core';
import { DATE_FORMAT } from '../constants/app-date-formats.const';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any): string {
    const date = new Date(value);
    return DateFormatPipe.formatDate(date);
  }

  static formatDate(value: any): string {
    const date = moment(value);
    return date.format(DATE_FORMAT);
  }
}
