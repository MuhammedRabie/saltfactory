import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer implements OnInit {
  currentLang = 'en';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setLangFromRoute(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.setLangFromRoute((e as NavigationEnd).urlAfterRedirects);
      });
  }

  setLangFromRoute(url: string) {
    const segments = url.split('/').filter(Boolean);
    const lang = segments[0];
    this.currentLang = lang === 'ar' ? 'ar' : 'en';
  }
}
