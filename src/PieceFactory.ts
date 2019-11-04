/// <reference path="./pieceDefinitions/BoxDefinition.ts" />
/// <reference path="./pieceDefinitions/SquareDefinition.ts" />
/// <reference path="./pieceDefinitions/BarDefinition.ts" />
/// <reference path="./pieceDefinitions/LDefinition.ts" />

const colors = [
	'#1E1E24',
	'#FB9F89',
	'#C4AF9A',
	'#81AE9D',
	'#21A179'
]

const pieces = [LDefinition, BarDefinition, BoxDefinition]

class PieceFactory {

	constructor (private board: Board) { }

	getNextPiece (){
		const piece = new Piece(this.board)
    const color = colors[Math.floor(Math.random() * colors.length)]
    const pieceDefinition = pieces[Math.floor(Math.random() * pieces.length)]
		piece.squares = pieceDefinition.map(def => new Square(def.initialPosition[0], def.initialPosition[1], color, def.rotations))

		for (let square of piece.squares) {
			board.rows[square.y].columns[square.x] = square
		}
		return piece
	}
}