import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { CheckpointModel, TagModel } from '../export';
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

    public createTag(tag: TagModel) {
        if (tag.parent)
            this.fireService.set('test/tags/' + tag.tier + '/' + tag.key + '/parent/' + tag.parent.key, true);
        else 
            this.fireService.set('test/tags/' + tag.tier + '/' + tag.key + '/parent/', false);
        
    }

    public getNextTierTags(tag: TagModel) {
        let nextTier = tag.tier + 1;
        let nextTierPath = 'test/tags/' + nextTier + '/' 
        this.fireService.getArray('test/tags/', '');
    }

    public saveNewTag(tag: TagModel) {
        this.fireService.set('test/tags/' + tag.tier + '/' + tag.key + '/parent/' + tag.parent.key, true);
    }


   
}