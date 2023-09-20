import "./index.css"
import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants"
import { checkEndGame, checkWinner } from "./Utils/Logic"
import WinnerModal from "./components/WinnerModal"


function App() {

  const [ winner, setWinner ] = useState(null)

  const [ board, setBoard ] = useState(()=>{
    //Si hay hay una partida guardada, que el estado inicie ahi, si no es asi, arranca vacio (null)
    const boardFromStorage = window.localStorage.getItem("board") //Siempre poner dentro del estado y no fuera, porque seria muy lento, solo se ejecuta cuando inicie y no cada actualizacion (Hacer clik)
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  


  const [ turn, setTurn ] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem("turn")
    return turnFromStorage ?? TURNS.X  // ?? =>>> (Si es null o undefined)
  })

  const updateBoard =(index)=>{
    //Verificar si ya se jugo en esa posicion o que se gano!!
    if(board[index] || winner) return
    // Actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Actualizar e turno del jugador
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)



    //Guardar Partida
    window.localStorage.setItem("board", JSON.stringify(newBoard))
    window.localStorage.setItem("turn", newTurn)

    


    //Revisar si hay Ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setWinner(newWinner)
      confetti()
    }else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  }

  return (
    <main className="board">
      <button onClick={resetGame}>Reset Game</button>
      <h1>Tres en Raya</h1>
      
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square} 
              </Square>
            )
          })
        }
      </section>


      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App
