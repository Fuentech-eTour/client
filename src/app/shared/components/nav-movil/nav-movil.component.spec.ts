import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMovilComponent } from './nav-movil.component';

xdescribe('NavMovilComponent', () => {
  let component: NavMovilComponent;
  let fixture: ComponentFixture<NavMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
