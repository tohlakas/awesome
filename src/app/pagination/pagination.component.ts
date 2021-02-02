import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from "@angular/core";
import paginate from "../util/paginate";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit {
  @Input() items: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() settings = {
    pageSize: 100,
    maxPages: 5
  };

  pager: any = {};

  ngOnInit() {
    console.log("this.settings pager --> ", this.settings);
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items.currentValue !== changes.items.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  setPage(page: number) {
    this.pager = paginate(
      this.items.length,
      page,
      this.settings.pageSize,
      this.settings.maxPages
    );
    var pageOfItems = this.items.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    this.changePage.emit(pageOfItems);
  }
}
