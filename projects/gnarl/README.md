# GnarlPackage

Gnarls is a angular component enabling us to map any set of values to a circular slider with developer friendly experience. It is generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Installation

Use `npm install Gnarls --save` to install Gnarls in your angular project.

## Importing example

app.module.ts

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GnarlModule} from 'gnarls'

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GnarlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

app.component.ts

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  item = {key: 4, value: 'D'}
  
  
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
}
```

app.component.html

```html
<ls-gnarl
    [(value)] = "item"
    (invalidInput) = "invalid()"
    [buttonPos] = "'V'"
    [gnarlRadius]="170"
    [gnarlStrokeWidth]="6"
    [knobStrokeWidth]="1"
    [opacity]="0.2"
    [set]="set"
    [knobColor]='knobColor'
    [editableInput]="true">

<!-- Down arrow icon -->
  <svg class="down" width="40" height="40" x="-20" y="-20"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- <image xlink:href="../assets/resources/chevron_down.svg" height="40" width="40"/> -->
  </svg>


  <!-- Up arrow icon -->
    <svg class="up" width="40" height="40" x="-20" y="-20"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- <image xlink:href="../assets/resources/chevron_up.svg" height="40" width="40"/> -->
    </svg>

  <!-- Knob icon -->
    <svg class="knob" width="40" height="40" x="-20" y="-20"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <!-- <image xlink:href="../assets/resources/knob.svg" height="40" width="40"/> -->
    </svg>

</ls-gnarl>
```

## Wait for

More documentation will come soon!