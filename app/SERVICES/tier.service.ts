import { Injectable, Inject } from '@angular/core';
import {FireService} from './fire.service';
import {Http} from '@angular/http';

 
@Injectable()
export class TierService {
    constructor(private fireService: FireService) {}

    public getTier(tierNumber: number) {
        this.fireService.getArray('tiers/' + tierNumber);
    }

    public createTier(tierNumber: number, tierName: string) {
        // TODO
     //   this.fireService.set('tiers/' + tierNumber )
    }

}