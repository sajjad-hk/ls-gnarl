import { Component } from '@angular/core';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'ngs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  item = {key: 4, value: 'D'}
  item2 = {key: 2, value: '4b'}
  
  set = [
    {key: 0, value: 'A'},
    {key: 1, value: 'B'},
    {key: 2, value: 'C'},
    {key: 3, value: 'D'},
    {key: 4, value: 'E'},
    {key: 5, value: 'F'},
    {key: 6, value: 'G'},
    {key: 7, value: 'H'},
    {key: 8, value: 'I'},
    {key: 9, value: 'J'},
    {key: 10, value: 'K'},
    {key: 11, value: 'L'},
    {key: 12, value: 'M'},
    {key: 13, value: 'N'},
    {key: 14, value: 'O'},
    {key: 15, value: 'P'},
    {key: 16, value: 'Q'},
    {key: 17, value: 'R'},
    {key: 18, value: 'S'},
    {key: 19, value: 'T'},
    {key: 20, value: 'U'},
    {key: 21, value: 'V'},
    {key: 22, value: 'W'},
    {key: 23, value: 'X'},
    {key: 24, value: 'Y'},
    {key: 25, value: 'Z'},
  ]
    set2 = [
    {key: 0, value:'4a'},
    {key: 1, value:'4a+'},
    {key: 2, value:'4b'},
    {key: 3, value:'4b+'},
    {key: 4, value:'4c'},
    {key: 5, value:'4c+'},
    {key: 6, value:'5a'},
    {key: 7, value:'5a+'},
    {key: 8, value:'5b'},
    {key: 9, value:'5b+'},
    {key: 10, value:'5c'},
    {key: 11, value:'5c+'},
    {key: 12, value:'6a'},
    {key: 13, value:'6a+'},
    {key: 14, value:'6b'},
    {key: 15, value:'6b+'},
    {key: 16, value:'6c'},
    {key: 17, value:'6c+'},
    {key: 18, value:'7a'},
    {key: 19, value:'7a+'},
    {key: 20, value:'7b'},
    {key: 21, value:'7b+'},
    {key: 22, value:'7c'},
    {key: 23, value:'7c+'},
    {key: 24, value:'8a'},
    {key: 25, value:'8a+'},
    {key: 26, value:'8b'},
    {key: 27, value:'8b+'},
    {key: 28, value:'8c'},
    {key: 29, value:'8c+'},
    {key: 30, value:'9a'},]

    onInvalidInput() {
      alert('Invalid Input')
    }

    onValueChange() {
      console.log(this.item2);
    }
  
}
