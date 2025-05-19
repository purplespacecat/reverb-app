'use client';

import { useState, useEffect } from 'react';

interface Word {
  text: string;
}

export default function Home() {
  const [words, setWords] = useState<Word[]>([]);
  const [newWord, setNewWord] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Fetching words from backend...');
      const response = await fetch('http://localhost:8080/api/words');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Received words:', data);
      setWords(data);
    } catch (error) {
      console.error('Error fetching words:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch words');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      console.log('Sending word to backend:', newWord);
      const response = await fetch('http://localhost:8080/api/words/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newWord }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Word added successfully:', data);
      setNewWord('');
      fetchWords();
    } catch (error) {
      console.error('Error adding word:', error);
      setError(error instanceof Error ? error.message : 'Failed to add word');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Hello, World!</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Add a word..."
          className="px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </form>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Words:</h2>
        {isLoading ? (
          <div className="text-center py-4">Loading...</div>
        ) : words.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No words added yet</div>
        ) : (
          <ul className="space-y-2">
            {words.map((word, index) => (
              <li
                key={index}
                className="p-3 bg-gray-100 rounded shadow-sm hover:shadow-md transition-shadow"
              >
                {word.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
