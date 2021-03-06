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
  @Output() search: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() startDate: EventEmitter<string | null> = new EventEmitter<string | null>();
  @Output() endDate: EventEmitter<string | null> = new EventEmitter<string | null>();

  dateStartInput: string = '';
  dateEndInput: string = '';

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

  dateStartInputChange(dateStartInput: string | null) {
    this.startDate.emit(dateStartInput);
  }

  dateEndInputChange(dateEndInput: string | null) {
    this.endDate.emit(dateEndInput);
  }

  resetName() {
    this.search.emit(null);
    this.nameCountryInput.nativeElement.value = '';
  }

  resetStartDate() {
    this.startDate.emit(null);
    this.dateStartInput = '';
  }

  resetEndDate() {
    this.endDate.emit(null);
    this.dateEndInput = '';
  }

  resetAll() {
    this.search.emit(null);
    this.startDate.emit(null);
    this.endDate.emit(null);
    this.nameCountryInput.nativeElement.value = '';
    this.dateStartInput = '';
    this.dateEndInput = '';
  }
}
