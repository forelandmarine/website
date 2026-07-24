-- Foreland Marine Operations — foundation schema (CRM + finance backend)
--
-- This lives in the shared foreland-website Supabase project alongside other
-- apps (Nimara, investor portal, technical support), so EVERY object is
-- prefixed fm_ to avoid collisions. There is deliberately NO auto-create-profile
-- trigger on auth.users: this project's auth users are not all Foreland staff,
-- so access is granted explicitly by inserting an fm_profiles row (active=true)
-- via the Team module. RLS gates every table on an active Foreland profile.
--
-- Bookkeeping depth: income / expenses / VAT + reports (not double-entry).
-- Roles: owner (Jack, full), staff (operational), bookkeeper (finance).

-- ── Extensions ───────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── Enums ────────────────────────────────────────────────────────────────────
create type fm_user_role      as enum ('owner', 'staff', 'bookkeeper');
create type fm_client_type    as enum ('owner', 'captain', 'management', 'yard', 'broker', 'other');
create type fm_vessel_type    as enum ('sail', 'motor', 'explorer', 'other');
create type fm_enquiry_status as enum ('new', 'contacted', 'quoting', 'won', 'lost', 'archived');
create type fm_quote_status   as enum ('draft', 'sent', 'accepted', 'declined', 'expired');
create type fm_job_status     as enum ('lead', 'scheduled', 'in_progress', 'on_hold', 'completed', 'cancelled');
create type fm_stage_status   as enum ('pending', 'in_progress', 'complete', 'invoiced');
create type fm_invoice_status as enum ('draft', 'sent', 'part_paid', 'paid', 'overdue', 'void');
create type fm_payment_type   as enum ('deposit', 'stage', 'retainer', 'final', 'other');
create type fm_payment_status as enum ('pending', 'succeeded', 'failed', 'refunded');
create type fm_event_type     as enum ('engagement', 'meeting', 'survey', 'passage', 'holiday', 'other');
create type fm_expense_status as enum ('unpaid', 'paid');

-- ── Profiles (1:1 with auth.users, opt-in) ───────────────────────────────────
create table fm_profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null default '',
  role        fm_user_role not null default 'staff',
  phone       text,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

-- role of the current user (security definer avoids RLS recursion)
create or replace function fm_current_user_role()
returns fm_user_role
language sql stable security definer set search_path = public as $$
  select role from fm_profiles where id = auth.uid()
$$;

create or replace function fm_is_active_user()
returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select active from fm_profiles where id = auth.uid()), false)
$$;

-- ── Clients & vessels ────────────────────────────────────────────────────────
create table fm_clients (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  type        fm_client_type not null default 'owner',
  company     text,
  email       text,
  phone       text,
  country     text,
  notes       text,
  created_by  uuid references fm_profiles(id),
  created_at  timestamptz not null default now()
);

create table fm_vessels (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid references fm_clients(id) on delete cascade,
  name        text not null,
  type        fm_vessel_type not null default 'sail',
  builder     text,
  year_built  int,
  length_m    numeric,
  gross_tonnage numeric,
  imo         text,
  mmsi        text,
  flag        text,
  home_port   text,
  notes       text,
  created_at  timestamptz not null default now()
);

-- ── Website enquiries (fed by the public contact / quote forms) ───────────────
create table fm_enquiries (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid references fm_clients(id) on delete set null,
  name          text,
  email         text,
  phone         text,
  service       text,
  vessel_name   text,
  vessel_length numeric,
  budget_band   text,
  timescale     text,
  message       text,
  source        text not null default 'website',
  status        fm_enquiry_status not null default 'new',
  created_at    timestamptz not null default now()
);

-- ── Services rate card (drives the quote builder) ────────────────────────────
-- Foreland bills day rates, hourly rates, monthly retainers and fixed fees,
-- not materials. This is the single source of standard rates.
create table fm_services (
  id          uuid primary key default gen_random_uuid(),
  code        text unique not null,
  name        text not null,
  unit        text not null default 'day',   -- day | hour | month | fixed | each
  rate        numeric not null default 0,     -- £ ex-VAT
  category    text,
  active      boolean not null default true,
  updated_at  timestamptz not null default now()
);

