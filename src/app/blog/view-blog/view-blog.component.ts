import { Component } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Observable, Subject, filter } from 'rxjs';
import { ManifestService } from 'src/service/manifest.service';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent {
  constructor(
    private markDownService: MarkdownService,
    private route: ActivatedRoute,
    private manifestService: ManifestService
  ) {}
  mdContent: Subject<string> = new Subject<string>();

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.manifestService.getManifestValue(params['id']).subscribe(
        (value) => {
          this.mdContent.next(value.md);
          this.markDownService.reload();
        },
        (err) => {
          this.manifestService.getManifestValue('404').subscribe((value) => {
            this.mdContent.next(value.md);
            this.markDownService.reload();
          });
        }
      );
    });
  }

  ngOndestroy() {
    this.mdContent.unsubscribe();
  }
}
