import { TestBed, inject } from '@angular/core/testing';

import { SiteService } from './maintenance-module.service';

describe('SiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteService]
    });
  });

  it('should be created', inject([SiteService], (service: SiteService) => {
    expect(service).toBeTruthy();
  }));
});
