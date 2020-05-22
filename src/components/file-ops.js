import React, {Component} from 'react';

class FileOps extends Component {

  render() {
    return (
      <div id="file-ops">
        <button id="tilesetload_button"
          onClick={this.tilesetLoadClick}
        >
          Load Tileset
        </button>
        <input type="file" id="tilesetload_input"
          style={{display: 'none'}}
          accept=".png, .bmp">
        </input>
        <button id="colorload_button"
          onClick={() => document.getElementById('colorload_input').click()}
        >
          Load Color File
        </button>
        <input type="file" id="colorload_input"
          style={{display: 'none'}}
          onChange={this.colorLoadHandler}
          accept=".txt">
        </input>
        <button id="colorsave_button" 
          onClick={this.colorSaveClick}
        >
          Save Color File
        </button>
      </div>
    );
  }

  tilesetLoadClick() {
  }

  tilesetLoadHandler = (event) => {
    let file = event.target.files[0];
    this.loadTilesetFile(file);
  }

  colorLoadHandler = (event) => {
    let file = event.target.files[0];
    this.loadColorFile(file);
  }

  loadTilesetFile(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\r\n');
      this.props.parser(lines);
    }
    fileReader.readAsText(file);
  }

  loadColorFile(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\r\n');
      this.props.parser(lines);
    }
    fileReader.readAsText(file);
  }

  colorSaveClick = () => {
    const element = document.createElement("a");
    const str = this.props.saver();
    const file = new Blob([str], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "colors.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

}

export default FileOps;
