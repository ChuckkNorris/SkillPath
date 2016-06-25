import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { CheckpointModel, TagModel } from '../export';
import { Observable, Observer } from 'rxjs/rx';
 
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

    public saveNewTag(tag: TagModel) {
        this.fireService.set('test/tags/' + tag.tier + '/' + tag.key + '/parent/' + tag.parent.key, true);
    }

     public getNextTierTags(tag: TagModel): Observable<TagModel[]> {
        let nextTier = tag.tier + 1;
        
          return Observable.create(observer => {
              this.fireService.get('test/tags/' + nextTier).subscribe(tagsArray => {
                var tagsOrderedByParent = FireService.convertToArray(tagsArray);
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
                
                
                });
                observer.next(nextTierTags);
            });
            }
        )
    }


   
}