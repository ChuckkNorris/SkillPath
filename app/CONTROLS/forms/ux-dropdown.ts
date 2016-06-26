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
    console.log(this.model);
   //   this.createBoundCollection();
  }

  ngOnChanges() {
  //  if (this.boundCollection.length == 0 ) // || !this.collectionMatchesOptions()
      this.createBoundCollection();
  }

  private collectionMatchesOptions(): boolean {
    this.options.forEach(option => {
      let optionExists = false;
      this.boundCollection.forEach(boundObject => {
        let optionValue = option[this.valueProperty];
        if (boundObject.value == optionValue)
          optionExists = true;
      });
      if (!optionExists)
        return false;
    });
    return true;
  }

  @Output() modelChange = new EventEmitter();
  onChange(event){
    this.options.forEach(option => {
      if (option[this.valueProperty] == event)
        this.modelChange.emit(option);
    })
   // this.modelChange.emit(this.model);
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