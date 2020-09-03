import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderCategoryMovilComponent } from './slider-category-movil.component';

describe('SliderCategoryMovilComponent', () => {
  let component: SliderCategoryMovilComponent;
  let fixture: ComponentFixture<SliderCategoryMovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderCategoryMovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderCategoryMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
