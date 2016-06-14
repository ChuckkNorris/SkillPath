import {Component} from '@angular/core';
import {  CheckpointService } from '../../SERVICES/checkpoint.service';
import {CheckpointModel, } from '../../export';
import {FireService} from '../../SERVICES/fire.service';

@Component({
    moduleId: 'app/PAGES/teach-page/',
    selector: 'teach-page',
    templateUrl: 'teach.page.html',
    styleUrls: ['teach.page.css'],
    providers: [CheckpointService]
})
export class TeachPage {
    constructor(
      //  private checkpointService: CheckpointService,
        private fireService: FireService
        ) {}
    private checkpoint: CheckpointModel = new CheckpointModel;

    createCheckpoint() {
      //  this.checkpointService.createCheckpoint(this.checkpoint);
    }

    firebaseTest() {
        this.fireService.getArray('options/platforms').subscribe(platforms => 
            console.log(platforms)
        );
        // this.fireService.push('options/platforms', 'iOS');
        // this.fireService.push('options/platforms', 'Windows');
        // this.fireService.push('options/platforms', 'Android');
        // this.fireService.getArray('options/platforms').subscribe(platforms => 
        //     console.log(platforms)
        // );
    }

}

