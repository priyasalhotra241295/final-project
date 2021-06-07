import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  productData: any = [];
  constructor(public api: ApiService, public router:Router) {
    this.getProducts();
  }

  ngOnInit(): void {
  }
  getProducts() {
    var data = {
    }
    this.api.get('/product/list.php', data).subscribe(res => {
      console.log(res);
      if (res.data.length > 0) {
        this.productData = res.data;
      }
      if (res.status == '200') {

      }
    })
  }
  goTo(product) {
    console.log(product, "pro");
    this.router.navigate(['/detail'], {state: {data: JSON.stringify(product)}});
  }

}
