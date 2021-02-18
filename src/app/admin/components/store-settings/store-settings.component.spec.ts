import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSettingsComponent } from './store-settings.component';

describe('StoreSettingsComponent', () => {
  let component: StoreSettingsComponent;
  let fixture: ComponentFixture<StoreSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
