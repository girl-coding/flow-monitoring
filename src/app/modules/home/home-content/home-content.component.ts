import { Component } from '@angular/core';
import { ColumnsInterface } from '../interfaces/columns.interface';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.scss'],
})
export class HomeContentComponent {
  selectedColumns?: ColumnsInterface[];

  onApplyChanges(updatedColumns: ColumnsInterface[]): void {
    this.selectedColumns = updatedColumns;
  }
}
