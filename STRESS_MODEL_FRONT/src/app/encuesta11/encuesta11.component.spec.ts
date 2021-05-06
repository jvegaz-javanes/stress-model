import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Encuesta11Component } from './encuesta11.component';

describe('Encuesta11Component', () => {
  let component: Encuesta11Component;
  let fixture: ComponentFixture<Encuesta11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Encuesta11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Encuesta11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
