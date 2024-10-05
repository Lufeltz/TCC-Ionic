import { TestBed } from '@angular/core/testing';

import { CanalService } from './canal.service';

describe('CanalService', () => {
  let service: CanalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
