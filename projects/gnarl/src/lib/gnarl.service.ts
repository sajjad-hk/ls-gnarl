import { Injectable, EventEmitter } from '@angular/core'
import { ICartesianCoordinate } from './models/coordinates'
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class GnarlService {

  radius: number
  numberOfArcs: number
  stepSize: number
  radianSteps: Array<number>
  onTransforming: EventEmitter<number> = new EventEmitter()
  constructor() { }

  setRadius(radius: number) {
    this.radius = radius
  }

  get transformingEmitter(): EventEmitter<number> {
    return this.onTransforming
  }

  transformingByItemIndex(index: number) {
    console.log('by index', index, this.radianSteps[index])
    index = index >= this.numberOfArcs ? 0 : index < 0 ? this.numberOfArcs - 1 : index
    this.onTransforming.emit(index)
    const angle = this.radianSteps[index]
    return this.toCartisian(angle)
  }

  transformedFromEvent(center: ICartesianCoordinate, toPoint: ICartesianCoordinate) {
    console.log('%c Start => transformedFromEvent function:', 'color: red; font-weight: bold;')
    let angle = this.toPolar(center, toPoint)
    angle = this.wrapRadianTo2Pi(angle)
    const index = this.findStep(angle)
    angle = this.radianSteps[index]
    this.onTransforming.emit(index)
    console.log({angle, index})
    console.log('%c End => transformedFromEvent function:', 'color: red; font-weight: bold;')
    return this.toCartisian(angle)
  }

  /**
   * Setup devisions mapping to any countable set 
   */
  setNumberOfAcrs(count: number) {
    this.numberOfArcs = count
    this.setSteps()
  }

  setSteps() {
    this.radianSteps = Array.from(Array(this.numberOfArcs), (x, i) => i)
              .map(x => (x * 2 * Math.PI) / this.numberOfArcs)
                    this.stepSize = this.radianSteps[1] - this.radianSteps[0]
  }

  findStep(radian: number) {
      const index = _.findLastIndex( this.radianSteps
        .map( (center) => this.inInterval(radian, center) ), (x) => x === true )
      return (index < 0 ? 0 : index)
  }

  inInterval(radian: number, center: number) {
      return radian >= center - this.stepSize / 2 && radian <= center + this.stepSize / 2
  }


  /**
   * Continues transforming point on circle
   * @param center center of circle
   * @param point point on circle 
   */
  transformingFromEvent(center: ICartesianCoordinate, toPoint: ICartesianCoordinate) {
    console.log('%c Start => transformingFromEvent function:', 'color: orange; font-weight: bold;')
    let angle = this.toPolar(center, toPoint)
    angle = this.wrapRadianTo2Pi(angle)
    const index = this.findStep(angle)
    this.onTransforming.emit(index)
    console.log('%c End => transformingFromEvent function:', 'color: green; font-weight: bold;')
    return this.toCartisian(angle)
  }

  
  /**
   * Transformers
   */
  toPolar(center: ICartesianCoordinate, point: ICartesianCoordinate) {

    return Math.atan2(point.y - center.y, point.x - center.x) + Math.PI / 2
  }

  toCartisian(radian: number): ICartesianCoordinate {
    return {
      x: this.radius * Math.cos(radian - Math.PI / 2),
      y: this.radius * Math.sin(radian - Math.PI / 2)
    }
  }

  /**
   * Convertors 
   */
  toDegree(radian: number): number {
    const degree = this.wrapRadianTo2Pi(radian) * (180 / Math.PI) //degree Might not be in 0 - 360, test needed
    return degree
  }

  toRadian(degree: number): number {
    const radian = this.wrapDegreeTo360(degree) * (Math.PI / 180) //radian Might not be in 0 - 2 Pi, test needed
    return radian
  }


  /**
   * Angle wrappers
   */
  wrapDegreeTo360(degree: number): number {
    if (degree < 0) {
      degree += 360
    }
    if (degree > 360) {
      degree -= 360
    }
    return degree
  }

  wrapRadianTo2Pi(radian: number): number {
    if (radian < 0) {
      radian += 2 * Math.PI
    }
    if (radian > 2 * Math.PI) {
       radian -= 2 * Math.PI  
    }
    return radian
  }
}
