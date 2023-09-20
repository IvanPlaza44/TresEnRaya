import React from 'react'
import { Square } from './Square'

const WinnerModal = ({ winner, resetGame }) => {
    if(winner === null) return null
    const textWinner = winner === false ? "Empate" : "Ganó"
    
      return (

        <section className="winner">
            <div className="text">
                <h2>
                    {textWinner}
                </h2>
    
                <header className="win">
                    {winner && <Square>{winner}</Square>}
                </header>
                <footer>
                    <button className="btn" onClick={resetGame}>Volver A Jugar</button>
                </footer>
                </div>

        </section>
    )}
    export default WinnerModal
    


