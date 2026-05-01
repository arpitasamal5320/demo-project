import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './pages/signup/signup.component';
import { EmpBasicDetailsComponent } from './pages/emp-basic-details/emp-basic-details.component';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { EmployeesDetailsComponent } from './pages/dashboard/employees-details/employees-details.component';
import { EditProfileComponent } from './pages/dashboard/edit-profile/edit-profile.component';
import { AttendanceMgmtComponent } from './pages/dashboard/attendance-mgmt/attendance-mgmt.component';
import { HeaderComponent } from './pages/ui/header/header.component';
import { SidebarComponent } from './pages/ui/sidebar/sidebar.component';
import { LeaveMgmtComponent } from './pages/dashboard/leave-mgmt/leave-mgmt.component';
import { NotificationComponent } from './pages/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    EmpBasicDetailsComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    EmployeesDetailsComponent,
    EditProfileComponent,
    AttendanceMgmtComponent,
    HeaderComponent,
    SidebarComponent,
    LeaveMgmtComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule, 
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
