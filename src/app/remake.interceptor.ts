import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse, HttpSentEvent
} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {CountryModel} from "./interfaces/country.model";

@Injectable()
export class RemakeInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone()

    return next.handle(authReq).pipe(
      map(
        (event) => {
          if (event instanceof HttpResponse){
            console.log(typeof event.body)

            let body = [] as any[];
            debugger
            /*"Active Cases_text":string,
              "Country_text":string,
              "Last Update":string,
              "New Cases_text":string,
              "New Deaths_text":string,
              "Total Cases_text":string,
              "Total Deaths_text":string,
              "Total Recovered_text":string


              countryClone = {
                activeCases: country["Active Cases_text"],
                country: country["Country_text"],
                lastUpdate: country["Last Update"],
                newCases: country["New Cases_text"],
                newDeaths: country["New Deaths_text"],
                totalCases: country["Total Cases_text"],
                totalDeaths: country["Total Deaths_text"],
                totalRecovered: country["Total Recovered_text"],
              };
              */
            // body.push(activeCases) =
            event.body.map((country: any) => {
              //debugger
              let countryClone = {
                countryClone.activeCases = country["Active Cases_text"];
                countryClone.country = country["Country_text"];
                countryClone.lastUpdate = country["Last Update"];
                countryClone.newCases = country["New Cases_text"];
                countryClone.newDeaths = country["New Deaths_text"];
                countryClone.totalCases = country["Total Cases_text"];
                countryClone.totalDeaths = country["Total Deaths_text"];
                countryClone.totalRecovered = country["Total Recovered_text"];
              };

              return countryClone;
            });

            const cloneEvent = event.clone({
              body
            });


            debugger
            return cloneEvent;
          }

          return event
        }
      ));
  }
}
