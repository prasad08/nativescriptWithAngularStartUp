import { Component } from "@angular/core";
var Sqlite = require("nativescript-sqlite");

import { Http } from '@angular/http';

@Component({
  selector: "my-app",
  templateUrl: 'app.component.html',
})
export class AppComponent {
  private _database: any;
  public people: Array<any>;


  public constructor() {
    console.log("database service constructors");
    (new Sqlite("words.db")).then(db => {
      db.execSQL("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT)").then(id => {
        this._database = db;
      }, error => {
        console.log("CREATE TABLE ERROR", error);
      })
    }, error => {
      console.log("CREATE DB ERROR", error);
    })

  }

  public insert() {
    console.log("Acess Insert Ok");
    this._database.execSQL("INSERT INTO people (firstName, lastName) VALUES (?,?)", ["Randika", "Perera"]).then(id => {
      console.log("Insert Ok");
      this.fetch();
    }, error => {
      console.log("INSERT ERROR: ", error);
    })
  }
  public fetch() {
    console.log("Fetch data");
    this._database.all("SELECT * FROM people").then(rows => {
      this.people = [];
      for (let row in rows) {
        console.log(rows[row]);
        this.people.push({
          "id": rows[row][0],
          "firstName": rows[row][1],
          "lastName": rows[row][2]
        })
      }

    }, error => {
      console.log("SELECTOR ERROR:", error);
    });

  }


}
