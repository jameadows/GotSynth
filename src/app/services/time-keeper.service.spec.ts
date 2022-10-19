import { TestBed } from '@angular/core/testing';

import { TimeKeeperService } from './time-keeper.service';

describe('TimeKeeperService', () => {
  let service: TimeKeeperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeKeeperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
