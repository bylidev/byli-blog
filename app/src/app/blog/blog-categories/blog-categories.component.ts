import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { MenuService } from '../../../service/menu.service';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'app-blog-categories',
  standalone: true,
  imports: [AsyncPipe, MatChip, NgClass, NgForOf],
  templateUrl: './blog-categories.component.html',
  styleUrl: './blog-categories.component.scss',
})
export class BlogCategoriesComponent {
  menu: Observable<List<any>>;
  router: Router;

  constructor(menuService: MenuService, router: Router) {
    this.menu = menuService.getMenu();
    this.router = router;
  }

  navigateToTag(tag: string): void {
    if (tag === 'all') {
      this.router.navigateByUrl('/');
      return;
    }

    this.router.navigateByUrl('tag/' + tag);
  }

  isSelected(tag: string): boolean {
    const currentTag = this.getCurrentTagFromUrl();
    return currentTag === tag;
  }

  private getCurrentTagFromUrl(): string {
    const url = this.router.url || '/';

    if (url === '/' || url === '') {
      return 'all';
    }

    if (url.startsWith('/tag/')) {
      const rawTag = url.split('/tag/')[1]?.split('?')[0]?.split('#')[0] ?? '';
      return decodeURIComponent(rawTag || 'all');
    }

    return 'all';
  }
}
