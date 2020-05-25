import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterProductsComponent } from './counter-products.component';

describe('CounterProductsComponent', () => {
  let component: CounterProductsComponent;
  let fixture: ComponentFixture<CounterProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
