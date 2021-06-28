import {Component, Input, OnInit} from '@angular/core';
import { CountryModel } from "../interfaces/country.model";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input() searchText!: string;

  countries: CountryModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
