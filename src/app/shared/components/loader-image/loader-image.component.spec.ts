import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderImageComponent } from './loader-image.component';

describe('LoaderImageComponent', () => {
  let component: LoaderImageComponent;
  let fixture: ComponentFixture<LoaderImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
