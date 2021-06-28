import {Component, OnInit, Output} from '@angular/core';
import {SearchServiceService} from "../search-service.service";

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {
  @Output() country = {};
  @Output() countries = [];

  constructor(public searchServiceService: SearchServiceService) {
  }

  ngOnInit(): void {
    this.searchServiceService.getCountries()
      .subscribe ((countries) => {
        this.countries = countries;
      });
  }
}

