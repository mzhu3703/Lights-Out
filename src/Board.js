import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightOn: 0.25,
  }

  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    }
    this.flipCellsAround = this.flipCellsAround.bind(this);

    // TODO: set initial state
  }

  rando() {
    return Math.random() >= this.props.chanceLightOn;
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = Array(this.props.nrows).fill().map(_ =>
      Array(this.props.ncols).fill().map(_ => this.rando()));
    return board;
  }
  fakeBoard() {
    let fakeBoard = Array(this.props.nrows).fill().map(_ =>
      Array(this.props.ncols).fill().map(_ => false));
    return fakeBoard;
  }


  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);
    flipCell(y-1,x)
    flipCell(y+1,x)
    flipCell(y,x-1)
    flipCell(y,x+1)

    
    
    let hasWon = board.every(row => row.every(cell => !cell));
    
    this.setState({ board: board, hasWon: hasWon });
  }




  render() {
    let tblBoard = [];
    for (let i = 0; i < this.props.nrows; i++) {
      let cellArray = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let coord = `${i}-${j}`;
        cellArray.push(<Cell location={coord} flipCellsAroundMe={() => this.flipCellsAround(coord)} key={coord} isLit={this.state.board[i][j]} />)

      }
      tblBoard.push(<tr key={i}>{cellArray}</tr>);

    }

    return (<div>
      <span className = "neon">Lights </span>
      <span className = "flux">Out</span>
      {this.state.hasWon ? <h1 className = "neon">You win</h1>: <table className="Board">
        <tbody>
          {tblBoard}
        </tbody>
      </table>}
      
    </div>
    )
  
  }
}


export default Board;
