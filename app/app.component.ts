import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LearnPage, TeachPage } from './export';
import {UserService} from './SERVICES/user.service';

@Component({
  moduleId: 'app/',
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES]
})

@Routes([
  { path: '/', component: LearnPage },
  { path: 'Teach', component:  TeachPage}
])
export class AppComponent implements OnInit {
  
  constructor(private router: Router){}

  ngOnInit() {
    // Enable Mobile Menu
    $(".button-collapse").sideNav();
    $('select').material_select();
  }

  routeIsActive(routePath: string) {
     let currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
     let segment = currentRoute == null ? '/' : currentRoute.segment;
     return  segment == routePath;
  }

  
}
