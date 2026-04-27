import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { EmpBasicDetailsComponent } from './pages/emp-basic-details/emp-basic-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
<<<<<<< HEAD
  { path: 'emp-basic-regis', component:EmpBasicDetailsComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent}
=======
<<<<<<< Updated upstream
  { path: 'home', component: HomeComponent },
  { path: 'emp-basic-regis', component:EmpBasicDetailsComponent}
=======
  { path: 'emp-basic-regis', component:EmpBasicDetailsComponent,canActivate:[AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]}
>>>>>>> Stashed changes
>>>>>>> fbcfefc (API + dashboard feature changes)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}