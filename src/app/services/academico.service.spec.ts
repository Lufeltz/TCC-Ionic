import { TestBed } from '@angular/core/testing';

import { AcademicoService } from './academico.service';

describe('AcademicoService', () => {
  let service: AcademicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
