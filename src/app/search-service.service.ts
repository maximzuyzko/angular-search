import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CountryModel} from "./models/country.model";

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http: HttpClient) { }

  getCountry(name: string): Observable<CountryModel> {
    const url = `https://covid-api.mmediagroup.fr/v1/history${name}`;
    return this.http.get<CountryModel>(url);
  }
}
