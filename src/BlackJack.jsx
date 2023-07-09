import React, { useState, useEffect } from 'react';

const Blackjack = () => {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [handValue, setHandValue] = useState('');

  // Función para crear una nueva baraja
  const createDeck = () => {
    const suits = ['♠', '♣', '♥', '♦'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const newDeck = [];

    for (let suit of suits) {
      for (let value of values) {
        newDeck.push({ suit, value });
      }
    }

    // Barajar el mazo
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    setDeck(newDeck);
  };

  // Función para repartir las cartas iniciales
  const pedirCarta = () => {
    // const newCard = drawCard();
    const newHand = [drawCard(), ...playerHand]
    setPlayerHand(newHand);
    console.log(calculateHandValue(newHand));
  }
   // Función para calcular el valor de una mano de blackjack
   const calculateHandValue = (hand) => {
    let value = 0;
    let hasAce = false;

    for (let card of hand) {
      if (card.value === 'A') {
        hasAce = true;
      }
      value += getCardNumericValue(card.value);
    }

    if (hasAce && value + 10 <= 21) {
      value += 10;
    }
    setHandValue(value)
    return value;
  };

  // Función para obtener el valor numérico de una carta
  const getCardNumericValue = (value) => {
    if (value === 'A') {
      return 1;
    } else if (['J', 'Q', 'K'].includes(value)) {
      return 10;
    } else {
      return parseInt(value, 10);
    }
  };
//   const dealInitialCards = () => {
//     const playerHand = [drawCard()];
//     const dealerHand = [drawCard()];

//     setPlayerHand(playerHand);
//     setDealerHand(dealerHand);
//   };

  // Función para extraer una carta del mazo
  const drawCard = () => {
    if (deck.length === 0) {
      return null;
    }

    const [card, ...updatedDeck] = deck;
    setDeck(updatedDeck);
    return card;
  };

  // Llamar a createDeck una vez al montar el componente
  useEffect(() => {
    createDeck();
  }, []);

  // Llamar a dealInitialCards después de que deck se haya actualizado
//   useEffect(() => {
//     if (deck.length > 0 && playerHand.length === 0 && dealerHand.length === 0) {
//       dealInitialCards();
//     }
//   }, [deck, playerHand, dealerHand]);

  // Función para jugar una nueva ronda
  const playAgain = () => {
    setDeck([]);
    setPlayerHand([]);
    setDealerHand([]);
    createDeck();
    setHandValue('')
  };

  return (
    <div>
      
      <h2>Value:{handValue}</h2>
      <button onClick={playAgain}>Nueva ronda</button>
      <button onClick={pedirCarta}>Pedir Carta</button>
      <ul>
        {
            playerHand.map((cart, key) => {
                return <li key={key}>{cart.suit} {cart.value}</li>;
            })
        }
      </ul>
    </div>
  );
};

export default Blackjack;
