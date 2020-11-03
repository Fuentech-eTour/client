import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerGifsComponent } from './banner-gifs.component';

xdescribe('BannerGifsComponent', () => {
  let component: BannerGifsComponent;
  let fixture: ComponentFixture<BannerGifsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerGifsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerGifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
