const KEYS = { transactions: 'spendwise_transactions', budgets: 'spendwise_budgets', theme: 'spendwise_theme' }

export function loadData(key, fallback) {
  try {
    const value = localStorage.getItem(KEYS[key])
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export function saveData(key, value) {
  localStorage.setItem(KEYS[key], JSON.stringify(value))
}

export function clearData() {
  Object.values(KEYS).forEach(key => localStorage.removeItem(key))
}