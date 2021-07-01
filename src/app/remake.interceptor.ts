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

            event.body.map((country: any) => {
              return body.push( {
                activeCases: country["Active Cases_text"],
                country: country["Country_text"],
                lastUpdate: country["Last Update"],
                newCases: country["New Cases_text"],
                newDeaths: country["New Deaths_text"],
                totalCases: country["Total Cases_text"],
                totalDeaths: country["Total Deaths_text"],
                totalRecovered: country["Total Recovered_text"],
              })

            });

            function getRandomDate (currentDate: string) {
              let minDate = Date.parse(currentDate) - (604800*1000);
              let maxDate = Date.parse(currentDate);
              return new Date(Math.floor(Math.random() * (maxDate - minDate + 1)) + minDate);
            }


            body.forEach((country) => {
              country.lastUpdate = getRandomDate(country.lastUpdate).toLocaleDateString();
              }
            )
            console.log(body)

            const cloneEvent = event.clone({
              body
            });

            return cloneEvent;
          }

          return event
        }
      ));
  }
}
