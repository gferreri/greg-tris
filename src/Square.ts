import { Rotation } from './pieceDefinitions/SquareDefinition'

export class Square {

	rotationIndex: number = 0

	constructor (public x: number, public y: number, public color: string,
		private rotations: Array<Rotation>) {
	}

	rotate(clockwise: any){
		let rotateY = this.rotations[this.rotationIndex][1]
		let rotateX = this.rotations[this.rotationIndex][0]
		if (!clockwise) {
			rotateY *= 1
			rotateX *= 1
		}

		this.x += rotateX
		this.y += rotateY

		this.rotationIndex = (this.rotationIndex + 1) % 4
	}
}