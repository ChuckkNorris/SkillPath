import {Component, Output, Input, EventEmitter} from '@angular/core';

@Component({
    selector: 'ux-text',
    template: `
    <div class="input-field">
        <i class="material-icons prefix">{{icon}}</i>
        <input id="uxtext" 
            [(ngModel)]="text" 
            (ngModelChange)="textChange.emit($event)" 
            type="text" 
            class="validate">
        <label for="uxtext">{{label}}</label>
    </div>
    `
})
export class UxText { 
    @Input() icon:string = "";
    @Input() label:string = "";
    @Input() text:string = "";
    @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

}