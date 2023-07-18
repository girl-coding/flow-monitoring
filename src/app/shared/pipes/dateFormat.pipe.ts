import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateFormatEnum } from '../constants/app-date-formats.const';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe
  extends DatePipe
  implements PipeTransform
{
  override transform(
    value: any,
    format: DateFormatEnum = DateFormatEnum.SHORT,
  ): any {
    return super.transform(value, format);
  }
}
