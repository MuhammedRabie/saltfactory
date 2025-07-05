import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="pageLoader" *ngIf="loading">
      <div class="loader-box text-center">
        <div
          class="spinner-border text-primary mb-3"
          style="width: 3rem; height: 3rem;"
          role="status"
        >
          <span class="visually-hidden">
            {{ currentLang === 'en' ? 'Loading...' : 'جاري التحميل...' }}
          </span>
        </div>
        <div class="loading-text">
          {{ currentLang === 'en'
            ? 'Loading, please wait...'
            : 'جاري التحميل، الرجاء الانتظار...' }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    #pageLoader {
      position: fixed;
      top: 0; left: 0;
      width: 100vw; height: 100vh;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(4px);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .loader-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      animation: fadeIn 0.4s ease-in-out;
    }

    .loading-text {
      font-size: 1.1rem;
      color: #333;
      font-weight: 500;
      text-align: center;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
  `]
})
export class Loader implements OnInit {
  static loading = true;
  currentLang = 'en';

  constructor(private router: Router) {}

  get loading() {
    return Loader.loading;
  }

  ngOnInit(): void {
    this.setLangFromRoute(this.router.url);

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(e => {
        this.setLangFromRoute((e as NavigationEnd).urlAfterRedirects);
      });
  }

  static show() {
    Loader.loading = true;
  }

  static hide() {
    Loader.loading = false;
  }

  setLangFromRoute(url: string) {
    const segments = url.split('/').filter(Boolean);
    const lang = segments[0];
    this.currentLang = lang === 'ar' ? 'ar' : 'en';
  }
}
