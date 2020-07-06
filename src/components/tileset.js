import React, {Component} from 'react';
import Sprite from 'react-spritesheet'
import map from '../resources/map.json'

class TilesetPreview extends Component {

  drawSprite(tile) {
    return (
      <Sprite
        filename={this.props.tilesetFile}
        x={tile.tile_x * this.props.tilesetDimensions.x}
        y={tile.tile_y * this.props.tilesetDimensions.y}
        width={this.props.tilesetDimensions.x}
        height={this.props.tilesetDimensions.y}
      />
    );
  }

  render() {
    var items = [];
    for (var i = 0; i < this.props.tilesetDimensions.height; ++i) {
      var sparse_index = 0;
      for (var j = 0; j < this.props.tilesetDimensions.width; ++j) {
        console.log(i + ", " + j + "; " + sparse_index)
        if (map.tiles[i][sparse_index].pos_x === j) {
          console.log("Correct")
          items += this.drawSprite(map.tiles[i][sparse_index]);
          sparse_index++;
        } else {
          console.log("Incorrect")
          items += this.drawSprite({
            pos_x: 0,
            tile_x: 0,
            tile_y: 0,
            fg: 0,
            bg: 0,
          });
        }
      }
    }
    return (
      <div id="tileset-preview">
        {items}
      </div>
    );
  }
}

export default TilesetPreview;
