import { MatPaginatorIntl } from '@angular/material/paginator';
export class MatPaginatorIntlCustom extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Showing';

  override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number,
  ): string => {
    if (length === 0 || pageSize === 0) {
      return `of ${length}`;
    }

    return `of ${length}`;
  };
}
