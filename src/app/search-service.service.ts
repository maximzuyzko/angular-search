import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CountryModel } from "./interfaces/country.model";

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http: HttpClient) { }

  getCountries(query: string): Observable<CountryModel[]> {
    const url = `https://covid-19.dataflowkit.com/v1`;
    return this.http.get<CountryModel[]>(url);
  }
}
