-- Foreland Marine Operations — auto-reconcile rules engine.
-- Rules match on counterparty+description; action either creates a categorised
-- expense (money out) or marks the transaction a transfer (reconciled, no P&L
-- impact: card repayments, owner drawings, cash, cross-account moves).

create table fm_bank_rules (
  id          uuid primary key default gen_random_uuid(),
  match_text  text not null,                       -- case-insensitive substring
  direction   text not null default 'any',         -- in | out | any
  action      text not null default 'expense',     -- expense | transfer
  category    text,                                 -- for expense
  enabled     boolean not null default true,
  priority    int not null default 100,
  created_by  uuid references fm_profiles(id),
  created_at  timestamptz not null default now()
);

alter table fm_bank_transactions add column if not exists auto_reconciled boolean not null default false;

alter table fm_bank_rules enable row level security;
create policy fm_bank_rules_select on fm_bank_rules for select to authenticated using (fm_is_active_user());
create policy fm_bank_rules_write on fm_bank_rules for all to authenticated
  using (fm_current_user_role() in ('owner','bookkeeper'))
  with check (fm_current_user_role() in ('owner','bookkeeper'));

-- Seed sensible starter rules (editable in the UI). Transfers keep money moves
-- out of the P&L; expenses categorise recurring suppliers.
insert into fm_bank_rules (match_text, direction, action, category, priority) values
  ('capital on tap',    'out', 'transfer', null,               10),
  ('open banking cot',  'out', 'transfer', null,               10),
  ('jack macnally',     'out', 'transfer', null,               20),
  ('ewa investments',   'out', 'transfer', null,               20),
  ('cash machine',      'out', 'transfer', null,               20),
  ('paypal',            'in',  'transfer', null,               30),
  ('intouch accounting','out', 'expense',  'Professional fees', 50),
  ('anthropic',         'out', 'expense',  'Software',          50),
  ('base44',            'out', 'expense',  'Software',          50),
  ('namecheap',         'out', 'expense',  'Software',          50),
  ('exmile',            'out', 'expense',  'Software',          50),
  ('google',            'out', 'expense',  'Software',          50),
  ('hilton',            'out', 'expense',  'Accommodation',     50),
  ('bp-mewa',           'out', 'expense',  'Travel',            50),
  ('zabka',             'out', 'expense',  'Subsistence',       50),
  ('patathai',          'out', 'expense',  'Subsistence',       50),
  ('minibar',           'out', 'expense',  'Subsistence',       50),
  ('chichester harbou', 'out', 'expense',  'Other',             60);
