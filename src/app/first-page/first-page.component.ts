import { Component, OnInit } from '@angular/core';
import { SearchServiceService } from "../search-service.service";
import { CountryModel } from "../interfaces/country.model";
import { LocalStorageService } from "../local-storage.service";

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  constructor(public searchServiceService: SearchServiceService,
              public localStorageService: LocalStorageService) { }


  countries: CountryModel[] = [];
  searchingCountries: CountryModel[] = [];

  ngOnInit(): void {
    this.searchServiceService.getCountries('')
      .subscribe ((countries) => {
        this.countries = countries.slice(0, -1);

        const countryName = this.localStorageService.getItem('name');

        if (countryName) {

          this.searchingCountries = this.countries
            .filter((country) => {
              return country.country.toLowerCase()
                .includes(countryName.toLowerCase());
            })
        } else {
          this.searchingCountries = this.countries;
        }

      });
  }

  handleSearch(search: string | null) {

    if (search === null) {
      this.localStorageService.removeItem('name')
      this.searchingCountries = this.countries;
    } else {
      this.localStorageService.setItem('name', search);

      this.searchingCountries = this.countries.filter((country) => {
        return country.country.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

  dateStartInput(change: Date | null) {

    if (change === null) {
      this.localStorageService.removeItem('date')
      this.searchingCountries = this.countries;
    } else {
      this.localStorageService.setItem('date', change.toLocaleDateString());

      this.searchingCountries = this.countries.filter((country) => {
        return country.lastUpdate >= change.toLocaleDateString();
    });
  }
}
}
