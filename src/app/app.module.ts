import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {RegisterPage} from "../pages/register/register";
import { DatabaseProvider } from '../providers/database/database';
import {HttpModule} from "@angular/http";
import {HttpClient, HttpClientModule} from "@angular/common/http";

import {EditUserPage} from "../pages/edit-user/edit-user";
import {Camera} from "@ionic-native/camera";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    EditUserPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    EditUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    Camera,
  ]
})
export class AppModule {}
