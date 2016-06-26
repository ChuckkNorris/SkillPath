import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { CheckpointModel, TagModel } from '../export';
import { Observable, Observer } from 'rxjs/rx';
 
@Injectable()
export class TagService {
    constructor(private fireService: FireService) {}

   

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

    getTagsAtTier(tier: number): Observable<TagModel[]> {
        return Observable.create(observe => {
            this.fireService.get('tags/' + tier).subscribe(tagObjects => {
                let toReturn = this.getTagsFromObjects(tagObjects, tier);
                observe.next(toReturn);
            })
        });
    }

    public getNextTierTags(parentTag: TagModel): Observable<TagModel[]> {
        let nextTier = parentTag.tier + 1;
          return Observable.create(observer => {
              this.fireService.get('tags/' + nextTier).subscribe(tagsArray => {
                observer.next(this.getTagsFromObjects(tagsArray, nextTier, parentTag.key));
            });
            }
        )
    }

    private getTagsFromObjects(tagObjects: any, tier: number, parentTagKey?: string): TagModel[] {
        
        var allTags = FireService.convertToArray(tagObjects);
        console.log(allTags);
        let tagsToReturn: TagModel[] = [];
        allTags.forEach(tag => {
            let potentialTag: TagModel = new TagModel();
            let tagKey = Object.keys(tag)[0];
            potentialTag._name = tag[tagKey].name;
            potentialTag.key = tagKey;
            potentialTag.tier = tier;
            
            if (parentTagKey) {
                let parentKeys = FireService.getFirstObjectValue(tag).parents;
                let parentKeysAsArray = FireService.convertToArrayOfKeys(parentKeys);

                parentKeysAsArray.forEach(parentKey => {
                    if (parentKey == parentTagKey) {
                        potentialTag.parent = parentKey;
                        tagsToReturn.push(potentialTag);
                    }   
                });
            }
            else if (tier == 1){
                tagsToReturn.push(potentialTag);
            }
        });
        return  tagsToReturn;
    }


   
}