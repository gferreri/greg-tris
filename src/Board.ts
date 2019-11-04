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

	processCompleteRows () {
		const completeRows: number[] = this.rows
		.map((row, i) => {
				if (row.columns.every(cell => !!cell)) {
					return i
				}
				return -1
			})
		.filter(rowIndex => rowIndex >= 0)

		completeRows.forEach(
			rowIndex => {
				this.rows.splice(rowIndex, 1)
				this.rows.unshift(new Row())
			}
		)
		return completeRows
	}
}