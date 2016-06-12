import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

// col s12
@Component({
    selector: 'ux-dropdown',
    template: `
   <div class="input-field">
    <select multiple>
      <option value="1">All</option>
    </select>
    <label>{{label}}</label>
  </div>
    `})
export class UxDropdown implements OnInit { 

  @Input() private label:string = '';
  @Input() private collection = [];
  ngOnInit() {
    $('select').material_select();
  }
}

export enum DropdownType {
  Multiple = 0,
  BrowserSelect,
  Icons
}