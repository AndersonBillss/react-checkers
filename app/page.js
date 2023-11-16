'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect, useReducer, Fragment } from 'react'

const initialState = {
    jumpChain: false,
    jumpChainStopper: true,
    selectedPieceRowIndex: null,
    selectedPieceColumnIndex: null,
    turn: 'player1',
    board: 
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
}

const checkersReducer = (state, action) => {
    switch(action.type){
        case 'SWITCHPLAYER':
            const updatedBoardSwitchPlayer = state.board.map(row =>
                row.map(cell => ({
                    ...cell,
                    type:{
                        king: cell.type.king,
                        ghost: false
                    },
                    selected: false,
                    move: { canMove: false, moves: [] }
                }))
            );

            return {
                ...state,
                turn: state.turn === 'player1' ? 'player2' : 'player1',
                selectedPieceRowIndex: null,
                jumpChain: false,
                selectedPieceColumnIndex: null,
                board: updatedBoardSwitchPlayer
            };



        case 'BOARDSET':
            const checkerboardPresetData = [
                [[0],  [0],  [0],  [0],   ],
                [   [0],  [0],  [0],  [0],],
                [[0],  [2],  [2],  [0],   ],
                [   [0],  [0],  [0],  [0],],
                [[2],  [0],  [2],  [2],   ],
                [   [0],  [0],  [0],  [0],],
                [[0],  [2],  [0],  [2],   ],
                [   [1],  [1],  [1],  [1],],
            ]
            let checkerboardPreset = []
            for(let i=0; i<8; i++){
                checkerboardPreset[i] = []
                for(let j=0; j<4; j++){
                    checkerboardPreset[i][j] = {player: checkerboardPresetData[i][j][0], type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}
                }
            }
            return{ 
                ...state,
                board: checkerboardPreset
            }




        case 'RANDOMIZEBOARD':
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
            return{
                ...state,
                board: randomBoard
            }




        case 'SELECTPIECE':
            let rowIndex1 = action.coords[0]
            let columnIndex1 = action.coords[1]
            const updatedBoard1 = [...state.board];



            //clear ghost pieces
            for (let i = 0; i < updatedBoard1.length; i++) {
                for (let j = 0; j < updatedBoard1[i].length; j++) {
                    updatedBoard1[i][j].type.ghost = false;
                }
            }
    
            //add ghost pieces where the piece can move
            const updatedBoardGhosts = updatedBoard1[rowIndex1][columnIndex1].move.moves
            for(let i=0; i<updatedBoardGhosts.length; i++){
                updatedBoard1[updatedBoardGhosts[i][0]][updatedBoardGhosts[i][1]].type.ghost = true
            }

            if (state.selectedPieceRowIndex !== null && state.selectedPieceColumnIndex !== null) {
                updatedBoard1[state.selectedPieceRowIndex][state.selectedPieceColumnIndex].selected = false;
            }
            //select clicked piece
            updatedBoard1[rowIndex1][columnIndex1].selected = true;

            return{
                ...state,
                // Update the selected piece coordinates
                selectedPieceRowIndex: rowIndex1,
                selectedPieceColumnIndex: columnIndex1,
                jumpChainStopper: true,
                //update board
                board: updatedBoard1,
            }



        case 'TAKETURN': 
            let rowIndex2 = action.coords[0]
            let columnIndex2 = action.coords[1]
            const updatedBoard2 = [...state.board]
            let jumpChain = false

            let newSelectedPieceRowIndex = null
            let newSelectedPieceColumnIndex = null

            //get rid of all ghost pieces and remove the highlight from all pieces
            for (let i = 0; i < updatedBoard2.length; i++) {
                for (let j = 0; j < updatedBoard2[i].length; j++) {
                    updatedBoard2[i][j].type.ghost = false;
                    updatedBoard2[i][j].move.canMove = false;
                    updatedBoard2[i][j].move.moves = [];
                }
            }
            const selectedPiece = state.board[state.selectedPieceRowIndex][state.selectedPieceColumnIndex]

            const playerNumber = (rowIndex2-state.selectedPieceRowIndex)/2


            
            //put the selected piece in the new location
            if(selectedPiece.player !== 0){
                updatedBoard2[rowIndex2][columnIndex2] = selectedPiece
                updatedBoard2[rowIndex2][columnIndex2].selected = false
             }
            //get rid of selected piece
            updatedBoard2[state.selectedPieceRowIndex][state.selectedPieceColumnIndex] = {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}

            //if the player jumps, remove the piece in between the previous position and the new position
            if(Number(Math.abs(rowIndex2-state.selectedPieceRowIndex)) > 1){
                const jumpedPieceRow = state.selectedPieceRowIndex+playerNumber
                const isKing = updatedBoard2[rowIndex2][columnIndex2].type.king

                let shift
                if(rowIndex2 % 2 == 0){
                    shift = 1
                } else {
                    shift = -1
                }

                let jumpDirection
                if(state.selectedPieceColumnIndex-columnIndex2 < 0){
                    jumpDirection = 1
                } else {
                    jumpDirection = -1
                }
                
                //finding the coordinates of the jumped piece and testing for jump chain
                let jumpedPieceColumn
                if (playerNumber == 1){
                    if(jumpDirection == shift){
                        jumpedPieceColumn = columnIndex2-shift
                    } else {
                        jumpedPieceColumn = columnIndex2
                    }
                } else {
                    if(jumpDirection == shift){
                        jumpedPieceColumn = columnIndex2-shift
                    } else {
                        jumpedPieceColumn = columnIndex2
                    }
                }
                //get rid of jumped piece
                updatedBoard2[jumpedPieceRow][jumpedPieceColumn] = {player: 0, type: {king: false, ghost: false}, move: {canMove: false, moves: []}, selected: false}


                    if(rowIndex2 < 6){
                        if(columnIndex2-shift<=3 && columnIndex2-shift>=0){
                            if((updatedBoard2[rowIndex2+1][columnIndex2-shift].player == 2 && state.turn == 'player1') || (updatedBoard2[rowIndex2+1][columnIndex2-shift].player == 1 && isKing && state.turn == 'player2')){
                                if(updatedBoard2[rowIndex2+2][columnIndex2-shift].player == 0 && rowIndex2 < 6){
                                    updatedBoard2[rowIndex2][columnIndex2].move.moves.push([rowIndex2+2,columnIndex2-shift])
                                    updatedBoard2[rowIndex2][columnIndex2].move.canMove = true
                                    newSelectedPieceRowIndex = rowIndex2
                                    newSelectedPieceColumnIndex = columnIndex2
                                    jumpChain = true
                                } 
                            }
                        }
    
                        if(columnIndex2+shift<=3 && columnIndex2+shift>=0){
                            if(((updatedBoard2[rowIndex2+1][columnIndex2].player == 2 && state.turn == 'player1') || (updatedBoard2[rowIndex2+1][columnIndex2].player == 1 && isKing && state.turn == 'player2'))){
                                if(updatedBoard2[rowIndex2+2][columnIndex2+shift].player == 0 && rowIndex2 < 6){
                                    updatedBoard2[rowIndex2][columnIndex2].move.moves.push([rowIndex2+2,columnIndex2+shift])
                                    updatedBoard2[rowIndex2][columnIndex2].move.canMove = true
                                    newSelectedPieceRowIndex = rowIndex2
                                    newSelectedPieceColumnIndex = columnIndex2
                                    jumpChain = true
                                }
                            }
                        }

                    }

                
                    if(rowIndex2 > 1){
                        if(columnIndex2-shift<=3 && columnIndex2-shift>=0){
                            if((updatedBoard2[rowIndex2-1][columnIndex2-shift].player == 1 && state.turn == 'player2') || (updatedBoard2[rowIndex2-1][columnIndex2-shift].player == 2 && isKing && state.turn == 'player1')){
                                if(updatedBoard2[rowIndex2-2][columnIndex2-shift].player == 0 && rowIndex2 < 6){
                                    updatedBoard2[rowIndex2][columnIndex2].move.moves.push([rowIndex2-2,columnIndex2-shift])
                                    updatedBoard2[rowIndex2][columnIndex2].move.canMove = true
                                    newSelectedPieceRowIndex = rowIndex2
                                    newSelectedPieceColumnIndex = columnIndex2
                                    jumpChain = true
                                } 
                            }
                        }
    
                        if(columnIndex2+shift<=3 && columnIndex2+shift>=0){
                            if(((updatedBoard2[rowIndex2-1][columnIndex2].player == 1 && state.turn == 'player2')  || (updatedBoard2[rowIndex2-1][columnIndex2].player == 2 && isKing && state.turn == 'player1'))){
                                if(updatedBoard2[rowIndex2-2][columnIndex2+shift].player == 0 && rowIndex2 < 6){
                                    updatedBoard2[rowIndex2][columnIndex2].move.moves.push([rowIndex2-2,columnIndex2+shift])
                                    updatedBoard2[rowIndex2][columnIndex2].move.canMove = true
                                    newSelectedPieceRowIndex = rowIndex2
                                    newSelectedPieceColumnIndex = columnIndex2
                                    jumpChain = true
                                }
                            }
                        }
                    }

            }


            const playerTurn = jumpChain ? state.turn : (state.turn==='player1' ? 'player2' : 'player1')

            //update turn and board
            return{
                ...state,
                jumpChain: jumpChain,
                jumpChainStopper: false,
                turn: playerTurn,
                board: updatedBoard2,
                selectedPieceRowIndex: newSelectedPieceRowIndex,
                selectedPieceColumnIndex: newSelectedPieceColumnIndex
            }


        default:
            return state
    }
}

