import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
  animations: [
    trigger('collapseAnimation', [
      state('expanded', style({ height: 'auto', opacity: '1' })),
      state('collapsed', style({ height: '0', opacity: '0' })),
      transition(
        'expanded <=> collapsed',
        animate('0.3s ease-in-out'),
      ),
    ]),
  ],
})
export class HomeHeaderComponent {
  public isChartsContainerExpanded = true;
}
