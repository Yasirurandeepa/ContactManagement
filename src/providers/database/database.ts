import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;

  constructor(public http: HttpClient, public storage: SQLite) {
    if(!this.isOpen){
      this.storage = new SQLite();
      this.storage.create({name: "data.db", location: "default"}).then((db:SQLiteObject) => {
        this.db = db;
        db.executeSql('CREATE TABLE IF NOT EXISTS contact(id INTEGER PRIMARY KEY, identification INTEGER, name TEXT, lastname TEXT, path TEXT)', [])
          .then(() => console.log("Executed"));
        this.isOpen = true;
        }).catch((error) => {
        console.log(error);
      })
    }
  }

  CreateUser(idenfication: String, name: String, lastname: String, imagePath: String){
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO contact (identification, name, lastname, path) VALUES (?, ?, ?, ?)";
      this.db.executeSql(sql, [idenfication, name, lastname, imagePath]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  DeleteUser(Id: number){
    return new Promise((resolve, reject) => {
      let sql = "DELETE FROM contact WHERE id = ?";
      this.db.executeSql(sql, [Id]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  UpdateUserImage(path: string, id: number){
    return new Promise((resolve, reject) => {
      let sql = "UPDATE contact SET path=? WHERE id=?";
      this.db.executeSql(sql, [path, id]).then((data) => {
        console.log(data);
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  UpdateUser(Id: number, identification: number, firstname: string, lastname: string){
    return new Promise((resolve, reject) => {
      let sql = "UPDATE contact SET identification=?, name=?, lastname=? WHERE id=?";
      this.db.executeSql(sql, [identification, firstname, lastname, Id]).then((data) => {
        console.log(data);
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  GetUser(Id: number){
    return new Promise((resolve, reject) => {
      let sql = "SELECT * from contact WHERE id = ?";
      this.db.executeSql(sql, [Id]).then((data) => {
        let arrayUsers = [];
        arrayUsers.push({
          id: data.rows.item(0).id,
          identification: data.rows.item(0).identification,
          name: data.rows.item(0).name,
          lastname: data.rows.item(0).lastname,
          path: data.rows.item(0).path
        });
        resolve(arrayUsers);
      }, (error) => {
        reject(error);
      })
  })
  }

  GetAllUsers(){
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM contact", []).then((data) => {
        let arrayUsers = [];
        if(data.rows.length>0){
          for(var i=0; i<data.rows.length; i++){
            arrayUsers.push({
              id: data.rows.item(i).id,
              identification: data.rows.item(i).identification,
              name: data.rows.item(i).name,
              lastname: data.rows.item(i).lastname,
              path: data.rows.item(i).path
            });
          }
        }
        resolve(arrayUsers);
       }, (error) => {
          reject(error);
      })
    })
  }


}
