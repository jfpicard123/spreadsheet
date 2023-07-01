import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'afmis-spreadsheet-row-header',
  templateUrl: './spreadsheet-row-header.component.html',
  styleUrls: ['./spreadsheet-row-header.component.css'],
})
export class SpreadsheetRowHeaderComponent {
  constructor() {
  }
  @Input() row: any;

  @ContentChild(TemplateRef) template;

  
}
