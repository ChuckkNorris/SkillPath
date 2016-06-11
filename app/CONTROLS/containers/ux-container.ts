import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'ux-container',
    template: `
    <div class="container">
        <ng-content></ng-content>
    </div>
    `
})
export class UxContainer { 

}