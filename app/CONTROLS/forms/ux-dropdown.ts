import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'ux-dropdown',
    template: `
   <div class="input-field col s12">
    <select multiple>
      <option value="1">All</option>
      <option value="2">Option 2 asdas d</option>
      <option value="3">Option 3as dasd as</option>
      <option value="3">Option 3a sdas das das d</option>
      <option value="3">Option a sdas das d</option>
      <option value="3">Option 3sd asd asd as</option>
    </select>
    <label>Select Platform</label>
  </div>
    `,
    inputs: ['icon', 'label', 'text']
})
export class UxDropdown implements OnInit { 
  //        <option value="0" disabled selected>All</option>

    private icon:string = "";
    private label:string = "";
    private text:string = "";
    @Output() textChange: EventEmitter<string> = new EventEmitter<string>();

    ngOnInit() {
      $('select').material_select();
    }
}