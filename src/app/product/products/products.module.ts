import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthinterceptorService } from '../../auth/authinterceptor.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild([
      ,
    ])
  ],
  declarations: [
     
    
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true
    }
  ]
})
export class ProductsModule { }
