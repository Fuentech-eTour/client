import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMovilComponent } from './product-movil.component';

describe('ProductMovilComponent', () => {
  let component: ProductMovilComponent;
  let fixture: ComponentFixture<ProductMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
