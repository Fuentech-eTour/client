import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssingCategoryComponent } from './assing-category.component';

describe('AssingCategoryComponent', () => {
  let component: AssingCategoryComponent;
  let fixture: ComponentFixture<AssingCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssingCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
