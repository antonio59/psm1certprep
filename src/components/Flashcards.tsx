'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { Flashcard } from '../types';

interface FlashcardsProps {
  userId: string | null;
}

const Flashcards = ({ userId }: FlashcardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { progress, updateProgress, initializeProgress } = useStore();

  useEffect(() => {
    if (userId) {
      initializeProgress(userId);
    }
  }, [userId, initializeProgress]);

  const categories = ['all', ...new Set(flashcardsData.map(card => card.category))];
  
  const filteredCards = selectedCategory === 'all' 
    ? flashcardsData 
    : flashcardsData.filter(card => card.category === selectedCategory);

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(curr => curr - 1);
      setIsFlipped(false);
    }
  };

  const markAsComplete = async () => {
    if (!userId) return;

    const cardId = filteredCards[currentIndex].id;
    if (!progress.completedFlashcards.includes(cardId)) {
      const updatedFlashcards = [...progress.completedFlashcards, cardId];
      await updateProgress(userId, {
        completedFlashcards: updatedFlashcards,
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Flashcards</h1>
        <p className="text-gray-600">
          Master Scrum concepts through active recall. Click cards to reveal answers.
        </p>
      </div>

      <div className="flex justify-center space-x-4 mb-8 flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div
        className="bg-white rounded-xl shadow-lg p-8 cursor-pointer min-h-[300px] perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s',
        }}
      >
        <div className="text-center">
          {!isFlipped ? (
            <div className="text-xl font-medium text-gray-900">
              {filteredCards[currentIndex].question}
            </div>
          ) : (
            <div
              className="text-xl text-gray-800"
              style={{
                transform: 'rotateY(180deg)',
              }}
            >
              {filteredCards[currentIndex].answer}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={markAsComplete}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Mark as Complete
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === filteredCards.length - 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="text-center text-gray-600">
        Card {currentIndex + 1} of {filteredCards.length}
      </div>
    </div>
  );
};

export default Flashcards;