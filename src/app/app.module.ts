import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignUpComponent } from './pages/signup/signup.component';
import { EmpBasicDetailsComponent } from './pages/emp-basic-details/emp-basic-details.component';

<<<<<<< HEAD
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
=======
<<<<<<< Updated upstream
=======
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { EmpDetailsComponent } from './pages/dashboard/emp-details/emp-details.component';
import { EditEmpDetailsComponent } from './pages/dashboard/edit-emp-details/edit-emp-details.component';
import { EmployeesDetailsComponent } from './pages/dashboard/employees-details/employees-details.component';
import { EditProfileComponent } from './pages/dashboard/edit-profile/edit-profile.component';

>>>>>>> Stashed changes
>>>>>>> fbcfefc (API + dashboard feature changes)

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    EmpBasicDetailsComponent,
<<<<<<< HEAD
    SignUpComponent,
    ForgotPasswordComponent
=======
<<<<<<< Updated upstream
    
    SignUpComponent
   
=======
    SignUpComponent,
    ForgotPasswordComponent,
    EmpDetailsComponent,
    EditEmpDetailsComponent,
    EmployeesDetailsComponent,
    EditProfileComponent,
>>>>>>> Stashed changes
    
>>>>>>> fbcfefc (API + dashboard feature changes)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
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
