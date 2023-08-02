import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsModalComponent } from './columns-modal.component';

describe('ColumnsModalComponent', () => {
  let component: ColumnsModalComponent;
  let fixture: ComponentFixture<ColumnsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
