import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserStoreComponent } from './edit-user-store.component';

describe('EditUserStoreComponent', () => {
  let component: EditUserStoreComponent;
  let fixture: ComponentFixture<EditUserStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
