-- Technical Support subscriptions
-- One row per yacht subscribed to the Technical Support programme.
-- Stripe is the source of truth for billing state; this table mirrors the
-- vessel/contact details captured at sign-up and tracks the Stripe IDs.

create table if not exists public.technical_support_subscriptions (
  id uuid primary key default gen_random_uuid(),

  -- Tier & currency
  tier text not null check (tier in ('standby', 'direct', 'captive')),
  currency text not null check (currency in ('gbp', 'eur', 'usd')),

  -- Vessel
  yacht_name text not null,
  yacht_imo text,
  yacht_mmsi text,
  yacht_length_m numeric,
  yacht_flag text,
  yacht_home_port text,

  -- Billing entity
  billing_name text not null,
  billing_email text not null,
  billing_address text,
  billing_country text,
  billing_vat_number text,

  -- Captain
  captain_name text not null,
  captain_email text not null,
  captain_phone text,

  -- Chief Engineer (optional)
  engineer_name text,
  engineer_email text,
  engineer_phone text,

  -- Stripe state
  stripe_customer_id text,
  stripe_subscription_id text unique,
  stripe_checkout_session_id text unique,
  subscription_status text,
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,

  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_ts_subs_stripe_customer
  on public.technical_support_subscriptions (stripe_customer_id);

create index if not exists idx_ts_subs_billing_email
  on public.technical_support_subscriptions (billing_email);

-- RLS: this table is only accessed via the service-role key from the API,
-- so we enable RLS and add no permissive policies. Anonymous and authed
-- clients cannot read or write directly.
alter table public.technical_support_subscriptions enable row level security;

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_ts_subs_updated_at on public.technical_support_subscriptions;
create trigger trg_ts_subs_updated_at
  before update on public.technical_support_subscriptions
  for each row execute function public.set_updated_at();
