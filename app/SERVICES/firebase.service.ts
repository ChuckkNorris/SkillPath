import { Injectable } from '@angular/core';

//const FIREBASE_DB_URL: string = "https://insourceiq-e7b11.firebaseio.com/";


export class FirebaseService {
   // private firebase: Firebase;
    
    constructor() {
      //  this.firebase = new Firebase(FIREBASE_DB_URL);
    }
    
    public get(path: string): any {
        // this.firebase.child(path).on("value", (snapshot) => {
        //     return snapshot.val();
        // }, (error) => console.log(error));
    }
    
    public set(objectToSave: any) {
      // this.firebase.set(objectToSave, (error) => console.log(error));
    }
}


  