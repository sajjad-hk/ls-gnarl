import { Injectable, EventEmitter } from '@angular/core'
import { ICartesianCoordinate } from './models/coordinates'

@Injectable({
  providedIn: 'root'
})
export class GnarlService {

  radius: number
  onTransforming: EventEmitter<number> = new EventEmitter()
  constructor() { }

  setRadius(radius: number) {
    this.radius = radius
  }

  get transformingEmitter(): EventEmitter<number> {
    return this.onTransforming
  }
  
  transformingFromAngle(angle) {
    this.onTransforming.emit(this.to360(angle))
    return this.polarToCartisian(this.toRadians(angle))
  }

  transformingFromEvent(center, toPoint) {
    const angle = this.toPolar(center, toPoint)
    this.onTransforming.emit(Math.floor(this.toDegrees(angle)))
    return this.polarToCartisian(angle)
  }

  toPolar(center, point) {
    return (
      Math.atan2(point.y - center.y, point.x - center.x) + Math.PI / 2
    )
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
