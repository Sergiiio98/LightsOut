import React, { Component } from 'react';
import './square.css';

class Square extends Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.flipSquare();
    }
  

    render() { 
        let classes = "Square" + (this.props.isOn ? "On" : "")
        return (
            <td className={classes} onClick={this.handleClick}/>
          );
    }
}
 
export default Square;