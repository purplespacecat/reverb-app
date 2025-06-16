'use client';

import { useState, useEffect } from 'react';

export default function WordsPage() {
  const [words, setWords] = useState<string[]>([]);
  const [newWord, setNewWord] = useState('');

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/words');
      const data = await response.json();
      setWords(data.map((word: { text: string }) => word.text));
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim()) return;

    try {
      const response = await fetch('http://localhost:8080/api/words/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newWord }),
      });

      if (response.ok) {
        setNewWord('');
        fetchWords();
      }
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Words List</h1>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Enter a new word"
          className="flex-1 rounded-md border border-emerald-200 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
        />
        <button
          type="submit"
          className="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Add Word
        </button>
      </form>

      <div className="bg-white shadow rounded-lg p-6 border border-emerald-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Current Words</h2>
        {words.length === 0 ? (
          <p className="text-gray-600">No words added yet.</p>
        ) : (
          <ul className="space-y-2">
            {words.map((word, index) => (
              <li
                key={index}
                className="p-3 bg-white rounded-md text-gray-700 border border-emerald-100"
              >
                {word}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}