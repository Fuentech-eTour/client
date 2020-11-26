import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseDetailContainer } from './purchase-detail.container';

xdescribe('PurchaseDetailComponent', () => {
  let component: PurchaseDetailContainer;
  let fixture: ComponentFixture<PurchaseDetailContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseDetailContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseDetailContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
