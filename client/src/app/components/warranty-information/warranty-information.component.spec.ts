import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarrantyInformationComponent } from './warranty-information.component';

describe('WarrantyInformationComponent', () => {
  let component: WarrantyInformationComponent;
  let fixture: ComponentFixture<WarrantyInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarrantyInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarrantyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
