import React, { Component } from 'react';
import Square from './Square';
import './board.css';


class Board extends Component {
    static defaultProps = {
        nrow: 5,
        ncol: 5,
        onChance: 0.3
    }
    constructor(props){
        super(props);

        
        this.state = {
            hasWon: false,
            staticBoard: [
                [0,1,1,1,0],
                [0,0,1,0,0],
                [0,0,0,0,0],
                [1,0,0,0,0],
                [1,1,0,0,0]
            ],
            board: this.createBoard(),
        }



        this.createBoard = this.createBoard.bind(this);
        this.renderBoard = this.renderBoard.bind(this);
        this.flipSquare = this.flipSquare.bind(this);



    }

    createBoard(){
        let board =  Array(this.props.nrow).fill(0).map(() => Array(this.props.ncol).fill(0));
        for (let i = 0; i < this.props.nrow; i++){
            for(let j = 0; j < this.props.nrow; j++){
                board[i][j] = Math.round(Math.random());
            }
        }

        return board;
    }

    renderBoard(){
        let squareBoard = Array(this.props.nrow).fill(0).map(() => Array(this.props.ncol).fill(0));
        for (let i = 0; i < this.props.nrow; i++){
            for(let j = 0; j < this.props.nrow; j++){
                let coord = i+"-"+j;
               squareBoard[i][j] = <Square flipSquare={() => this.flipSquare(coord)} key={coord} isOn={this.state.staticBoard[i][j]}/>
            }
        }

        return squareBoard;
    }


    flipSquare(coord){
        let {ncol, nrow} = this.props;
        let board = this.state.staticBoard;
        let [y,x] = coord.split("-").map(Number);

        function flipCell(y, x){
            if(x >= 1 && x < 4 && y >= 1 && y <4 ) {
                board[y][x] = !board[y][x]; // X
                board[y-1][x] = !board[y-1][x]; // gora
                board[y+1][x] = !board[y+1][x]; // dol
                board[y][x-1] = !board[y][x-1] // lewo 
                board[y][x+1] = !board[y][x+1] // prawo
            }else if(y===0 && x===0){
                board[y][x] = !board[y][x]; // X
                board[y][x+1] = !board[y][x+1] // prawo
                board[y+1][x] = !board[y+1][x]; // dol
            }else if(y===0 && x===4){
                board[y][x] = !board[y][x]; // X
                board[y][x-1] = !board[y][x-1] // lewo 
                board[y+1][x] = !board[y+1][x]; // dol
            }else if(y===4 && x===4){
                board[y][x] = !board[y][x]; // X
                board[y-1][x] = !board[y-1][x]; // gora
                board[y][x-1] = !board[y][x-1] // lewo 
            }else if(y===4 && x===0){
                board[y][x] = !board[y][x]; // X
                board[y-1][x] = !board[y-1][x]; // gora
                board[y][x+1] = !board[y][x+1] // prawo
                // ----------- 4 cases down below
            }else if(y===0){ // gora
                board[y][x] = !board[y][x]; 
                board[y+1][x] = !board[y+1][x]; // dol
                board[y][x-1] = !board[y][x-1] // lewo 
                board[y][x+1] = !board[y][x+1] // prawo
            }else if(x===4){ // prawo
                board[y][x] = !board[y][x]; 
                board[y-1][x] = !board[y-1][x]; // gora
                board[y+1][x] = !board[y+1][x]; // dol
                board[y][x-1] = !board[y][x-1] // lewo 
            }else if(y===4){ // dol
                board[y][x] = !board[y][x]; 
                board[y-1][x] = !board[y-1][x]; // gora
                board[y][x-1] = !board[y][x-1] // lewo 
                board[y][x+1] = !board[y][x+1] // prawo
            }else if(x===0){ // lewo
                board[y][x] = !board[y][x]; 
                board[y-1][x] = !board[y-1][x]; // gora
                board[y+1][x] = !board[y+1][x]; // dol
                board[y][x+1] = !board[y][x+1] // prawo
        }
        }

        flipCell(y,x);

        let isWonHelper = board.every(row => row.every(cell => !cell));
        this.setState({staticBoard: board, hasWon: isWonHelper});
    }

    

    render() { 

        if (this.state.hasWon){
            return <alert>You won!</alert>;
        }
    
    
        return ( 
            <div className="board">
                
            {this.renderBoard()}

            </div>
        );
    }
}
 
export default Board;