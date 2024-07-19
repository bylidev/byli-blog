import {Component, ElementRef} from '@angular/core';
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
    private manifestService: ManifestService,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  mdContent: Subject<string> = new Subject<string>();
  headings: Element[] | undefined;

  onLoad(): void {
    this.setHeadings();
  }
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

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((element: Element, index: number) => {
      const id = `section${index + 1}`; // Genera IDs únicos
      element.id = id;
      headings.push(element);
    });
    this.headings = headings;
    console.log(this.headings);
  }
  ngOndestroy() {
    this.mdContent.unsubscribe();
  }
}
