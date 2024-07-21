import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {List} from "immutable";
import {AsyncPipe, NgClass, NgForOf} from "@angular/common";
import {Router} from "@angular/router";
import {MenuService} from "../../../service/menu.service";
import {MatChip} from "@angular/material/chips";

@Component({
  selector: 'app-blog-categories',
  standalone: true,
  imports: [
    AsyncPipe,
    MatChip,
    NgClass,
    NgForOf
  ],
  templateUrl: './blog-categories.component.html',
  styleUrl: './blog-categories.component.scss'
})
export class BlogCategoriesComponent {
  menu: Observable<List<any>>;
  router: Router;

  constructor(menuService: MenuService, router: Router) {
    this.menu = menuService.getMenu();
    this.router = router;
  }
}
