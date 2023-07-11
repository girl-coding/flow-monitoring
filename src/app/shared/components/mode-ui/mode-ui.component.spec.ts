import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeUiComponent } from './mode-ui.component';

describe('ModeUiComponent', () => {
  let component: ModeUiComponent;
  let fixture: ComponentFixture<ModeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
