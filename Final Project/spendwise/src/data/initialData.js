const month = new Date().toISOString().slice(0, 7)
const day = new Date().toISOString().slice(0, 10)
const date = (offset) => {
  const d = new Date()
  d.setDate(d.getDate() - offset)
  return d.toISOString().slice(0, 10)
}
export const initialTransactions = [
  { id: 1, title: 'Monthly stipend', amount: 18000, type: 'income', category: 'Salary', date: day, note: 'Monthly income' },
  { id: 2, title: 'Groceries', amount: 1450, type: 'expense', category: 'Food', date: date(1), note: 'Weekly groceries' },
  { id: 3, title: 'Metro recharge', amount: 600, type: 'expense', category: 'Transport', date: date(2), note: '' },
  { id: 4, title: 'Freelance design', amount: 3500, type: 'income', category: 'Freelance', date: date(4), note: 'Landing page work' },
  { id: 5, title: 'Coffee with friends', amount: 320, type: 'expense', category: 'Food', date: date(5), note: '' },
  { id: 6, title: 'Internet bill', amount: 799, type: 'expense', category: 'Bills', date: date(7), note: '' },
  { id: 7, title: 'Notebook', amount: 240, type: 'expense', category: 'Shopping', date: date(9), note: 'Stationery' },
  { id: 8, title: 'Project reward', amount: 1200, type: 'income', category: 'Other', date: date(11), note: '' },
]
export const initialBudgets = [
  { id: 1, category: 'Food', limit: 5000, month },
  { id: 2, category: 'Transport', limit: 2000, month },
  { id: 3, category: 'Shopping', limit: 3000, month },
  { id: 4, category: 'Bills', limit: 2500, month },
]