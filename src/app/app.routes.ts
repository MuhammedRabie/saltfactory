import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Products } from './pages/products/products';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: ':lang',
    children: [
      { path: '', component: Home, data: { animation: 'Home' } },
      { path: 'about', component: About, data: { animation: 'About' } },
      { path: 'products', component: Products, data: { animation: 'Products' } },
      { path: 'contact', component: Contact, data: { animation: 'Contact' } },
    ]
  },
  { path: '', redirectTo: 'en', pathMatch: 'full' },
  { path: '**', redirectTo: 'en' }
];
