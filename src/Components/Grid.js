import React from "react";
import Cell from "./Cell";
//this is just a grid container. nothing special
class Grid extends React.Component {

    render() {
        const cells = []
        for(let i = 1; i < this.props.board.length - 1; i++){
            const row = []
            for(let j = 1; j < this.props.board[i].length - 1; j++){
                row.push(<Cell onClick ={() => this.props.clickedCell(i,j)}
                alive={this.props.board[i][j]}/>)
            }
            cells.push(<div className={"cell-row"}>{row}</div>)
        }
        return (
        <div>
            {cells}
        </div>
        )
    }
}

export default Grid