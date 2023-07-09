import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Manifest, ManifestService } from 'src/service/manifest.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.scss'],
})
export class ListBlogsComponent {
  router: Router;
  constructor(private manifestService: ManifestService, router: Router) {
    this.router = router;
  }
  manifestMap: Observable<Map<string, Manifest>> =
    this.manifestService.getManifest();
}
