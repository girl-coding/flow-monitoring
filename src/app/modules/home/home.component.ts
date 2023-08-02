import { Component } from '@angular/core';
import { Types } from './interfaces/filter-data.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedTypes: Types[] = [];

  onApplyChanges(updatedTypes: Types[]) {
    // Store the updated types here. For example:
    this.selectedTypes = updatedTypes;
  }
}
