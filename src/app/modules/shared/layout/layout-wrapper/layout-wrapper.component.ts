import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-layout-wrapper',
  templateUrl: './layout-wrapper.component.html',
  styleUrls: ['./layout-wrapper.component.css']
})
export class LayoutWrapperComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

  openCheckOutModal() {
    console.log('hiii')
    $('.cartbtnlink').show();
  }

}
