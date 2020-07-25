import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStoresComponent } from './search-stores.component';

describe('SearchStoresComponent', () => {
  let component: SearchStoresComponent;
  let fixture: ComponentFixture<SearchStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
