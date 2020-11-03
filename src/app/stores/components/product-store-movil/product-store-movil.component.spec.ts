import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStoreMovilComponent } from './product-store-movil.component';

xdescribe('ProductStoreMovilComponent', () => {
  let component: ProductStoreMovilComponent;
  let fixture: ComponentFixture<ProductStoreMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductStoreMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStoreMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
