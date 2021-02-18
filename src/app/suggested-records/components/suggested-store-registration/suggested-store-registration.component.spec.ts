import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedStoreRegistrationComponent } from './suggested-store-registration.component';

describe('SuggestedStoreRegistrationComponent', () => {
  let component: SuggestedStoreRegistrationComponent;
  let fixture: ComponentFixture<SuggestedStoreRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedStoreRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedStoreRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
