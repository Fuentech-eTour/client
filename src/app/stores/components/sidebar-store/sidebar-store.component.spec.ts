import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarStoreComponent } from './sidebar-store.component';

xdescribe('SidebarStoreComponent', () => {
  let component: SidebarStoreComponent;
  let fixture: ComponentFixture<SidebarStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
