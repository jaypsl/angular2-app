
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProductsService   {

  constructor(private _http : HttpClient, private _authservice : AuthService) { }

  products : any = [];

    getProducts() {
      // var token = this._authservice.checkuserstatus();
      // // return ;
      //   return this._http.get('http://localhost:3000/getproducts', 
      //   { headers : new HttpHeaders().set('authtoken', token) } );
      return this._http.get('http://localhost:3000/getProducts');

       
    }

    addproduct(data){
      // console.log("data to service" , data);
       this._http.post('http://localhost:3000/addproducts', data).subscribe(
         (data) => {
         console.log(data)
          }
        );
    }
}

