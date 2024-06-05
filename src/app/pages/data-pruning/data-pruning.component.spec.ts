import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPruningComponent } from './data-pruning.component';

describe('DataPruningComponent', () => {
  let component: DataPruningComponent;
  let fixture: ComponentFixture<DataPruningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataPruningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataPruningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
