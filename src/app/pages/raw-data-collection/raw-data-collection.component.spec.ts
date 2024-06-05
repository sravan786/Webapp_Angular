import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataCollectionComponent } from './raw-data-collection.component';

describe('RawDataCollectionComponent', () => {
  let component: RawDataCollectionComponent;
  let fixture: ComponentFixture<RawDataCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RawDataCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawDataCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
