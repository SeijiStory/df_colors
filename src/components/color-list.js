import React, { Component} from 'react';

function ColorSquare(props) {
  const squarestyle = {
    background: `rgb(${props.color.r}, ${props.color.g}, ${props.color.b})`,
  };
  const textstyle = 
    ((props.color.r + props.color.g + props.color.b) / 3) >= 128 ?
    { color: "#000" } : { color: "#FFF" };
  return (
    <button id={props.name}
      className="color-square"
      onClick={props.onClick}
      style={squarestyle}
    >
      <div className="color-square-text" style={textstyle}>
        {props.name}
      </div>
    </button>
  );
}

class ColorList extends Component {

  renderColor(i) {
    return (
      <ColorSquare
        onClick={() => this.props.onClick(i)}
        name={this.props.colorVals[i].name}
        color={this.props.colorVals[i].color}
      />
    );
  }

  render() {
    return (
      <div id="color-list">
        <div id="dark-col">
          {this.renderColor(0)}
          {this.renderColor(1)}
          {this.renderColor(2)}
          {this.renderColor(3)}
          {this.renderColor(4)}
          {this.renderColor(5)}
          {this.renderColor(6)}
          {this.renderColor(7)}
        </div>
        <div id="light-col">
          {this.renderColor(8)}
          {this.renderColor(9)}
          {this.renderColor(10)}
          {this.renderColor(11)}
          {this.renderColor(12)}
          {this.renderColor(13)}
          {this.renderColor(14)}
          {this.renderColor(15)}
        </div>
      </div>
    );
  }

}

export default ColorList;
