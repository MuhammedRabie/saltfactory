import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  currentLang: string = 'en';

  gridItems = [
    { text: 'Industrial Automation', textAr: 'الأتمتة الصناعية' },
    { text: 'Process Control', textAr: 'التحكم في العمليات' },
    { text: 'PLC Programming', textAr: 'برمجة PLC' },
    { text: 'SCADA Integration', textAr: 'تكامل SCADA' },
    { text: 'Electrical Design', textAr: 'التصميم الكهربائي' },
    { text: 'Turnkey Solutions', textAr: 'حلول تسليم المفتاح' },
  ];

  gridImages = [
    'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.updateLangFromRoute(this.router.url);

    // Watch for route changes to update language
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const url = (event as NavigationEnd).urlAfterRedirects;
        this.updateLangFromRoute(url);
      });
  }

  private updateLangFromRoute(url: string) {
    const segments = url.split('/').filter(Boolean);
    const langSegment = segments[0];

    if (langSegment === 'ar' || langSegment === 'en') {
      this.currentLang = langSegment;
      document.documentElement.lang = this.currentLang;
      document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
    } else {
      this.currentLang = 'en';
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    }
  }
}
