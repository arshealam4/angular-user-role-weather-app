import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { WeathersComponent } from './weathers/weathers.component';
import { NavigationComponent } from './navigation/navigation.component';

import { UsersService } from './_services/user.service';
import { RolesService } from './_services/role.service';
import { WeatherService } from './_services/weather.service';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    RolesComponent,
    WeathersComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UsersService,
    RolesService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
