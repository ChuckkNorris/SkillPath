import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';

interface NameValuePair {
  name: any;
  value: any;
}
// col s12
@Component({
    selector: 'ux-dropdown',
   // changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <button (click)="onDropdownChanged($event.target.value);" >Log Dropdown Model</button>
     <select [(ngModel)]="collectionModel"  id="dropdown1" multiple>
     <option>Static Option</option>
      <option  *ngFor="let item of testCollection">{{item}}</option>
    </select>
    `})
export class UxDropdown implements OnInit { 
 // private boundCollection: NameValuePair[] = [];
  private testCollection: string[] = ['dog', 'cat'];
  // @Input() private label:string = '';
  // @Input() private collection: string[] = [];
  // @Input() private valueProperty: string;
  // @Input() private nameProperty: string;

  private collectionModel: string[] = [];
  constructor() {
   // this.boundCollection = [{name: 'tyler', value: 1}];
    console.log(this.testCollection);
  }
  ngOnInit() {
      this.testCollection.push('mouse', 'ant');
      $('select').material_select();
        this.testCollection.push('mouse', 'ant');
        this.addAllToTestCollection();
  }
  
  private onDropdownChanged(event: any) {
      console.log(event);
      console.log(this.collectionModel);
  }

  addAllToTestCollection() {
    this.testCollection.forEach(item => {
      $('#dropdown1').append($("<option>" + item +"</option>"));
    })
     
      $('select').on('contentChanged', function() {
          // re-initialize (update)
            $(this).material_select();
      });
      $('#dropdown1').trigger('contentChanged');
  }

  private testStuff() {
    // add new option
    $('#dropdown1').append($("<option>test</option>"));
    $('select').on('contentChanged', function() {
              // re-initialize (update)
                $(this).material_select();
          });
    // trigger event
        $('#dropdown1').trigger('contentChanged');
        this.testCollection.push('mouse', 'ant');
  }

  

  private dropdownChange(){
    // var $dropdown = $('#dropdown').empty().html(' ');
    // var value = "some value";
    //     $dropdown.append(
    //       $("<option></option>")
    //         .attr("value",value)
    //         .text(value)
    //     );
    //   $(this).material_select();
  }

  

  // createBoundCollection() {
  //   this.collection.forEach(item => {
  //     this.boundCollection.push({
  //       name: item[this.nameProperty],
  //       value: item[this.valueProperty]
  //     })
  //   });
  //   console.log(this.boundCollection);
  // }
}

  //  <!--<div class="input-field">
  //   <label>{{label}}</label>
  //   <ul>
  //     <li *ngFor="let item of testCollection">{{item}}</li>
  //   </ul>
  // </div>-->