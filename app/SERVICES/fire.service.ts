import {Injectable} from '@angular/core';
import { Observable, Observer } from 'rxjs/rx';


@Injectable()
export class FireService {
  private firebase = new Firebase('https://insourceiq-e7b11.firebaseio.com');
    
    public get(path: string): Observable<any> {
      return Observable.create((observer) => {
        this.firebase.child(path).on('value', (snapshot) => {
          
          observer.next(snapshot.val());
        });
     })
    }

    public getArray(path: string): Observable<any[]> {
      return Observable.create((observer) => {
        this.firebase.child(path).once('value', (snapshot) => {
          console.log(snapshot.val());
          var array = $.map(snapshot.val(), function(value, index) {
                return [value];
            });
            
          observer.next(array);
        });
     })
    }

    public set(pathToSaveDataTo: string, dataToSave: any) {
       let locationReference = this.firebase.child(pathToSaveDataTo);
       locationReference.once("value", snapshot => {
         if (snapshot.exists()) {
           // TODO: throw exception with Enums.Exception.Exists argument
           console.log('That location already exists');
         }
         else {
            locationReference.set(dataToSave, (error) => {
              if (error) 
                throw error;
            });
         }
       });
         
    }

    public push(pathToSaveDataTo: string, dataToSave: any) {
      let locationReference = this.firebase.child(pathToSaveDataTo);
      locationReference.push(dataToSave, (error) => {
        if (error) 
          throw error;
      });
      // locationReference.set(dataToSave, (error) => {
      //   console.log(error);
      // });
    }

    

 
}