import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektAddComponent } from './projekt-add.component';

describe('ProjektAddComponent', () => {
  let component: ProjektAddComponent;
  let fixture: ComponentFixture<ProjektAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
