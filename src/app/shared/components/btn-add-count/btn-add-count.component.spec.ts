import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddCountComponent } from './btn-add-count.component';

xdescribe('BtnAddCountComponent', () => {
  let component: BtnAddCountComponent;
  let fixture: ComponentFixture<BtnAddCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnAddCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnAddCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
