export interface Expense {
  id: string; // sha256(date|merchant|amount|currency) - dedup key
  submitted_at: string; // ISO timestamp
  date: string; // YYYY-MM-DD
  merchant: string;
  amount: number; // numeric type, not string
  currency: string; // ISO 4217 code
  category: string;
  source: string; // 'web' | 'api' | 'chat'
  raw_text: string; // original input verbatim
  receipt_ref: string; // optional receipt/reference
  status: 'ok' | 'needs_review';
  parsed_by: string; // LLM model or 'manual'
}

export interface SubmitExpenseInput {
  text: string; // raw expense text to parse
}

export interface ExpenseListResponse {
  expenses: Expense[];
  total: number;
}