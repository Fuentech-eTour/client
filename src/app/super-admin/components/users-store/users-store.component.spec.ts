import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersStoreComponent } from './users-store.component';

describe('UsersStoreComponent', () => {
  let component: UsersStoreComponent;
  let fixture: ComponentFixture<UsersStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
