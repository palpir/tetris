
export const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const isValidPos = (tetromino, tetrominoRow, tetrominoCol, playArea) => {
  for (let row = 0; row < tetromino.length; row++) {
    for (let col = 0; col < tetromino[row].length; col++) {
      if (
        tetromino[row][col] &&
        (tetrominoCol + col < 0 ||
          tetrominoCol + col >= playArea[0].length ||
          tetrominoRow + row >= playArea.length ||
          playArea[tetrominoRow + row][tetrominoCol + col])
      ) {
        return false;
      }
    }
  }
  return true;
}

// export const rapidFallInDown = (tetromino, playArea, placeTetromino) => {
//   const row = tetromino.row +1

//   if (!isValidPos(tetromino.matrix, row, tetromino.col, playArea)){
//     tetromino.row = row -1
//     placeTetromino()
//   }

// }