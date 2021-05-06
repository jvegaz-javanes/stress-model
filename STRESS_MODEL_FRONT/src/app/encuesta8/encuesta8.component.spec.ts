import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Encuesta8Component } from './encuesta8.component';

describe('Encuesta8Component', () => {
  let component: Encuesta8Component;
  let fixture: ComponentFixture<Encuesta8Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Encuesta8Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Encuesta8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
