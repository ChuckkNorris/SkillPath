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
    }
    checkpointName: string;
    selectedTags:TagModel[] = [];

    createCheckpoint(){
        let tags = this.getSelectedTags();

        this.selectedTags = tags;
        let checkpoint: CheckpointModel = new CheckpointModel();
        checkpoint.name = "checkpointName";
        
        this.checkpointService.createCheckpoint(tags, checkpoint);
    }

    getCheckpoints() {
        let tags = this.getSelectedTags();
        this.checkpointService.getCheckpointsByTag(tags);
    }

    getSelectedTags(): TagModel[] {
        let tags: TagModel[] = [
            this.selectedTier1Tag,
            this.selectedTier2Tag,
            this.selectedTier3Tag,
            this.selectedTier4Tag
        ];
        return tags;
    }

    tag1Change(event: Event) {
        // Change values to all where parent == tag
        // this.tier2Tags = this.checkpointService.getNextTierTags();
    }

    tag2Change( event: Event) {    
        // Change values to all where parent == tag
       this.selectedTier2Tag.parent = this.selectedTier1Tag;
       console.log(this.selectedTier2Tag);
    }

    tier1Tags: string[] = [];
    tier2Tags: string[] = [];
    tier3Tags: string[] = [];
    tier4Tags: string[] = [];

    selectedTier1Tag: TagModel = new TagModel();
    selectedTier2Tag: TagModel = new TagModel();
    selectedTier3Tag: TagModel = new TagModel();
    selectedTier4Tag: TagModel = new TagModel();

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

