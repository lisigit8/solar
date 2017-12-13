import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertWarrantyInfoComponent } from './insert-warranty-info.component';

describe('InsertWarrantyInfoComponent', () => {
  let component: InsertWarrantyInfoComponent;
  let fixture: ComponentFixture<InsertWarrantyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertWarrantyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertWarrantyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
