import { Component, OnInit } from '@angular/core';
import { SearchServiceService } from "../search-service.service";
import { CountryModel } from "../interfaces/country.model";
import { LocalStorageService } from "../local-storage.service";

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent implements OnInit {
  constructor(public searchServiceService: SearchServiceService,
              public localStorageService: LocalStorageService) { }


  countries: CountryModel[] = [];
  searchingCountries: CountryModel[] = [];

  ngOnInit(): void {
    this.searchServiceService.getCountries('')
      .subscribe ((countries) => {
        this.countries = countries.slice(0, -1);
        this.searchingCountries = this.applyFilters();

      });
  }

  applyFilters () {
    const countryName = this.localStorageService.getItem('name2');
    const countryStartDate = this.localStorageService.getItem('dateStart2');
    const countryEndDate = this.localStorageService.getItem('dateEnd2');


    let filteredCountries = this.countries;

    if (countryName) {

      filteredCountries = filteredCountries
        .filter((country) => {
          return country.country.toLowerCase().includes(countryName.toLowerCase());
        })

    }

    if (countryStartDate) {

      filteredCountries = filteredCountries
        .filter((country) => {
          let a = new Date(country.lastUpdate);
          let b = new Date(countryStartDate);
          let bUtc = new Date(b.getTime() + b.getTimezoneOffset() * 60000);
          return a.getTime() >=  bUtc.getTime();
        })

    }

    if (countryEndDate) {

      filteredCountries = filteredCountries
        .filter((country) => {
          let a = new Date(country.lastUpdate);
          let b = new Date(countryEndDate);
          let bUtc = new Date(b.getTime() - (5 * (b.getTimezoneOffset() * 60000))-1);
          return a.getTime() <=  bUtc.getTime();
        })

    }
    return filteredCountries;
  }

  setFilter(filterName : string, filterValue: string | null) {
    if (filterValue === null) {
      this.localStorageService.removeItem(filterName);
    } else {
      this.localStorageService.setItem(filterName, filterValue);
    }
    this.searchingCountries = this.applyFilters();
  }
}

