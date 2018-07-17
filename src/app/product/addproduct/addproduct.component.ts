import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css'],
  providers : [ProductsService]
})
export class AddproductComponent implements OnInit {

  constructor(private _productService: ProductsService) { }
  product : any={}; 
  ngOnInit() {
  }

  add(){
    console.log(this.product);
  this._productService.addproduct(this.product);
    
  }
}
