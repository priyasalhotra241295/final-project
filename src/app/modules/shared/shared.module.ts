import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HeaderComponent } from './layout/header/header.component';
// import { FooterComponent } from './layout/footer/footer.component';
import { LeftSideMenusComponent } from './layout/left-side-menus/left-side-menus.component';
import { LayoutWrapperComponent } from './layout/layout-wrapper/layout-wrapper.component';
import { RouterModule } from '@angular/router';


// HeaderComponent, FooterComponent,
@NgModule({
  declarations: [ LeftSideMenusComponent, LayoutWrapperComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
