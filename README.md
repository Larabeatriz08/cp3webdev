# Portfólio React (CP3 – Stack e Harness Engineering)

Site de portfólio pessoal em React que lista os projetos direto da API do GitHub, recebe mensagens por um formulário de contato (salvas no banco e avisadas por e-mail) e tem um painel protegido por login para ler mensagens e escolher os projetos em destaque.

- **Site publicado:** https://cp3webdev.vercel.app/
- **Instruções para a IA e decisões do projeto:** [`CLAUDE.md`](./CLAUDE.md)

## Funcionalidades

| Área                    | O que faz                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Rotas                   | Página inicial, `/projetos/:slug` (um link por projeto), `/contato`, `/login`, `/dashboard`, página 404 e página de erro de API. Links diretos e `F5` funcionam (rewrite no `vercel.json`) |
| Projetos                | Vêm da API do GitHub, sem cadastro manual: descrição, linguagem e data da última atualização. Forks e repositórios arquivados ficam de fora                                                |
| Estados de carregamento | Skeleton, erro com "Tentar novamente" e lista vazia, em toda tela que usa API                                                                                                              |
| Contato                 | Validação por campo com mensagem específica, botão bloqueado e spinner durante o envio. A mensagem é salva no Supabase e avisada por e-mail (EmailJS)                                      |
| Painel                  | Acesso só com login (Supabase Auth). Lista as mensagens, permite marcar como respondida e escolher os projetos em destaque                                                                 |
| Tema                    | Claro e escuro, com a escolha lembrada entre visitas e sem clarão ao recarregar                                                                                                            |
| Interface               | Responsiva, componentes reaproveitados, paleta própria (preto, branco, laranja e rosa bebê) e glassmorphism                                                                                |
| Performance             | Carregamento sob demanda por página, painel fora do pacote inicial, cache de 10 minutos da API do GitHub e skeletons com altura fixa                                                       |

## Tecnologias

| Área          | Escolha                                                   |
| ------------- | --------------------------------------------------------- |
| Base          | Vite, React e TypeScript 5                                |
| Rotas         | React Router                                              |
| Dados e cache | TanStack Query                                            |
| Formulários   | React Hook Form e Zod                                     |
| Estilo        | Tailwind CSS v4                                           |
| Banco e login | Supabase (Postgres, Auth e regras de segurança por linha) |
| E-mail        | EmailJS                                                   |
| Testes        | Vitest e Testing Library                                  |
| Qualidade     | ESLint, Prettier, Husky, lint-staged e commitlint         |
| Deploy        | Vercel (deploy automático a cada push na `main`)          |

As alternativas comparadas e o que foi sacrificado em cada escolha estão na seção 4 do [`CLAUDE.md`](./CLAUDE.md), e as decisões ao longo do projeto na seção 12.

## Como rodar

Pré-requisitos: Node.js 20 ou superior (LTS) e Git.

```bash
git clone <url-do-repositorio>
cd <pasta-do-repositorio>
npm install
cp .env.example .env   # no Windows: copy .env.example .env
npm run dev
```

Preencha o `.env` (veja a tabela abaixo) e **reinicie** o `npm run dev` depois de qualquer alteração, porque o Vite só lê o arquivo ao iniciar. O site abre em `http://localhost:5173`.

### Variáveis de ambiente

O `.env` não vai para o repositório. O `.env.example` lista os nomes, sem valores.

| Variável                   | Para que serve                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| `VITE_GITHUB_USERNAME`     | Usuário do GitHub de onde vêm os projetos                                                        |
| `VITE_SUPABASE_URL`        | URL da API do Supabase, no formato `https://<id-do-projeto>.supabase.co` (não é a URL do painel) |
| `VITE_SUPABASE_ANON_KEY`   | Chave **pública** do Supabase (`publishable`/`anon`). Nunca use a `secret` nem a `service_role`  |
| `VITE_EMAILJS_SERVICE_ID`  | ID do serviço de e-mail (`service_...`)                                                          |
| `VITE_EMAILJS_TEMPLATE_ID` | ID do template do e-mail (`template_...`)                                                        |
| `VITE_EMAILJS_PUBLIC_KEY`  | Chave pública do EmailJS                                                                         |

O template do EmailJS usa as variáveis `{{name}}`, `{{email}}` e `{{message}}`. Todas as variáveis acima são públicas por natureza (vão para o navegador): a segurança do banco está nas regras do Supabase, e no EmailJS é possível restringir os domínios permitidos.

### Banco de dados

O arquivo [`supabase/schema.sql`](./supabase/schema.sql) cria as tabelas `messages` e `featured_projects` com as regras de segurança por linha: visitantes só conseguem **enviar** mensagens; ler e editar exige login. Depois de rodá-lo, crie o usuário do dono em _Authentication → Users_ e desligue o cadastro de novos usuários.

## Scripts

