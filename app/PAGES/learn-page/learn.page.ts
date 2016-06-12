import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../SERVICES/user.service';
import {CheckpointService} from '../../SERVICES/checkpoint.service';
import { UserModel, CheckpointModel } from '../../export';


@Component({
    moduleId: 'app/PAGES/learn-page/',
    selector: 'learn-page',
    templateUrl: 'learn.page.html',
    styleUrls: ['learn.page.css'],
    providers: [ CheckpointService] 
})
export class LearnPage {
    constructor(
        private checkpointService: CheckpointService,
        private router: Router
        ) {
        checkpointService.getAllCheckpoints().subscribe(what => {
            console.log(what);
            var array = $.map(what, function(value, index) {
                return [value];
            });
            this.checkpoints = array as CheckpointModel[];
        });
    }

    navigateToCheckpoint(){
        this.router.navigate(['/checkpoint/3']);
    }
    private checkpoints: CheckpointModel[] = [];

    
}