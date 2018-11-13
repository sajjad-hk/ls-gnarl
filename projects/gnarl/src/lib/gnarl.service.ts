import { Injectable, EventEmitter } from '@angular/core';
import { ICartesianCoordinate } from './models/coordinates';

@Injectable({
  providedIn: 'root'
})
export class GnarlService {
  onCalc: EventEmitter<number> = new EventEmitter();
  constructor() { }

  toScreenCartisian(radius: number, angle: number): ICartesianCoordinate {
      return {
        x: radius * Math.cos(angle - Math.PI / 2),
        y: radius * Math.sin(angle - Math.PI / 2)
      }
  }
  

  toPolar(center, point) {
    console.log({center, point})
    return (
      Math.atan2(point.y - center.y, point.x - center.x) + Math.PI / 2
    );
  }

  toDegrees(angle) {
    const deg = angle * (180 / Math.PI);
    return deg < 0 ? deg + 360 : deg;
  }

  to360(deg) {
    return deg < 0 ? deg + 360 : deg > 360 ? deg - 360 : deg;
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }
  get calcEmitter(): EventEmitter<number> {
    return this.onCalc;
  }

  calcTransform(radius, center, toPoint) {
    const angle = this.toPolar(center, toPoint);
    console.log(angle)
    this.onCalc.emit(Math.floor(this.toDegrees(angle)));
    return this.toScreenCartisian(radius, angle);
  }

  calcTransformangle(radius, angle) {
    this.onCalc.emit(this.to360(angle));
    return this.toScreenCartisian(radius, this.toRadians(angle));
  }
}
