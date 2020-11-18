import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './authentication/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';


const routes: Routes = [
  // {path: '', redirectTo: '/user/login', pathMatch: 'full'},
  {path: '', redirectTo: '/orders', pathMatch: 'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data : {permittedRoles: ['Admin']}},
  {path: '', redirectTo: 'order', pathMatch: 'full'},
  {path: 'orders', component: OrdersComponent},
  {path: 'order', children: [
    {path: '', component: OrderComponent},
    {path: 'edit/:id', component: OrderComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
