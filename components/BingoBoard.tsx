"use client";
import { useState } from "react";
import { generateBingoCard } from "@/lib/bingo";

export default function BingoBoard() {
  const [numCards, setNumCards] = useState(1);
  const [cards, setCards] = useState([generateBingoCard()]);
  const [marked, setMarked] = useState<boolean[][]>([Array(25).fill(false)]);
  const [calledNumber, setCalledNumber] = useState("");

  const handleGenerateCards = (count: number) => {
    setNumCards(count);
    const newCards = Array.from({ length: count }, () => generateBingoCard());
    setCards(newCards);
    setMarked(Array.from({ length: count }, () => Array(25).fill(false)));
  };

  const handleCallNumber = () => {
    const num = parseInt(calledNumber);
    if (isNaN(num) || num < 1 || num > 75) {
      alert("Please enter a number between 1 and 75");
      return;
    }

    setMarked(m =>
      m.map((card, cardIndex) =>
        card.map((val, cellIndex) =>
          cards[cardIndex][cellIndex] === num ? true : val
        )
      )
    );
    setCalledNumber("");
  };

  const toggle = (cardIndex: number, cellIndex: number) => {
    if (cards[cardIndex][cellIndex] === 0) return;
    setMarked(m =>
      m.map((card, cIdx) =>
        cIdx === cardIndex
          ? card.map((val, idx) => (idx === cellIndex ? !val : val))
          : card
      )
    );
  };

  const letters = ['B', 'I', 'N', 'G', 'O'];

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      {/* Card Count Selector */}
      <div className="flex flex-col items-center gap-3">
        <label className="text-lg font-semibold text-gray-700">
          Number of Cards (1-10):
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              onClick={() => handleGenerateCards(num)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                numCards === num
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Call Number Input */}
      <div className="flex flex-col items-center gap-3">
        <label className="text-lg font-semibold text-gray-700">
          Call a Number (1-75):
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            max="75"
            value={calledNumber}
            onChange={(e) => setCalledNumber(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCallNumber()}
            placeholder="Enter number"
            className="px-4 py-2 border-2 border-gray-300 rounded-lg text-center font-semibold text-lg w-32"
          />
          <button
            onClick={handleCallNumber}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all"
          >
            Call
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, cardIndex) => (
          <div key={cardIndex} className="bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-2xl shadow-2xl">
            <h3 className="text-white text-center font-bold mb-3">Card {cardIndex + 1}</h3>
            
            {/* Letter headers */}
            <div className="grid grid-cols-5 gap-3 mb-3">
              {letters.map((letter, i) => (
                <div
                  key={i}
                  className="h-12 w-20 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                >
                  {letter}
                </div>
              ))}
            </div>
            
            {/* Number grid */}
            <div className="grid grid-cols-5 gap-3">
              {card.map((num, cellIndex) => (
                <button
                  key={cellIndex}
                  onClick={() => toggle(cardIndex, cellIndex)}
                  disabled={num === 0}
                  className={`h-20 w-20 rounded-lg text-2xl font-bold transition-all duration-200 transform shadow-lg
                    ${num === 0
                      ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white cursor-default"
                      : marked[cardIndex][cellIndex] 
                        ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white scale-95" 
                        : "bg-white text-gray-800 hover:bg-gray-50 hover:scale-105"
                    }`}
                >
                  {num === 0 ? 'FREE' : num}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-gray-600 text-sm">Click squares to mark them or call a number to mark all instances</p>
    </div>
  );
}