import { Injectable, EventEmitter } from '@angular/core'
import { ICartesianCoordinate } from './models/coordinates'
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class GnarlService {

  radius: number
  numberOfArcs: number
  radianSteps: Array<number>
  onTransforming: EventEmitter<number> = new EventEmitter()
  constructor() { }

  setRadius(radius: number) {
    this.radius = radius
  }

  setNumberOfAcrs(count: number) {
    this.numberOfArcs = count
    this.setRadianSteps()
    console.log(this.radianSteps)
  }

  findArcStep(angle: number) {
    console.log(this.radianSteps.map( (s) => angle + 2 * Math.PI >=s))
    const index = _.findLastIndex( this.radianSteps.map( (s) => angle >=s), (x) => x === true)
      return (index + 1)  > this.numberOfArcs ? 0 : index + 1
  }

  setRadianSteps() {
    this.radianSteps = Array.from(Array(this.numberOfArcs), (x, i) => i)
              .map(x => (x * 2 * Math.PI) / this.numberOfArcs)
  }

  get transformingEmitter(): EventEmitter<number> {
    return this.onTransforming
  }
  
  transformingFromAngle(angle: number) {
    // this.onTransforming.emit(this.to360(angle))
    // console.log()
    return this.polarToCartisian(this.toRadians(angle))
  }

  transformingFromEvent(center: ICartesianCoordinate, toPoint: ICartesianCoordinate) {
    let angle = this.toPolar(center, toPoint)
    angle = this.to2PiRadian(angle)
    console.log({angle})
    this.onTransforming.emit(this.findArcStep(angle))
    return this.polarToCartisian(angle)
  }

  transformedFromEvent(center: ICartesianCoordinate, toPoint: ICartesianCoordinate) {
    let angle = this.toPolar(center, toPoint)
    angle = this.radianSteps[this.findArcStep(angle)]
    this.onTransforming.emit(this.findArcStep(angle))
    return this.polarToCartisian(angle)
  }

  toPolar(center: ICartesianCoordinate, point: ICartesianCoordinate) {
    return (
      Math.atan2(point.y - center.y, point.x - center.x) + Math.PI / 2
    )
  }

  to2PiRadian(rad: number) {
    return rad < 0 ? 2 * Math.PI + rad : rad
  }

  toDegrees(angle) {
    const deg = angle * (180 / Math.PI)
    return deg < 0 ? deg + 360 : deg
  }

  to360(deg) {
    return deg < 0 ? deg + 360 : deg > 360 ? deg - 360 : deg
  }

  toRadians(angle) {
    return angle * (Math.PI / 180)
  }

  polarToCartisian(angle: number): ICartesianCoordinate {
    return {
      x: this.radius * Math.cos(angle - Math.PI / 2),
      y: this.radius * Math.sin(angle - Math.PI / 2)
    }
  }
}
