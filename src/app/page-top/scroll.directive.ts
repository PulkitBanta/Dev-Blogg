import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {

  constructor(
    private elRef: ElementRef
  ) {
    elRef.nativeElement.hidden = true;
  }

  @HostListener('window:scroll') onScroll () {
      this.display(window.pageYOffset);
  }

  display(value: number) {
    this.elRef.nativeElement.hidden = value > 400 ? false: true;
  }

}
