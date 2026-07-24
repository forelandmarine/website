-- Foreland Marine Operations — non-invoiced income + card-account handling.
-- fm_income records money in that isn't an invoice payment (app revenue,
-- interest, VAT refunds, rebates). fm_bank_accounts.kind distinguishes cards
-- (where money-in is a refund/reward credit) from bank accounts (income).

create table fm_income (
  id          uuid primary key default gen_random_uuid(),
  source      text,
  category    text,
  description text,
  currency    text not null default 'gbp',
  net         numeric not null default 0,
  vat         numeric not null default 0,
  gross       numeric not null default 0,
  received_on date not null default current_date,
  created_by  uuid references fm_profiles(id),
  created_at  timestamptz not null default now()
);

alter table fm_bank_accounts add column if not exists kind text not null default 'bank'; -- bank | card
alter table fm_bank_transactions add column if not exists matched_income_id uuid references fm_income(id) on delete set null;

alter table fm_income enable row level security;
create policy fm_income_select on fm_income for select to authenticated using (fm_is_active_user());
create policy fm_income_write on fm_income for all to authenticated
  using (fm_current_user_role() in ('owner','bookkeeper'))
  with check (fm_current_user_role() in ('owner','bookkeeper'));

update fm_bank_accounts set kind = 'card' where name = 'Capital on Tap';
