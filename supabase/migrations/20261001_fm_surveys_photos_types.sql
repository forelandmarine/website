-- Foreland Marine Operations: surveys, second pass
--
-- Survey types: each template carries its own header fields, stored in
-- fm_surveys.meta, and its own sign-off outcomes, so the outcome check moves
-- into the application. Items gain a recommendation and an A/B/C priority, and
-- a "not applicable" result. Photos are stored in a private bucket, one row
-- per photo, optionally tied to an item. A survey report can be shared with the
-- client through an unguessable token, only once sharing is switched on.

alter table fm_surveys drop constraint if exists fm_surveys_outcome_check;
alter table fm_surveys drop column if exists passage;
alter table fm_surveys drop column if exists exposure;
alter table fm_surveys
  add column vessel_type  text check (vessel_type in ('sail', 'motor')),
  add column meta         jsonb not null default '{}'::jsonb,
  -- Report content. Narratives are keyed by checklist section name.
  add column report_title text,
  add column intro        text,
  add column description  text,
  add column particulars  jsonb not null default '[]'::jsonb,
  add column narratives   jsonb not null default '{}'::jsonb,
  add column summary      text,
  add column valuation    text,
  add column outstanding  text,
  add column confidential boolean not null default false,
  add column cover_photo_id uuid,
  add column public_token uuid not null default gen_random_uuid(),
  add column shared       boolean not null default false;
create unique index fm_surveys_public_token_idx on fm_surveys (public_token);

alter table fm_survey_items drop constraint if exists fm_survey_items_result_check;
alter table fm_survey_items
  add constraint fm_survey_items_result_check check (result in ('ok', 'defect', 'monitor', 'no_access', 'n_a')),
  add column priority       text check (priority in ('A', 'B', 'C')),
  add column recommendation text;

create table fm_survey_photos (
  id            uuid primary key default gen_random_uuid(),
  survey_id     uuid not null references fm_surveys(id) on delete cascade,
  item_id       uuid references fm_survey_items(id) on delete set null,
  path          text not null,
  display_path  text,
  section       text,
  caption       text,
  width         int,
  height        int,
  in_report     boolean not null default true,
  created_by    uuid references fm_profiles(id),
  created_at    timestamptz not null default now()
);
create index fm_survey_photos_survey_idx on fm_survey_photos (survey_id, created_at);

alter table fm_survey_photos enable row level security;
create policy fm_survey_photos_select on fm_survey_photos for select to authenticated using (fm_is_active_user());
create policy fm_survey_photos_write on fm_survey_photos for all to authenticated
  using (fm_current_user_role() in ('owner','staff'))
  with check (fm_current_user_role() in ('owner','staff'));

alter table fm_surveys add constraint fm_surveys_cover_photo_fk
  foreign key (cover_photo_id) references fm_survey_photos(id) on delete set null;

-- Private bucket. Originals are kept as taken; the browser also uploads a
-- 1600px display copy so the checklist and report load quickly on a phone.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('fm-survey-photos', 'fm-survey-photos', false, 52428800,
        array['image/jpeg','image/png','image/heic','image/heif','image/webp'])
on conflict (id) do nothing;

create policy fm_survey_photos_obj_select on storage.objects for select to authenticated
  using (bucket_id = 'fm-survey-photos' and fm_is_active_user());
create policy fm_survey_photos_obj_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'fm-survey-photos' and fm_current_user_role() in ('owner','staff'));
create policy fm_survey_photos_obj_delete on storage.objects for delete to authenticated
  using (bucket_id = 'fm-survey-photos' and fm_current_user_role() in ('owner','staff'));

-- Client report link. Returns nothing unless the survey is shared.
create or replace function fm_survey_by_token(t uuid)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object(
    'survey', to_jsonb(sv) - 'public_token' - 'notes' - 'created_by',
    'client', jsonb_build_object('name', c.name),
    'vessel', to_jsonb(v) - 'notes' - 'client_id',
    'items', coalesce((select jsonb_agg(to_jsonb(i) order by i.sort) from fm_survey_items i where i.survey_id = sv.id), '[]'::jsonb),
    'photos', coalesce((select jsonb_agg(jsonb_build_object('id', p.id, 'item_id', p.item_id, 'section', p.section, 'path', p.path, 'display_path', p.display_path, 'caption', p.caption, 'width', p.width, 'height', p.height, 'in_report', p.in_report, 'created_at', p.created_at) order by p.created_at)
                        from fm_survey_photos p where p.survey_id = sv.id), '[]'::jsonb)
  )
  from fm_surveys sv
  left join fm_clients c on c.id = sv.client_id
  left join fm_vessels v on v.id = sv.vessel_id
  where sv.public_token = t and sv.shared
$$;
grant execute on function fm_survey_by_token(uuid) to anon;
