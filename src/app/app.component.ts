import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from 'src/service/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menu: Observable<Array<{ icon?: string; title: string; href: string }>>;
  title = 'Byli.dev!';

  constructor(menuService: MenuService) {
    this.menu = menuService.getMenu();
  }
}
