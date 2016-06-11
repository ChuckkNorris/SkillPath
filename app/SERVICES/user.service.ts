import { Injectable, Inject } from '@angular/core';
import {FireService} from './fire.service';
import {Http} from '@angular/http';
import { 
     //  FireService
     UserModel } from '../export';
 
@Injectable()
export class UserService {
    
    constructor(
        private fireService: FireService,
         http: Http 
        ) {}
    
    public createUser(user: string): any {
        //console.log(user);
       // this.fireService.get('user')
    }
    
    public getUser(username: string): any {
       // return this.firebaseService.get("users/" + username);
    }
}