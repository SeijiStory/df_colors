import React, { Component} from 'react';

// import TilesetPreview from './components/tileset';
import FileOps from './components/file-ops'; import ColorList from './components/color-list';
import ColorPicker from './components/color-picker';
import ColorIDs from './data/color-ids';
import './App.css'
import './resources/map.json'

const COLOR_AMOUNT = 16

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colorVals: [
        {name: ColorIDs.BLACK.name, color: ColorIDs.BLACK.defaultColor},
        {name: ColorIDs.BLUE.name, color: ColorIDs.BLUE.defaultColor},
        {name: ColorIDs.GREEN.name, color: ColorIDs.GREEN.defaultColor},
        {name: ColorIDs.CYAN.name, color: ColorIDs.CYAN.defaultColor},
        {name: ColorIDs.RED.name, color: ColorIDs.RED.defaultColor},
        {name: ColorIDs.MAGENTA.name, color: ColorIDs.MAGENTA.defaultColor},
        {name: ColorIDs.BROWN.name, color: ColorIDs.BROWN.defaultColor},
        {name: ColorIDs.L_GRAY.name, color: ColorIDs.L_GRAY.defaultColor},
        {name: ColorIDs.D_GRAY.name, color: ColorIDs.D_GRAY.defaultColor},
        {name: ColorIDs.L_BLUE.name, color: ColorIDs.L_BLUE.defaultColor},
        {name: ColorIDs.L_GREEN.name, color: ColorIDs.L_GREEN.defaultColor},
        {name: ColorIDs.L_CYAN.name, color: ColorIDs.L_CYAN.defaultColor},
        {name: ColorIDs.L_RED.name, color: ColorIDs.L_RED.defaultColor},
        {name: ColorIDs.L_MAGENTA.name, color: ColorIDs.L_MAGENTA.defaultColor},
        {name: ColorIDs.YELLOW.name, color: ColorIDs.YELLOW.defaultColor},
        {name: ColorIDs.WHITE.name, color: ColorIDs.WHITE.defaultColor},
      ],
      tilesetFile: "../resources/tileset.png",
      tilesetDimensions: { x: 8, y: 12, width: 640, height: 300 },
      colorIndex: 0,
      currentPickerColor: ColorIDs.BLACK.defaultColor,
    };
  }

  colorFileSave() {
    let str = "";
    for (let i = 0; i < COLOR_AMOUNT; ++i) {
      let color = this.state.colorVals[i];
      str += "[" + color.name + "_R:" + color.color.r + "]\r\n"
      str += "[" + color.name + "_G:" + color.color.g + "]\r\n"
      str += "[" + color.name + "_B:" + color.color.b + "]\r\n"
    }
    return str;
  }

  colorFileLoad(lines) {
    let newColorVals = this.state.colorVals.slice();
    for (let i = 0; i < COLOR_AMOUNT; ++i) {
      const name = "[" + this.state.colorVals[i].name;
      const match = lines.filter(s => s.includes(name));
      const rgb = {
        r: parseInt(match.find(s => s.includes("_R")).replace(/[^0-9]/g,'')),
        g: parseInt(match.find(s => s.includes("_G")).replace(/[^0-9]/g,'')),
        b: parseInt(match.find(s => s.includes("_B")).replace(/[^0-9]/g,'')),
      };
      newColorVals[i].color = rgb;
    }
    this.setState({
      colorVals: newColorVals,
    });
  }

  onClickColor(i) {
    this.setState({
      colorIndex: i,
    });
  }

  onChangePicker(color) {
    let tmp = this.state.colorVals.slice();
    tmp[this.state.colorIndex].color = color.rgb;
    this.setState({
      colorVals: tmp,
    });
  }

  render() {
    return (
      <div className="App">
        <FileOps
          parser={(lines) => this.colorFileLoad(lines)}
          saver={() => this.colorFileSave()}
        />
        <ColorList
          colorVals={this.state.colorVals}
          onClick={(i) => this.onClickColor(i)}
        />
        <ColorPicker
          color={this.state.colorVals[this.state.colorIndex].color}
          onChange={(color) => this.onChangePicker(color)}
        />
      </div>
    );
    /*
    <TilesetPreview />
    /**/
  }
}

export default App;
