import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitarbeiterAddComponent } from './mitarbeiter-add.component';

describe('MitarbeiterAddComponent', () => {
  let component: MitarbeiterAddComponent;
  let fixture: ComponentFixture<MitarbeiterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitarbeiterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitarbeiterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
