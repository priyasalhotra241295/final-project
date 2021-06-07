import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListingComponent } from './modules/fish/product-listing/product-listing.component';
import { AuthGuardGuard } from './services/auth-guard.guard';
import { DetailComponent } from '././modules/fish/detail/detail.component';
import { HomeComponent } from './modules/fish/home/home.component';
const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'listing',
    component:ProductListingComponent
  },
  {
    path: 'detail',
    component:DetailComponent
  },
  {
    path:'product',
    loadChildren : () => import('./modules/fish/fish.module').then(m => m.FishModule),
    // canActivate:[AuthGuardGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
