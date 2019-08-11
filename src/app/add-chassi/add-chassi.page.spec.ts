import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChassiPage } from './add-chassi.page';

describe('AddChassiPage', () => {
  let component: AddChassiPage;
  let fixture: ComponentFixture<AddChassiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChassiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChassiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
