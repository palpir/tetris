import { menuContent } from "./gameContents.js"
import { addHoverForButtons } from "./sketchBtn.js"

export const createGameMenu = (app) => {

    const gameContent = document.querySelector('.game-content')
    gameContent.innerHTML=''
    gameContent.innerHTML = menuContent

    const setListener = (element, type, handler) => {
        if(!element){return;}
        element.addEventListener(type, handler);
        return ()=>{
            element.removeEventListener(type, handler);
        };
    }

    const easyBtn = document.querySelector('.easy')
    const normBtn = document.querySelector('.norm')
    const hardBtn = document.querySelector('.hard')

    setListener(easyBtn,'click', ()=>app(35) )
    setListener(normBtn,'click', ()=>app(35) )
    setListener(hardBtn,'click', ()=>app(2) )
    //setListener()

    // easyBtn.addEventListener('click', ()=>app(35))
    // normBtn.addEventListener('click', ()=>app(15))
    // hardBtn.addEventListener('click', ()=>app(5))

    addHoverForButtons()
}
