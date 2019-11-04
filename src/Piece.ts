class Piece {
	squares: Array<Square>
	constructor(private board: Board){
		this.squares = []
	}
	
	rotate (clockwise: boolean){
		this.clearPreviousBoardPosition()
		for (let square of this.squares){
			square.rotate(clockwise)
			if (square.x >= 0 && square.y >= 0) {
				this.board.rows[square.y].columns[square.x] = square
			} 
		}
	}

	private clearPreviousBoardPosition() {
		for (let square of this.squares) {
			if (square.x >= 0 && square.y >= 0) {
				this.board.rows[square.y].columns[square.x] = null;
			}
		}
	}

	isValidMove (x: number, y: number) : boolean {
		if ( (y >= 0 && y < rowCount) && ( x >= 0 && x < columnsCount)) {
			const boardCell = this.board.rows[y].columns[x]
			return boardCell === null || this.squares.indexOf(boardCell) >= 0
		}
		return false
	}

	move (x: number, y: number) {
		if (this.squares.every(s => this.isValidMove(s.x + x, s.y + y))) {
			this.clearPreviousBoardPosition()
			for (let square of this.squares) {
				square.x += x
				square.y += y
				this.board.rows[square.y].columns[square.x] = square
			}
			return true
		} else {
			return false
		}
	}

	moveRight () {
		this.move(1,0)
	}

	moveLeft () {
		this.move(-1, 0)
	}
	
	descend () {
		return this.move(0, 1)
	}
}