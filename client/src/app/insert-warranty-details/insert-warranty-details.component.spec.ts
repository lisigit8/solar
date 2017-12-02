import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertWarrantyDetailsComponent } from './insert-warranty-details.component';

describe('InsertWarrantyDetailsComponent', () => {
  let component: InsertWarrantyDetailsComponent;
  let fixture: ComponentFixture<InsertWarrantyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertWarrantyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertWarrantyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
