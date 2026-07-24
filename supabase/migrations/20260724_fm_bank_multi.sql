-- Foreland Marine Operations — support Starling API + manual statement imports.
-- external_category_id holds Starling's categoryUid (needed for its feed API);
-- null for other providers.

alter table fm_bank_accounts add column if not exists external_category_id text;
