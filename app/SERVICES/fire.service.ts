import {Injectable} from '@angular/core'
@Injectable()
export class FireService {
  private firebase = new Firebase('https://insourceiq-e7b11.firebaseio.com');
    
    public get(path: string): any {
      //this.firebase.set('users/levi')
      this.firebase.child('title').on('value', (snapshot) => {

       // console.log(snapshot.val());
        console.log(snapshot.val());
      });
    }

 
}