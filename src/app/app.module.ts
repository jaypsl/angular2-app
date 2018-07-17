import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './auth/home/home.component';
import { NavigationComponent } from './auth/navigation/navigation.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth/auth.guard';
import { AuthinterceptorService } from './auth/authinterceptor.service';
import { AddproductComponent } from './product/addproduct/addproduct.component';
import { DetailComponent } from './product/detail/detail.component';
import { CreateComponent } from './product/create/create.component';
import { ProductsComponent } from './product/products/products.component';
import { ProductsPipe } from './product/products.pipe';
import { RatingComponent } from './product/rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavigationComponent,
    AddproductComponent,
    CreateComponent,
    DetailComponent,
    ProductsComponent,
    ProductsPipe,
    RatingComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:"products", component:ProductsComponent, canActivate:[AuthGuard],
      children : [{path:"create", component:CreateComponent }]},
      {path:"products/:pCode", component:DetailComponent},
      
      {path:"home", component:HomeComponent},
      {path:"addproducts", component:AddproductComponent},
      {path:"login", component:LoginComponent},
      {path:"", redirectTo:"home", pathMatch:"full"},
      {path:"**", redirectTo:"home"},
    ])
  ],
  providers: [ AuthService, CookieService, AuthGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi:true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }

