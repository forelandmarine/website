-- Foreland Marine Operations — Open Banking (GoCardless Bank Account Data)
-- Read-only import of balances + transactions, reconciled against invoices and
-- expenses. Financial tables: owner/bookkeeper write, any active user reads.

create type fm_bank_conn_status as enum ('created', 'linked', 'expired', 'error');
create type fm_txn_direction    as enum ('in', 'out');

-- A consent/requisition to one bank (90-day PSD2 access).
create table fm_bank_connections (
  id               uuid primary key default gen_random_uuid(),
  requisition_id   text,
  institution_id   text,
  institution_name text,
  status           fm_bank_conn_status not null default 'created',
  created_by       uuid references fm_profiles(id),
  created_at       timestamptz not null default now(),
  linked_at        timestamptz,
  expires_at       timestamptz
);

create table fm_bank_accounts (
  id                 uuid primary key default gen_random_uuid(),
  connection_id      uuid references fm_bank_connections(id) on delete cascade,
  gc_account_id      text unique not null,
  name               text,
  owner_name         text,
  iban               text,
  currency           text not null default 'GBP',
  balance            numeric,
  balance_at         timestamptz,
  last_synced_at     timestamptz,
  created_at         timestamptz not null default now()
);

create table fm_bank_transactions (
  id                 uuid primary key default gen_random_uuid(),
  account_id         uuid not null references fm_bank_accounts(id) on delete cascade,
  gc_transaction_id  text not null,
  booking_date       date,
  value_date         date,
  amount             numeric not null default 0,   -- signed: + in, - out
  currency           text not null default 'GBP',
  direction          fm_txn_direction not null default 'in',
  counterparty       text,
  description        text,
  raw                jsonb,
  reconciled         boolean not null default false,
  matched_invoice_id uuid references fm_invoices(id) on delete set null,
  matched_expense_id uuid references fm_expenses(id) on delete set null,
  matched_payment_id uuid references fm_payments(id) on delete set null,
  created_at         timestamptz not null default now(),
  unique (account_id, gc_transaction_id)
);

create index fm_bank_txn_account_idx on fm_bank_transactions (account_id, booking_date desc);
create index fm_bank_txn_unreconciled_idx on fm_bank_transactions (account_id) where not reconciled;

alter table fm_bank_connections  enable row level security;
alter table fm_bank_accounts     enable row level security;
alter table fm_bank_transactions enable row level security;

do $$
declare t text;
begin
  foreach t in array array['fm_bank_connections','fm_bank_accounts','fm_bank_transactions']
  loop
    execute format('create policy %1$s_select on %1$s for select to authenticated using (fm_is_active_user());', t);
    execute format($f$create policy %1$s_write on %1$s for all to authenticated
      using (fm_current_user_role() in ('owner','bookkeeper'))
      with check (fm_current_user_role() in ('owner','bookkeeper'));$f$, t);
  end loop;
end $$;
