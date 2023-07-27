import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any): string {
    const date = new Date(value);
    return DateFormatPipe.formatDate(date);
  }

  static formatDate(date: Date): string {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const monthName = monthNames[monthIndex];

    return `${monthName} ${day}, ${year}`;
  }
}
