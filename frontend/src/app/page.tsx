'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExpenseForm } from '@/components/ExpenseForm';
import { ExpenseTable } from '@/components/ExpenseTable';
import type { Expense } from '@/types/expense';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = useCallback(async () => {
    try {
      const res = await fetch('/api/expenses');
      const data = await res.json();
      setExpenses(data.expenses || []);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/expenses');
        const data = await res.json();
        if (!cancelled) setExpenses(data.expenses || []);
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (text: string) => {
    const res = await fetch('/api/expenses/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      throw new Error('Failed to submit expense');
    }

    // Refresh the list
    await fetchExpenses();
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Expense Tracker
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Describe your expense in plain text — the LLM will parse it.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          <section>
            <h2 className="text-lg font-semibold mb-4">Add Expense</h2>
            <ExpenseForm onSubmit={handleSubmit} />
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4">History</h2>
            {loading ? (
              <p className="text-zinc-500 text-center py-8">Loading...</p>
            ) : (
              <ExpenseTable expenses={expenses} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}