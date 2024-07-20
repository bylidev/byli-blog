import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListBlogsComponent} from './list-blogs/list-blogs.component';
import {ViewBlogComponent} from './view-blog/view-blog.component';
import {MatCardModule} from '@angular/material/card';
import {MarkdownModule, MarkedOptions} from 'ngx-markdown';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ScrollSpyComponent} from "./scroll-spy/scroll-spy.component";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [ListBlogsComponent, ViewBlogComponent, ScrollSpyComponent],
  imports: [
    CommonModule,
    MatCardModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
    }),
    RouterLink
  ],
})
export class BlogModule {
}
