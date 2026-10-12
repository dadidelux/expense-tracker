import { NextRequest, NextResponse } from 'next/server';
import type { SubmitExpenseInput, Expense } from '@/types/expense';

// POST /api/expenses/submit - send text to n8n webhook for LLM parsing
export async function POST(
  request: NextRequest
): Promise<NextResponse<Expense | { error: string }>> {
  try {
    const body: SubmitExpenseInput = await request.json();

    if (!body.text?.trim()) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: body.text, source: 'web' }),
      });
      if (!response.ok) {
        return NextResponse.json(
          { error: 'Parser service failed' },
          { status: 502 }
        );
      }
      const expense: Expense = await response.json();
      return NextResponse.json(expense, { status: 201 });
    }

    // Mock response until n8n webhook URL is configured
    const expense: Expense = {
      id: 'pending',
      submitted_at: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      merchant: 'Pending parse',
      amount: 0,
      currency: 'USD',
      category: 'uncategorized',
      source: 'web',
      raw_text: body.text,
      receipt_ref: '',
      status: 'needs_review',
      parsed_by: 'pending',
    };

    return NextResponse.json(expense, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}