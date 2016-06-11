import {Component, Output, EventEmitter} from '@angular/core';

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
    `,
    inputs: ['icon', 'label', 'text']
})
export class UxText { 
    private icon:string = "";
    private label:string = "";
    private text:string = "";
    @Output() textChange: EventEmitter<string> = new EventEmitter<string>();
}