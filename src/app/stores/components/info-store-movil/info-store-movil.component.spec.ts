import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStoreMovilComponent } from './info-store-movil.component';

describe('InfoStoreMovilComponent', () => {
  let component: InfoStoreMovilComponent;
  let fixture: ComponentFixture<InfoStoreMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStoreMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStoreMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
