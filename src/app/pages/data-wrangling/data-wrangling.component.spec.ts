import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWranglingComponent } from './data-wrangling.component';

describe('DataWranglingComponent', () => {
  let component: DataWranglingComponent;
  let fixture: ComponentFixture<DataWranglingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataWranglingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataWranglingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
