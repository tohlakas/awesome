import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { IUserList, IUser } from './user-list.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  @Input() data;

  settings = {
    columns: {
      firstname: {
        title: 'Eesnimi'
      },
      surname: {
        title: 'Perekonnanimi'
      },
      sex: {
        title: 'Sugu'
      },
      personal_code: {
        title: 'Sünnikuupäev'
      },
      phone: {
        title: 'Telefon'
      }
    },
    pager: {
      pageSize: 10,
      maxPages: 5,
    }
  };

  dataCopy = [];
  pageOfItems: Array<any>;
  headers = [];
  direction = false;
  sortHeader = '';


  public userlist: IUser[];
  currentPage: Number;
  selectedId: any;

  select(id:any ) {

    if ( this.selectedId == id ) {
      this.selectedId = false;
      }  else if  ( id ) {
      this.selectedId = id;
    }
  }

  constructor(private httpService: HttpClient) { }

  ngOnInit() {
    this.httpService.get<IUserList>('http://proovitoo.twn.ee/api/list.json').subscribe(data => {
      this.userlist = data.list;

      this.userlist.map( item => {
          
          item.sex = item.sex === "f" ? 'Naine' : 'Mees';

          var cent = JSON.stringify(item.personal_code)[0] < '5' ? '19' : '20'
          var y = JSON.stringify( item.personal_code ).slice( 1, 3) +"."+ JSON.stringify( item.personal_code ).slice( 5, 7)+"."+ JSON.stringify( item.personal_code ).slice( 3, 5)
          item.personal_code = cent + y;      
          return item;

      });
      
      this.headers = Object.keys(this.settings.columns);
      this.dataCopy = this.userlist;
      console.log(this.currentPage);
      },

      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
  }

  ngOnChanges() {

    this.dataCopy = this.userlist;
    console.log(this.dataCopy);
    this.headers = Object.keys(this.settings.columns);
  }

  compareValues(direction: any, a: any, b: any) {
    if (a < b) {
      return -1 * direction;
    }
    if (a > b) {
      return direction;
    }
    return 0;
  }

  sort(header: string) {

    if(this.sortHeader === header) {
      this.direction = !this.direction;
    } else {
      this.direction = false;
    }

    this.sortHeader = header;


    const dir: number = this.direction ? 1 : -1;

    const compare: Function = this.compareValues;
    
    let dataCopy = this.userlist.sort((a, b) => {
      return compare.call(null, dir, a[header], b[header]);
    });

    
    this.dataCopy = JSON.parse(JSON.stringify(dataCopy));
  
  }
  

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }
}
