import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KundeListComponent } from './kunde-list.component';

describe('KundeListComponent', () => {
  let component: KundeListComponent;
  let fixture: ComponentFixture<KundeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KundeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KundeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
