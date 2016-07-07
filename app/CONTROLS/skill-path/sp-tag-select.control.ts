import {Component, Output, Input, EventEmitter} from '@angular/core';
import {  CheckpointService } from '../../SERVICES/checkpoint.service';
import {CheckpointModel, TagModel } from "../../export";
import {TagService} from '../../SERVICES/tag.service';
import {FireService} from '../../SERVICES/fire.service';
import {Observable} from 'rxjs/rx';

@Component({
    moduleId: 'app/CONTROLS/skill-path/',
    selector: 'sp-tag-select-control',
    templateUrl: 'sp-tag-select-control.html',
   // styleUrls: ['teach.page.css'],
    providers: [TagService, CheckpointService, FireService]
})
export class SpTagSelectControl {
    selectedTags: TagModel[] = [];

    @Input() vertical: boolean = false;
    @Output() selectedTagsChanged: EventEmitter<TagModel[]> = new EventEmitter<TagModel[]>();
    constructor(private tagService: TagService, private checkpointService: CheckpointService) {
       // this.getTiers();
       this.getFirstTierTags();
    }
    checkpoint: CheckpointModel = new CheckpointModel;

    tier1Tags: TagModel[] = [];
    tier2Tags: TagModel[] = [];
    tier3Tags: TagModel[] = [];
    tier4Tags: TagModel[] = [];


    selectedTier1Tag: TagModel = new TagModel(1);
    selectedTier2Tag: TagModel = new TagModel(2);
    selectedTier3Tag: TagModel = new TagModel(3);
    selectedTier4Tag: TagModel = new TagModel(4);
   
    // - Tags - //
    getFirstTierTags() {
        this.tagService.getTagsAtTier(1).subscribe(tier1Tags => {
            let firstTierTagModels: TagModel[] = [];
            tier1Tags.forEach(x => {
                firstTierTagModels.push(x);
            })
            this.tier1Tags = firstTierTagModels
        });
    }

    private getNextTierTags(tag: TagModel): Observable<TagModel[]> {
        return Observable.create(observer => {
            this.tagService.getNextTierTags(tag).subscribe(nextTierTags => {
                let nextTierTagModels: TagModel[] = [];
                nextTierTags.forEach(x => {
                    nextTierTagModels.push(x);
                })
                observer.next(nextTierTagModels);
            });
        })
       
    }

    createTag(tag: TagModel) {
        this.tagService.createTag(tag);
    }

     onTagChanged(changedTag: TagModel){
         if (changedTag.tier != 4) {
            this.getNextTierTags(changedTag).subscribe(tags => {
                this.updateTags(changedTag.tier, tags);
                this.emitTagChangeEvent();
            });
         }
         else 
            this.emitTagChangeEvent();
    }

    emitTagChangeEvent() {
        let selectedTags = this.getSelectedTagsAsArray();
        this.selectedTagsChanged.emit(selectedTags);
    }

    updateTags(changedTagTier:number, newTags?: TagModel[] ){
        // TODO: Set parents to null after selection instead of tags;
         switch (changedTagTier) {
                case 1:
                    this.selectedTier2Tag.parent = this.selectedTier1Tag;
                    // this.selectedTier2Tag.key = undefined;
                    // this.selectedTier3Tag.key = undefined;
                    // this.selectedTier4Tag.key = undefined;
                    this.tier2Tags = newTags;
                    this.tier3Tags = [];
                    this.tier4Tags = [];
                    break;
                case 2:
                    this.selectedTier3Tag.parent = this.selectedTier2Tag; 
                    // this.selectedTier3Tag.key = undefined;
                    // this.selectedTier4Tag.key = undefined;
                    this.tier3Tags = newTags;
                    this.tier4Tags = [];
                    break;
                case 3:
                    this.selectedTier4Tag.parent = this.selectedTier3Tag; 
                    // this.selectedTier4Tag.key = undefined;
                    this.tier4Tags = newTags;
                    break;
                case 4:
                default:
                    break;
        }
    }


     private getSelectedTagsAsArray(): TagModel[] {
        let tags: TagModel[] = [
            this.selectedTier1Tag,
            this.selectedTier2Tag,
            this.selectedTier3Tag,
            this.selectedTier4Tag
        ];
        let selectedTags = tags.filter(x => {
            if(x.key) return true;
        })
        return selectedTags;
    }

}

