import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSideMenusComponent } from './left-side-menus.component';

describe('LeftSideMenusComponent', () => {
  let component: LeftSideMenusComponent;
  let fixture: ComponentFixture<LeftSideMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSideMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSideMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
