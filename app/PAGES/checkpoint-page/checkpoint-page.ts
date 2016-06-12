import {Component, Input, OnInit} from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';
import { CheckpointModel } from '../../export';
@Component({
    moduleId: 'app/PAGES/checkpoint-page/',
    selector: 'checkpoint-page',
    templateUrl: 'checkpoint-page.html',
    styleUrls: ['checkpoint-page.css']
})
export class CheckpointPage implements OnInit, OnActivate {
    private id: number;
    
    routerOnActivate(currentSegment: RouteSegment) {
        this.id = +currentSegment.getParam('id');
    }
    
    ngOnInit(){
        console.log(this.id);
    }
    
   
}