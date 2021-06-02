import React from "react";
import Grid from "./Grid";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const baseGrid = 50
//this component is responsible for all of the actual work
class GameOfLife extends React.Component{
    constructor(props) {
        super(props);
        const board = []
        for(let i = 0; i < baseGrid; i++){
            board[i] = Array(baseGrid).fill(0)
        }

        this.state = {
            board: board,
            running: false,
            xSize: baseGrid,
            ySize: baseGrid
        }

    }

    clickCell(i,j){
        let board = this.state.board.slice()
        board[i][j] = board[i][j] === 0 ? 1 : 0
        // console.log(i,j)
        // console.log(board)
        this.setState({board: board})
    }

    clickButton(){
        this.setState({running: !this.state.running}, () => this.runGeneration())
    }

    runGeneration(){
        if(this.state.running){
            const next_board = this.state.board.map(this.checkSurrounding.bind(this))
            this.setState({board: next_board}, () => sleep(10).then(() => this.runGeneration()))
        }
    }

    //counts number near cell alive
    checkSurrounding(elem, ind, board){
        //check surrounding 8 cells to see how many are there, rules are simple
        //assumes the board is padded with zeros
        if(ind !== 0 && ind !== this.state.xSize - 1) {
            console.log(elem)
            return elem.map((alive, index) => {
                if(index !== 0 && index !== this.state.ySize - 1) {
                    const surrounding = board[ind - 1][index - 1] + board[ind - 1][index] + board[ind - 1][index + 1] + board[ind][index - 1] + board[ind][index + 1] + board[ind + 1][index - 1] + board[ind + 1][index] + board[ind + 1][index + 1]
                    if (alive === 1 && (surrounding < 2 || surrounding > 3)) {
                        return 0
                    } else if (alive === 0 && surrounding === 3) {
                        return 1
                    } else {
                        return alive
                    }
                } else {
                    return alive
                }
            })
        } else {
            return elem
        }

    }
    render() {
        return (
            <div className="GameOfLife">
                <div className="Game-Grid" >
                    <Grid clickedCell={this.clickCell.bind(this)} board={this.state.board}/>
                </div>
                <button onClick={this.clickButton.bind(this)} >
                    {this.state.running ? 'Stop' : 'Go'}
                </button>
            </div>
        )
    }
}

export default GameOfLife