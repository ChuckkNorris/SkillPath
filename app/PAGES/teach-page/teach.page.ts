import {Component} from '@angular/core';
import {  CheckpointService } from '../../SERVICES/checkpoint.service';
import {CheckpointModel, TagModel } from "../../export";
import {TagService} from '../../SERVICES/tag.service';
import {FireService} from '../../SERVICES/fire.service';
import {Observable} from 'rxjs/rx';

@Component({
    moduleId: 'app/PAGES/teach-page/',
    selector: 'teach-page',
    templateUrl: 'teach.page.html',
    styleUrls: ['teach.page.css'],
    providers: [TagService, CheckpointService, FireService]
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

    selectedTier1Tag: TagModel = new TagModel(1);
    selectedTier2Tag: TagModel = new TagModel(2);
    selectedTier3Tag: TagModel = new TagModel(3);
    selectedTier4Tag: TagModel = new TagModel(4);

    checkpointName: string;
    selectedTags:TagModel[] = [];

    // - Checkpoints - // 
    createCheckpoint(){
        let tags = this.getSelectedTagsAsArray();
        this.selectedTags = tags;
        let checkpoint: CheckpointModel = new CheckpointModel();
        checkpoint.name = "checkpointName";
        this.checkpointService.createCheckpoint(tags, checkpoint);
    }

    getCheckpoints() {
        let tags = this.getSelectedTagsAsArray();
        this.checkpointService.getCheckpointsByTags(tags);
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

    // - On Tags Changed - //

    tag1Change(event: Event) {
        this.getNextTierTags(this.selectedTier1Tag).subscribe(tags => {
            this.tier2Tags = tags;
        })
    }

    tag2Change( event: Event) {  
        this.selectedTier2Tag.parent = this.selectedTier1Tag;  
         this.getNextTierTags(this.selectedTier2Tag).subscribe(tags => {
            this.tier3Tags = tags;
        })
    }

     getSelectedTagsAsArray(): TagModel[] {
        let tags: TagModel[] = [
            this.selectedTier1Tag,
            this.selectedTier2Tag,
            this.selectedTier3Tag,
            this.selectedTier4Tag
        ];
        return tags;
    }

}

