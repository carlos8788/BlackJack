import { useState } from 'react'
import './styles/App.css'
import Blackjack from './BlackJack';

function App() {
  const [count, setCount] = useState(0)
  const [cart, setCart] = useState(0);

  const pedirCarta = () => {
    const carta = Math.floor(Math.random() * 12) + 1;
    setCart(carta)
  }

  return (
    <>
      <h1>BLackJack 1.0</h1>
      <Blackjack/>
    </>
  )
}

export default App
