import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { CheckpointModel } from '../MODELS/checkpoint.model';
import { Observable } from 'rxjs';
 
@Injectable()
export class CheckpointService {
    constructor(private fireService: FireService) {}
    
    public createCheckpoint(checkpoint: CheckpointModel): any {
        this.fireService.push('checkpoints', checkpoint);
    }
    
    public getAllCheckpoints(): Observable<any> {
        let checkpoints = this.fireService.get('checkpoints');
        return checkpoints as Observable<any>;
       // return this.firebaseService.get("users/" + username);
    }

   
}