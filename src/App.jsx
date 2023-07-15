import React, { useState } from 'react';
import './styles.css';
import clickSound from './assets/Sonido1.mp3';

function Square({ value, onClick }) {
  const handleClick = () => {
    onClick();
    const audio = new Audio(clickSound);
    audio.play();
  };

  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  );
}


function Board({ squares, onClick }) {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div className="game-board">
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Game() {
  const primerJugadorAleatorio = Math.random() < 0.5 ? 'X' : 'O';
  const [xIsNext, setXIsNext] = useState(primerJugadorAleatorio === 'X');
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [isDraw, setIsDraw] = useState(false);
  const audio = new Audio(clickSound);

  

  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }

    const newSquares = [...squares];
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    const gameWinner = calculateWinner(newSquares);
    if (gameWinner) {
      setWinner(gameWinner);
      if (gameWinner === 'X') {
        setXScore(xScore + 1);
      } else {
        setOScore(oScore + 1);
      }
    } else if (newSquares.every((square) => square !== null)) {
      setIsDraw(true);
    }
  };

  const handleRestart = () => {
    const primerJugadorAleatorio = Math.random() < 0.5 ? 'X' : 'O';
    setSquares(Array(9).fill(null));
    setXIsNext(primerJugadorAleatorio === 'X');
    setWinner(null);
    setIsDraw(false);
    audio.play();
  };
  

  const renderScore = (player) => {
    const score = player === 'X' ? xScore : oScore;
    return <div>{`Jugador ${player}: ${score}`}</div>;
  };

  const renderStatus = () => {
    if (winner) {
    } else {
      return `Siguiente jugador: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="game">
      <h1>Tres en raya</h1>
      <Board squares={squares} onClick={handleClick} />
      <div className="game-info">
        {renderStatus()}
        {renderScore('X')}
        {renderScore('O')}
        {winner && (
          <div className="winner-message" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            ¡El ganador es {winner}!
          </div>
        )}
        {isDraw && (
          <div className="draw-message" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            ¡Empate!
          </div>
        )}
        <button className="restart-button" onClick={handleRestart}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app">
      <Game />
    </div>
  );
}
