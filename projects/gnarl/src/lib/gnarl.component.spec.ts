import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GnarlComponent } from './gnarl.component';

describe('GnarlComponent', () => {
  let component: GnarlComponent;
  let fixture: ComponentFixture<GnarlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GnarlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GnarlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
