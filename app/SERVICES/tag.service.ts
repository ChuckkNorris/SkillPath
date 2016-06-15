import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { CheckpointModel } from '../MODELS/checkpoint.model';
import { Observable } from 'rxjs';
 
@Injectable()
export class TagService {
    constructor(private fireService: FireService) {}
    
    addTagToTier(tier: number, tagName: string) {
        // TODO: check if exists
        this.fireService.push('tags/'+ tier, tagName);
    }

    getTagsAtTier(tier: number): Observable<string[]> {
        return this.fireService.getArray('tags/' + tier);
    }

   
}