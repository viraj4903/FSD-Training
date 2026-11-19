import { useEffect, useMemo, useState } from 'react'
import {
  Wallet, LayoutDashboard, ArrowLeftRight, PieChart, Target, Settings, Plus,
  Search, Bell, ChevronDown, ArrowUpRight, ArrowDownRight, TrendingUp, Menu,
  X, Pencil, Trash2, CalendarDays, Download, CircleHelp, Check, SlidersHorizontal,
  Utensils, Car, ShoppingBag, House, HeartPulse, GraduationCap, Briefcase,
  MoreHorizontal, Sparkles, WalletCards, CircleDollarSign, Moon, Sun, RotateCcw
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { initialTransactions, initialBudgets } from './data/initialData'
import { loadData, saveData, clearData } from './utils/storage'
import { summarize, categoryTotals, money, currentMonth } from './utils/calculations'

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Education', 'Entertainment', 'Salary', 'Freelance', 'Other']
const colors = ['#668b79', '#a6b8ad', '#e8b978', '#8c9fca', '#c58c8c', '#9b91b8', '#83a8b7']
const nav = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
  { id: 'budgets', label: 'Budgets', icon: Target },
  { id: 'analytics', label: 'Analytics', icon: PieChart },
]
const fmtDate = d => new Date(`${d}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
const monthLabel = d => new Date(`${d}-01T00:00:00`).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
const uid = () => Date.now() + Math.floor(Math.random() * 1000)

function App() {
  const [transactions, setTransactions] = useState(() => loadData('transactions', initialTransactions))
  const [budgets, setBudgets] = useState(() => loadData('budgets', initialBudgets))
  const [page, setPage] = useState('dashboard')
  const [month, setMonth] = useState(currentMonth())
  const [currency, setCurrency] = useState('INR')
  const [theme, setTheme] = useState(() => loadData('theme', 'light'))
  const [modal, setModal] = useState(null)
  const [editing, setEditing] = useState(null)
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => saveData('transactions', transactions), [transactions])
  useEffect(() => saveData('budgets', budgets), [budgets])
  useEffect(() => saveData('theme', theme), [theme])
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(timer)
  }, [toast])

  const stats = useMemo(() => summarize(transactions, month), [transactions, month])
  const monthlyTransactions = useMemo(() => transactions.filter(t => t.date?.slice(0, 7) === month), [transactions, month])
  const filtered = useMemo(() => transactions.filter(t => {
    const matchesQuery = `${t.title} ${t.category} ${t.note || ''}`.toLowerCase().includes(query.toLowerCase())
    const matchesType = typeFilter === 'all' || t.type === typeFilter
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter
    return matchesQuery && matchesType && matchesCategory
  }).sort((a, b) => b.date.localeCompare(a.date)), [transactions, query, typeFilter, categoryFilter])

  const notify = message => setToast(message)
  const saveTransaction = data => {
    if (editing) setTransactions(old => old.map(t => t.id === editing.id ? { ...data, id: editing.id } : t))
    else setTransactions(old => [{ ...data, id: uid() }, ...old])
    setModal(null); setEditing(null); notify(editing ? 'Transaction updated' : 'Transaction added')
  }
  const deleteTransaction = id => {
    if (window.confirm('Delete this transaction? This action cannot be undone.')) {
      setTransactions(old => old.filter(t => t.id !== id)); notify('Transaction deleted')
    }
  }
  const openEdit = item => { setEditing(item); setModal('transaction') }
  const openAdd = () => { setEditing(null); setModal('transaction') }
  const saveBudget = data => {
    setBudgets(old => {
      const existing = old.find(b => b.category === data.category && b.month === month)
      return existing ? old.map(b => b.id === existing.id ? { ...b, limit: data.limit } : b) : [...old, { ...data, id: uid(), month }]
    })
    setModal(null); notify('Budget saved')
  }
  const navigate = id => { setPage(id); setMobileOpen(false) }
  const title = ({ dashboard: 'Overview', transactions: 'Transactions', budgets: 'Budgets', analytics: 'Analytics', settings: 'Settings' })[page]

  return <div className={`app ${theme}`}>
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Wallet size={19}/></div><span>spend<span className="brand-light">wise</span></span><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18}/></button></div>
      <div className="side-label">WORKSPACE</div>
      <nav>{nav.map(item => <button key={item.id} className={`nav-item ${page === item.id ? 'active' : ''}`} onClick={() => navigate(item.id)}><item.icon size={18}/><span>{item.label}</span>{item.id === 'transactions' && <span className="nav-count">{transactions.length}</span>}</button>)}</nav>
      <div className="side-spacer"/>
      <div className="sidebar-tip"><div className="tip-icon"><Sparkles size={16}/></div><strong>Small steps add up.</strong><p>Keep an eye on your spending and make your money work for you.</p></div>
      <button className={`nav-item ${page === 'settings' ? 'active' : ''}`} onClick={() => navigate('settings')}><Settings size={18}/><span>Settings</span></button>
      <div className="profile"><div className="avatar">VT</div><div className="profile-copy"><strong>My Workspace</strong><span>Personal account</span></div><MoreHorizontal size={18} className="muted"/></div>
    </aside>
    {mobileOpen && <div className="scrim" onClick={() => setMobileOpen(false)}/>}
    <main className="main">
      <header className="topbar"><div className="top-left"><button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={20}/></button><div className="breadcrumb">Workspace <span>/</span> <strong>{title}</strong></div></div><div className="top-actions"><button className="icon-button" title="Toggle theme" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={17}/> : <Sun size={17}/>}</button><div className="top-divider"/><div className="top-user"><div className="avatar small">VT</div><span>Viraj</span><ChevronDown size={14}/></div></div></header>
      <div className="content">
        <div className="page-heading"><div><div className="eyebrow">PERSONAL FINANCE</div><h1>{title}</h1><p>{page === 'dashboard' ? 'Here’s what’s happening with your money.' : page === 'transactions' ? 'Keep track of every rupee coming in and going out.' : page === 'budgets' ? 'Set spending limits and stay on top of your goals.' : page === 'analytics' ? 'Understand your spending patterns over time.' : 'Make SpendWise work the way you like.'}</p></div>{page !== 'settings' && <div className="heading-actions">{page !== 'budgets' && <label className="month-picker"><CalendarDays size={15}/><input type="month" value={month} onChange={e => setMonth(e.target.value)}/></label>}{page !== 'analytics' && <button className="btn primary" onClick={page === 'budgets' ? () => setModal('budget') : openAdd}><Plus size={16}/>{page === 'budgets' ? 'Set budget' : 'Add transaction'}</button>}</div>}</div>
        {page === 'dashboard' && <Dashboard stats={stats} transactions={monthlyTransactions} allTransactions={transactions} budgets={budgets.filter(b => b.month === month)} month={month} currency={currency} onAdd={openAdd} onView={() => navigate('transactions')}/>}
        {page === 'transactions' && <Transactions items={filtered} query={query} setQuery={setQuery} typeFilter={typeFilter} setTypeFilter={setTypeFilter} categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} onAdd={openAdd} onEdit={openEdit} onDelete={deleteTransaction} currency={currency}/>}
        {page === 'budgets' && <Budgets budgets={budgets.filter(b => b.month === month)} transactions={monthlyTransactions} currency={currency} onAdd={() => setModal('budget')} onEdit={b => { setEditing(b); setModal('budget') }} onDelete={id => { if (confirm('Delete this budget?')) { setBudgets(old => old.filter(b => b.id !== id)); notify('Budget deleted') } }}/>}
        {page === 'analytics' && <Analytics transactions={transactions} month={month} currency={currency}/>}
        {page === 'settings' && <SettingsPage currency={currency} setCurrency={setCurrency} theme={theme} setTheme={setTheme} onReset={() => { if (confirm('Restore sample data? Your current data will be replaced.')) { clearData(); setTransactions(initialTransactions); setBudgets(initialBudgets); notify('Sample data restored') } }} onClear={() => { if (confirm('Delete all transactions and budgets?')) { setTransactions([]); setBudgets([]); notify('All data cleared') } }}/>}
      </div>
      <footer className="footer"><span>© 2026 SpendWise</span><span>Made for mindful money management</span></footer>
    </main>
    {modal === 'transaction' && <TransactionModal initial={editing} onClose={() => { setModal(null); setEditing(null) }} onSave={saveTransaction}/>}
    {modal === 'budget' && <BudgetModal initial={editing} onClose={() => { setModal(null); setEditing(null) }} onSave={saveBudget}/>}
    {toast && <div className="toast"><span className="toast-check"><Check size={14}/></span>{toast}</div>}
  </div>
}

function Dashboard({ stats, transactions, allTransactions, budgets, month, currency, onAdd, onView }) {
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(); d.setMonth(d.getMonth() - (5 - i))
    const key = d.toISOString().slice(0, 7)
    const s = summarize(allTransactions, key)
    return { month: d.toLocaleDateString('en-IN', { month: 'short' }), income: s.income, expenses: s.expenses }
  })
  const totals = categoryTotals(transactions, month)
  const recent = [...transactions].sort((a,b) => b.date.localeCompare(a.date)).slice(0, 5)
  return <>
    <div className="stats-grid">
      <StatCard label="Total balance" value={money(stats.balance, currency)} icon={WalletCards} tone="green" caption="Across all transactions"/>
      <StatCard label="Income this month" value={money(stats.income, currency)} icon={ArrowDownRight} tone="blue" caption="Money received"/>
      <StatCard label="Expenses this month" value={money(stats.expenses, currency)} icon={ArrowUpRight} tone="orange" caption="Money spent"/>
      <StatCard label="Monthly savings" value={money(stats.savings, currency)} icon={TrendingUp} tone="purple" caption="Income minus expenses"/>
    </div>
    <div className="dashboard-grid">
      <section className="panel chart-panel"><div className="panel-heading"><div><h2>Cash flow</h2><p>Income vs expenses over the last 6 months</p></div><span className="legend"><i className="dot income-dot"/> Income <i className="dot expense-dot"/> Expenses</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData} barGap={7}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 12 }}/><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted)', fontSize: 11 }} tickFormatter={v => v >= 1000 ? `${v/1000}k` : v}/><Tooltip formatter={v => money(v, currency)} contentStyle={{ borderRadius: 10, border: '1px solid var(--line)', background: 'var(--panel)' }}/><Bar dataKey="income" fill="#6b9b81" radius={[5,5,0,0]} maxBarSize={22}/><Bar dataKey="expenses" fill="#e3b779" radius={[5,5,0,0]} maxBarSize={22}/></BarChart></ResponsiveContainer></div></section>
      <section className="panel budget-panel"><div className="panel-heading"><div><h2>Budget overview</h2><p>Your monthly category limits</p></div><Target size={18} className="muted"/></div>{budgets.length ? <div className="budget-list">{budgets.slice(0,4).map(b => { const spent = transactions.filter(t => t.type === 'expense' && t.category === b.category).reduce((s,t) => s + Number(t.amount),0); const pct = Math.min(100, Math.round(spent / b.limit * 100)); return <div className="budget-row" key={b.id}><div className="budget-meta"><strong>{b.category}</strong><span>{money(spent,currency)} <em>/ {money(b.limit,currency)}</em></span></div><div className="progress"><span className={pct >= 100 ? 'over' : ''} style={{ width: `${pct}%` }}/></div></div>})}</div> : <Empty message="No budgets set for this month yet."/>}</section>
      <section className="panel category-panel"><div className="panel-heading"><div><h2>Spending by category</h2><p>Where your money goes</p></div></div>{totals.length ? <><div className="donut-wrap"><ResponsiveContainer width="100%" height="100%"><RPieChart><Pie data={totals} dataKey="value" nameKey="name" innerRadius={58} outerRadius={82} paddingAngle={3}>{totals.map((x,i) => <Cell key={x.name} fill={colors[i % colors.length]}/>)}</Pie><Tooltip formatter={v => money(v,currency)}/></RPieChart></ResponsiveContainer><div className="donut-center"><strong>{money(stats.expenses,currency)}</strong><span>Total spent</span></div></div><div className="category-legend">{totals.slice(0,4).map((x,i) => <div key={x.name}><span><i className="dot" style={{background:colors[i % colors.length]}}/>{x.name}</span><strong>{money(x.value,currency)}</strong></div>)}</div></> : <Empty message="Add expenses to see your category breakdown."/>}</section>
      <section className="panel recent-panel"><div className="panel-heading"><div><h2>Recent transactions</h2><p>Your latest money activity</p></div><button className="text-button" onClick={onView}>View all <ArrowUpRight size={14}/></button></div>{recent.length ? <div className="recent-list">{recent.map(t => <TransactionLine key={t.id} item={t} currency={currency}/>)}</div> : <Empty message="No transactions yet. Add your first one."/>}<button className="btn secondary full-btn" onClick={onAdd}><Plus size={15}/> Add transaction</button></section>
    </div>
  </>
}

function StatCard({ label, value, icon: Icon, tone, caption }) {
  return <div className="stat-card"><div className="stat-top"><span>{label}</span><span className={`stat-icon ${tone}`}><Icon size={18}/></span></div><strong className="stat-value">{value}</strong><span className="stat-caption">{caption}</span></div>
}
function TransactionLine({ item, currency }) {
  const icon = item.category === 'Food' ? Utensils : item.category === 'Transport' ? Car : item.category === 'Shopping' ? ShoppingBag : item.category === 'Bills' ? House : item.type === 'income' ? CircleDollarSign : Wallet
  const Icon = icon
  return <div className="transaction-line"><div className="transaction-symbol"><Icon size={17}/></div><div className="transaction-info"><strong>{item.title}</strong><span>{item.category} · {fmtDate(item.date)}</span></div><strong className={`transaction-amount ${item.type}`}>{item.type === 'income' ? '+' : '−'}{money(item.amount,currency)}</strong></div>
}
function Empty({ message }) { return <div className="empty"><div className="empty-icon"><Wallet size={19}/></div><p>{message}</p></div> }

function Transactions({ items, query, setQuery, typeFilter, setTypeFilter, categoryFilter, setCategoryFilter, onAdd, onEdit, onDelete, currency }) {
  return <section className="panel table-panel"><div className="toolbar"><div className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search transactions..."/></div><div className="filter-controls"><select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}><option value="all">All types</option><option value="income">Income</option><option value="expense">Expense</option></select><select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}><option value="all">All categories</option>{categories.map(c => <option key={c}>{c}</option>)}</select><button className="btn primary compact" onClick={onAdd}><Plus size={15}/> Add new</button></div></div>
    <div className="table-scroll"><table><thead><tr><th>TRANSACTION</th><th>CATEGORY</th><th>DATE</th><th>TYPE</th><th>AMOUNT</th><th></th></tr></thead><tbody>{items.map(t => <tr key={t.id}><td><div className="table-title"><span className="table-avatar">{t.type === 'income' ? <ArrowDownRight size={16}/> : <ArrowUpRight size={16}/>}</span><div><strong>{t.title}</strong><small>{t.note || '—'}</small></div></div></td><td>{t.category}</td><td>{fmtDate(t.date)}</td><td><span className={`pill ${t.type}`}>{t.type}</span></td><td><strong className={t.type === 'income' ? 'positive' : ''}>{t.type === 'income' ? '+' : '−'}{money(t.amount,currency)}</strong></td><td><div className="row-actions"><button title="Edit" onClick={() => onEdit(t)}><Pencil size={15}/></button><button title="Delete" onClick={() => onDelete(t.id)}><Trash2 size={15}/></button></div></td></tr>)}</tbody></table></div>
    {!items.length && <Empty message="No transactions match your filters."/>}<div className="table-foot">Showing {items.length} transaction{items.length === 1 ? '' : 's'}</div>
  </section>
}

function Budgets({ budgets, transactions, currency, onAdd, onEdit, onDelete }) {
  const spentFor = category => transactions.filter(t => t.type === 'expense' && t.category === category).reduce((s,t) => s + Number(t.amount),0)
  const totalLimit = budgets.reduce((s,b) => s + Number(b.limit),0)
  const totalSpent = budgets.reduce((s,b) => s + spentFor(b.category),0)
  return <><div className="stats-grid budget-stats"><StatCard label="Total budget" value={money(totalLimit,currency)} icon={Target} tone="blue" caption="Combined category limits"/><StatCard label="Total spent" value={money(totalSpent,currency)} icon={ArrowUpRight} tone="orange" caption="Across budgeted categories"/><StatCard label="Remaining" value={money(totalLimit-totalSpent,currency)} icon={Wallet} tone="green" caption="Available to spend"/><StatCard label="Categories" value={budgets.length} icon={PieChart} tone="purple" caption="Active budgets this month"/></div><div className="budget-cards">{budgets.map(b => { const spent = spentFor(b.category), pct = Math.round(spent / b.limit * 100), over = spent > b.limit; return <div className="panel budget-card" key={b.id}><div className="budget-card-top"><div className="category-badge"><Target size={17}/></div><div className="row-actions"><button onClick={() => onEdit(b)}><Pencil size={15}/></button><button onClick={() => onDelete(b.id)}><Trash2 size={15}/></button></div></div><h3>{b.category}</h3><div className="budget-big">{money(spent,currency)} <span>of {money(b.limit,currency)}</span></div><div className="progress large"><span className={over ? 'over' : ''} style={{width:`${Math.min(100,pct)}%`}}/></div><div className="budget-bottom"><span>{over ? `${money(spent-b.limit,currency)} over budget` : `${money(b.limit-spent,currency)} remaining`}</span><strong className={over ? 'negative' : ''}>{pct}%</strong></div></div>})}{!budgets.length && <div className="panel empty-card"><Empty message="No budgets yet. Create a category budget to get started."/></div>}<button className="add-budget-card" onClick={onAdd}><span><Plus size={20}/></span><strong>Create a budget</strong><small>Set a monthly spending limit</small></button></div></>
}

function Analytics({ transactions, month, currency }) {
  const lastMonths = Array.from({length:6},(_,i) => { const d = new Date(); d.setMonth(d.getMonth()-(5-i)); const key = d.toISOString().slice(0,7); const s = summarize(transactions,key); return {month:d.toLocaleDateString('en-IN',{month:'short'}), income:s.income, expenses:s.expenses} })
  const totals = categoryTotals(transactions,month)
  const stats = summarize(transactions,month)
  return <><div className="stats-grid"><StatCard label="Income" value={money(stats.income,currency)} icon={ArrowDownRight} tone="green" caption={monthLabel(month)}/><StatCard label="Expenses" value={money(stats.expenses,currency)} icon={ArrowUpRight} tone="orange" caption={monthLabel(month)}/><StatCard label="Net savings" value={money(stats.savings,currency)} icon={TrendingUp} tone="blue" caption="Income minus expenses"/><StatCard label="Expense categories" value={totals.length} icon={PieChart} tone="purple" caption="Categories used this month"/></div><div className="analytics-grid"><section className="panel chart-panel"><div className="panel-heading"><div><h2>Income & expenses</h2><p>Six-month comparison</p></div></div><div className="chart-wrap tall"><ResponsiveContainer width="100%" height="100%"><AreaChart data={lastMonths}><defs><linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6b9b81" stopOpacity={.22}/><stop offset="95%" stopColor="#6b9b81" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--line)"/><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill:'var(--muted)',fontSize:12}}/><YAxis axisLine={false} tickLine={false} tick={{fill:'var(--muted)',fontSize:11}}/><Tooltip formatter={v=>money(v,currency)}/><Area type="monotone" dataKey="income" stroke="#6b9b81" fill="url(#incomeFill)" strokeWidth={2.5}/><Area type="monotone" dataKey="expenses" stroke="#e3b779" fill="none" strokeWidth={2.5}/></AreaChart></ResponsiveContainer></div></section><section className="panel"><div className="panel-heading"><div><h2>Expense breakdown</h2><p>{monthLabel(month)}</p></div></div>{totals.length ? <div className="analytics-cats">{totals.map((t,i)=><div className="analytics-cat" key={t.name}><div><span><i className="dot" style={{background:colors[i%colors.length]}}/>{t.name}</span><strong>{money(t.value,currency)}</strong></div><div className="progress"><span style={{width:`${stats.expenses ? t.value/stats.expenses*100 : 0}%`,background:colors[i%colors.length]}}/></div></div>)}</div>:<Empty message="No expense data for this month."/ >}</section></div></>
}

function SettingsPage({ currency, setCurrency, theme, setTheme, onReset, onClear }) {
  return <div className="settings-layout"><section className="panel settings-panel"><div className="settings-section"><div className="settings-icon"><CircleDollarSign size={19}/></div><div className="settings-copy"><h3>Currency</h3><p>Choose the currency used to display amounts throughout SpendWise.</p></div><select value={currency} onChange={e=>setCurrency(e.target.value)}><option value="INR">INR — Indian Rupee (₹)</option><option value="USD">USD — US Dollar ($)</option><option value="EUR">EUR — Euro (€)</option><option value="GBP">GBP — British Pound (£)</option></select></div><div className="settings-section"><div className="settings-icon"><Moon size={19}/></div><div className="settings-copy"><h3>Appearance</h3><p>Switch between light and dark themes.</p></div><button className="btn secondary" onClick={()=>setTheme(theme==='light'?'dark':'light')}>{theme==='light'?<Moon size={15}/>:<Sun size={15}/>} {theme==='light'?'Dark mode':'Light mode'}</button></div></section><section className="panel settings-panel"><div className="settings-heading"><h2>Data management</h2><p>Your information is stored locally in this browser.</p></div><div className="settings-section"><div className="settings-icon"><RotateCcw size={19}/></div><div className="settings-copy"><h3>Restore sample data</h3><p>Replace your current data with the original demo transactions and budgets.</p></div><button className="btn secondary" onClick={onReset}>Restore demo</button></div><div className="settings-section"><div className="settings-icon danger-icon"><Trash2 size={19}/></div><div className="settings-copy"><h3>Clear all data</h3><p>Permanently remove all transactions and budgets from this browser.</p></div><button className="btn danger" onClick={onClear}>Clear data</button></div></section><div className="note-box"><CircleHelp size={17}/><p><strong>Privacy note:</strong> SpendWise is a frontend-only demo. Your transactions are saved in this browser using LocalStorage and are not sent to a server.</p></div></div>
}

function TransactionModal({ initial, onClose, onSave }) {
  const [form,setForm] = useState(initial || {title:'',amount:'',type:'expense',category:'Food',date:new Date().toISOString().slice(0,10),note:''})
  const [error,setError] = useState('')
  const update = (key,value) => setForm(old=>({...old,[key]:value}))
  const submit = e => { e.preventDefault(); if (!form.title.trim() || !form.amount || Number(form.amount)<=0 || !form.date) { setError('Please enter a title, a valid amount and a date.'); return } onSave({...form,title:form.title.trim(),amount:Number(form.amount)}) }
  return <Modal title={initial?'Edit transaction':'Add transaction'} onClose={onClose}><form onSubmit={submit} className="form"><div className="type-switch"><button type="button" className={form.type==='expense'?'selected expense-select':''} onClick={()=>update('type','expense')}>Expense</button><button type="button" className={form.type==='income'?'selected income-select':''} onClick={()=>update('type','income')}>Income</button></div><label>Title<input autoFocus value={form.title} onChange={e=>update('title',e.target.value)} placeholder="e.g. Grocery shopping"/></label><div className="form-row"><label>Amount<input type="number" min="1" step="0.01" value={form.amount} onChange={e=>update('amount',e.target.value)} placeholder="0.00"/></label><label>Date<input type="date" value={form.date} onChange={e=>update('date',e.target.value)}/></label></div><label>Category<select value={form.category} onChange={e=>update('category',e.target.value)}>{categories.filter(c=>form.type==='income'?['Salary','Freelance','Other'].includes(c):!['Salary','Freelance'].includes(c)).map(c=><option key={c}>{c}</option>)}</select></label><label>Note <span className="optional">(optional)</span><textarea rows="2" value={form.note} onChange={e=>update('note',e.target.value)} placeholder="Add a short note..."/></label>{error&&<p className="form-error">{error}</p>}<div className="modal-actions"><button type="button" className="btn secondary" onClick={onClose}>Cancel</button><button className="btn primary" type="submit">{initial?'Save changes':'Add transaction'}</button></div></form></Modal>
}
function BudgetModal({ initial, onClose, onSave }) {
  const [category,setCategory] = useState(initial?.category || 'Food')
  const [limit,setLimit] = useState(initial?.limit || '')
  const [error,setError] = useState('')
  const submit = e => { e.preventDefault(); if(!limit || Number(limit)<=0){setError('Enter a budget greater than zero.');return} onSave({category,limit:Number(limit)}) }
  return <Modal title={initial?'Edit budget':'Create a budget'} onClose={onClose}><form onSubmit={submit} className="form"><label>Category<select value={category} onChange={e=>setCategory(e.target.value)}>{categories.filter(c=>!['Salary','Freelance'].includes(c)).map(c=><option key={c}>{c}</option>)}</select></label><label>Monthly limit<input type="number" min="1" value={limit} onChange={e=>setLimit(e.target.value)} placeholder="e.g. 5000"/></label><p className="helper-text">This budget will apply to the currently selected month.</p>{error&&<p className="form-error">{error}</p>}<div className="modal-actions"><button type="button" className="btn secondary" onClick={onClose}>Cancel</button><button type="submit" className="btn primary">Save budget</button></div></form></Modal>
}
function Modal({ title, children, onClose }) {
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="modal"><div className="modal-header"><h2>{title}</h2><button className="icon-button" onClick={onClose}><X size={18}/></button></div>{children}</div></div>
}

export default App