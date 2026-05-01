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
import { LeaveMgmtComponent } from './pages/dashboard/leave-mgmt/leave-mgmt.component';
import { HRPortalComponent } from './pages/dashboard/hr-portal/hr-portal.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { 
    path: 'emp-basic-regis', 
    component:EmpBasicDetailsComponent,
    // canActivate:[AuthGuard]
    },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'employees-detail', component:EmployeesDetailsComponent},
  {
    path: 'emp-basic-regis',
    component: EmpBasicDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employees-details',
    component: EmployeesDetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'attendance-mgmt',
    component: AttendanceMgmtComponent,
    canActivate: [AuthGuard]
  },
   {
    path: 'leave-mgmt',
    component: LeaveMgmtComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'hr-portal',
    component: HRPortalComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}