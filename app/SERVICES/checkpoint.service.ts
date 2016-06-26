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

    public getCheckpointsByTags(tags: any[]) {
       let checkpointKeysToGet: string[] = [];
        tags.forEach(tag => {
            this.fireService.get('tags/' + tag.tier + '/' + tag.key + '/checkpoints').subscribe(checkpointKeysInTag => {
                let tagKeys:string[] = FireService.convertToArrayOfKeys(checkpointKeysInTag);
                if (checkpointKeysToGet.length == 0)
                    checkpointKeysToGet = tagKeys;
                else 
                    checkpointKeysToGet = FireService.getDuplicates(checkpointKeysToGet, tagKeys);
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