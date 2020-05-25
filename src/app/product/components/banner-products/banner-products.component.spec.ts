import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerProductsComponent } from './banner-products.component';

describe('BannerProductsComponent', () => {
  let component: BannerProductsComponent;
  let fixture: ComponentFixture<BannerProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
