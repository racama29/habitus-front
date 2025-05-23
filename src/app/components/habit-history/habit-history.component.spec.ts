import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitHistoryComponent } from './habit-history.component';

describe('HabitHistoryComponent', () => {
  let component: HabitHistoryComponent;
  let fixture: ComponentFixture<HabitHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
