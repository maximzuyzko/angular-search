import {Component, Input, OnInit, Output} from '@angular/core';
import { CountryModel } from "../interfaces/country.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() countries = [];


  constructor() { }

  ngOnInit(): void {
  }

}
