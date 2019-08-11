import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNotaPage } from './add-nota.page';

describe('AddNotaPage', () => {
  let component: AddNotaPage;
  let fixture: ComponentFixture<AddNotaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNotaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
