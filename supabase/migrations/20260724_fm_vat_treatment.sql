-- Foreland Marine Operations — optional VAT treatment on quotes/invoices.
-- standard | zero | exempt | outside (offshore B2B, outside scope of UK VAT).
alter table fm_invoices add column if not exists vat_treatment text not null default 'standard';
alter table fm_quotes   add column if not exists vat_treatment text not null default 'standard';
