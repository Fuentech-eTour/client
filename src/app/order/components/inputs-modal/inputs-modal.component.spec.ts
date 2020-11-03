import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputsModalComponent } from './inputs-modal.component';

xdescribe('InputsModalComponent', () => {
  let component: InputsModalComponent;
  let fixture: ComponentFixture<InputsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
