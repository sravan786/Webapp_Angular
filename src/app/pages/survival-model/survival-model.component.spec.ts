import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurvivalModelComponent } from './survival-model.component';

describe('SurvivalModelComponent', () => {
  let component: SurvivalModelComponent;
  let fixture: ComponentFixture<SurvivalModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurvivalModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurvivalModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
