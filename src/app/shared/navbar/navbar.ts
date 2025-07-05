import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  isScrolled = false;
  currentLang = 'en';

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateLanguageFromUrl(this.router.url);

    // Listen to route changes and update lang
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateLanguageFromUrl(event.urlAfterRedirects || event.url);
      });
  }

  private updateLanguageFromUrl(url: string) {
    const segments = url.split('/').filter(Boolean);
    const lang = segments[0];
    if (lang === 'en' || lang === 'ar') {
      this.currentLang = lang;
      localStorage.setItem('lang', lang);
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  switchLanguage(lang: string) {
    if (lang === this.currentLang) return;

    const segments = this.router.url.split('/').filter(Boolean);
    if (segments.length === 0) {
      this.router.navigate([`/${lang}`]);
    } else {
      segments[0] = lang;
      this.router.navigate(['/', ...segments]);
    }
  }
}
