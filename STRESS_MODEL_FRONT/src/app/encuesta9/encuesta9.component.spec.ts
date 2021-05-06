import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Encuesta9Component } from './encuesta9.component';

describe('Encuesta9Component', () => {
  let component: Encuesta9Component;
  let fixture: ComponentFixture<Encuesta9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Encuesta9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Encuesta9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
