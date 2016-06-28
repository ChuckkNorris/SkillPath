import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'ux-card',
    styles: [`
        .static {
            color: black;
            display: inline-block;
            cursor: pointer;
            width: 300px;
            height:325px;
        }
        .dimmed {
            position: relative;
        }
        .dimmed:before {
            content: " ";
            z-index: 1;
            display: block;
            position: absolute;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.5);
        }
        span {
            color: black;
            z-index: 2;
        }
        iframe { 
            z-index: 0;
            max-width: 300px; 
            max-height: 300px;
            background-color: white;
        }
    `],
    template: `
    <div class="static">
        <div class="card">
            <div class="card-image">
                <iframe *ngIf="iframeUrl" class="dimmed" [src]="iframeUrl" ></iframe>
                <img *ngIf="imageUrl" class="dimmed" [src]="imageUrl"/>
            </div>
           
            <div class="card-content" (mouseenter)="onMouseEnterDescription();" (mouseleave)="onMouseLeaveDescription();" >
                <span class="card-title">{{title}}</span>
                <p>{{description}}</p>
            </div>
            <div *ngIf="cardAction" class="card-action">
                <a [href]="cardActionUrl">{{cardActionName}}</a>
            </div>
        </div>
    <div>
    `
})
export class UxCard { 
    @Input() title: string;
    @Input() description: string;
    @Input() iframeUrl: string;
    @Input() imageUrl: string;
    @Input() cardAction: string;

    onMouseEnterDescription() {
        console.log('Enter'+ this.description);
    }
    onMouseLeaveDescription() {
        console.log('Leave');
    }

    private addCardAction(){

    }
}