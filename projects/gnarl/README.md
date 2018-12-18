# GnarlPackage

Gnarls is a angular component enabling us to map any set of values to a circular slider with developer friendly experience. It is generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Installation

Use `npm install Gnarls --save` to install Gnarls in your angular project.

## Importing/Usage

### app.module.ts

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

### app.component.ts

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
  onInvalidInput() {
      console.log('%c WARN => Invalid Input value!', 'color: red; font-weight: bold;')
    }

  onValueChange() {
      console.log('%c INFO => Input value changed to:', 'color: green; font-weight: bold;', this.item2)
  }
}
```

### app.component.html

```html
<ls-gnarl
    [(value)] = "item2"
    (invalidInput) = "onInvalidInput()"
    (valueChange) = "onValueChange()"
    [buttonPos] = "'V'"
    [gnarlRadius]="170"
    [gnarlStrokeWidth]="6"
    [knobStrokeWidth]="1"
    [opacity]="0.2"
    [set]="set2"
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

### styles.scss

```scss
.gnarl-container {
    ls-gnarl {
        ls-gnarl-input {
            .input-txt-value {
                color: white;
                font: Arial;
            }
            .input-txt-value:focus {
                border-bottom: 1px solid white;
                outline: none;

            }
            .input-txt-value-invalid:focus {
                border-bottom: 1px solid red;
            }
            .output-txt-value {
                color: white;
                font: Arial;

                text-shadow: 0px 4px 3px rgba(0,0,0,0.5),
                0px 8px 13px rgba(0,0,0,0.1),
                0px 18px 23px rgba(0,0,0,0.1);
            }
        }
    }
}
```

## Attributes

|  Attribute name  | Possible Value                                          | Description |
| ---------------- | ------------------------------------------------------- | ---------------
| set  | [{key: 0, value: 'A'},{key: 1, value: 'B'}, ...]  | The structure of array you need to follow for this component. |
| value  | any member of set: {key: 0, value: 'A'}  | The carrot bind value can help to set first value and value dynamically. |
| buttonPos | 'V', 'H', 'N' | positioning the control buttons Horizantal, Vertical, None. |
| gnarlRadius | a number:  150 | Radius of slider. |
| gnarlStrokeWidth | a number: 5 | stroke of slide.r |
| knobStrokeWidth | a number: 2 | strok of knob in case you don't want to use icon. |
| opacity | 0 - 1 number: 0.2 | opacity of slider. |
| knobColor | a Hex Color Code: '#808080' | Color for knob in case you don't want to use icon. |
| editableInput | a boolean value:  true | have editable Input in center of circle. |
| invalidInput | a callback function : `()=>console.log('I am invalid')` | this callback make sense when you need to have editable input and take action in case of invalid input. |
| valueChange | a callback function: `()=>console.log(item)` | This function would help if you need take action on value change. |

## Styles

| Class | Description |
|------ | ------------|
|input-txt-value | |
|input-txt-value-invalid| |
|output-txt-value | |

### Please share with me your suggestions ;)