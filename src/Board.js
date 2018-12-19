import React, { Component } from 'react';
import BoardOne from './config/board/BoardOne';
import Tile from './Tile'
import styled from 'styled-components'

const Block = styled.div`
  border: 1px solid black;
  width: 30px;
  height: 30px;
`;

const Row = styled.div`
  display: flex;
`

class Board extends Component {
  constructor(props){
    super(props)
  }


  render() {

    const currentMap = BoardOne.map((row, i) => {

      const whichRow = i;
      return (
        <Row>

          {row.map((tile, i) => {
              const whichTile = i;
              const coords = [whichRow, whichTile]
            return(
              <Block>
                <Tile
                  coords={coords}
                  tileType={tile}
                />
              </Block>
            )
          })}

        </Row>

      )
    })


    return (
      <div className="Board">

        {currentMap}
      </div>
    );
  }
}

export default Board;
