import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitBoardComponent } from './habit-board.component';

describe('HabitBoardComponent', () => {
  let component: HabitBoardComponent;
  let fixture: ComponentFixture<HabitBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabitBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
