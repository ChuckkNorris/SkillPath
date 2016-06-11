import {Component} from '@angular/core';

@Component({
    selector: 'ux-button',
    template: `
    <button class="waves-effect waves-light btn">
        <i class="material-icons left">{{icon}}</i>
        {{text}}
    </button>
    `,
    inputs: ['icon', 'text']
})
export class UxButton { 
    private icon:string = "";
    private text:string = "";
}