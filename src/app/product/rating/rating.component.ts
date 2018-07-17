

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() rating : number;
  @Output() ratingtoParent : EventEmitter<string> = new EventEmitter();
  rating_array : any = [];

  constructor() { }

  ngOnInit() {

    //this.rating_array = Array(Math.round(this.rating)).fill(this.rating);

    for(var i=0; i<Math.round(this.rating);i++){
      this.rating_array.push(this.rating);
    }

    console.log(this.rating_array);
  }
  sendRatingToParent(){
    this.ratingtoParent.emit('Rating value =' + this.rating);
  }
}



