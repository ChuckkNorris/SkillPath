import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { CheckpointModel, TagModel } from '../export';
import { Observable, Observer } from 'rxjs/rx';
 
@Injectable()
export class TagService {
    constructor(private fireService: FireService) {}

    getTagsAtTier(tier: number): Observable<string[]> {
        return this.fireService.getArray('tags/' + tier);
    }

    public createTag(tag: TagModel) {
        let tagPath = 'tags/' + tag.tier + '/' + tag.key;
        this.fireService.exists(tagPath).subscribe(tagExists => {
            if (!tagExists) {
                let tagToSave = tag.toFirebaseObject();
                this.fireService.set(tagPath, tagToSave).subscribe(() => {
                    if (tag.parent)
                        this.fireService.set(tagPath + '/parents/' + tag.parent.key, true).subscribe();
                });
            }
            else if (tag.parent)
                this.fireService.set(tagPath + '/parents/' + tag.parent.key, true);
        });
    }

     public getNextTierTags(tag: TagModel): Observable<TagModel[]> {
        let nextTier = tag.tier + 1;
        
          return Observable.create(observer => {
              this.fireService.get('tags/' + nextTier).subscribe(tagsArray => {
                var tagsOrderedByParent = FireService.convertToArray(tagsArray);
                console.log(tagsOrderedByParent);
                let nextTierTags: TagModel[] = [];
                tagsOrderedByParent.forEach(nextTierTag => {
                    let potentialTag: TagModel = new TagModel(); 
                    potentialTag.key = Object.keys(nextTierTag)[0];
                    potentialTag.tier = nextTier;
                    
                    let parentKeys = FireService.getFirstObjectValue(nextTierTag).parents;
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