import type { Expense } from '@/types/expense';

interface ExpenseTableProps {
  expenses: Expense[];
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {
  if (expenses.length === 0) {
    return <p className="text-zinc-500 text-center py-8">No expenses yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b dark:border-zinc-700">
            <th className="text-left py-3 px-2">Date</th>
            <th className="text-left py-3 px-2">Merchant</th>
            <th className="text-right py-3 px-2">Amount</th>
            <th className="text-left py-3 px-2">Category</th>
            <th className="text-left py-3 px-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-b dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              <td className="py-3 px-2">{expense.date}</td>
              <td className="py-3 px-2">{expense.merchant}</td>
              <td className="py-3 px-2 text-right">
                {expense.amount.toFixed(2)} {expense.currency}
              </td>
              <td className="py-3 px-2">
                <span className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-xs">
                  {expense.category}
                </span>
              </td>
              <td className="py-3 px-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    expense.status === 'ok'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  }`}
                >
                  {expense.status === 'ok' ? 'OK' : 'Needs Review'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}