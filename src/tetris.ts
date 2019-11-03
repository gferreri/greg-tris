class Square {

	constructor (public x: number, public y: number, public color: string, private rotateX: number, private rotateY: number) {
	}


	rotate(clockwise: any){
		let rotateY = clockwise ? this.rotateY : this.rotateY * -1
		let rotateX = clockwise ? this.rotateX : this.rotateX * -1
		this.x += rotateX
		this.y += rotateY
	}
}

class Piece {

	squares: Array<Square>

	constructor(private board: Board){
		this.squares = []
	}
	
	rotate (clockwise: boolean){
		for (let square of this.squares){
			if (square.x >= 0 && square.y >= 0) {
				this.board.rows[square.y].columns[square.x] = null
			} 
			square.rotate(clockwise)
			
			if (square.x >= 0 && square.y >= 0) {
				this.board.rows[square.y].columns[square.x] = square
			} 
		}
	}
	
	descend () {
		for(let square of this.squares){
			this.board.rows[square.y].columns[square.x] = null
			square.y -= 1
			this.board.rows[square.y].columns[square.x] = square
		}
	}
}

class PieceFactory {
	getNextPiece (board: Board){
		const piece = new Piece(board)
		const color= 'red'
		piece.squares = [
			new Square(7,0, 'red',1,1),
			new Square(7,1, 'blue',0,0),
			new Square(7,2, 'orange',-1,-1),
			new Square(7,3, 'green',-2,-2)
		]

		for (let square of piece.squares) {
			board.rows[square.y].columns[square.x] = square
		}
		return piece
	}
}
const boardWidth = 500
const columnsCount = 15
const rowCount = 40
const squareLength = boardWidth / columnsCount

class Row {
	columns: Array<Square | null>
	constructor () {
		this.columns = []
		for (let i = 0; i < columnsCount; i++){
			this.columns.push(null)
		}
	}
}

class Board {
	rows: Row[]

	constructor (){
		this.rows = []
		for (let i = 0; i < rowCount; i++){
			this.rows.push(new Row())
		}
	}
}

let square = new Square(0, 0, 'red', 1, 2)

const board = new Board()

function drawBoard () {
	let canvas = document.getElementById('board') as HTMLCanvasElement
	if (!canvas) {
		throw new Error('Board canvas not found')
	}
	let rowIndex = 0
    for (let row of board.rows) {
		let columnIndex = 0
        for (let square of row.columns) {
			const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
			const y = rowIndex * squareLength
			const x = columnIndex * squareLength
            if (square) {
				ctx.fillStyle = square.color
				ctx.fillRect(x, y, squareLength, squareLength)
            } else {
				ctx.clearRect(x, y, squareLength, squareLength)
			}
			columnIndex++
		}
		rowIndex++
    }
}

let currentPiece: Piece

window.onload = () => {
	const pieceFactory = new PieceFactory()
	currentPiece = pieceFactory.getNextPiece(board)
	drawBoard()
}

window.onkeydown = (event: KeyboardEvent) => {
	if (event.code === 'Space') {
		currentPiece.rotate(true)
		drawBoard()
	}
}