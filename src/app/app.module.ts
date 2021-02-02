import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { UserListComponent } from './user-list/user-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    UserListComponent,
    PaginationComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'user-list', component: UserListComponent},
      {path: 'article', component: ArticleComponent},
      {path: '', redirectTo: '/user-list', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { FormsModule } from '@angular/forms';
