import { tetrisContent } from "./gameContents.js"
import { createGameMenu } from "./gameMenu.js"
import { addHoverForButtons } from "./sketchBtn.js"
import { colors, tetrominoItems } from "./tetrominoItems.js"
import {  isValidPos, shuffle } from "./utils.js"


const app = (difficulty) => {
    const gameContent = document.querySelector('.game-content')
    gameContent.innerHTML=''
    gameContent.innerHTML = tetrisContent

    const canvas = document.getElementById('game')
    const context = canvas.getContext('2d')

    //получение доступа к кнопкам контроллера
    //const startBtn = canvas.getContext('.start')
    //querySelector
    const startBtn = document.querySelector('.start')
    const pauseBtn = canvas.getContext('.pause')
    const restartBtn = canvas.getContext('.restart')
    const scoreBlock = canvas.getContext('.score__total')
    const topArrow = canvas.getContext('.top')
    const bottomArrow = canvas.getContext('.bottom')
    const leftArrow = canvas.getContext('.left')
    const rightArrow = canvas.getContext('.right')
    //размер кубика
    const squareSize = 32
    //последовательность фигурок
    let tetrominoOrder = []
    //двумерный массив
    let playArea = []
    //заполнение массива другими массивами
    for ( let row = -2; row<20; row++){
        playArea[row]=[]

        //колонка
        for(let col = 0; col<10; col++){
            playArea[row][col]=0
        }
    }

    //счетчик кадров
    let count = 0
    let tetromino= createTetromino()
    let score = 0
    let isGameOver= false
    let requestAnimationId=null

    //requestAnimationFrame()//отрисовка фигурок 
    //cancelAnimationFrame()//пауза или гем овер

    function createTetromino(){
        //проверка на заполнение
        if(tetrominoOrder.length === 0){
            tetrominoOrder= ['I','J','L','O','S','T','Z']
            shuffle(tetrominoOrder)//перемешиваем массив ВстрФунк
        }
        const name = tetrominoOrder.pop()//берем фигурку и удаляем с массива
        const matrix = tetrominoItems[name]//получаем матрицу
        //начало знач фигурки колонки и строчки
        const col = playArea[0].length/2 - Math.ceil(matrix[0].length / 2);
    
        //проверка на смещение
        const row = name === 'I' ? -1 : -2;
        
        return {
            name: name,      // name of the piece (L, O, etc.)
            matrix: matrix,  // the current rotation matrix
            row: row,        // current row (starts offscreen)
            col: col         // current col
        }
    }
    const placeTetromino = () => {
        for(let row = 0; row < tetromino.matrix.length; row++){
            for(let col=0; col< tetromino.matrix[row].length; col++){
                if (tetromino.matrix[row][col]){
                    if(tetromino.row + row < 0){
                        return
                    }

                    playArea[tetromino.row + row][tetromino.col + col] = tetromino.name
                }
            }
        }
        
        tetromino = createTetromino()
    }



    const game = () => {
        requestAnimationId= requestAnimationFrame(game)
        //для 2д контента устанавливает пиксели
        //черный фон
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight) 
        for(let row = 0; row < 20; row++){
            for(let col = 0; col<10; col++){
                if(playArea[row][col]){
                    const name = playArea[row][col]
                    context.fillStyle =colors[name]
                    context.fillRect(col *squareSize, row * squareSize, squareSize-1, squareSize-1)

                }            
            }
        }

        //отрисовка после чистки
        if(tetromino){
            if(++count>difficulty){
                tetromino.row++;
                count=0;
                
            }
            if(!isValidPos(tetromino.matrix, tetromino.row, tetromino.col, playArea)){
                tetromino.row--
                placeTetromino()
            }

            context.fillStyle = colors[tetromino.name]
            for(let row = 0; row < tetromino.matrix.length; row++){
                for(let col=0; col< tetromino.matrix[row].length; col++){
                  if(tetromino.matrix[row][col]){
                    context.fillRect((tetromino.col+ col)*squareSize, (tetromino.row+row)* squareSize, squareSize - 1, squareSize - 1)
                  }
                }
            }

        
        }
        
    }

    const setListener = (element, type, handler) => {
        if(!element){return;}
        element.addEventListener(type, handler);
        return ()=>{
            element.removeEventListener(type, handler);
        };
    }

    setListener(startBtn,'click', (() => { requestAnimationId = requestAnimationFrame(game)}) )
  
    addHoverForButtons()
}

createGameMenu(app)