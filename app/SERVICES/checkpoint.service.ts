import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { CheckpointModel } from '../MODELS/checkpoint.model';
import { Observable } from 'rxjs';
 
@Injectable()
export class CheckpointService {
    constructor(private fireService: FireService) {}
    
    
    
    public getAllCheckpoints(): Observable<any> {
        let checkpoints = this.fireService.get('checkpoints');
        return checkpoints as Observable<any>;
       // return this.firebaseService.get("users/" + username);
    }

    public getCheckpointsByTag(tags: any[]) {
        // tag.tier, tag.key
       let checkpointKeysToGet: string[] = [];
        tags.forEach(tag => {
            this.fireService.get('test/tags/' + tag.tier + '/' + tag.key + '/checkpoints').subscribe(checkpointKeysInTag => {
                let tagKeys:string[] = FireService.convertToArrayOfKeys(checkpointKeysInTag);
                if (checkpointKeysToGet.length == 0){
                    checkpointKeysToGet = tagKeys;
                }
                else {
                    checkpointKeysToGet = FireService.getDuplicates(checkpointKeysToGet, tagKeys);
                }
                
                console.log(checkpointKeysToGet);
            });
            
      });
    }

    

    public createCheckpoint(tags: any[], checkpoint: any) {
    //   // push checkpoint
    //   let checkpointRef = this.firebase.child('test/checkpoints');
    //   let checkpointKey = checkpointRef.push(checkpoint).key(); // might have to do separate call

    //   // Add checkpoint under each related tag
    //   tags.forEach(tag => {
    //     let tagRef = this.firebase.child('test/tags/' + tag.tier + '/' + tag.key + '/checkpoints/' + checkpointKey);
    //     tagRef.set(true)
    //   });
    }

   
}