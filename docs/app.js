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
        StopGame = true
    var board

    board = new Array(6);
    //Bucle para meter en cada posición otros array de 10
    for (var i = 0; i < 6; i++) {
        board[i] = new Array(7);
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            board[i][j] = 0
        }
    }


    for (let i = 0, assingClass = 0; i < squares.length; i++) {
        squares[i].setAttribute('id', assingClass)
        assingClass++
        if (assingClass >= 7)
            assingClass = 0
    }

    for (var i = 0; i < squares.length; i++) {
        (function(index) {
            //add an onclick to each square in your grid

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
                                currentPlayer = 2
                                displayCurrent2.classList.add('current-2')
                                displayCurrent1.classList.remove('current-1')


                                board[rec][y] = 1



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


    //check the board for a win or lose
    function checkBoard() {
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



        //make const that shows all winning arrays
        /*   const winningArrays = [
               [0, 1, 2, 3],
               [41, 40, 39, 38],
               [7, 8, 9, 10],
               [34, 33, 32, 31],
               [14, 15, 16, 17],
               [27, 26, 25, 24],
               [21, 22, 23, 24],
               [20, 19, 18, 17],
               [28, 29, 30, 31],
               [13, 12, 11, 10],
               [35, 36, 37, 38],
               [6, 5, 4, 3],
               [0, 7, 14, 21],
               [41, 34, 27, 20],
               [1, 8, 15, 22],
               [40, 33, 26, 19],
               [2, 9, 16, 23],
               [39, 32, 25, 18],
               [3, 10, 17, 24],
               [38, 31, 24, 17],
               [4, 11, 18, 25],
               [37, 30, 23, 16],
               [5, 12, 19, 26],
               [36, 29, 22, 15],
               [6, 13, 20, 27],
               [35, 28, 21, 14],
               [0, 8, 16, 24],
               [41, 33, 25, 17],
               [7, 15, 23, 31],
               [34, 26, 18, 10],
               [14, 22, 30, 38],
               [27, 19, 11, 3],
               [35, 29, 23, 17],
               [6, 12, 18, 24],
               [28, 22, 16, 10],
               [13, 19, 25, 31],
               [21, 15, 9, 3],
               [20, 26, 32, 38],
               [36, 30, 24, 18],
               [5, 11, 17, 23],
               [37, 31, 25, 19],
               [4, 10, 16, 22],
               [2, 10, 18, 26],
               [39, 31, 23, 15],
               [1, 9, 17, 25],
               [40, 32, 24, 16],
               [9, 7, 25, 33],
               [8, 16, 24, 32],
               [11, 7, 23, 29],
               [12, 18, 24, 30],
               [1, 2, 3, 4],
               [5, 4, 3, 2],
               [8, 9, 10, 11],
               [12, 11, 10, 9],
               [15, 16, 17, 18],
               [19, 18, 17, 16],
               [22, 23, 24, 25],
               [26, 25, 24, 23],
               [29, 30, 31, 32],
               [33, 32, 31, 30],
               [36, 37, 38, 39],
               [40, 39, 38, 37],
               [7, 14, 21, 28],
               [8, 15, 22, 29],
               [9, 16, 23, 30],
               [10, 17, 24, 31],
               [11, 18, 25, 32],
               [12, 19, 26, 33],
               [13, 20, 27, 34]
           ];
           //now take the 4 values in earch winningArray & plug them into the squares values 
           for (let y = 0; y < winningArrays.length; y++) {
               const square1 = squares[winningArrays[y][0]]
               const square2 = squares[winningArrays[y][1]]
               const square3 = squares[winningArrays[y][2]]
               const square4 = squares[winningArrays[y][3]]

               //now check those arrays to see if they all have the class of player-one
               if (StopGame) {
                   if (square1.classList.contains('player-one') &&
                       square2.classList.contains('player-one') &&
                       square3.classList.contains('player-one') &&
                       square4.classList.contains('player-one')) {
                       //if they do, player-one is passed as the winner
                       result.style.color = 'red'
                       result.innerHTML = 'Player one wins!'
                       score1++
                       displayPlayer1.innerHTML = 'Player 1 :: ' + score1
                       StopGame = false
                           //remove ability to change result
                   }
                   //now check to see if they all have the classname player two
                   else if (square1.classList.contains('player-two') &&
                       square2.classList.contains('player-two') &&
                       square3.classList.contains('player-two') &&
                       square4.classList.contains('player-two')) {
                       //if they do, player-two is passed as the winner as well as the chip positions
                       score2++
                       displayPlayer2.innerHTML = 'Player 2 :: ' + score2
                       result.style.color = 'blue'
                       result.innerHTML = 'Player two wins!'
                       StopGame = false

                   }
               }
           }*/
    }

    //add an event listener to each square that will trigger the checkBoard function on click
    squares.forEach(square => square.addEventListener('click', checkBoard))

    resetGame = () => {
        board = new Array(6);
        //Bucle para meter en cada posición otros array de 10
        for (var i = 0; i < 6; i++) {
            board[i] = new Array(7);
        }
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                board[i][j] = 0
            }
        }
        StopGame = true
        for (var i = 0; i < squares.length - 7; i++) {
            squares[i].classList.remove('taken')
            squares[i].classList.remove('player-one')
            squares[i].classList.remove('player-two')

        }
        result.innerHTML = ""
    }

})