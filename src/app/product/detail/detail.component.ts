import { Component, OnInit, Testability } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private _activatedRoute : ActivatedRoute, private _router : Router, private _productsService : ProductsService ) { }

  paramdata : any =[];
  pdata : any = [];
  product : any = '';

  ngOnInit() {
    this._activatedRoute.params.subscribe((data) => {
       console.log("param data",data);
      this.paramdata = data;
    })

    this._productsService.getProducts().subscribe((data)=>{
      this.pdata = data;
      // console.log(data);
      console.log("product list data" , this.pdata)
      this.find(this.pdata);
      // console.log(this.find(this.pdata));
      //console.log(this.product);
    })
  }

  find(pdata){
    for(let i of pdata){
      if(i.productCode == this.paramdata.pCode){
        console.log("selected val" , i);
       return this.product = i;
      }
    }

  }
  backtolist(){
    this._router.navigate(['/products']);
  }

}
