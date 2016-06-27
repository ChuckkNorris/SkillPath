import {Component} from '@angular/core';
import {  CheckpointService } from '../../SERVICES/checkpoint.service';
import {CheckpointModel, TagModel } from "../../export";
import {TagService} from '../../SERVICES/tag.service';
import {FireService} from '../../SERVICES/fire.service';
import {Observable} from 'rxjs/rx';
import {SpCheckpointThumbnail} from '../../CONTROLS/skill-path/sp-checkpoint-thumbnail';

@Component({
    moduleId: 'app/PAGES/teach-page/',
    selector: 'teach-page',
    templateUrl: 'teach.page.html',
    styleUrls: ['teach.page.css'],
    providers: [TagService, CheckpointService, FireService],
    directives: [SpCheckpointThumbnail]
})
export class TeachPage {
    constructor(private tagService: TagService, private checkpointService: CheckpointService, private fireService: FireService) {
       // this.getTiers();
       this.getFirstTierTags();
    }
    checkpoint: CheckpointModel = new CheckpointModel;

    tier1Tags: TagModel[] = [];
    tier2Tags: TagModel[] = [];
    tier3Tags: TagModel[] = [];
    tier4Tags: TagModel[] = [];

    selectedTags:TagModel[] = [];

    selectedTier1Tag: TagModel = new TagModel(1);
    selectedTier2Tag: TagModel = new TagModel(2);
    selectedTier3Tag: TagModel = new TagModel(3);
    selectedTier4Tag: TagModel = new TagModel(4);

    checkpoints: CheckpointModel[] = [];
    tagsChanged(selectedTags) {
        console.log(selectedTags);
    }
    // - Checkpoints - // 
    createCheckpoint(){
        let tags = this.getSelectedTagsAsArray();
        this.checkpointService.createCheckpoint(tags, this.checkpoint);
    }

    getCheckpoints() {
        let tags = this.getSelectedTagsAsArray();
        this.checkpointService.getCheckpointsByTags(tags).subscribe(checkpoints => {
            // TODO: Change to use Child Added so you don't have to clear the collection each time
            this.checkpoints = [];
            checkpoints.forEach(checkpoint => {
                this.checkpoints.push(checkpoint);
            });
            console.log(this.checkpoints)
            //console.log(this.checkpoints);
        });
    }
   
    // - Tags - //
    getFirstTierTags() {
            this.tagService.getTagsAtTier(1).subscribe(tier1Tags => {
                let nextTierTagModels: TagModel[] = [];
                tier1Tags.forEach(x => {
                    nextTierTagModels.push(x);
                })
                this.tier1Tags = nextTierTagModels
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
         this.getNextTierTags(changedTag).subscribe(tags => {
            switch (changedTag.tier) {
                case 1:
                    this.tier2Tags = tags;
                    this.tier3Tags = [];
                    this.tier4Tags = [];
                    break;
                case 2:
                    this.tier3Tags = tags;
                    this.selectedTier2Tag.parent = this.selectedTier1Tag; 
                    this.tier4Tags = [];
                    break;
                case 3:
                    this.tier4Tags = tags;
                    this.selectedTier3Tag.parent = this.selectedTier2Tag; 
                    break;
                case 4:
                    this.selectedTier4Tag.parent = this.selectedTier3Tag; 
                    break;
                default:
                    break;
            }
            this.getCheckpoints();
        });

    }

    updateSelectedTags() {
        let tags = this.getSelectedTagsAsArray();
        this.selectedTags = tags;
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

