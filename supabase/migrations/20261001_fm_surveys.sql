-- Foreland Marine Operations: yacht surveys
--
-- A survey is created from a checklist template (defined in code at
-- src/lib/admin/survey-templates.ts). The template's items are copied into
-- fm_survey_items on creation, so later edits to a template never alter a
-- survey already under way. Essential items (E) are those that must be cleared
-- before the vessel moves.

create sequence if not exists fm_survey_number_seq start 100;

create table fm_surveys (
  id            uuid primary key default gen_random_uuid(),
  number        text not null default ('FM-S' || nextval('fm_survey_number_seq')),
  template_key  text not null,
  title         text not null,
  client_id     uuid references fm_clients(id) on delete set null,
  vessel_id     uuid references fm_vessels(id) on delete set null,
  job_id        uuid references fm_jobs(id) on delete set null,
  vessel_name   text,
  location      text,
  surveyor      text,
  survey_date   date,
  passage       text,
  exposure      text,
  status        text not null default 'open' check (status in ('open', 'signed_off', 'archived')),
  outcome       text check (outcome in ('fit_single_passage', 'fit_conditions', 'not_fit')),
  conditions    text,
  valid_until   date,
  signed_by     text,
  signed_at     timestamptz,
  notes         text,
  created_by    uuid references fm_profiles(id),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table fm_survey_items (
  id          uuid primary key default gen_random_uuid(),
  survey_id   uuid not null references fm_surveys(id) on delete cascade,
  section     text not null,
  sort        int not null default 0,
  label       text not null,
  essential   boolean not null default false,
  result      text check (result in ('ok', 'defect', 'monitor', 'no_access')),
  finding     text,
  custom      boolean not null default false,
  updated_at  timestamptz not null default now()
);

create index fm_survey_items_survey_idx on fm_survey_items (survey_id, sort);
create index fm_surveys_vessel_idx on fm_surveys (vessel_id);

alter table fm_surveys      enable row level security;
alter table fm_survey_items enable row level security;

-- Operational: read any active user; write owner or staff
do $$
declare t text;
begin
  foreach t in array array['fm_surveys','fm_survey_items']
  loop
    execute format('create policy %1$s_select on %1$s for select to authenticated using (fm_is_active_user());', t);
    execute format($f$create policy %1$s_write on %1$s for all to authenticated
      using (fm_current_user_role() in ('owner','staff'))
      with check (fm_current_user_role() in ('owner','staff'));$f$, t);
  end loop;
end $$;
