import {Component, Inject} from '@angular/core';
import {UserService} from '../../SERVICES/user.service';
import { UserModel } from '../../export';


@Component({
    moduleId: 'app/PAGES/learn-page/', // GOOD
    selector: 'learn-page', // GOOD
    templateUrl: 'learn.page.html', // GOOD
    styleUrls: ['learn.page.css'], // GOOD
    providers: [ UserService] 
})
export class LearnPage {
    constructor(private service: UserService) {}
    user:UserModel = new UserModel();
    hello: string = "You got yourself a login page, sir";

    dostuff() {
        
        console.log(this.user);
        
        //this.firebaseService.set(this.user);

       // var t = this.firebaseService.get("users/" + this.user.username);
       // console.log(t);
        this.service.createUser('test');
    }
}