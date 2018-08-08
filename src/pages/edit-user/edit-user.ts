import {Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the EditUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {


  user: any;
  userID: string;
  id: number;
  firstname: string;
  lastname: string;
  identity: string;
  path: string;

  @ViewChild("firstName") fname;
  @ViewChild("lastName") lname;
  @ViewChild("identification") identification;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider, private alertCtrl: AlertController) {

    this.userID = navParams.get("user_id");
    this.selectUser(this.userID);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserPage');

  }

  selectUser(id){
    this.database.GetUser(id).then ((data: any) => {
      this.user = data;
      this.firstname = this.user[0].name;
      this.lastname = this.user[0].lastname;
      this.identity = this.user[0].identification;
      this.id = this.user[0].id;
      this.path = this.user[0].path;
    }, (error) => {
      console.log(error);
    });
  }

  updateUser(id){
      let alert = this.alertCtrl.create({
        title: 'Confirm Update',
        message: 'Do you want to update this user?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
          },
          {
            text: 'Update',
            handler: () => {
              this.database.UpdateUser(id, this.identification.value, this.fname.value, this.lname.value).then(
                result => {
                  this.navCtrl.pop();
                }, error => {
                  console.log(error);
                }
              );
            }
          }
        ]
      });
      alert.present();
  }

}
