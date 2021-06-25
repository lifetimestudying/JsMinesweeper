document.addEventListener("DOMContentLoaded", () => {
	const grid = document.querySelector(".content")
	let width = 10
	let squares = []
	let bombAmount = 10


	const createBoard = () => {
		// get shuffled game array with random bombs
		const bombs = Array(bombAmount).fill("bomb")
		const empty = Array(width * width - bombAmount).fill("valid")
		const game = empty.concat(bombs)
		const shuffled = game.sort(() => Math.random() - 0.5)

		for (let i = 0; i < width * width; i++) {
			const square = document.createElement("div")
			square.setAttribute("id", i)
			square.classList.add(shuffled[i])
			grid.appendChild(square)
			squares.push(square)

			square.addEventListener("click", function(e) {
				click(square)
			})
		}

		// add numbers
		for (let i = 0; i < width * width; i++)  {
			let total = 0
			const isLeftEdge = (i % width === 0)
			const isRightEdge = (i % width === width - 1)
			if (squares[i].classList.contains("valid")) {
				if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb")) {
					total++
				}
				if (i > 9 && !isRightEdge && squares[i + 1 - width].classList.contains("bomb")) {
					total++
				}
				if (i > 10 && squares[i - width].classList.contains("bomb")) {
					total++
				}
				if (i > 11 && !isLeftEdge && squares[i - 1 - width].classList.contains("bomb")) {
					total++
				}
				if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb")) {
					total++
				}
				if (i < 90 && !isLeftEdge && squares[i - 1 - width].classList.contains("bomb")) {
					total++
				}
				if (i < 88 && !isRightEdge && squares[i + 1 - width].classList.contains("bomb")) {
					total++
				}
				if (i < 89 && squares[i + width].classList.contains("bomb")) {
					total++
				}

				squares[i].setAttribute("data", total)
				console.log(squares[i])
			}
		}
	}

	createBoard()
})


const click = (square) => {
	if (square.classList.contains("bomb")) {
		console.log("Game Over!")
	}
}

