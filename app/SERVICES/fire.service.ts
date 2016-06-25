import {Injectable} from '@angular/core';
import { Observable, Observer } from 'rxjs/rx';
import {Querybase} from './querybase';
import {TagModel} from '../export';

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

    public getArray(path: string, orderByPath?: string): Observable<any[]> {
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

    public getArrayIndexes(path: string, orderByPath?: string): Observable<any[]> {
      return Observable.create((observer) => {
        this.firebase.child(path).once('value', (snapshot) => {
          console.log(snapshot.val());
          var array = $.map(snapshot.val(), function(value, index) {
                return [index];
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

    public getNextTierTags(tag: TagModel): Observable<TagModel[]> {
      let nextTier = tag.tier + 1;
      let ref = this.firebase.child('test/tags/' + nextTier);
      //.startAt(tag.key).endAt(tag.key)
      return Observable.create(observer => {
        ref.once('value', snap => {
            var tagsOrderedByParent = FireService.convertToArray(snap.val());
            console.log(tagsOrderedByParent);
            let nextTierTags: TagModel[] = [];
            tagsOrderedByParent.forEach(nextTierTag => {
              let potentialTag: TagModel = new TagModel(); 
              potentialTag.key = Object.keys(nextTierTag)[0];
              potentialTag.tier = nextTier;
            
              let parentKeys = FireService.getFirstObjectValue(nextTierTag).parent;
              let parentKeysAsArray = FireService.convertToArrayOfKeys(parentKeys);

              parentKeysAsArray.forEach(parentKey => {
                if (parentKey == tag.key) {
                  potentialTag.parent = parentKey;
                  nextTierTags.push(potentialTag);
                }
              });
              observer.next(nextTierTags);
              console.log(nextTierTags);
            });
          });
        }
      )
    }

    public static getFirstObjectValue(object: any) : any{
       let tagKey = Object.keys(object)[0];
       let toReturn = object[tagKey];
       return  toReturn;
    }


    public push(pathToSaveDataTo: string, dataToSave: any) : string {
      let locationReference = this.firebase.child(pathToSaveDataTo);
      let newKey = locationReference.push(dataToSave, (error) => {
        if (error) 
          throw error;
      }).key();
      return  newKey;
    }

    public static convertToArrayOfKeys(objectToConvert: any): any[] {
      let array: any[] = $.map(objectToConvert, function(value, index) {
          return [index];
      });
      return array;
    }

    public static convertToArray(objectToConvert: any): any[] {
      let array: any[] = $.map(objectToConvert, function(value, index) {
        let obj = {};
        obj[index] = value;
          return [obj];
      });
      return array;
    }

    public static getDuplicates(firstArray: any[], secondArray: any[]) : any[] {
        if (!Array.isArray(firstArray) || firstArray.length == 0)
            return [];
        let duplicates: any[] = [];
        firstArray.forEach(() => {
             duplicates = secondArray.filter(secondItem => {
                return firstArray.includes(secondItem, 0)
            });
        })
        return  duplicates;
    }
}