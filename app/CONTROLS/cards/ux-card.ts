import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'ux-card',
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
export class UxCard { 
    @Input() title: string;
    @Input() description: string;
    @Input() imageUrl: string;
}