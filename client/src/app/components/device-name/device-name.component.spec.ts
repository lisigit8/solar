import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceNameComponent } from './device-name.component';

describe('DeviceNameComponent', () => {
  let component: DeviceNameComponent;
  let fixture: ComponentFixture<DeviceNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
