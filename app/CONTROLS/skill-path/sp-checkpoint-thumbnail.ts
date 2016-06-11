import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'sp-checkpoint-thumbnail',
    template: `
    <div class="card">
        <div class="card-image">
            <img src="images/sample-1.jpg">
            <span class="card-title">{{title}}</span>
        </div>
        <div class="card-content">
            <p>{{description}}</p>
        </div>
        <div class="card-action">
            <a href="#">This is a link</a>
        </div>
    </div>
    `
})
export class SpCheckpointThumbnail { 
    @Input() title: string;
    @Input() description: string;
    @Input() imageUrl: string;
}