import React, { Component } from 'react';
import BoardOne from './config/board/BoardOne';
import Tile from './Tile'
import styled from 'styled-components'
import uuid from 'uuid'

const Block = styled.div`
  font-size: .5em;
  border: 1px solid black;
  width: 30px;
  height: 30px;
  background-color: ${props => props.tileType === 0 ? 'green' : 'blue'};
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
        <Row key={uuid()}>
          {row.map((tile, i) => {
              const whichTile = i;
              const coords = [whichRow, whichTile]
            return(
              <Block key={uuid()} tileType={tile}>
                <Tile
                  key={uuid()}
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
