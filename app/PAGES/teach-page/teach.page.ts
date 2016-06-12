import {Component} from '@angular/core';
import {  CheckpointService } from '../../SERVICES/checkpoint.service';
import {CheckpointModel} from '../../export';
@Component({
    moduleId: 'app/PAGES/teach-page/',
    selector: 'teach-page',
    templateUrl: 'teach.page.html',
    styleUrls: ['teach.page.css'],
    providers: [CheckpointService]
})
export class TeachPage {
    constructor(
        private checkpointService: CheckpointService
        ) {}
    private checkpoint: CheckpointModel = new CheckpointModel;

    createCheckpoint() {
        this.checkpointService.createCheckpoint(this.checkpoint);
    }
}

