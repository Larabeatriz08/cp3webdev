-- Esquema do banco do portfólio (Supabase / Postgres)
-- Como usar: Supabase > SQL Editor > New query > colar este arquivo > Run.
--
-- Depois de rodar:
--   1. Authentication > Users > Add user: crie o usuário do dono (e-mail e senha).
--   2. Authentication > Sign In / Providers: desligue "Allow new users to sign up".
--      As regras abaixo liberam a leitura para qualquer usuário logado, então
--      só o dono pode existir como usuário.

-- Mensagens do formulário de contato
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 254),
  message text not null check (char_length(message) between 20 and 2000),
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "Qualquer visitante pode enviar mensagem"
  on public.messages for insert
  to anon, authenticated
  with check (true);

create policy "Somente usuario logado le mensagens"
  on public.messages for select
  to authenticated
  using (true);

create policy "Somente usuario logado atualiza mensagens"
  on public.messages for update
  to authenticated
  using (true)
  with check (true);

-- Projetos em destaque na página inicial (guarda só o slug do repositório)
create table public.featured_projects (
  slug text primary key check (char_length(slug) between 1 and 100),
  created_at timestamptz not null default now()
);

alter table public.featured_projects enable row level security;

create policy "Qualquer visitante le destaques"
  on public.featured_projects for select
  to anon, authenticated
  using (true);

create policy "Somente usuario logado cria destaques"
  on public.featured_projects for insert
  to authenticated
  with check (true);

create policy "Somente usuario logado remove destaques"
  on public.featured_projects for delete
  to authenticated
  using (true);