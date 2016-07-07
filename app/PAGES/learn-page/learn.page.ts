import {Component, EventEmitter, ViewChild, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CheckpointService} from '../../SERVICES/checkpoint.service';
import { CheckpointModel, TagModel } from '../../export';
import {MaterializeDirective, toast} from "angular2-materialize";
import {Platform} from '../../MODELS/platform.model';
import * as Materialize from 'angular2-materialize';

@Component({
    moduleId: 'app/PAGES/learn-page/',
    selector: 'learn-page',
    templateUrl: 'learn.page.html',
    styleUrls: ['learn.page.css'],
    providers: [ CheckpointService],
    directives: [MaterializeDirective]
})
export class LearnPage implements OnInit {
    constructor(
        private checkpointService: CheckpointService,
        private router: Router
        ) {
        this.getAllCheckpoints();
        this.createMockPlatformsData();
        this.testCollection.push('awesome');
      //  $('select').material_select();
    }
    ngOnInit() {
        this.categories = [{id:1,CategoryTitle:"bla1"},{id:2,CategoryTitle:"bla2"},{id:3,CategoryTitle:"bla3"}];

    }
    tagsChanged(selectedTags) {
        this.getCheckpoints(selectedTags);
    }

     getCheckpoints(selectedTags: TagModel[]) {
        this.checkpointService.getCheckpointsByTags(selectedTags).subscribe(checkpoints => {
            // TODO: Change to use Child Added so you don't have to clear the collection each time
            this.checkpoints = [];
            checkpoints.forEach(checkpoint => {
                this.checkpoints.push(checkpoint);
            });
        });
    }


    categories = [];
    modelCategoryId=3;

    private platforms: Platform[] = [{name: 'base', id: 2}, {name: 'base', id: 2}];
    private testCollection = ['dog', 'cat'];
    dropdownModel: Array<string>;
  logModel() {
    console.log(this.model);
  }
//   @ViewChild('select') selectElRef;
//   updateSelectList() {
//     let options = this.selectElRef.nativeElement.options;
//     for(let i=0; i < options.length; i++) {
//       options[i].selected = this.testCollection.indexOf(options[i].value) > -1;
//     }
//   }

    private model: any = ["cat"];
    modelChange = new EventEmitter();
    change(newValue) {
    //  Materialize.toast('child select: '+newValue, 2000)
    console.log(newValue);
      this.model = newValue;
      this.modelChange.emit(newValue);
    }
//    change(options) {
//        this.model = Array.apply(null,options)
//       .filter(option => option.selected)
//       .map(option => option.value)
       
    
//     }

    getAllCheckpoints() {
        this.checkpointService.getAllCheckpoints().subscribe(checkpoints => {
            this.checkpoints = checkpoints;
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

    navigateToCheckpoint(checkpointToNavigateTo: CheckpointModel){
        this.router.navigate(['/checkpoint/' + checkpointToNavigateTo.key]);
    }

    private checkpoints: CheckpointModel[] = [];

    
}