create table public.notices (
  id          bigint generated always as identity primary key,
  notice_id   text unique not null,
  title_ko    text not null,
  title_en    text,
  title_zh    text,
  title_ja    text,
  title_vi    text,
  title_th    text,
  url         text not null,
  published_at date,
  fetched_at  timestamptz default now()
);

alter table public.notices enable row level security;

create policy "notices are publicly readable"
  on public.notices for select using (true);

create index notices_published_at_idx on public.notices (published_at desc);
