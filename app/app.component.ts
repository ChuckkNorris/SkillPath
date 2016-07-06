import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { LearnPage, TeachPage, CheckpointPage } from './export';

@Component({
  moduleId: 'app/',
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})

@Routes([
  { path: '/', component: LearnPage },
  { path: 'Teach', component:  TeachPage},
  { path: 'checkpoint/:key', component:  CheckpointPage}
])
export class AppComponent implements OnInit {
  
  constructor(private router: Router){}

  ngOnInit() {
    // Enable Mobile Menu
    $(".button-collapse").sideNav();
    $('.tooltipped').tooltip({delay: 50});
  }
  

  routeIsActive(routePath: string) {
     let currentRoute = this.router.urlTree.firstChild(this.router.urlTree.root);
     let segment = currentRoute == null ? '/' : currentRoute.segment;
     return  segment == routePath;
  }

  
}
