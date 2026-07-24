-- Foreland Marine Operations — repoint bank feed from GoCardless to Plaid.
-- No bank data exists yet, so we rename the provider-specific columns to be
-- provider-neutral and add Plaid's item/access-token/cursor fields.

alter table fm_bank_accounts     rename column gc_account_id     to external_account_id;
alter table fm_bank_transactions rename column gc_transaction_id to external_transaction_id;

alter table fm_bank_connections
  add column if not exists provider       text not null default 'plaid',
  add column if not exists plaid_item_id  text,
  add column if not exists access_token   text,   -- Plaid access_token (secret; RLS owner/bookkeeper only)
  add column if not exists sync_cursor    text;   -- /transactions/sync cursor, per item
