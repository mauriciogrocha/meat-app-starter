import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventListener } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  rates: number[] = [1,2,3,4,5]

  rate: number = 0

  previousRate: number

  @Output() rated = new EventEmitter<number>()

  constructor() { }

  ngOnInit() {
  }

  setRate(rate: number) {
    this.rate = rate
    this.previousRate = undefined
    this.rated.emit(this.rate)
  }

  setTemporaryRate(rate: number) {
    if (this.previousRate === undefined) {
         this.previousRate = rate
    }
    this.rate = rate
  }

  clearTemporaryRate() {
    if (this.previousRate !== undefined) {
      this.rate = this.previousRate
      this.previousRate = undefined
    }
  }

}
