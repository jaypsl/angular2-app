
import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers : [ProductsService]
})

export class ProductsComponent implements OnInit {

  pageTitle: string = "product list";
  products : any = [];
  addedProducts:any =[];
  filterBy : string;

  showHideImg : boolean = true;

  constructor(private _productService : ProductsService) { }

  ngOnInit() {
    // console.log('hey ');
    this._productService.getProducts().subscribe((data)=> {
    this.products = data;
    console.log(data);
    
  });
    
  }


  toggleImage(){
    this.showHideImg = !this.showHideImg;
    }

  ratingFnParent(data:string){
    console.log("data to parent from rating",data);
    this.pageTitle = data;
  }
}

