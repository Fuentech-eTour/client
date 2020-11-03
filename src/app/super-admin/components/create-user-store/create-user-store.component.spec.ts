import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserStoreComponent } from './create-user-store.component';

xdescribe('CreateUserStoreComponent', () => {
  let component: CreateUserStoreComponent;
  let fixture: ComponentFixture<CreateUserStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateUserStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
