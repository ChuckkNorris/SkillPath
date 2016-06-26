import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { CheckpointModel } from '../MODELS/checkpoint.model';
import { Observable } from 'rxjs/rx';
 
@Injectable()
export class CheckpointService {
    constructor(private fireService: FireService) {}
    
    
    
    public getAllCheckpoints(): Observable<any> {
        let checkpoints = this.fireService.get('checkpoints');
        return checkpoints as Observable<any>;
       // return this.firebaseService.get("users/" + username);
    }

    public getCheckpointsByTags(tags: any[]): Observable<CheckpointModel[]> {
        return Observable.create(observer => {
            let checkpointKeysToGet: string[] = [];
            for (var i = 0; i < tags.length; i++) {
                var tag = tags[i];
                if (tag) {
                    this.fireService.get('tags/' + tag.tier + '/' + tag.key + '/checkpoints').subscribe(checkpointKeysInTag => {
                        let tagKeys:string[] = FireService.convertToArrayOfKeys(checkpointKeysInTag);
                        if (checkpointKeysToGet.length == 0)
                            checkpointKeysToGet = tagKeys;
                        else 
                            checkpointKeysToGet = FireService.getDuplicates(checkpointKeysToGet, tagKeys);
                        if (i == tags.length-1){
                            let toReturn: CheckpointModel[] = [];
                            for (var keyIndex = 0; keyIndex < checkpointKeysToGet.length; keyIndex++) {
                                var checkpointKey = checkpointKeysToGet[keyIndex];
                                this.getCheckpoint(checkpointKey).subscribe(checkpointToAdd => {
                                    toReturn.push(checkpointToAdd);
                                    console.log(checkpointToAdd);
                                    if (keyIndex == checkpointKeysToGet.length - 1)
                                        observer.next(toReturn);
                                });

                                
                                
                            }
                        }
                    });
                }
            }
           
        })

    }

    public getCheckpoint(checkpointKey:string): Observable<CheckpointModel>{
        return Observable.create(observer => {
            let toReturn: CheckpointModel = new CheckpointModel;
            let checkPointPath = this.fireService.get('checkpoints/' + checkpointKey).subscribe(checkpoint => {
                toReturn.key = checkpointKey;
                toReturn.name = checkpoint.name;
                observer.next(toReturn);
            });
        });
        
    }

    public createCheckpoint(tags: any[], checkpoint: CheckpointModel) {
        let checkpointKey = this.fireService.push('checkpoints', checkpoint);
        // Add checkpoint under each related tag
        tags.forEach(tag => {
            this.fireService.set('tags/' + tag.tier + '/' + tag.key + '/checkpoints/' + checkpointKey, true).subscribe();
        });
    }

   
}