import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Encuesta7Component } from './encuesta7.component';

describe('Encuesta7Component', () => {
  let component: Encuesta7Component;
  let fixture: ComponentFixture<Encuesta7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Encuesta7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Encuesta7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