export default function CheckerBoard(){

    const [state, dispatch] = useReducer(checkersReducer, initialState)




    if(!state.jumpChainStopper && state.jumpChain){
        state.jumpChainStopper = true
        for(let i=0; i<state.board.length; i++){
            for(let j=0; j<state.board[i].length; j++){
                if(i != state.selectedPieceRowIndex && j != state.selectedPieceColumnIndex){
                state.board[i][j].move.canMove = false
                state.board[i][j].move.moves = []
                }
            }
        }
        dispatch({ type: 'SELECTPIECE', coords: [state.selectedPieceRowIndex, state.selectedPieceColumnIndex]})
    } else {
        for(let i=0; i<state.board.length; i++){
            for(let j=0; j<state.board[i].length; j++){
                checkMoveConditions(i,j)
            }
        }
    }

    
    function checkMoveConditions(i, j){
        let nextPlayer = 0
        state.board[i][j].move.moves=[]
        if(state.board[i][j].player > 0 && state.board[i][j].type.ghost == false){

            //which way the state.board is shifted
            let shift
            if(i%2 == 0){
                shift = 1
            } else {
                shift = -1
            }


            //crown the kings
            if(state.board[i][j].player == 1 && i==7){
                state.board[i][j].type.king = true
            }
            if(state.board[i][j].player == 2 && i==0){
                state.board[i][j].type.king = true
            }
            //moving conditions for player 1
            if((state.turn === 'player1' && state.board[i][j].player == 1) || (state.turn === 'player2' && state.board[i][j].player == 2 && state.board[i][j].type.king)){
                //normal moving conditions
                if(i<7){
                    if(state.board[i+1][j].player == 0){
                        state.board[i][j].move.moves.push([i+1,j])  
                    }
                    if((j-shift <= 3) && (j-shift >= 0)){
                        if(state.board[i+1][j-shift].player == 0){
                            state.board[i][j].move.moves.push([i+1,j-shift])
                        }
                    }
                    //jumping moving conditions
                    if(i<6){
                        if(j+shift <= 3 && j+shift >=0){
                            nextPlayer = state.board[i+1][j].player
                            if((nextPlayer == 2 && state.turn == 'player1') || (nextPlayer==1 && state.board[i][j].type.king && state.turn == 'player2')){
                                if(state.board[i+2][j+shift].player == 0){
                                    state.board[i][j].move.moves.push([i+2,j+shift])
                                }
                            }
                        }

                        if((j-shift <= 3 && j-shift >=0)){
                            nextPlayer = state.board[i+1][j-shift].player
                            if((nextPlayer == 2 && state.turn == 'player1') || (nextPlayer == 1 && state.board[i][j].type.king && state.turn == 'player2')){
                                if(state.board[i+2][j-shift].player == 0){
                                    state.board[i][j].move.moves.push([i+2,j-shift])
                                }
                            }
                        }
                    }
                }
            }
            

            //moving conditions for player 2
            if(state.turn == 'player2' && state.board[i][j].player == 2  || (state.turn === 'player1' && state.board[i][j].player == 1 && state.board[i][j].type.king)){
                if(i>0){
                    if(state.board[i-1][j].player == 0){
                        state.board[i][j].move.moves.push([i-1,j])
                    }
                    if((j-shift <= 3) && (j-shift >= 0)){
                        if(state.board[i-1][j-shift].player == 0){
                            state.board[i][j].move.moves.push([i-1,j-shift])
                        }
                    }
                    //jumping moving conditions
                    if(i>1){
                        if(j-shift <= 3 && j-shift >=0){
                            nextPlayer = state.board[i-1][j-shift].player
                            if((nextPlayer == 1 && state.turn == 'player2') || (nextPlayer == 2 && state.board[i][j].type.king && state.turn == 'player1')){
                                if(state.board[i-2][j-shift].player == 0){
                                    state.board[i][j].move.moves.push([i-2,j-shift])
                                }
                            }
                        }

                        if(j+shift <= 3 && j+shift >=0){
                            nextPlayer = state.board[i-1][j].player
                            if((nextPlayer == 1 && state.turn == 'player2') || (nextPlayer == 2 && state.board[i][j].type.king && state.turn == 'player1')){
                                if(state.board[i-2][j+shift].player == 0){
                                    state.board[i][j].move.moves.push([i-2,j+shift])
                                }
                            }
                        }
                    }
                }
            }

            if(state.board[i][j].move.moves.length > 0){
                state.board[i][j].move.canMove = true
            }
            
        }
    }



    


    function randomizeBoard(){
        dispatch({ type: 'RANDOMIZEBOARD' })
    }

    function selectPiece(rowIndex, columnIndex){
        dispatch({ type: 'SELECTPIECE', coords: [rowIndex, columnIndex]})
    }
    function takeTurn(rowIndex, columnIndex){
        dispatch({ type: 'TAKETURN', coords: [rowIndex, columnIndex]})
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
            ${(state.board[rowIndex][columnIndex].move.canMove && !state.jumpChain) == true ? styles.highlight : styles.none}
            ${state.board[rowIndex][columnIndex].selected == true ? styles.selected : styles.none}
            `}
            onClick={
                
                 state.jumpChain && (rowIndex == state.selectedPieceRowIndex && columnIndex == state.selectedPieceColumnIndex) ? () => {dispatch({ type: 'SWITCHPLAYER' })}
                : state.board[rowIndex][columnIndex].type.ghost == true ? () => {takeTurn(rowIndex, columnIndex)}
                : (state.board[rowIndex][columnIndex].move.canMove == true && !state.jumpChain) ? () => {selectPiece(rowIndex, columnIndex)}
                 : none} 
            key={`black-${(rowIndex*4) + columnIndex}
            `}
            >
                <div className={`
                ${state.board[rowIndex][columnIndex].player == 1 ? styles.piece1 : styles.none}
                ${state.board[rowIndex][columnIndex].player == 2 ? styles.piece2 : styles.none}
                ${state.board[rowIndex][columnIndex].type.ghost == true ? styles.ghostPiece : styles.none}
                `}
                >{state.board[rowIndex][columnIndex].type.king ? <div className={styles.crown}></div> : ''}</div>
            </td>
        )
    }

    return(
        <>
            <table className={styles.checkerboard}>
                <tbody>
                    {state.board.map((row, rowIndex) => (
                        <tr key={rowIndex+1}>
                        {state.board[rowIndex].map((cell, columnIndex) => (
                            (rowIndex % 2 === 1 ? 
                            <Fragment key={(rowIndex*4+columnIndex)}>
                            {WhiteSquare(rowIndex, columnIndex)}
                            {BlackSquare(rowIndex, columnIndex)}
                            </Fragment> 
                            :
                            <Fragment key={(rowIndex*4+columnIndex)}>
                            {BlackSquare(rowIndex, columnIndex)}
                            {WhiteSquare(rowIndex, columnIndex)}
                            </Fragment>
                            )
                        ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={randomizeBoard}>Randomize Board</button>
            <button onClick={() => {dispatch({ type: 'BOARDSET' })}}>Set Board Preset</button>
            <button onClick={() => {dispatch({ type: 'SWITCHPLAYER' })}}>Switch Players</button>
            <button onClick={() => console.log(state.board)}>see board data</button>
        </>
    )
}
