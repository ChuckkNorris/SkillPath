import {Injectable} from '@angular/core';
import { Observable, Observer } from 'rxjs/rx';
import {Querybase} from './querybase';


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

    public testRun() {
    //  this.createCheckpoint();
      this.getCheckpoints();
    }

    private getCheckpoints() {
      let ref = this.firebase.child('test/checkpoints');
      // example Checkpoint = {name: "Building an app", tags: {{tier: "1", "name": "apps"}, {tier: "2", "name": "angular2"}}}
      ref.orderByChild('tags/1').equalTo("web").once('value', snap => console.log(snap.val()));
      
      // let querybase = new Querybase(ref, ['tags']);
      // let queryRef = querybase.where({tags:{"1": "apps", "2":"angular2"}});
      //  queryRef.on('value', snap => console.log(snap));

     // ref.orderByChild("tags").equalTo({tag: 'web'}).once("value", snapshot => console.log(snapshot.val()));

    }

    private getCheckpointss(tags: any[]) {
      // tag.tier, tag.key

      tags.forEach(tag => {
        let ref = this.firebase.child('test/tags/' + tag.tier + '/' + tag.key + '/checkpoints');
        ref.once('value', snap => {
          
        })
      })
    }

    private createCheckpoint(tags: any[], checkpoint: any) {
      // push checkpoint
      let checkpointRef = this.firebase.child('test/checkpoints');
      let checkpointKey = checkpointRef.push(checkpoint).key(); // might have to do separate call

      // Add checkpoint under each tag
      tags.forEach(tag => {
        let tagRef = this.firebase.child('test/tags/' + tag.tier + '/' + tag.key + '/checkpoints/' + checkpointKey);
        tagRef.set(true)
      });
    }

    allTags = [
      {"abc": true, "def": true, "hij": true},
      {"abc": true, "def": true}
    ];

    tags: [
      { "0": [
        {"software-development": {name: "Software Development", checkpoints: [ {"abc": true}, {"def": true}, {"hij": true}]}}
      ]},
      {"1": [
        {"web": {name: "Web", checkpoints: [ {"abc": true}, {"def": true}]}},
        {"android": {name: "Android", checkpoints: [{"hij": true}]}}  
      ]}
    ];

    checkpoints: [
      {"abc": { name: "Angular2 Quick Start"}},
      {"def": { name: "Building global directives in Angular2"}},
      {"hij": { name: "Android Quick Start"}},
    ];

    

 
}