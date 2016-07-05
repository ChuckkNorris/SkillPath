import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { TagModel } from '../../export';
import {TagService} from '../../SERVICES/tag.service';


@Component({
    selector: 'sp-new-tag-modal',
    template: `
  <!-- Modal Trigger -->
  <a class="waves-effect waves-light btn modal-trigger" (click)="showTagModal();">Add New Tag</a>

  <!-- Modal Structure -->
  <div id="{{id}}" class="modal">
    <div class="modal-content">
      <h4>Create New Tier {{model.tier}} Tag</h4>
      <ux-text [(text)]="model.name"></ux-text>
      {{model | json}}
    </div>
    <div class="modal-footer">
        <a (click)="createTag(model);" class=" modal-action waves-effect waves-green btn-flat">Save</a>
        <a (click)="closeTagModal();" class=" modal-action modal-close waves-effect waves-green btn-flat">Cancel</a>
    </div>
  </div>
    `
})

export class SpNewTagModal implements OnInit { 
    constructor(private tagService: TagService) {}

    ngOnInit() {
        console.log(this.model);
        // console.log(tag.name);
        // console.log(tag.key);
    }
    @Input() model: TagModel = new TagModel();
    @Input() id: string;
  //  @ViewChild('myModal') id;
    createTag(tag: TagModel) {
        console.log(this.model);
        // this.tagService.createTag(tag).subscribe(error => {
        //     if (error)
        //         Materialize.toast(error, 5000);
        //     else {
        //         Materialize.toast('Tag Created Successfully!', 5000);
        //         this.closeTagModal();
        //     }
        // })
       
    }

    showTagModal() {
        $('#' + this.id).openModal();
    }

    closeTagModal() {
         $('#' + this.id).closeModal();
    }
}