import { bootstrap }    from '@angular/platform-browser-dynamic';
import { PLATFORM_DIRECTIVES, provide, APPLICATION_COMMON_PROVIDERS } from '@angular/core';
import { HTTP_PROVIDERS, Http } from '@angular/http';
import { AppComponent } from './app.component';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import {UxButton, UxText, UxDropdown} from './export';
import { FireService} from './SERVICES/fire.service';
import { UserService } from './SERVICES/user.service';


bootstrap(AppComponent, [
    FireService,
    HTTP_PROVIDERS,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    provide(PLATFORM_DIRECTIVES, {useValue: UxButton, multi: true}),
    provide(PLATFORM_DIRECTIVES, {useValue: UxDropdown, multi: true}),
    provide(PLATFORM_DIRECTIVES, {useValue: UxText, multi: true}),
   // FireService
]);