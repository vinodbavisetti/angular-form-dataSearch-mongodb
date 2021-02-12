import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appLogit]',
})
export class LogitDirective implements OnInit, AfterViewInit {
  @Input() appLogit: any;

  constructor(private elref: ElementRef) {}

  ngOnInit() {
    console.log(this.elref);
  }

  ngAfterViewInit() {}
}