-- ── Quotes / proposals ───────────────────────────────────────────────────────
create sequence if not exists fm_quote_number_seq start 1000;
create table fm_quotes (
  id              uuid primary key default gen_random_uuid(),
  number          text not null default ('FM-Q' || nextval('fm_quote_number_seq')),
  client_id       uuid references fm_clients(id) on delete set null,
  vessel_id       uuid references fm_vessels(id) on delete set null,
  enquiry_id      uuid references fm_enquiries(id) on delete set null,
  title           text not null default '',
  status          fm_quote_status not null default 'draft',
  currency        text not null default 'gbp',
  notes           text,
  subtotal        numeric not null default 0,
  vat_total       numeric not null default 0,
  total           numeric not null default 0,
  deposit_percent numeric not null default 0,
  valid_until     date,
  public_token    uuid not null default gen_random_uuid(),
  created_by      uuid references fm_profiles(id),
  created_at      timestamptz not null default now(),
  sent_at         timestamptz,
  accepted_at     timestamptz
);

create table fm_quote_items (
  id          uuid primary key default gen_random_uuid(),
  quote_id    uuid not null references fm_quotes(id) on delete cascade,
  description text not null default '',
  qty         numeric not null default 1,
  unit        text,
  unit_price  numeric not null default 0,
  vat_rate    numeric not null default 0,
  line_total  numeric not null default 0,
  service_code text,
  sort        int not null default 0
);

-- ── Jobs / engagements & stages ──────────────────────────────────────────────
create sequence if not exists fm_job_number_seq start 100;
create table fm_jobs (
  id          uuid primary key default gen_random_uuid(),
  number      text not null default ('FM-J' || nextval('fm_job_number_seq')),
  client_id   uuid references fm_clients(id) on delete set null,
  vessel_id   uuid references fm_vessels(id) on delete set null,
  quote_id    uuid references fm_quotes(id) on delete set null,
  title       text not null default '',
  status      fm_job_status not null default 'lead',
  description text,
  start_date  date,
  end_date    date,
  budget      numeric,
  currency    text not null default 'gbp',
  created_by  uuid references fm_profiles(id),
  created_at  timestamptz not null default now()
);

create table fm_job_stages (
  id        uuid primary key default gen_random_uuid(),
  job_id    uuid not null references fm_jobs(id) on delete cascade,
  name      text not null,
  status    fm_stage_status not null default 'pending',
  due_date  date,
  amount    numeric,
  sort      int not null default 0
);

-- ── Calendar events ──────────────────────────────────────────────────────────
create table fm_events (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  type       fm_event_type not null default 'engagement',
  job_id     uuid references fm_jobs(id) on delete cascade,
  assignee   uuid references fm_profiles(id) on delete set null,
  start_at   timestamptz not null,
  end_at     timestamptz,
  all_day    boolean not null default false,
  location   text,
  notes      text,
  created_by uuid references fm_profiles(id),
  created_at timestamptz not null default now()
);

-- ── Invoices & payments ──────────────────────────────────────────────────────
create sequence if not exists fm_invoice_number_seq start 1000;
create table fm_invoices (
  id           uuid primary key default gen_random_uuid(),
  number       text not null default ('FM-INV' || nextval('fm_invoice_number_seq')),
  client_id    uuid references fm_clients(id) on delete set null,
  vessel_id    uuid references fm_vessels(id) on delete set null,
  job_id       uuid references fm_jobs(id) on delete set null,
  quote_id     uuid references fm_quotes(id) on delete set null,
  status       fm_invoice_status not null default 'draft',
  currency     text not null default 'gbp',
  issue_date   date not null default current_date,
  due_date     date,
  subtotal     numeric not null default 0,
  vat_total    numeric not null default 0,
  total        numeric not null default 0,
  amount_paid  numeric not null default 0,
  notes        text,
  public_token uuid not null default gen_random_uuid(),
  created_by   uuid references fm_profiles(id),
  created_at   timestamptz not null default now()
);

