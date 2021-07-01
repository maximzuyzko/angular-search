import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, map, pluck} from "rxjs/operators";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('nameCountryInput', { static: true }) nameCountryInput!: ElementRef;
  //@ViewChild('dateStartInput', { static: true }) dateStartInput!: ElementRef;
  @Output() search: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() startDate: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() { }

  ngOnInit(): void {
    fromEvent(this.nameCountryInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        pluck('target', 'value'),
        distinctUntilChanged(),
        filter((value: any) => value.length > 1),
        map((value) => value)
      )
      .subscribe(value => {
        this.search.emit(value);
      });
  }

  dateStartInput(value: any) {
    this.startDate.emit( new Date(value));
    console.log(this.startDate)
  }

  reset() {
    this.search.emit(null)
    this.nameCountryInput.nativeElement.value = ''
  }
}
