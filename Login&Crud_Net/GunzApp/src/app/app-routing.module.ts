import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GunComponent } from './gun/gun.component';
import { GuntypeComponent } from './guntype/guntype.component';
import { GunautomaticComponent } from './gunautomatic/gunautomatic.component';
import { UserComponent } from './user/user.component';
import { SignupComponent } from './user/signup/signup.component';
import { SigninComponent } from './user/signin/signin.component';
import { AuthGuard } from './authentication/auth.guard';
import { HomeComponent } from './home/home.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
      path: 'signup', component: UserComponent,
      children: [{ path: '', component: SignupComponent }]
  },
  {
      path: 'login', component: UserComponent,
      children: [{ path: '', component: SigninComponent }]
  },
  { path : '', redirectTo: '/user', pathMatch : 'full'},
  {path: 'gun', component: GunComponent, canActivate: [AuthGuard] , data: { roles: ['Admin'] }},
  {path: 'guntype', component: GuntypeComponent, canActivate: [AuthGuard]},
  {path: 'gunautomatic', component: GunautomaticComponent, canActivate: [AuthGuard]},
  {path: 'user', component: UserComponent},
  { path: 'forbidden', component: ForbiddenComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
