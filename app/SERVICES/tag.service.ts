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
        this.fireService.set('test/tags/' + tag.tier + '/' + tag.name + '/parent', tag.parent.key);
    }

    public getNextTierTags(tag: TagModel) {
        let nextTier = tag.tier + 1;
        let nextTierPath = 'test/tags/' + nextTier + '/' 
        this.fireService.getArray('test/tags/', '');
    }

    // public saveNewTag(tag: TagModel) {
    //   let ref = this.firebase.child('test/tags/' + tag.tier + '/' + tag.name + '/children');
    //   tag.children.forEach(childTag => {
    //     let childTagRef = ref.child(childTag.key);
    //     childTagRef.set(true);  
    //   });
    // }


   
}