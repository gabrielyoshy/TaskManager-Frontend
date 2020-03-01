import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundeAddComponent } from './kunde-add.component';

describe('KundeAddComponent', () => {
  let component: KundeAddComponent;
  let fixture: ComponentFixture<KundeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
