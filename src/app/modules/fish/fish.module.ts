import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FishRoutingModule } from './fish-routing.module';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { DetailComponent } from './detail/detail.component';

import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ProductListingComponent,DetailComponent],
  imports: [
    CommonModule,
    FishRoutingModule,
    SharedModule
  ]
})
export class FishModule { }
