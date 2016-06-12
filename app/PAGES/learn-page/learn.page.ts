import {Component, Inject} from '@angular/core';
import {UserService} from '../../SERVICES/user.service';
import {CheckpointService} from '../../SERVICES/checkpoint.service';
import { UserModel, CheckpointModel } from '../../export';


@Component({
    moduleId: 'app/PAGES/learn-page/', // GOOD
    selector: 'learn-page', // GOOD
    templateUrl: 'learn.page.html', // GOOD
    styleUrls: ['learn.page.css'], // GOOD
    providers: [ CheckpointService] 
})
export class LearnPage {
    constructor(private checkpointService: CheckpointService) {
        checkpointService.getAllCheckpoints().subscribe(what => {
            console.log(what);
            var array = $.map(what, function(value, index) {
                return [value];
            });
            this.checkpoints = array as CheckpointModel[];
        });
    }
   
    private checkpoints: CheckpointModel[] = [];

    
}