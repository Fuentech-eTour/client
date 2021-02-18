import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedUserRegistrationComponent } from './suggested-user-registration.component';

describe('SuggestedUserRegistrationComponent', () => {
  let component: SuggestedUserRegistrationComponent;
  let fixture: ComponentFixture<SuggestedUserRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedUserRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
