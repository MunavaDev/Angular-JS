import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/*install angular forms module so we can use forms to pass data*/
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
/*refereance angulars built in http protocals handler for making http requests*/
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/*refereance angulars built in browser animations for making html pages live requests*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*install angular toastr module for bootstrap themed alerts*/
import { ToastrModule } from 'ngx-toastr';
/*install angular material module dialog module*/
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './Services/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './authentication/auth.interceptor';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderitemsComponent } from './orders/orderitems/orderitems.component';
import { OrderService } from './Services/order.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    ForbiddenComponent,
    OrdersComponent,
    OrderComponent,
    OrderitemsComponent
  ],
  imports: [BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
