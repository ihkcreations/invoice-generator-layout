# Invoice Generator Layout

This application generates professional invoices with a split screen layout for editing and real time preview.

## Quick start

Open `index.html` in a browser. No install or build step.

## What it does

- Real time invoice preview updates
- Dynamic line item management
- Automatic tax and total calculations
- Print ready document formatting

## Under the hood

The application listens for input changes on form fields and updates a central state object. A rendering function redraws the preview sheet and recalculates totals instantly. Users can add or remove items dynamically and trigger browser printing.
