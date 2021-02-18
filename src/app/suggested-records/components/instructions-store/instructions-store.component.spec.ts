import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionsStoreComponent } from './instructions-store.component';

describe('InstructionsStoreComponent', () => {
  let component: InstructionsStoreComponent;
  let fixture: ComponentFixture<InstructionsStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionsStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
