import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'appName';
  items: MenuItem[] = [
    { label: 'Product List', icon: '', routerLink: ['/'] },
    { label: 'Cart', icon: '', routerLink: ['/cart'] },
  ];
  constructor() {}
}
