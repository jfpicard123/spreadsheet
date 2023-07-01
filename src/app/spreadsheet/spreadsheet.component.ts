import { AfterViewInit } from '@angular/core';
import {
  Component,
  ContentChildren,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
QueryList,
TemplateRef,
} from '@angular/core';
import { SpreadsheetRowHeaderDirective } from './spreadsheet-row-header.directive';
import { SpreadsheetRowHeaderComponent } from './spreadsheet-row-header/spreadsheet-row-header.component';
import { Matrix } from './spreadsheet.models';

interface NgStyleObject {
  'grid-template-columns'?: string;
  'grid-template-rows'?: string;
}

@Component({
  selector: 'afmis-spreadsheet',
  templateUrl: 'spreadsheet.component.html',
  styleUrls: ['spreadsheet.component.scss'],
})
export class SpreadsheetComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
  }

    name = 'Angular';
  
    data: number[] = [];
    cols: string[] = [];
    rows: string[] = [];
    gridStyle: NgStyleObject = {}
    columnTotals: any[];
    rowTotals: any[];
    
    @ContentChildren(SpreadsheetRowHeaderComponent) rowHeaderTemplates: QueryList<any>;

    @Input() rowTemplate: TemplateRef<any>;
    @Input() columnTemplate: TemplateRef<any>;
  
    _matrix: Matrix;
    get matrix(): Matrix {
        return this._matrix;
    }
    @Input() set matrix(value: Matrix) {
      if(value) {
        this._matrix = value;
        this.cols = this._matrix.xs;
        this.rows = this._matrix.ys;
        this.data = this._matrix.records.map((r) => r.v);
  
        this.columnTotals = [...Array(this.cols.length).fill(null)];
        this.rowTotals = [...Array(this.rows.length).fill(null)];
  
        var totalColumns = this.cols.length + 3;
        var columnWidth = 100 / totalColumns;
  
        var gridTemplateColStyle = '';
        for (var i = 0; i < totalColumns; i++) {
          gridTemplateColStyle =
            gridTemplateColStyle + columnWidth.toString() + '% ';
        }
  
        var gridTemplateRowStyle = '';
        for (var i = 0; i < this.rows.length + 2; i++) {
          gridTemplateRowStyle = gridTemplateRowStyle + '25px ';
        }
  
        this.gridStyle = {
          'grid-template-columns': gridTemplateColStyle,
          'grid-template-rows': gridTemplateRowStyle,
        };
        this.onChange();
      }
    }
  
    @Output() valueChanged: EventEmitter<any> = new EventEmitter();
    private _valueChanged(){
      this.valueChanged.emit({ matrix: this._matrix, rowTotals: this.rowTotals, colTotals: this.columnTotals});
    }
  
    ngOnInit(): void {
      if(this._matrix) {
        
      }
    }
  
    trackByFn(index: number, item: any) {
      return index;
    }
  
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      if (event.keyCode == 39) {
        this.right();
      } else if (event.keyCode == 37) {
        this.left();
      } else if (event.keyCode == 38) {
        this.up();
      } else if (event.keyCode == 40 || event.keyCode == 13) {
        this.down();
      }
    }
  
    onChange() {
      
      var step = this.cols.length;
      this.columnTotals.forEach((s, sumIndex) => {
        this.columnTotals[sumIndex] = this.data.reduce(
          (sum, val, dataIndex) =>
            dataIndex % step == sumIndex ? sum + +val : sum,
          0
        );
      });
      
      this.rowTotals.forEach((rs, rowTotalsIndex) => {
        this.rowTotals[rowTotalsIndex] = this.data.reduce(
          (sum, val, dataIndex) =>
            Math.floor(dataIndex / step) == rowTotalsIndex ? sum + +val : sum,
          0
        );
      });
  
      this.dataToMatrix();
      this._valueChanged();
    }
  
    dataToMatrix() {
      this._matrix.records = [];
      this.rows.forEach((row, rowIndex) => {
        this.cols.forEach((col, colIndex) => {
          var dataIndex = rowIndex * this.cols.length + colIndex;
          this._matrix.records.push( {
            x: rowIndex,
            y: colIndex,
            v: this.data[dataIndex]
          })
        })
      })
    }
  
    left() {
      var activeElement = document.getElementById(document.activeElement.id);
      if (+activeElement.id > 0) {
        (<HTMLElement>activeElement.previousElementSibling).focus();
      }
    }
  
    right() {
      var activeElement = document.getElementById(document.activeElement.id);
      if (+activeElement.id < this.data.length) {
        (<HTMLElement>activeElement.nextElementSibling).focus();
      }
    }
  
    up() {
      var id = document.activeElement.id;
      var nextId = +id - this.cols.length;
      if (nextId >= 0) {
        document.getElementById(nextId.toString()).focus();
      }
    }
  
    down() {
      var id = document.activeElement.id;
      var nextId = +id + this.cols.length;
      if (nextId < this.data.length) {
        document.getElementById(nextId.toString()).focus();
      }
    }
  }
  
  