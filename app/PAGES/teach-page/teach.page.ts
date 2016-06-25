import {Component} from '@angular/core';
import {  CheckpointService } from '../../SERVICES/checkpoint.service';
import {CheckpointModel, TagModel } from "../../export";
import {TagService} from '../../SERVICES/tag.service';
import {FireService} from '../../SERVICES/fire.service';

@Component({
    moduleId: 'app/PAGES/teach-page/',
    selector: 'teach-page',
    templateUrl: 'teach.page.html',
    styleUrls: ['teach.page.css'],
    providers: [TagService, CheckpointService, FireService]
})
export class TeachPage {
    constructor(private tagService: TagService, private checkpointService: CheckpointService, private fireService: FireService) {
        this.getTiers();
        this.selectedTier1Tag.name = 'Software Development';
    }
    checkpointName: string;
    selectedTags:TagModel[] = [];

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

    getSelectedTagsAsArray(): TagModel[] {
        let tags: TagModel[] = [
            this.selectedTier1Tag,
            this.selectedTier2Tag,
            this.selectedTier3Tag,
            this.selectedTier4Tag
        ];
        return tags;
    }

    getTags() {
        this.fireService.getNextTierTags(this.selectedTier1Tag);
    }

    createTierOneTag() {
        this.tagService.createTag(this.selectedTier1Tag);
    }

    createTierTwoTag() {
        this.tagService.createTag(this.selectedTier2Tag);
    }

    tag1Change(event: Event) {
        this.selectedTier1Tag.tier = 1;
        // Change values to all where parent == tag
        // this.tier2Tags = this.checkpointService.getNextTierTags();
       // this.fireService.getNextTierTags(this.selectedTier1Tag);
    }

    tag2Change( event: Event) {    
        this.selectedTier2Tag.tier = 2;
        // Change values to all where parent == tag
       this.selectedTier2Tag.parent = this.selectedTier1Tag;
       console.log(this.selectedTier2Tag);
    }

    tier1Tags: string[] = [];
    tier2Tags: string[] = [];
    tier3Tags: string[] = [];
    tier4Tags: string[] = [];

    selectedTier1Tag: TagModel = new TagModel(1);
    selectedTier2Tag: TagModel = new TagModel(2);
    selectedTier3Tag: TagModel = new TagModel(3);
    selectedTier4Tag: TagModel = new TagModel(4);

    private checkpoint: CheckpointModel = new CheckpointModel;
    createTagAtTier(tier: number, tagName: string){
        //this.checkpointService.testRun();  
        // this.tagService.addTagToTier(tier, tagName);
    }
    getTiers() {
        this.tagService.getTagsAtTier(1).subscribe(tags => {this.tier1Tags = tags;});
        this.tagService.getTagsAtTier(2).subscribe(tags => this.tier2Tags = tags);
        this.tagService.getTagsAtTier(3).subscribe(tags => this.tier3Tags = tags);
        this.tagService.getTagsAtTier(4).subscribe(tags => this.tier4Tags = tags);
    }

}

