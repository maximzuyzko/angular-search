import { Component, OnInit } from '@angular/core';
import { CountryModel } from "../models/country.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  countries: CountryModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
