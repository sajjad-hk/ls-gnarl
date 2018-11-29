import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
import { ICartesianCoordinate } from "./models/coordinates";
import { GnarlService } from "./gnarl.service";
import { fromEvent, merge } from 'rxjs';
import { switchMap, takeUntil, throttleTime } from 'rxjs/operators';
import * as _ from 'lodash';
@Component({
    selector: "ls-gnarl",
    templateUrl: "./gnarl.component.html",
    styleUrls: ["./gnarl.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class GnarlComponent implements OnInit {

    @Input()
    gnarlRadius: number = 200;
    @Input()
    gnarlColor: string = '#171717';
    @Input()
    gnarlStrokeWidth: number = 5;
    @Input()
    opacity: number = 0.25;
    @Input()
    knobRadius: number = 20;
    @Input()
    knobColor: string = '#C0C0C0';
    @Input()
    knobStrokeWidth: number = 1;
    @Input()
    set: Array<any>
    @Input() 
    editableInput: boolean = true;
    @Input() 
    editBoxIgnorCase: boolean = true

    knobPoint: ICartesianCoordinate;
    currentItem: any;
    currentIndex: number = 0

    @ViewChild('knob')
    knob: ElementRef;
    @ViewChild('gnarl')
    gnarl: ElementRef;
    @ViewChild('rail')
    rail: ElementRef;
    @ViewChild('control')
    control: ElementRef;

    constructor(private service: GnarlService) {
    }
    
    onChange(event: string) {
      const i = this.set.findIndex(x => this.compareTo(x.value, event, this.editBoxIgnorCase) )
      if (i >= 0)  {
        this.knobPoint = this.service.transformingByItemIndex(i)
      }
    }

    compareTo(value1: string, value2: string, ignoreCase: boolean) {
      if (ignoreCase) {
        return value1.toLocaleLowerCase() === value2.toLocaleLowerCase()
      } else {
        return value1 === value2
      }
    }

    ngOnInit() {
      this.setObservables()
      this.service.setRadius(this.gnarlRadius)
      this.service.setNumberOfAcrs(this.set.length)
      this.knobPoint = this.service.transformingByItemIndex(this.currentIndex)
      this.currentItem = this.set[this.currentIndex];
      this.service.onTransforming.subscribe( (i: number) => {
        this.currentItem = this.set[i]
        this.currentIndex = i
        console.log('On transforming', i, this.currentIndex, this.set[i])
      })
    }

    get width() {
        return (
            this.gnarlRadius * 2 + this.gnarlStrokeWidth + this.knobRadius + this.knobRadius
        );
    }

    get controlsWidth() {
      return this.gnarlRadius * 2.2 / 10
    }

    get center(): ICartesianCoordinate {
      const bodyFrame = document.body.getBoundingClientRect();
      const orbFrame = this.gnarl.nativeElement.getBoundingClientRect();
      const px = orbFrame.left - bodyFrame.left;
      const py = orbFrame.top - bodyFrame.top;
      const halfOfContainer = this.width / 2;    
      return {
        x: px + halfOfContainer,
        y: py + halfOfContainer
      };
    }

    getTranslate(x: number, y: number): string {
      return `translate(${x}, ${y})`
    }

    transform() {
        const transformParameter = this.gnarlStrokeWidth / 2 + this.gnarlRadius + this.knobRadius
        return this.getTranslate(transformParameter, transformParameter)
    }

    plusPos() {
      const controlRect = this.control.nativeElement.getBoundingClientRect()
      return this.getTranslate((controlRect.width - this.controlsWidth) / 2, 0)
    }

    minusPos(): string {
      const controlRect = this.control.nativeElement.getBoundingClientRect()
      return this.getTranslate(- (controlRect.width - this.controlsWidth) / 2, 0)
    }

    onMinus() {
      this.knobPoint = this.service.transformingByItemIndex(this.currentIndex - 1)
    }
    onPlus() {
      this.knobPoint = this.service.transformingByItemIndex(this.currentIndex + 1)
    }

    /**
     *  The method to set handler for all type of user interaction events! (touch/click, drag mouse/screen) 
     */
    setObservables() {
      merge(
        fromEvent(this.rail.nativeElement, "click"),
        fromEvent(this.rail.nativeElement, "touch")
      ).subscribe((event: MouseEvent | TouchEvent) => {
        this.knobPoint = this.service.transformedFromEvent(this.center, event as ICartesianCoordinate)
      });
  
      const mouseMove$ = merge(
        fromEvent(document, "mousemove"),
        fromEvent(document, "touchmove")
      );
      const mouseUp$ = merge(
        fromEvent(document, "mouseup"),
        fromEvent(document, "touchend")
      );
  
      merge(
        fromEvent(this.knob.nativeElement, "touchstart"),
        fromEvent(this.knob.nativeElement, "mousedown")
      )
        .pipe(
          switchMap(_ =>
            mouseMove$.pipe(
              takeUntil(mouseUp$),
              throttleTime(10)
            )
          )
        )
        .subscribe((event: MouseEvent | TouchEvent) => {
          console.log('Mouse down')
          this.knobPoint = this.service.transformingFromEvent(this.center, event as ICartesianCoordinate)
        });
    }
}
