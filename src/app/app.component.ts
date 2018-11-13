import { Component } from '@angular/core';

@Component({
  selector: 'ngs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  set = [
    {key: 0, value: '4'},
    {key: 1, value: '5'},
    {key: 3, value: '6'},
    {key: 4, value: '7'}
  ]
}
