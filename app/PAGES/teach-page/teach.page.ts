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
        let tags: TagModel[] = [];
        let tier1Tag = new TagModel();
        tier1Tag.name= this.selectedTier1Tag
        tier1Tag.tier= 1;
        tags.push(tier1Tag);
        let tier2Tag = new TagModel();
        tier2Tag.name= this.selectedTier2Tag
        tier2Tag.tier= 2;
        tags.push(tier2Tag);

        this.selectedTags = tags;
        let checkpoint: CheckpointModel = new CheckpointModel();
        checkpoint.name = "checkpointName";
        
        this.checkpointService.createCheckpoint(tags, checkpoint);
    }

    getCheckpoints() {
        let tags: TagModel[] = [];
        let tier1Tag = new TagModel();
        tier1Tag.name= this.selectedTier1Tag
        tier1Tag.tier= 1;
        tags.push(tier1Tag);
        let tier2Tag = new TagModel();
        tier2Tag.name= this.selectedTier2Tag
        tier2Tag.tier= 2;
        tags.push(tier2Tag);
        this.checkpointService.getCheckpointsByTag(tags);
    }

    tier1Tags: string[] = [];
    tier2Tags: string[] = [];
    tier3Tags: string[] = [];
    tier4Tags: string[] = [];

    selectedTier1Tag: string;
    selectedTier2Tag: string;
    selectedTier3Tag: string;
    selectedTier4Tag: string;

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

