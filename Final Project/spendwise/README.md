# SpendWise — Personal Expense Tracker

SpendWise is a beginner–intermediate frontend project built with React, Vite, JavaScript and CSS. It helps users record income and expenses, manage monthly category budgets, and review basic financial analytics.

## Features

- Dashboard with balance, monthly income, expenses and savings
- Add, edit and delete income/expense transactions
- Search and filter transactions
- Monthly category budgets with progress indicators
- Analytics charts for cash flow and expense categories
- INR, USD, EUR and GBP display options
- Light and dark themes
- LocalStorage persistence
- Sample data restore and clear-data controls
- Responsive layout for desktop, tablet and mobile

## Tech stack

- React 18
- Vite
- JavaScript
- CSS
- Recharts
- Lucide React
- Browser LocalStorage

## Run locally

Install Node.js (LTS), then open this folder in VS Code and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

To create a production build:

```bash
npm run build
```

The production files will be generated in `dist/`.

## Data and privacy

This is a frontend-only educational project. It does not use a server, database, real authentication or bank integrations. Transactions and budgets are stored in the browser's LocalStorage on the device where the app is used. Clearing browser site data may remove saved records.

## Suggested demo flow

1. Open Overview and review the sample dashboard.
2. Add an expense and show the dashboard totals update.
3. Edit and delete a transaction.
4. Open Budgets and set a category spending limit.
5. Open Analytics to review charts.
6. Change currency or theme in Settings.
7. Refresh the page to demonstrate LocalStorage persistence.

## Deployment

You can deploy this Vite project to Vercel:
1. Push the project folder to a GitHub repository.
2. Import the repository in Vercel.
3. Use `npm run build` as the build command.
4. Use `dist` as the output directory.
5. Deploy.

## Academic note

SpendWise is intended as a learning and FSD training submission. The sample figures are illustrative. This application is not financial advice or a secure financial record system.
