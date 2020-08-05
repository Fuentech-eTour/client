import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsStoresComponent } from './tags-stores.component';

describe('TagsStoresComponent', () => {
  let component: TagsStoresComponent;
  let fixture: ComponentFixture<TagsStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
