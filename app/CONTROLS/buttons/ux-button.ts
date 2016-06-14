import {Component, Input} from '@angular/core';

@Component({
    selector: 'ux-button',
    template: `
    <button class="waves-effect waves-light btn">
        <i class="material-icons left">{{icon}}</i>
        <ng-content></ng-content>
    </button>
    
    `
})
export class UxButton { 
    @Input() icon:string = "";
    @Input() text: string = "";
}