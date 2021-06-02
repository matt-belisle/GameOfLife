import React from "react";

//this is just a cell container that can change background color based on if its alive or not
class Cell extends React.Component {
    render() {
        const background_color = this.props.alive === 1 ? "alive" : "dead"
        const classes = `cell ${background_color}`
        return (
            <div className={classes} style={{background:background_color}} onClick={() => this.props.onClick()}>
            </div>
        );
    }
}

export default Cell