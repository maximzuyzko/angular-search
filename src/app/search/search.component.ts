import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('nameCountryInput', { static: true }) nameCountryInput: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

}
