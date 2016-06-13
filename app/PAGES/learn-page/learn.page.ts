import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../SERVICES/user.service';
import {CheckpointService} from '../../SERVICES/checkpoint.service';
import { UserModel, CheckpointModel } from '../../export';
import {MaterializeDirective} from "angular2-materialize";

interface Platform {
    name: string;
    id: number;
}

@Component({
    moduleId: 'app/PAGES/learn-page/',
    selector: 'learn-page',
    templateUrl: 'learn.page.html',
    styleUrls: ['learn.page.css'],
    providers: [ CheckpointService],
    directives: [MaterializeDirective]
})
export class LearnPage {
    constructor(
        private checkpointService: CheckpointService,
        private router: Router
        ) {
        this.getAllCheckpoints();
        this.createMockPlatformsData();
        this.testCollection.push('awesome');
        $('select').material_select();
    }

    private platforms: Platform[] = [{name: 'base', id: 2}, {name: 'base', id: 2}];
    private testCollection = ['dog', 'cat'];
    dropdownModel: string[] = [];
  logModel() {
    console.log(this.dropdownModel);
  }
    getAllCheckpoints() {
        this.checkpointService.getAllCheckpoints().subscribe(what => {
            console.log(what);
            var array = $.map(what, function(value, index) {
                return [value];
            });
            this.checkpoints = array as CheckpointModel[];
        });
    }
    getIt(name: string) {
        console.log(name);
    }
    createMockPlatformsData() {
        for (var index = 0; index < 4; index++) {
            this.platforms.push({
                name: 'dog' + index,
                id: index
            });
        }
        
    }

    navigateToCheckpoint(){
        this.router.navigate(['/checkpoint/3']);
    }

    private checkpoints: CheckpointModel[] = [];

    
}