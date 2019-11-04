import { PieceFactory } from './PieceFactory'
import { Piece } from './Piece'
import { Board } from './Board'
import { squareLength } from './constants'


const board = new Board()

async function animateRowClear (rowIndex: number) {
	const ctx = getBoardDrawingContext()
	let x = ctx.canvas.width / 2
	let y = squareLength * rowIndex
	return new Promise(resolve => {
		const expand = (width: number) => setTimeout(() => {
			ctx.clearRect(x - (width / 2), y, width, squareLength)
			width += (ctx.canvas.width / 20)
			if (width < ctx.canvas.width) {
				expand(width)
			} else {
				resolve()
			}
		}, 10)
		expand(10)
	})
}

function drawBoard () {
	let ctx = getBoardDrawingContext()
	let rowIndex = 0
    for (let row of board.rows) {
			let columnIndex = 0
        for (let square of row.columns) {
					ctx.lineWidth = 2
					const y = rowIndex * squareLength
					const x = columnIndex * squareLength
					if (square) {
						ctx.beginPath()
						ctx.fillStyle = square.color
						ctx.rect(x, y, squareLength, squareLength)
						ctx.stroke()
						ctx.fill()
          } else {
							ctx.clearRect(x, y, squareLength, squareLength)
					}
					columnIndex++
				}
			rowIndex++
		}
		
		let scoreSpan = document.getElementById('score') as HTMLSpanElement
		scoreSpan.innerText = score.toString()
}

let currentPiece: Piece
const pieceFactory = new PieceFactory(board)
let score = 0

let gameLoopHandle : number | null


window.onload = () => {
	currentPiece = pieceFactory.getNextPiece()
	drawBoard()
	startGameLoop()
}

function getBoardDrawingContext() {
	const canvas = document.getElementById('board') as HTMLCanvasElement;
	return canvas.getContext('2d') as CanvasRenderingContext2D
}

function startGameLoop() {
	gameLoopHandle = window.setInterval(gameLoop, 750);
}

function stopGameLoop() {
	window.clearInterval(gameLoopHandle as number)
	gameLoopHandle = null
}

async function gameLoop () {
	stopGameLoop()
	const didMove = currentPiece.descend()
	if (!didMove) {
		// check for complete rows
		const completeRows = board.processCompleteRows()
		score += completeRows.length * 100
		if (completeRows.length === 4) {
			score += 500
		}

		await Promise.all(completeRows.map(animateRowClear))
	
		currentPiece = pieceFactory.getNextPiece()
	}
	drawBoard()
	startGameLoop()
}

window.onkeydown = (event: KeyboardEvent) => {
	switch (event.code) {
		case 'Space' :
			currentPiece.rotate(true)
			break
		case 'KeyL':
		case 'ArrowRight':
			currentPiece.moveRight()
			break
		case 'KeyJ':
		case 'ArrowLeft':
			currentPiece.moveLeft()
			break
		case 'KeyK':
			currentPiece.descend()
			break
		case 'KeyP':
			if (gameLoopHandle !== null) {
				stopGameLoop()
			} else {
				startGameLoop()
			}
			break
	}
	drawBoard()
}