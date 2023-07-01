import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  name = 'Angular';
  matrix = {"xs":[15,8,5,19],"ys":[{"nb":1,"name":"Pos1"},{"nb":2,"name":"Pos2"},{"nb":3,"name":"Pos3"}],"records":[{"x":0,"y":0,"v":0},{"x":0,"y":1,"v":0},{"x":0,"y":2,"v":0},{"x":1,"y":0,"v":0},{"x":1,"y":1,"v":3},{"x":1,"y":2,"v":0},{"x":2,"y":0,"v":0},{"x":2,"y":1,"v":0},{"x":2,"y":2,"v":0},{"x":3,"y":0,"v":0},{"x":3,"y":1,"v":0},{"x":3,"y":2,"v":0}]};
}
