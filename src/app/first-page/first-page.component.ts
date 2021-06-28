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
        this.searchingCountries = countries;
      });
  }

  handleSearch(search: any) {
    this.searchingCountries = this.countries.filter(country => country["Country_text"] === search)
    console.log(this.searchingCountries)
  }
}

