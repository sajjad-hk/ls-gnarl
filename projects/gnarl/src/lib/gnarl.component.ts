import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import {
    ICartesianCoordinate,
    IPolarCoordinate
} from "./models/coordinates";
import { GnarlService } from "./gnarl.service";
import { fromEvent, merge } from 'rxjs';
import { switchMap, takeUntil, throttleTime } from 'rxjs/operators';
@Component({
    selector: "lib-gnarl",
    templateUrl: "./gnarl.component.html",
    styleUrls: ["./gnarl.component.scss"]
})
export class GnarlComponent implements OnInit {
    
    @Input()
    gnarlRadius: number = 200;
    @Input()
    gnarlColor: string = '171717';
    @Input()
    gnarlStrokeWidth: number = 5;
    @Input()
    opacity: number = 0.25;
    @Input()
    knobRadius: number = 20;
    @Input()
    knobColor: string = '808000';
    @Input()
    knobStrokeWidth: number = 1;

    @Input()
    initialAngle: number = 0;
    @Input()
    set: Array<any>;

    knobPoint: ICartesianCoordinate;
    knobPolar: IPolarCoordinate;
    angle = 0;

    @ViewChild('knob')
    knob: ElementRef;
    @ViewChild('gnarl')
    gnarl: ElementRef;
    @ViewChild('rail')
    rail: ElementRef;
    @ViewChild('control')
    control: ElementRef;

    minusRect: any;
    plusRect: any;
    controlRect: any;

    constructor(public gnarlService: GnarlService) {
    }

    ngOnInit() {
      console.log(this.set);
      this.setObservables();
      this.knobPoint = this.gnarlService.toScreenCartisian(
        this.gnarlRadius,
        this.initialAngle
    );
      this.gnarlService.onCalc.subscribe((angle) => this.angle = angle)
      this.knobColor = '#' + this.knobColor
      this.gnarlColor = '#' + this.gnarlColor
    }

    get width() {
        return (
            this.gnarlRadius * 2 + this.gnarlStrokeWidth + this.knobRadius + this.knobRadius
        );
    }

    get controlsWidth() {
      return this.gnarlRadius * 2 / 10
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

    transform() {
        const transformParameter = this.gnarlStrokeWidth / 2 + this.gnarlRadius + this.knobRadius;
        return `translate(${transformParameter}, ${transformParameter})`;
    }

    plusPos() {
      this.controlRect = this.control.nativeElement.getBoundingClientRect();
      return `translate(${((this.controlRect.width - this.controlsWidth) / 2)}, ${0})`;
    }

    minusPos(): string {
      this.controlRect = this.control.nativeElement.getBoundingClientRect();
      return `translate(${- (this.controlRect.width - this.controlsWidth) / 2}, ${0})`;
    }

    getTranslateFrom(x, y): string {
        return `translate(${x}, ${y})`;
    }

    onMinus() {
      this.knobPoint = this.gnarlService.calcTransformangle(this.gnarlRadius, this.angle - 10)
    }
    onPlus() {
      this.knobPoint = this.gnarlService.calcTransformangle(this.gnarlRadius, this.angle + 10)
    }

    /**
     *  The method to set handler for all type of user interaction events! (touch/click, drag mouse/screen) 
     */
    setObservables() {
      merge(
        fromEvent(this.rail.nativeElement, "click"),
        fromEvent(this.rail.nativeElement, "touch")
      ).subscribe((event: MouseEvent | TouchEvent) => {
        this.knobPoint = this.gnarlService.calcTransform(this.gnarlRadius, this.center, event as ICartesianCoordinate);
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
          this.knobPoint = this.gnarlService.calcTransform(this.gnarlRadius, this.center, event as ICartesianCoordinate);
        });
    }
}
