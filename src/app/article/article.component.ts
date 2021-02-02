import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { IArticle } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor (private httpService: HttpClient) { }
 public article: IArticle;


  ngOnInit () {
    this.httpService.get<IArticle>('http://proovitoo.twn.ee/api/article.json').subscribe(data => {

        this.article = data;	 

      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

}
