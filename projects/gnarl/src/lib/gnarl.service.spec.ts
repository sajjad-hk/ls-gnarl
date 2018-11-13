import { TestBed } from '@angular/core/testing';

import { GnarlService } from './gnarl.service';

describe('GnarlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GnarlService = TestBed.get(GnarlService);
    expect(service).toBeTruthy();
  });
});
