import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pied3Component } from './pied3.component';

describe('Pied3Component', () => {
  let component: Pied3Component;
  let fixture: ComponentFixture<Pied3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pied3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pied3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
