import {Injectable} from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';


@Injectable()
export class FireService {
  private firebase = new Firebase('https://insourceiq-e7b11.firebaseio.com');
    
    public get(path: string): Observable<any> {
     // var toReturn:Observable<any>;// = new Observable<any>();
    //  Observable.create((observer) => {
    //    observer.onNext('test');
    //  })
      return Observable.create((observer) => {
        this.firebase.child(path).on('value', (snapshot) => {
          
          observer.next(snapshot.val())
        });
     })
      
    //   return toReturn;
    }

    public push(pathToSaveDataTo: string, dataToSave: any) {
      let locationReference = this.firebase.child(pathToSaveDataTo);
      locationReference.push(dataToSave, (error) => {
        console.log(error);
      });
      // locationReference.set(dataToSave, (error) => {
      //   console.log(error);
      // });
    }

 
}