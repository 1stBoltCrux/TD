// import React from 'react';
// import styled from 'styled-components'
// import {keyframes} from 'styled-components'
// import explosion from '../images/explosion.gif'
//
// const fadeOut = keyframes`
// from {
// opacity: 1
// }
// to {
//  opacity: 0
// }
// `;
//
// const Explosion = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// z-index: 3;
// position: absolute;
//   background-image: url(${explosion});
//   background-position: center;
//   background-size: contain;
//   background-repeat: no-repeat;
//   width: 30px;
//   height: 30px;
//   left: ${props => props.deadEnemiesLocation.right}px;
//   top:  ${props => props.deadEnemiesLocation.top}px;
//   animation: ${fadeOut} .4s linear;
//   `
//
//   const DeadEnemy = (props) => {
//     const {deadEnemies} = props
//     let test;
//
//     console.log(deadEnemies);
//     if (Object.keys(deadEnemies).length > 0) {
//
//       Object.keys(deadEnemies).map(deadEnemy => {
//         test = <Explosion
//           deadEnemiesLocation={deadEnemies[deadEnemy].location}
//                ></Explosion>
//       })
//       return (
//         test
//     )
//   } else {
//     return null;
//   }
//
// }
//
// export default DeadEnemy;
