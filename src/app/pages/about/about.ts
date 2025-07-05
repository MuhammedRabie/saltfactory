import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  currentLang: string = 'en';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setLang(this.router.url);

    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(e => {
      this.setLang((e as NavigationEnd).urlAfterRedirects);
    });
  }

  setLang(url: string) {
    const lang = url.split('/')[1];
    this.currentLang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.lang = this.currentLang;
    document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }
}
