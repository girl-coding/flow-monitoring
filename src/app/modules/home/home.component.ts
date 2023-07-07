import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  openModal = false;

  onOpenModal(): void {
    this.openModal = true;
  }

  onCloseModal(): void {
    this.openModal = false;
  }
}
