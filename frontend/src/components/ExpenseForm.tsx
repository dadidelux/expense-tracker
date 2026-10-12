'use client';

import { useState } from 'react';

interface ExpenseFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || loading) return;

    setLoading(true);
    try {
      await onSubmit(text);
      setText('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="expense-text" className="block text-sm font-medium mb-2">
          Describe your expense
        </label>
        <textarea
          id="expense-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., Coffee at Starbucks $5.50 yesterday"
          className="w-full p-3 border rounded-lg bg-white dark:bg-zinc-900 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={!text.trim() || loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Parsing...' : 'Submit Expense'}
      </button>
    </form>
  );
}