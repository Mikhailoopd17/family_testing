import { TestBed } from '@angular/core/testing';

import { TestentryService } from './testentry.service';

describe('TestentryService', () => {
  let service: TestentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
