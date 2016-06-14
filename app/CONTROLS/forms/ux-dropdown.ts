import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize'

interface NameValuePair {
  name: any;
  value: any;
}
// col s12
@Component({
    selector: 'ux-dropdown',
    directives: [MaterializeDirective],
   // changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="input-field">
      <select 
        [ngModel]="model" 
        (ngModelChange)="onChange($event);" 
        materialize="material_select" 
        [materializeSelectOptions]="boundCollection">
        <option *ngIf="placeholder" disabled>{{placeholder}}</option>
        <option *ngFor="let option of boundCollection" [ngValue]="option.value">{{option.name}}</option>
      </select>
      <label>{{label}}</label>
    </div>
    `})
export class UxDropdown implements OnInit { 
  private boundCollection: NameValuePair[] = [];
  @Input() label:string = '';
  @Input() options: any[] = [];
  @Input() placeholder: string;
  @Input() valueProperty: string;
  @Input() nameProperty: string;

  @Output() model:any;

  ngOnInit() {
      $('select').material_select();
      this.createBoundCollection();
  }
  @Output() modelChange = new EventEmitter();
  onChange(event){
    this.modelChange.emit(event);
  }

  createBoundCollection() {
    this.options.forEach(item => {
      this.boundCollection.push({
        name: this.nameProperty ? item[this.nameProperty] : item,
        value: this.valueProperty ? item[this.valueProperty] : item
      })
    });
  }
}