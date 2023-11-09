'use client'
import styles from './page.module.css'
import { useState, useEffect } from 'react'


export default function CheckerBoard(){
    const [selectedPieceRowIndex, setSelectedPieceRowIndex] = useState(null);
    const [selectedPieceColumnIndex, setSelectedPieceColumnIndex] = useState(null)
    const [turn, setTurn] = useState('player1')
    const [board, setBoard] = useState(
        [
            [
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}
            ],
            [
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}
            ],
            [
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 1, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}
            ],
            [
                {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}
            ],
            [
                {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}
            ],
            [
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}
            ],
            [
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}
            ],
            [
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false},
                {player: 2, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}
            ],
        ]
    )

    for(let i=0; i<board.length; i++){
        for(let j=0; j<board[i].length; j++){
            board[i][j].move.moves=[]
            if(board[i][j].player > 0 && board[i][j].type.ghost == false){

                //which way the board is shifted
                let shift
                if(i%2 == 0){
                    shift = 1
                } else {
                    shift = -1
                }

                let canMoveCondition = false

                //moving conditions for player 1
                if(turn === 'player1' && board[i][j].player == 1){
                    //normal moving conditions
                    if(i<7){
                        canMoveCondition = (board[i+1][j].player == 0)
                        if(board[i+1][j].player == 0){
                            board[i][j].move.moves.push([i+1,j])
                        }
                        if((j-shift <= 3) && (j-shift >= 0)){
                            canMoveCondition = canMoveCondition || (board[i+1][j-shift].player == 0)  
                            if(board[i+1][j-shift].player == 0){
                                board[i][j].move.moves.push([i+1,j-shift])
                            }
                        }
                        //jumping moving conditions
                        if(i<6){
                            if(j<=100){
                                if(board[i+1][j].player == 2){
                                    if(board[i+2][j-shift] == 0){
                                        canMoveCondition = true
                                        board[i][j].move.moves.push([i+2,j-shift])
                                    }
                                }
                            }

                            if(j<=2 && j>=1){
                                if(board[i+1][j+shift].player == 2){
                                    if(board[i+2][j+shift] == 0){
                                        canMoveCondition = true
                                        board[i][j].move.moves.push([i+2,j-shift])
                                    }
                                }
                            }
                        }
                    }
                }
                
                //moving conditions for player 2
                if(turn == 'player2' && board[i][j].player == 2){
                    if(i>0){
                        canMoveCondition = (board[i-1][j].player == 0)
                        if(board[i-1][j].player == 0){
                            board[i][j].move.moves.push([i-1,j])
                        }
                        if((j-shift <= 3) && (j-shift >= 0)){
                            canMoveCondition = canMoveCondition || (board[i-1][j-shift].player == 0)
                            if(board[i-1][j-shift].player == 0){
                                board[i][j].move.moves.push([i-1,j-shift])
                            }
                        }
                    }
                }

                if(canMoveCondition){
                    board[i][j].move.canMove = true
                }
            }
        }
    }


    function randomizeBoard(){
        let randomBoard = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
        ]
        for(let i=0; i<8; i++){
            for(let j=0; j<4; j++){
                randomBoard[i][j] = {player: Math.floor(Math.random()*3), type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}
            }
        }
        setBoard(randomBoard)
    }
    function selectPiece(rowIndex, columnIndex){
        if (selectedPieceRowIndex !== null && selectedPieceColumnIndex !== null) {
            const updatedBoard = [...board];
            updatedBoard[selectedPieceRowIndex][selectedPieceColumnIndex].selected = false;
            setBoard(updatedBoard);
        }

        // Select the clicked piece
        const updatedBoard = [...board];
        updatedBoard[rowIndex][columnIndex].selected = true;

        //clear ghost pieces
        for (let i = 0; i < updatedBoard.length; i++) {
            for (let j = 0; j < updatedBoard[i].length; j++) {
                updatedBoard[i][j].type.ghost = false;
            }
        }

        //add ghost pieces where the piece can move
        const updatedBoardGhosts = updatedBoard[rowIndex][columnIndex].move.moves
        for(let i=0; i<updatedBoardGhosts.length; i++){
            updatedBoard[updatedBoardGhosts[i][0]][updatedBoardGhosts[i][1]].type.ghost = true
        }
        setBoard(updatedBoard);

        // Update the selected piece coordinates
        setSelectedPieceRowIndex(rowIndex);
        setSelectedPieceColumnIndex(columnIndex);
    

    }
    function takeTurn(rowIndex, columnIndex){
        let updatedBoard = board

        for (let i = 0; i < updatedBoard.length; i++) {
            for (let j = 0; j < updatedBoard[i].length; j++) {
                updatedBoard[i][j].type.ghost = false;
                updatedBoard[i][j].move.canMove = false;
                updatedBoard[i][j].move.moves = [];
            }
        }

        updatedBoard[rowIndex][columnIndex] = board[selectedPieceRowIndex][selectedPieceColumnIndex]
        updatedBoard[rowIndex][columnIndex].selected = false
        //get rid of selected piece
        updatedBoard[selectedPieceRowIndex][selectedPieceColumnIndex] = {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}

        if(turn == 'player1'){
            setTurn('player2')
        } else {
            setTurn('player1')
        }

        /* console.log(updatedBoard) */

        setBoard(updatedBoard)
    }
    function none() {
        return
    }

    function WhiteSquare(rowIndex, columnIndex){
        return(
            <td className={styles.whiteSquare}
            key={`white-${(rowIndex*4) + columnIndex}`}
            ></td>
        )
    }
    function BlackSquare(rowIndex, columnIndex){
        return(
            <td className={`
            ${styles.blackSquare}
            ${board[rowIndex][columnIndex].move.canMove == true ? styles.highlight : styles.none}
            ${board[rowIndex][columnIndex].selected == true ? styles.selected : styles.none}
            `}
            onClick={
                board[rowIndex][columnIndex].type.ghost == true ? () => {takeTurn(rowIndex, columnIndex)}
                : board[rowIndex][columnIndex].move.canMove == true ? () => {selectPiece(rowIndex, columnIndex)} : none} 
            key={`black-${(rowIndex*4) + columnIndex}
            `}
            >
                <div className={`
                ${board[rowIndex][columnIndex].player == 1 ? styles.piece1 : styles.none}
                ${board[rowIndex][columnIndex].player == 2 ? styles.piece2 : styles.none}
                ${board[rowIndex][columnIndex].type.ghost == true ? styles.ghostPiece : styles.none}
                `}
                ></div>
            </td>
        )
    }

    return(
        <>
            <table className={styles.checkerBoard}>
                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={rowIndex+1}>
                        {board[rowIndex].map((cell, columnIndex) => (
                            (rowIndex % 2 === 1 ? 
                            <>
                            {WhiteSquare(rowIndex, columnIndex)}
                            {BlackSquare(rowIndex, columnIndex)}
                            </> 
                            :
                            <>
                            {BlackSquare(rowIndex, columnIndex)}
                            {WhiteSquare(rowIndex, columnIndex)}
                            </>
                            )
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={randomizeBoard}>Randomize Board</button>
            <button onClick={() => {
                const updatedBoard = board.map(row => row.map(cell => ({ ...cell, type: {ghost: false}, move: {canMove: false, moves: []}, selected: false})));
                if(turn == 'player1'){
                    setTurn('player2')
                } else {
                    setTurn('player1')
                }
                setBoard(updatedBoard)
            }}>Switch Players</button>
            <button onClick={() => console.log(board)}>see board data</button>
        </>
    )
}
/////////////////////////////////////
/*                             //console log all of the positions for player 1
                            //array position of piece
                            console.log(`Array position: ${i}, ${j}`)
                            //coordinate position of piece
                            console.log(`Coordinate position: ${((j+(shift==1?0:1))*2)+(shift==1?1:0)},${(8-i)}`)
                            console.log(`Shift: ${shift}`)
                            //move position in array
                            console.log(`Move array position: ${i+1},${j-shift}`)
                            //move position coordinates
                            console.log(`Move coordinate position: ${(((j-shift)+(shift==1?1:0))*2)+(shift==1?0:1)},${(7-i)}`) */