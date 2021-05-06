import { TestBed } from '@angular/core/testing';

import { Encuesta11Service } from './encuesta11.service';

describe('Encuesta11Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Encuesta11Service = TestBed.get(Encuesta11Service);
    expect(service).toBeTruthy();
  });
});