create table fm_invoice_items (
  id          uuid primary key default gen_random_uuid(),
  invoice_id  uuid not null references fm_invoices(id) on delete cascade,
  description text not null default '',
  qty         numeric not null default 1,
  unit        text,
  unit_price  numeric not null default 0,
  vat_rate    numeric not null default 0,
  line_total  numeric not null default 0,
  sort        int not null default 0
);

create table fm_payments (
  id                    uuid primary key default gen_random_uuid(),
  invoice_id            uuid references fm_invoices(id) on delete set null,
  quote_id              uuid references fm_quotes(id) on delete set null,
  job_id                uuid references fm_jobs(id) on delete set null,
  client_id             uuid references fm_clients(id) on delete set null,
  type                  fm_payment_type not null default 'deposit',
  method                text not null default 'stripe',
  currency              text not null default 'gbp',
  amount                numeric not null default 0,
  status                fm_payment_status not null default 'pending',
  stripe_session_id     text,
  stripe_payment_intent text,
  reference             text,
  paid_at               timestamptz,
  created_at            timestamptz not null default now()
);

-- ── Expenses (bookkeeping) ───────────────────────────────────────────────────
create table fm_expenses (
  id          uuid primary key default gen_random_uuid(),
  supplier    text,
  job_id      uuid references fm_jobs(id) on delete set null,
  category    text,
  description text,
  currency    text not null default 'gbp',
  net         numeric not null default 0,
  vat         numeric not null default 0,
  gross       numeric not null default 0,
  status      fm_expense_status not null default 'unpaid',
  spent_on    date not null default current_date,
  created_by  uuid references fm_profiles(id),
  created_at  timestamptz not null default now()
);

-- ── Settings (single row) ────────────────────────────────────────────────────
create table fm_settings (
  id                      int primary key default 1,
  company_name            text not null default 'Foreland Marine Consultancy Ltd',
  company_number          text default '15785851',
  vat_registered          boolean not null default false,
  vat_number              text,
  address                 text default '7 Bell Yard, London WC2A 2JR',
  phone                   text default '+44 7921 528 168',
  email                   text default 'info@forelandmarine.com',
  default_currency        text not null default 'gbp',
  default_deposit_percent numeric not null default 0,
  default_vat_rate        numeric not null default 20,
  constraint fm_settings_singleton check (id = 1)
);

-- updated_at touch for services
create or replace function fm_touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
create trigger fm_services_touch before update on fm_services
  for each row execute function fm_touch_updated_at();

-- ── Public token lookups (SECURITY DEFINER, for client-facing quote/invoice) ──
create or replace function fm_quote_by_token(t uuid)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'quote', to_jsonb(q),
    'client', to_jsonb(c),
    'vessel', to_jsonb(v),
    'items', coalesce((select jsonb_agg(to_jsonb(i) order by i.sort) from fm_quote_items i where i.quote_id = q.id), '[]'::jsonb),
    'settings', to_jsonb(s)
  )
  from fm_quotes q
  left join fm_clients c on c.id = q.client_id
  left join fm_vessels v on v.id = q.vessel_id
  cross join fm_settings s
  where q.public_token = t
$$;

create or replace function fm_invoice_by_token(t uuid)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'invoice', to_jsonb(inv),
    'client', to_jsonb(c),
    'vessel', to_jsonb(v),
    'items', coalesce((select jsonb_agg(to_jsonb(i) order by i.sort) from fm_invoice_items i where i.invoice_id = inv.id), '[]'::jsonb),
    'payments', coalesce((select jsonb_agg(to_jsonb(p) order by p.created_at) from fm_payments p where p.invoice_id = inv.id and p.status = 'succeeded'), '[]'::jsonb),
    'settings', to_jsonb(s)
  )
  from fm_invoices inv
  left join fm_clients c on c.id = inv.client_id
  left join fm_vessels v on v.id = inv.vessel_id
  cross join fm_settings s
  where inv.public_token = t
$$;

grant execute on function fm_quote_by_token(uuid) to anon;
grant execute on function fm_invoice_by_token(uuid) to anon;
