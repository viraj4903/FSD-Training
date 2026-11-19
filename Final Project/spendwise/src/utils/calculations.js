export const currentMonth = () => new Date().toISOString().slice(0, 7)

export function summarize(transactions, month = currentMonth()) {
  const monthly = transactions.filter(t => t.date?.slice(0, 7) === month)
  const income = monthly.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  const expenses = monthly.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
  const allIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  const allExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
  return { income, expenses, savings: income - expenses, balance: allIncome - allExpenses }
}

export function categoryTotals(transactions, month = currentMonth()) {
  const totals = {}
  transactions.filter(t => t.type === 'expense' && t.date?.slice(0, 7) === month)
    .forEach(t => { totals[t.category] = (totals[t.category] || 0) + Number(t.amount) })
  return Object.entries(totals).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
}

export const money = (value, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(value) || 0)