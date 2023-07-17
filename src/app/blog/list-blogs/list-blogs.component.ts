import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderedMap } from 'immutable';
import { Observable, Subject } from 'rxjs';
import { Manifest, ManifestService } from 'src/service/manifest.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.scss'],
})
export class ListBlogsComponent {
  router: Router;
  manifestMap: Subject<OrderedMap<string, Manifest>> = new Subject<
    OrderedMap<string, Manifest>
  >();
  constructor(
    private manifestService: ManifestService,
    router: Router,
    private route: ActivatedRoute
  ) {
    this.router = router;
  }
  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['tag'] != null) {
        this.manifestService
          .getManifestByTag(params['tag'])
          .subscribe((data: OrderedMap<string, Manifest>) => {
            this.manifestMap.next(data);
          });
      } else {
        this.manifestService
          .getManifest()
          .subscribe((data: OrderedMap<string, Manifest>) => {
            this.manifestMap.next(data);
          });
      }
    });
  }

  ngOnDestroy() {
    this.manifestMap.unsubscribe();
  }
}
