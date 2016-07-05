import { Injectable } from '@angular/core';
import { FireService } from './fire.service';
import { CheckpointModel, TagModel } from '../export';
import { Observable, Observer } from 'rxjs/rx';
 
@Injectable()
export class TagService {
    constructor(private fireService: FireService) {}

   

    public createTag(tag: TagModel) : Observable<string> {
        return Observable.create(observer => {
            let tagPath = 'tags/' + tag.tier + '/' + tag.key;
            this.fireService.exists(tagPath).subscribe(tagExists => {
                if (!tagExists) {
                    let tagToSave = tag.toFirebaseObject();
                    this.fireService.set(tagPath, tagToSave).subscribe(() => {
                        this.setAllParents(tagPath, tag);
                        observer.next(null);
                    });
                }
                else {
                    observer.next('That tag already exists');
                    //this.setAllParents(tagPath, tag);
                }
            });
        })
       
    }

    private setAllParents(tagKeyPath: string, childTag: TagModel) {
        if (childTag.parent){ 
            this.setParentTag(tagKeyPath, childTag.parent);
            if (childTag.parent.parent){ 
                this.setParentTag(tagKeyPath, childTag.parent.parent);
                if (childTag.parent.parent.parent){ 
                    this.setParentTag(tagKeyPath, childTag.parent.parent.parent);
                }
            }
        }
        
    }

    private setParentTag(tagKeyPath: string, parentTag: TagModel) {
        let parentKey = TagModel.formatParentKey(parentTag);
        let parentPath = tagKeyPath + '/parents/' + parentKey;
        this.fireService.set(parentPath, true).subscribe();
    }

    public getTagsAtTier(tier: number): Observable<TagModel[]> {
        return Observable.create(observe => {
            this.fireService.get('tags/' + tier).subscribe(tagObjects => {
                let toReturn = this.getRelatedTagsFromObjects(tagObjects, tier);
                observe.next(toReturn);
            })
        });
    }

    public getNextTierTags(parentTag: TagModel): Observable<TagModel[]> {
        let nextTier = parentTag.tier + 1;
        return Observable.create(observer => {
              this.fireService.get('tags/' + nextTier).subscribe(tagsArray => {
                
                observer.next(this.getRelatedTagsFromObjects(tagsArray, nextTier, parentTag));
            });
        });
    }

    private getRelatedTagsFromObjects(tagObjects: any, tier: number, parentTag?: TagModel): TagModel[] {
        
        var allTags = FireService.convertToArray(tagObjects);
        let tagsToReturn: TagModel[] = [];
        allTags.forEach(tag => {
            let potentialTag: TagModel = new TagModel();
            let tagKey = Object.keys(tag)[0];
            potentialTag.name = tag[tagKey].name;
            potentialTag.key = tagKey;
            potentialTag.tier = tier;
            
            if (parentTag) {
                let tagContainsAllSelectedParents = true;
                let subsequentParentKeys: string[] = TagModel.getAllParentKeysFormatted(parentTag);
               
                let parentKeys = FireService.getFirstObjectValue(tag).parents;
                let parentKeysAsArray = FireService.convertToArrayOfKeys(parentKeys);
                // ['1_test1', '2_test2'];
                subsequentParentKeys.forEach(requiredParentKey => {

                    if (!parentKeysAsArray.includes(requiredParentKey))
                        tagContainsAllSelectedParents = false;
                    
                });
                if (tagContainsAllSelectedParents) {
                    potentialTag.parent = parentTag;
                    tagsToReturn.push(potentialTag);
                }
            }
            else if (tier == 1){
                tagsToReturn.push(potentialTag);
            }
        });
        return  tagsToReturn;
    }

    private 


   
}