import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { EmpBasicDetailsComponent } from './pages/emp-basic-details/emp-basic-details.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { EmployeesDetailsComponent } from './pages/dashboard/employees-details/employees-details.component';
import { EditProfileComponent } from './pages/dashboard/edit-profile/edit-profile.component';
import { AttendanceMgmtComponent } from './pages/dashboard/attendance-mgmt/attendance-mgmt.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'emp-basic-regis', component:EmpBasicDetailsComponent,canActivate:[AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'employees-detail', component:EmployeesDetailsComponent},
  {
    path: 'emp-basic-regis',
    component: EmpBasicDetailsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
<<<<<<< HEAD
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'employees-details',
    component: EmployeesDetailsComponent
    
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent
   
  },
  {
    path: 'attendance-mgmt',
    component: AttendanceMgmtComponent
    
=======
  {
    path: 'employees-details',
    component: EmployeesDetailsComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'attendance-mgmt',
    component: AttendanceMgmtComponent,
    // canActivate: [AuthGuard]
>>>>>>> origin/main
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}