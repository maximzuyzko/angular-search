import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchText!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
