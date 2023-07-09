import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBlogsComponent } from './list-blogs/list-blogs.component';
import { ViewBlogComponent } from './view-blog/view-blog.component';
import { MatCardModule } from '@angular/material/card';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ListBlogsComponent, ViewBlogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
  ],
})
export class BlogModule {}
