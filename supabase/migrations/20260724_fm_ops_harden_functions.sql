-- Foreland Marine Operations — security hardening (advisor follow-up)

-- Pin search_path on the trigger function.
alter function public.fm_touch_updated_at() set search_path = public;

-- The RLS helper functions are only ever used inside policies for the
-- authenticated role; anon has no reason to call them. Revoke anon EXECUTE.
-- (fm_quote_by_token / fm_invoice_by_token intentionally stay anon-executable:
--  they gate on an unguessable UUID token for client-facing document links.)
revoke execute on function public.fm_current_user_role() from anon;
revoke execute on function public.fm_is_active_user() from anon;
