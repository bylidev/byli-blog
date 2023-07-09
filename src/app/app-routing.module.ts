import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListBlogsComponent } from './blog/list-blogs/list-blogs.component';
import { ViewBlogComponent } from './blog/view-blog/view-blog.component';

const routes: Routes = [
  {
    path: '',
    component: ListBlogsComponent,
  },
  {
    path: ':id',
    component: ViewBlogComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
