import { bootstrap }    from '@angular/platform-browser-dynamic';
import { PLATFORM_DIRECTIVES, provide } from '@angular/core';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

import { AppComponent } from './app.component';
import {UxButton, UxText, UxDropdown, UxContainer, UxCard, UxTextArea} from './export';
import { FireService} from './SERVICES/fire.service';



bootstrap(AppComponent, [
    FireService,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    provide(PLATFORM_DIRECTIVES, {useValue: UxButton, multi: true}),
    provide(PLATFORM_DIRECTIVES, {useValue: UxDropdown, multi: true}),
    provide(PLATFORM_DIRECTIVES, {useValue: UxText, multi: true}),
    provide(PLATFORM_DIRECTIVES, {useValue: UxContainer, multi: true}),
    provide(PLATFORM_DIRECTIVES, {useValue: UxCard, multi: true}),
    provide(PLATFORM_DIRECTIVES, {useValue: UxTextArea, multi: true}),
]);