-- Adds payment_method (card | invoice), extends status to include the invoice
-- flow, and records terms acceptance / invoice request timestamps.

alter table public.technical_support_subscriptions
  add column if not exists payment_method text not null default 'card'
    check (payment_method in ('card', 'invoice'));

alter table public.technical_support_subscriptions
  drop constraint if exists technical_support_subscriptions_status_check;

alter table public.technical_support_subscriptions
  add constraint technical_support_subscriptions_status_check
    check (status in ('draft', 'active', 'past_due', 'canceled', 'invoice_pending', 'invoice_paid'));

alter table public.technical_support_subscriptions
  add column if not exists terms_accepted_at timestamptz;

alter table public.technical_support_subscriptions
  add column if not exists invoice_requested_at timestamptz;