| Comando              | O que faz                                    |
| -------------------- | -------------------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento                  |
| `npm run build`      | Verifica os tipos e gera o build de produção |
| `npm run preview`    | Serve o build localmente                     |
| `npm run lint`       | Roda o ESLint                                |
| `npm run format`     | Formata o código com o Prettier              |
| `npm test`           | Roda os testes uma vez                       |
| `npm run test:watch` | Roda os testes em modo contínuo              |

## Testes

- **Validação do formulário:** regras do schema (nome, e-mail e mensagem) e comportamento do formulário (mensagem específica por campo, botão bloqueado durante o envio, estados de sucesso e erro).
- **Bloqueio do painel:** sem login, `/dashboard` redireciona para `/login`; com sessão, mostra a página; enquanto verifica a sessão, não mostra nada restrito.

## Arquitetura

```
src/
├── components/   # UI genérica e reutilizável (Button, GlassCard, Field, Spinner, Layout...)
├── features/     # Uma pasta por funcionalidade: projects, contact, auth, dashboard, theme
├── pages/        # Uma por rota; só compõem as features
├── hooks/        # Hooks genéricos
├── services/     # Clientes de serviços externos genéricos (Supabase)
├── lib/          # Utilitários puros (config, datas, links seguros, QueryClient)
├── types/        # Tipos compartilhados
└── tests/        # Configuração dos testes
```

Regras de divisão:

- `components/` não conhece negócio nem API; recebe tudo por props.
- `features/` guarda tudo de uma funcionalidade junto (componentes, hooks, serviços e schemas).
- Componente nunca chama `fetch` ou o Supabase direto: chama um hook, que usa TanStack Query, que chama um serviço.

Fluxo de dados: `componente → hook (TanStack Query) → serviço → API (GitHub, Supabase, EmailJS)`.

## Padrões do projeto

**Nomenclatura**

| Item                | Convenção                                                     |
| ------------------- | ------------------------------------------------------------- |
| Componentes         | `PascalCase`, um por arquivo (`ProjectCard.tsx`)              |
| Hooks               | `camelCase` com prefixo `use` (`useProjects.ts`)              |
| Serviços            | `camelCase` terminando em `Api` ou `Service` (`githubApi.ts`) |
| Funções e variáveis | `camelCase`                                                   |
| Constantes globais  | `UPPER_SNAKE_CASE`                                            |
| Tipos e interfaces  | `PascalCase`                                                  |
| Testes              | `NomeDoArquivo.test.ts(x)`, ao lado do arquivo testado        |

**Commits:** [Conventional Commits](https://www.conventionalcommits.org/), com a descrição em português, no imperativo. Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

```
feat: adiciona validação do formulário de contato
fix(projects): trata limite de requisições da API do GitHub
test: cobre o bloqueio do painel sem login
docs: atualiza CLAUDE.md com login, painel e projetos em destaque
```

**Branches (GitHub Flow):** a `main` está sempre publicável e cada push nela dispara o deploy. Cada funcionalidade nasce em uma branch própria (`feature/...`, `fix/...`, `chore/...`, `docs/...`, `test/...`) e entra na `main` por Pull Request.

**Validação automática:** a cada commit, o Husky roda o `lint-staged` (ESLint e Prettier nos arquivos alterados) e o `commitlint` (formato da mensagem). Código ou mensagem fora do padrão é recusado.

## Harness de IA

O projeto foi conduzido com um assistente de IA configurado para seguir as regras do repositório:

- **[`CLAUDE.md`](./CLAUDE.md):** instruções do projeto (arquitetura, convenções, commits, branches, checklist dos requisitos, decisões e registro de mudanças). A regra da seção 0 obriga a atualizar o arquivo a cada mudança.
- **Guardrails automáticos:** ESLint, Prettier, commitlint e Husky barram o que fugir do padrão, mesmo que a IA erre.
- **Revisão pelo checklist:** cada etapa é conferida contra a seção 3 do `CLAUDE.md` antes do Pull Request.

## Performance

Estratégias aplicadas: divisão por rota com `React.lazy`, painel fora do pacote inicial, cache de 10 minutos da API do GitHub, skeletons e cards com altura fixa (sem salto de layout) e vidro limitado a cartões e cabeçalho (blur máximo de 16px).

**Nota do Lighthouse (mobile, performance):** _preencher depois de medir no site publicado, em https://pagespeed.web.dev_

## Limitações conhecidas

- A API do GitHub sem autenticação permite 60 requisições por hora por IP; o cache reduz o impacto e a interface mostra uma mensagem específica quando o limite é atingido.
- Se o navegador falhar ao baixar o arquivo de uma página carregada sob demanda, a tela fica vazia. Uma proteção de erro (Error Boundary) com botão de recarregar é a melhoria prevista.
- O painel não tem recuperação de senha nem vários níveis de usuário.
- O elemento 3D interativo (opcional na atividade) não foi implementado, por causa do prazo.
