import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsProductsComponent } from './tags-products.component';

xdescribe('TagsProductsComponent', () => {
  let component: TagsProductsComponent;
  let fixture: ComponentFixture<TagsProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
