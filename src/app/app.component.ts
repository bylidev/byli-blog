import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {List} from 'immutable';
import {Observable} from 'rxjs';
import {MenuService} from 'src/service/menu.service';
import {OverlayContainer} from "@angular/cdk/overlay";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  menu: Observable<List<any>>;
  router: Router;

  constructor(menuService: MenuService, router: Router,private overlayContainer: OverlayContainer) {
    this.menu = menuService.getMenu();
    this.router = router;
  }
}
