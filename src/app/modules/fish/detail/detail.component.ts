import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
data:any='';
  constructor(public router:Router) {
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.data = state.data ? JSON.parse(state.data) : '';
    }
   }

  ngOnInit(): void {
  }

}
