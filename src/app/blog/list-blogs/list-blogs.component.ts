import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Manifest, ManifestService } from 'src/service/manifest.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.scss'],
})
export class ListBlogsComponent {
  router: Router;
  manifestMap: Subject<Map<string, Manifest>> = new Subject<
    Map<string, Manifest>
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
          .subscribe((data: Map<string, Manifest>) => {
            this.manifestMap.next(data);
          });
      } else {
        this.manifestService
          .getManifest()
          .subscribe((data: Map<string, Manifest>) => {
            this.manifestMap.next(data);
          });
      }
    });
  }

  ngOnDestroy() {
    this.manifestMap.unsubscribe();
  }
}
