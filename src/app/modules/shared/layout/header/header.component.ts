import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  openSearchBar = false;
  constructor(public router:Router) { }

  ngOnInit(): void {
  }
    goTo(route){
      this.router.navigate(['/'+route]);
    }
  toggleSearchBar():void {
    this.openSearchBar = this.openSearchBar ? false : true;
  }

}
