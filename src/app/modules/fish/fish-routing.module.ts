import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { LayoutWrapperComponent } from '../shared/layout/layout-wrapper/layout-wrapper.component';
// import { DetailComponent } from './detail/detail.component';
const routes: Routes = [

  {
    path:'',
    component: LayoutWrapperComponent,
      children: [
        { path: 'products', component: ProductListingComponent},
        // { path: 'detail', component: DetailComponent}
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FishRoutingModule { }
