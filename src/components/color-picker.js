import React, { Component} from 'react';
import { SketchPicker } from 'react-color';

class ColorPicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      color: props.color,
      onChange: props.onChange,
    }
  }

  handleChange = (color) => {
    this.setState({ color: color.rgb });
    this.props.onChange(color);
  };

  render() {
    return(
      <div id="color-picker">
        <SketchPicker 
          color={this.props.color}
          onChange={this.handleChange}
          disableAlpha
          presetColors={[]}
        />
      </div>
    );
  }
}

export default ColorPicker;
