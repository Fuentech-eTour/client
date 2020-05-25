import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerStoresComponent } from './banner-stores.component';

describe('BannerStoresComponent', () => {
  let component: BannerStoresComponent;
  let fixture: ComponentFixture<BannerStoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerStoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
