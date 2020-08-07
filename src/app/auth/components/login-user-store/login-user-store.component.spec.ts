import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserStoreComponent } from './login-user-store.component';

describe('LoginUserStoreComponent', () => {
  let component: LoginUserStoreComponent;
  let fixture: ComponentFixture<LoginUserStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginUserStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUserStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
