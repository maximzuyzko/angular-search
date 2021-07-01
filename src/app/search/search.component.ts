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
  @Output() endDate: EventEmitter<Date> = new EventEmitter<Date>();

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

  dateStartInput(value: Event) {
    const target = value.target as HTMLInputElement;
    this.startDate.emit(new Date(target.value));
  }

  dateEndInput(value: Event) {
    const target = value.target as HTMLInputElement;
    this.endDate.emit(new Date(target.value));
  }

  resetName() {
    this.search.emit(null);
    this.nameCountryInput.nativeElement.value = '';
  }

  resetStartDate() {
    this.startDate.emit(null);
  }

  resetEndDate() {
    this.endDate.emit(null);
  }

  resetAll() {
    this.search.emit(null);
    this.nameCountryInput.nativeElement.value = '';
    this.startDate.emit(null);
    this.endDate.emit(null);
  }
}
