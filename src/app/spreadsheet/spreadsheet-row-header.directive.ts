import { Input, Directive, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSpreadsheetRowHeader]'
})
export class SpreadsheetRowHeaderDirective {

  @Input() row: any;

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef
  ) {
    
  }

  display() {
    
  }

  hide() {
    this.container.detach();
  }
}
