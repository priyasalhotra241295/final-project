import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imageObject: Array<object> = [{
    image: 'assets/img/banner/1.jpg',
    thumbImage: 'assets/img/banner/1.jpg',
    // alt: 'alt of image',
    // title: 'title of image'
}, {
  image: 'assets/img/banner/3.jpg',
  thumbImage: 'assets/img/banner/3.jpg',
}, {
  image: 'assets/img/banner/2.jpg',
  thumbImage: 'assets/img/banner/2.jpg',
}
];
  constructor() { }

  ngOnInit(): void {
  }

}
