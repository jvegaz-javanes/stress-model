import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Encuesta10Component } from './encuesta10.component';

describe('Encuesta10Component', () => {
  let component: Encuesta10Component;
  let fixture: ComponentFixture<Encuesta10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Encuesta10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Encuesta10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
