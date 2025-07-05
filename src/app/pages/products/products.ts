import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  currentLang = 'en';

  products = [
    {
      name: 'SCADA System',
      nameAr: 'نظام SCADA',
      description: 'Advanced SCADA for real-time monitoring.',
      descriptionAr: 'نظام SCADA متطور للمراقبة في الوقت الحقيقي.'
    },
    {
      name: 'Control Panels',
      nameAr: 'لوحات التحكم',
      description: 'Custom-built panels for automation needs.',
      descriptionAr: 'لوحات مخصصة لتلبية احتياجات الأتمتة.'
    },
    {
      name: 'PLC Systems',
      nameAr: 'أنظمة PLC',
      description: 'Reliable PLCs for industrial processes.',
      descriptionAr: 'أنظمة PLC موثوقة للعمليات الصناعية.'
    }
  ];

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
