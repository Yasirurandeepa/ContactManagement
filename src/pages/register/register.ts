import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";

import {HomePage} from "../home/home";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider) {
  }

  @ViewChild("firstName") firstname;
  @ViewChild("lastName") lastname;
  @ViewChild("identification") identification;

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  CreateUser(){
    this.database.CreateUser(this.identification.value, this.firstname.value, this.lastname.value, "assets/img/blank-avatar.jpg").then ((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });
    this.navCtrl.pop();
  }

}
