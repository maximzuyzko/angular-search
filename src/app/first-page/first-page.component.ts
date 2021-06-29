import { Component, OnInit } from '@angular/core';
import { SearchServiceService } from "../search-service.service";
import { CountryModel } from "../interfaces/country.model";

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  constructor(public searchServiceService: SearchServiceService) {
  }

  countries: CountryModel[] = [];
  searchingCountries: CountryModel[] = [];

  ngOnInit(): void {
    this.searchServiceService.getCountries('')
      .subscribe ((countries) => {
        this.countries = countries;
        this.searchingCountries = countries.slice(0, -1);
      });
  }

  handleSearch(search: any) {
    debugger
    this.searchingCountries = this.countries.filter(country => country["Country_text"].includes(search))
    debugger
    console.log(this.searchingCountries)
  }
}

