import {Component, OnInit, Output} from '@angular/core';
import {SearchServiceService} from "../search-service.service";
import {CountryModel} from "../interfaces/country.model";

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  constructor(public searchServiceService: SearchServiceService) {
  }

  countries: CountryModel[] = [];

  ngOnInit(): void {
    this.searchServiceService.getCountries()
      .subscribe ((countries) => {
        this.countries = countries;
      });
  }
}

