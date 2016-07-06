import {Component, Input, OnInit} from '@angular/core';
import { OnActivate, RouteSegment } from '@angular/router';
import { CheckpointModel } from '../../export';
import { CheckpointService } from '../../SERVICES/Checkpoint.service';

@Component({
    moduleId: 'app/PAGES/checkpoint-page/',
    selector: 'checkpoint-page',
    templateUrl: 'checkpoint-page.html',
    styleUrls: ['checkpoint-page.css'],
    providers: [CheckpointService]
})
export class CheckpointPage implements OnInit, OnActivate {
    
    constructor(private checkpointService: CheckpointService) {}
    private key: string;
    checkpoint: CheckpointModel;
    routerOnActivate(currentSegment: RouteSegment) {
        this.key = currentSegment.getParam('key');
        
    }
    
    ngOnInit(){
        this.checkpointService.getCheckpoint(this.key).subscribe(checkpoint => {
            console.log(checkpoint);
            this.checkpoint = checkpoint;
        })
    }
    
   
}