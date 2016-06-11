import {Component} from '@angular/core';
import { UserService } from '../../SERVICES/user.service';
@Component({
    moduleId: 'app/PAGES/teach-page/',
    selector: 'teach-page',
    templateUrl: 'teach.page.html',
    styleUrls: ['teach.page.css']
})
export class TeachPage {
    constructor(private user: UserService) {

    }

}