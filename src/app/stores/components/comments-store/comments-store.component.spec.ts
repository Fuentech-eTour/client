import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsStoreComponent } from './comments-store.component';

describe('CommentsStoreComponent', () => {
  let component: CommentsStoreComponent;
  let fixture: ComponentFixture<CommentsStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
