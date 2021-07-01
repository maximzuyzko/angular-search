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
        const countryStartDate = this.localStorageService.getItem('startDate');
        const countryEndDate = this.localStorageService.getItem('endDate');

        if (countryName) {

          this.searchingCountries = this.countries
            .filter((country) => {
              return country.country.toLowerCase()
                .includes(countryName.toLowerCase());
            })

        }
        if (countryStartDate) {

          this.searchingCountries = this.searchingCountries
            .filter((country) => {
              debugger
              let a = new Date(country.lastUpdate);
              let b = new Date(countryStartDate);
              return a.getTime() >=  b.getTime();
            })

        }
        if (countryEndDate) {

          this.searchingCountries = this.searchingCountries
            .filter((country) => {
              let a = new Date(country.lastUpdate);
              let b = new Date(countryEndDate);
              return a.getTime() <=  b.getTime();
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

  dateStartInput(startDate: Date | null) {

    if (startDate === null) {
      this.localStorageService.removeItem('dateStart')
      this.searchingCountries = this.countries;
    } else {
      this.localStorageService.setItem('dateStart', startDate.toLocaleDateString());
      this.searchingCountries = this.countries.filter((country) => {
        let a = new Date(country.lastUpdate);
        let b = new Date(startDate);
        return a.getTime() >=  b.getTime();
      });
    }
  }

  dateEndInput(endDate: Date | null) {

    if (endDate === null) {
      this.localStorageService.removeItem('dateEnd')
      this.searchingCountries = this.countries;
    } else {
      this.localStorageService.setItem('dateEnd', endDate.toLocaleDateString());
      this.searchingCountries = this.countries.filter((country) => {
        let a = new Date(country.lastUpdate);
        let b = new Date(endDate);
        return a.getTime() <=  b.getTime();
      });
    }
  }
}
