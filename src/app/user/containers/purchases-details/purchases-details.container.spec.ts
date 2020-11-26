import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesDetailsContainer } from './purchases-details.container';

xdescribe('PurchasesDetailsComponent', () => {
  let component: PurchasesDetailsContainer;
  let fixture: ComponentFixture<PurchasesDetailsContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasesDetailsContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasesDetailsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
