import {Component, Output, Input, EventEmitter} from '@angular/core';

@Component({
    selector: 'ux-textarea',
    template: `
    <div class="input-field">
        <i *ngIf="icon" class="material-icons prefix">{{icon}}</i>
        <textarea id="ux-textarea" 
            class="materialize-textarea validate"
            [(ngModel)]="text" 
            (ngModelChange)="textChange.emit($event)"></textarea>
        <label *ngIf="label" for="ux-textarea"> {{label}} </label>
    </div>
    `
})
export class UxTextArea { 
    @Input() icon:string = "";
    @Input() label:string = "";
    @Input() text:string = "";
    @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

}