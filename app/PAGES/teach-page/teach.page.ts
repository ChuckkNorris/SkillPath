import {Component} from '@angular/core';
import {  CheckpointService } from '../../SERVICES/checkpoint.service';
import {CheckpointModel } from "../../export";
import {TagService} from '../../SERVICES/tag.service';

@Component({
    moduleId: 'app/PAGES/teach-page/',
    selector: 'teach-page',
    templateUrl: 'teach.page.html',
    styleUrls: ['teach.page.css'],
    providers: [TagService]
})
export class TeachPage {
    constructor(private tagService: TagService) {
        this.getTiers();
    }

    tier1Tags: string[] = []
    tier2Tags: string[] = [];
    tier3Tags: string[] = [];
    tier4Tags: string[] = [];

    selectedTier1Tag: string;
    selectedTier2Tag: string;
    selectedTier3Tag: string;
    selectedTier4Tag: string;

    private checkpoint: CheckpointModel = new CheckpointModel;
    createTagAtTier(tier: number, tagName: string){
        this.tagService.addTagToTier(tier, tagName);
        console.log('Tier: ' + tier + ', Tag: ' + tagName);
    }
    getTiers() {
        this.tagService.getTagsAtTier(1).subscribe(tags => {this.tier1Tags = tags;});
        this.tagService.getTagsAtTier(2).subscribe(tags => this.tier2Tags = tags);
        this.tagService.getTagsAtTier(3).subscribe(tags => this.tier3Tags = tags);
        this.tagService.getTagsAtTier(4).subscribe(tags => this.tier4Tags = tags);
    }

    createCheckpoint() {
      //  this.checkpointService.createCheckpoint(this.checkpoint);
    }

    firebaseTest() {
        // this.fireService.getArray('options/platforms').subscribe(platforms => 
        //     console.log(platforms)
        // );
        // this.fireService.push('options/platforms', 'iOS');
        // this.fireService.push('options/platforms', 'Windows');
        // this.fireService.push('options/platforms', 'Android');
        // this.fireService.getArray('options/platforms').subscribe(platforms => 
        //     console.log(platforms)
        // );
    }

}

