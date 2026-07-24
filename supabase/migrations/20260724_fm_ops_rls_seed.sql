-- Foreland Marine Operations — Row Level Security + seed
--
-- Access: owner full; staff writes operational; bookkeeper writes financial.
-- Every table requires an active fm_profiles row. The public website never reads
-- here; enquiries are inserted server-side with the service-role key.

alter table fm_profiles      enable row level security;
alter table fm_clients       enable row level security;
alter table fm_vessels       enable row level security;
alter table fm_enquiries     enable row level security;
alter table fm_services      enable row level security;
alter table fm_quotes        enable row level security;
alter table fm_quote_items   enable row level security;
alter table fm_jobs          enable row level security;
alter table fm_job_stages    enable row level security;
alter table fm_events        enable row level security;
alter table fm_invoices      enable row level security;
alter table fm_invoice_items enable row level security;
alter table fm_payments      enable row level security;
alter table fm_expenses      enable row level security;
alter table fm_settings      enable row level security;

-- Profiles
create policy fm_profiles_select on fm_profiles for select to authenticated using (fm_is_active_user());
create policy fm_profiles_update_self on fm_profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());
create policy fm_profiles_owner_all on fm_profiles for all to authenticated
  using (fm_current_user_role() = 'owner') with check (fm_current_user_role() = 'owner');

-- Operational tables: read any active user; write owner or staff
do $$
declare t text;
begin
  foreach t in array array['fm_clients','fm_vessels','fm_enquiries','fm_quotes','fm_quote_items','fm_jobs','fm_job_stages','fm_events']
  loop
    execute format('create policy %1$s_select on %1$s for select to authenticated using (fm_is_active_user());', t);
    execute format($f$create policy %1$s_write on %1$s for all to authenticated
      using (fm_current_user_role() in ('owner','staff'))
      with check (fm_current_user_role() in ('owner','staff'));$f$, t);
  end loop;
end $$;

-- Financial tables: read any active user; write owner or bookkeeper
do $$
declare t text;
begin
  foreach t in array array['fm_invoices','fm_invoice_items','fm_payments','fm_expenses']
  loop
    execute format('create policy %1$s_select on %1$s for select to authenticated using (fm_is_active_user());', t);
    execute format($f$create policy %1$s_write on %1$s for all to authenticated
      using (fm_current_user_role() in ('owner','bookkeeper'))
      with check (fm_current_user_role() in ('owner','bookkeeper'));$f$, t);
  end loop;
end $$;

-- Reference tables: read any active user; write owner only
do $$
declare t text;
begin
  foreach t in array array['fm_services','fm_settings']
  loop
    execute format('create policy %1$s_select on %1$s for select to authenticated using (fm_is_active_user());', t);
    execute format($f$create policy %1$s_write on %1$s for all to authenticated
      using (fm_current_user_role() = 'owner')
      with check (fm_current_user_role() = 'owner');$f$, t);
  end loop;
end $$;

-- ── Seed ─────────────────────────────────────────────────────────────────────
insert into fm_settings (id) values (1) on conflict (id) do nothing;

-- Standard rate card (Foreland's known day/hour/month/fixed rates, ex-VAT).
insert into fm_services (code, name, unit, rate, category) values
  ('DIR-HR',       'Director consultancy',            'hour',  125,  'Consultancy'),
  ('DIR-DAY',      'Director day rate',               'day',   950,  'Consultancy'),
  ('SURVEY-DAY',   'Technical survey / inspection',   'day',   850,  'Consultancy'),
  ('PM-DAY',       'Refit project management',        'day',   950,  'Project management'),
  ('OWNREP-MO',    'New build owner''s representation','month', 6500, 'Owner''s representation'),
  ('MGT-SAIL-MO',  'Yacht management, sailing yacht',  'month', 3250, 'Management'),
  ('MGT-MOTOR-MO', 'Yacht management, motor yacht',    'month', 3500, 'Management'),
  ('PMS-SETUP',    'PMS setup (DeepBlue)',             'fixed', 6650, 'Software & systems'),
  ('WX-DAY',       'Weather routing, twice daily',     'day',   325,  'Passage support'),
  ('TS-STANDBY-MO','Technical Support, Standby',       'month', 250,  'Technical support'),
  ('TS-DIRECT-MO', 'Technical Support, Direct',        'month', 500,  'Technical support'),
  ('TS-CAPTIVE-MO','Technical Support, Captive',       'month', 1000, 'Technical support')
on conflict (code) do nothing;
