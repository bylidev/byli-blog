import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  getMenu(): Observable<Array<{ icon?: string; title: string; href: string }>> {
    return of([
      { title: 'Home', href: '/' },
      { title: 'Homelab', href: '/homelab' },
      {
        title: 'Design Patterns',
        href: '/design-patterns',
      },
    ]);
  }
}
