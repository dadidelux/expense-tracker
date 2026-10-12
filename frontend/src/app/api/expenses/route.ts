import { NextResponse } from 'next/server';
import type { ExpenseListResponse } from '@/types/expense';

// GET /api/expenses - list expenses from Google Sheets
export async function GET(): Promise<NextResponse<ExpenseListResponse | { error: string }>> {
  // TODO: Replace with actual Google Sheets API call
  // For now, return mock data matching the schema
  const mockExpenses = [
    {
      id: 'abc123',
      submitted_at: '2026-10-12T05:40:00Z',
      date: '2026-10-11',
      merchant: 'Coffee Shop',
      amount: 5.50,
      currency: 'USD',
      category: 'food',
      source: 'web',
      raw_text: 'Coffee at Coffee Shop $5.50',
      receipt_ref: '',
      status: 'ok' as const,
      parsed_by: 'gpt-4',
    },
  ];

  return NextResponse.json({
    expenses: mockExpenses,
    total: mockExpenses.length,
  });
}