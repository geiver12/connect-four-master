document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const result = document.querySelector('#result')
    const displayCurrent1 = document.querySelector('#c-1')
    const displayCurrent2 = document.querySelector('#c-2')
    const displayPlayer1 = document.querySelector('.player1')
    const displayPlayer2 = document.querySelector('.player2')

    let currentPlayer = 1,
        score1 = 0,
        score2 = 0,
        StopGame = true,
        Deepth = 3
    var board

    var initBoard = () => {

        board = new Array(6);
        //Bucle para meter en cada posición otros array de 10
        for (var i = 0; i < 6; i++) {
            board[i] = new Array(7);
            for (let j = 0; j < 7; j++) {
                board[i][j] = 0
            }
        }
    }
    initBoard()


    for (let i = 0, assingClass = 0; i < squares.length; i++) {
        squares[i].setAttribute('id', assingClass)
        assingClass++
        if (assingClass >= 7)
            assingClass = 0
    }
    for (var i = 0; i < squares.length; i++) {
        (function(index) {
            squares[i].onclick = function() {
                var array = []

                squares.forEach(element => {
                    if (element.getAttribute('id') === squares[index].getAttribute('id')) {
                        array.push(element)
                        y = element.getAttribute('id');

                    }
                })
                if (StopGame) {
                    for (let rec = array.length - 1; rec > -1; rec--) {
                        if (array[rec].classList.contains('taken')) {
                            continue
                        } else {
                            if (currentPlayer === 1) {
                                array[rec].classList.add('taken')
                                array[rec].classList.add('player-one')

                                //change the player
                                currentPlayer = 1
                                displayCurrent2.classList.add('current-2')
                                displayCurrent1.classList.remove('current-1')


                                board[rec][y] = 1

                                if (isWinning(board) != 1)
                                    minimax(board)



                            } else if (currentPlayer === 2) {
                                array[rec].classList.add('taken')
                                array[rec].classList.add('player-two')

                                displayCurrent1.classList.add('current-1')
                                displayCurrent2.classList.remove('current-2')
                                    //change the player
                                currentPlayer = 1
                                    //displayCurrentPlayer.innerHTML = currentPlayer

                                board[rec][y] = 2

                            }
                            break
                        }
                    }
                }
            }
        })(i)
    }

    function isWinning(board) {
        var win = 0
        const m = board
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {

                if (i + 3 < 6) {
                    if (m[i][j] == 1 && m[i + 1][j] == 1 && m[i + 2][j] == 1 && m[i + 3][j] == 1) {
                        win = 1;
                    }
                }
                if (j + 3 < 7) {
                    if (m[i][j] == 1 && m[i][j + 1] == 1 && m[i][j + 2] == 1 && m[i][j + 3] == 1) {
                        win = 1;
                    }
                }

                if (i + 3 < 6 && j + 3 < 7) {
                    if (m[i][j] == 1 && m[i + 1][j + 1] == 1 && m[i + 2][j + 2] == 1 && m[i + 3][j + 3] == 1) {
                        win = 1;
                    }
                }
                if (j - 3 > -1 && i + 3 < 6) {
                    if (m[i][j] == 1 && m[i + 1][j - 1] == 1 && m[i + 2][j - 2] == 1 && m[i + 3][j - 3] == 1) {
                        win = 1;
                    }
                }
                if (j + 3 < 7 && i - 3 > -1) {
                    if (m[i][j] == 1 && m[i - 1][j + 1] == 1 && m[i - 2][j + 2] == 1 && m[i - 3][j + 3] == 1) {
                        win = 1;
                    }
                }

                if (i + 3 < 6) {
                    if (m[i][j] == 2 && m[i + 1][j] == 2 && m[i + 2][j] == 2 && m[i + 3][j] == 2) {
                        win = 2;
                    }
                }
                if (j + 3 < 7) {
                    if (m[i][j] == 2 && m[i][j + 1] == 2 && m[i][j + 2] == 2 && m[i][j + 3] == 2) {
                        win = 2;
                    }
                }

                if (i + 3 < 6 && j + 3 < 7) {
                    if (m[i][j] == 2 && m[i + 1][j + 1] == 2 && m[i + 2][j + 2] == 2 && m[i + 3][j + 3] == 2) {
                        win = 2;
                    }
                }
                if (j - 3 > -1 && i + 3 < 6) {
                    if (m[i][j] == 2 && m[i + 1][j - 1] == 2 && m[i + 2][j - 2] == 2 && m[i + 3][j - 3] == 2) {
                        win = 2;
                    }
                }
                if (j + 3 < 7 && i - 3 > -1) {
                    if (m[i][j] == 2 && m[i - 1][j + 1] == 2 && m[i - 2][j + 2] == 2 && m[i - 3][j + 3] == 2) {
                        win = 2;
                    }
                }
            }

        }
        return win;
    }

    function checkBoard() {
        const win = isWinning(board)

        if (StopGame)
            if (win == 1) {
                result.style.color = 'red'
                result.innerHTML = 'Player one wins!'
                score1++
                displayPlayer1.innerHTML = 'Player 1 :: ' + score1
                StopGame = false
            } else if (win == 2) {
            score2++
            displayPlayer2.innerHTML = 'Player 2 :: ' + score2
            result.style.color = 'blue'
            result.innerHTML = 'Player two wins!'
            StopGame = false

        }



    }

    const boardMove = (board) => {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (board[i][j] == 0)
                    return false
            }
        }
        return true
    }

    //add an event listener to each square that will trigger the checkBoard function on click
    squares.forEach(square => square.addEventListener('click', checkBoard))

    resetGame = () => {
        initBoard()
        StopGame = true
        for (var i = 0; i < squares.length - 7; i++) {
            squares[i].classList.remove('taken')
            squares[i].classList.remove('player-one')
            squares[i].classList.remove('player-two')

        }
        result.innerHTML = ""
    }

    const isMove = (m, col) => {
        let validator = false;
        for (let i = 0; i < 6; i++) {
            if (m[i][col] == 0)
                validator = true
        }
        return validator

    }

    const newMove = (m, col) => {
        for (let i = 5; i > -1; i--) {
            if (m[i][col] == 0)
                return i
        }

    }
    const minimax = (board) => {
        let max, beastf = -1,
            beastc = -1,
            currentMax = 0
        max = Number.NEGATIVE_INFINITY

        for (let j = 0; j < 7; j++) {
            if (isMove(board, j)) {
                let fila = newMove(board, j)

                board[fila][j] = 2

                currentMax = valormin(board, 0, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)

                board[fila][j] = 0

                if (max < currentMax) {
                    max = currentMax
                    beastc = j
                    beastf = fila

                }

            }
        }
        board[beastf][beastc] = 2
        for (let index = squares.length - 1; index > -1; index--) {
            if (beastc == squares[index].getAttribute('id')) {
                if (!squares[index].classList.contains("taken")) {
                    squares[index].classList.add("taken")
                    squares[index].classList.add("player-two")
                    break
                }
            }
        }
    }

    const valormin = (m, deepth, alpha, beta) => {

        if (isWinning(m) == 1 || isWinning(m) == 2)
            return Heuristica(m)
        if (boardMove(m))
            return Heuristica(m)
        if (deepth > Deepth)
            return Heuristica(m)

        for (let j = 0; j < 7; j++) {
            if (isMove(m, j)) {
                let fila = newMove(m, j)

                m[fila][j] = 1

                beta = Math.min(beta, valormax(m, deepth + 1, alpha, beta))

                m[fila][j] = 0

                if (alpha > beta) {
                    return alpha
                }

            }
        }
        return beta
    }


    const valormax = (m, deepth, alpha, beta) => {

        if (isWinning(m) == 1 || isWinning(m) == 2)
            return Heuristica(m)
        if (boardMove(m))
            return Heuristica(m)

        for (let j = 0; j < 7; j++) {
            if (isMove(board, j)) {
                let fila = newMove(board, j)

                board[fila][j] = 2

                alpha = Math.max(alpha, valormin(m, deepth + 1, alpha, beta))

                board[fila][j] = 0

                if (alpha > beta) {
                    return beta
                }

            }
        }
        return alpha
    }
    const Heuristica = (m) => {
        return Costo(m, 2) - Costo(m, 1)
    }

    const Costo = (m, player) => {
        var value = 0
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                //para 4
                if (j + 3 < 7) {
                    if (m[i][j] == player && m[i][j + 1] == player && m[i][j + 2] == player && m[i][j + 3] == player) {
                        return 10000
                    }
                }
                if (i + 3 < 6) {
                    if (m[i][j] == player && m[i + 1][j] == player && m[i + 2][j] == player && m[i + 3][j] == player) {
                        return 10000
                    }
                }
                if (j + 3 < 7 && i + 3 < 6) {
                    if (m[i][j] == player && m[i + 1][j + 1] == player && m[i + 2][j + 2] == player && m[i + 3][j + 3] == player) {
                        return 10000
                    }
                }
                if (j + 3 < 7 && i - 3 > -1) {
                    if (m[i][j] == player && m[i - 1][j + 1] == player && m[i - 2][j + 2] == player && m[i - 3][j + 3] == player) {
                        return 10000
                    }
                }
                if (i + 3 < 6 && j - 3 > -1) {
                    if (m[i][j] == player && m[i + 1][j - 1] == player && m[i + 2][j - 2] == player && m[i + 3][j - 3] == player) {
                        return 10000
                    }
                }

                //para 3
                if (j + 2 < 7) {
                    if (m[i][j] == player && m[i][j + 1] == player && m[i][j + 2] == player) {
                        value = 1000
                    }
                }
                if (i + 2 < 6) {
                    if (m[i][j] == player && m[i + 1][j] == player && m[i + 2][j] == player) {
                        value = 1000
                    }
                }
                if (j + 2 < 7 && i + 2 < 6) {
                    if (m[i][j] == player && m[i + 1][j + 1] == player && m[i + 2][j + 2] == player) {
                        value = 1000
                    }
                }
                if (j + 2 < 7 && i - 2 > -1) {
                    if (m[i][j] == player && m[i - 1][j + 1] == player && m[i - 2][j + 2] == player) {
                        value = 1000
                    }
                }
                if (i + 2 < 6 && j - 2 > -1) {
                    if (m[i][j] == player && m[i + 1][j - 1] == player && m[i + 2][j - 2] == player) {
                        value = 1000
                    }
                }

                //para 2
                if (j + 1 < 7) {
                    if (m[i][j] == player && m[i][j + 1] == player) {
                        if (value < 300)
                            value = 300
                    }
                }
                if (i + 1 < 6) {
                    if (m[i][j] == player && m[i + 1][j] == player) {
                        if (value < 300)
                            value = 300
                    }
                }
                if (j + 1 < 7 && i + 1 < 6) {
                    if (m[i][j] == player && m[i + 1][j + 1] == player) {
                        if (value < 300)
                            value = 300
                    }
                }
                if (j + 1 < 7 && i - 1 > -1) {
                    if (m[i][j] == player && m[i - 1][j + 1] == player) {
                        if (value < 300)
                            value = 300
                    }
                }
                if (i + 1 < 6 && j - 1 > -1) {
                    if (m[i][j] == player && m[i + 1][j - 1] == player) {
                        if (value < 300)
                            value = 300
                    }
                }

            }
        }
        return value
    }
})