import { Component } from '@angular/core';
import {
  RouterOutlet,
  Router,
  NavigationStart,
  NavigationEnd,
  ChildrenOutletContexts
} from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { Loader } from './shared/loader/loader';
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  query,
  animate,
  group
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, Footer, Loader],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', style({
          position: 'fixed',
          width: '100%',
          height: '100%'
        }), { optional: true }),

        group([
          query(':leave', [
            animate('600ms ease-in-out', style({
              transform: 'translateX(-100%)',
              opacity: 0
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'translateX(100%)',
              opacity: 0
            }),
            animate('600ms ease-in-out', style({
              transform: 'translateX(0)',
              opacity: 1
            }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class App {
  constructor(router: Router, private contexts: ChildrenOutletContexts) {
    router.events.forEach(event => {
      if (event instanceof NavigationStart) Loader.show();
      if (event instanceof NavigationEnd) setTimeout(() => Loader.hide(), 500);
    });
  }

  prepareRoute() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
