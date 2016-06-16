import {Component, OnInit, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import {MaterializeDirective} from 'angular2-materialize';
import {NameValuePair} from '../../MODELS/name-value-pair.model';
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
export class UxDropdown implements OnInit, OnChanges { 
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

  ngOnChanges() {
    this.createBoundCollection();
  }

  @Output() modelChange = new EventEmitter();
  onChange(event){
    this.createBoundCollection();
    this.modelChange.emit(event);
       console.log(event);
  }

  createBoundCollection() {
    this.boundCollection = [];
    this.options.forEach(item => {
      this.boundCollection.push({
        name: this.nameProperty ? item[this.nameProperty] : item,
        value: this.valueProperty ? item[this.valueProperty] : item
      })
    });
  }
}