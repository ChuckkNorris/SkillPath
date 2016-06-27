import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { TagModel } from '../../export';
// style="width:400; height:400; display:inline-block;"
@Component({
    selector: 'sp-checkpoint-thumbnail',
    template: `
    <div  class="card">
        <div class="card-image">
            <iframe *ngIf="model.tutorialUrl" [src]="model.tutorialUrl"></iframe>
            <span class="card-title">{{model.name}}</span>
        </div>
        <div *ngIf="model.description" class="card-content">
            <p>{{model.description}}</p>
        </div>
        <div *ngIf="model.tutorialUrl" class="card-action">
            <a [href]="model.tutorialUrl">{{model.name}}</a>
        </div>
    </div>
    `
})
export class SpCheckpointThumbnail { 
    @Input() model: TagModel = new TagModel();

}