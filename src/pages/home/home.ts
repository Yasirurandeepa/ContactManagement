import {Component, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";


import {RegisterPage} from "../register/register";
import {EditUserPage} from "../edit-user/edit-user";
import {Camera, CameraOptions} from "@ionic-native/camera";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private ListUser: any;
  @ViewChild("searchBox") searchInput;
  myphotoPath: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: DatabaseProvider,
              private alertCtrl: AlertController, private actionSheetCtrl: ActionSheetController, private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  ionViewWillEnter() {
    this.GetAllUsers();
  }

  signUp() {
    this.navCtrl.push(RegisterPage);
  }

  GetAllUsers() {
    this.database.GetAllUsers().then ((data: any) => {
      console.log(data),
        this.ListUser = data;
    }, (error) => {
      console.log(error);
    });
  }

  editUser(id){
    this.navCtrl.push(EditUserPage, {
      user_id: id
    });
  }

  deleteUser(id){
    let alert = this.alertCtrl.create({
      title: 'Confirm Deletion',
      message: 'Do you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.database.DeleteUser(id).then(
              result => {
                this.GetAllUsers();
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

  getUsers(ev: any) {
    // Reset items back to all of the items
    if(this.searchInput==null){
      this.GetAllUsers();
    }
    // set val to the value of the ev target
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.ListUser = this.ListUser.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  takePhoto(id: number){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }
    this.camera.getPicture(options).then((imageData) => {
      this.myphotoPath =  imageData;
      this.database.UpdateUserImage(this.myphotoPath, id).then(
        result => {
          this.GetAllUsers();
        }, error => {
          console.log(error);
        }
      );
    }, (err) => {
      // Handle error
    });
  }

  getImage(id: number){
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    };
    this.camera.getPicture(options).then((imageData) => {
      this.myphotoPath = 'data:image/jpeg;base64,' + imageData;
      this.database.UpdateUserImage(this.myphotoPath, id).then(
        result => {
          this.GetAllUsers();
        }, error => {
          console.log(error);
        }
      );
    }, (err) => {
      // Handle error
    });
  }

  selectImage(id: number) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choose a image',
      buttons: [
        {
          text: 'From Gallery',
          // role: 'destructive',
          handler: () => {
            this.getImage(id);
          }
        },{
          text: 'From Camera',
          handler: () => {
            this.takePhoto(id);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


}
