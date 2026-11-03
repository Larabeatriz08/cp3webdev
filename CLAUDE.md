# CLAUDE.md: Portfólio React (CP3 – Stack e Harness Engineering)

Fonte de verdade do projeto para a IA e para a dona do projeto. Leia inteiro antes de qualquer tarefa e siga **todas** as regras. Em caso de conflito entre um pedido e este arquivo, avise o conflito antes de agir.

> **Última atualização:** 02/11/2026 · Etapa 9 (login e painel) em andamento · Formulário e e-mail funcionando no site publicado · Faltam: Lighthouse, README no repositório e vídeo

---

## 0. Regra de manutenção deste arquivo (OBRIGATÓRIA)

**Toda mudança no projeto exige atualizar este arquivo no mesmo commit ou no mesmo Pull Request.** Isso inclui: nova dependência, nova pasta, nova convenção, mudança de stack, nova decisão de design, mudança de branch/fluxo, nova variável de ambiente e item do checklist concluído.

Ao entregar qualquer mudança, a IA deve:

1. Dizer **quais seções** do `CLAUDE.md` foram alteradas.
2. Entregar o **trecho novo** (ou o arquivo completo) pronto para colar.
3. Acrescentar uma linha no **Registro de mudanças** (seção 14).
4. Sugerir o commit: junto da mudança, ou separado como `docs: atualiza CLAUDE.md com ...`.
5. Se a mudança alterar uma escolha da stack, atualizar a **tabela da seção 4** e o **README**.
6. **Conferir se o arquivo da dona está sincronizado** (ex.: `Select-String -Path CLAUDE.md -Pattern "D15"`). Se houver defasagem, entregar o arquivo completo em vez de trechos.

Uma mudança sem atualização deste arquivo é considerada **incompleta**.

---

## 1. Contexto

- **O que é:** site de portfólio individual em React, publicado na Vercel, mais um vídeo de até 8 min simulando entrevista técnica sobre stack e harness de IA.
- **Prazo:** 03/11/2026.
- **Entregas (Teams):** link do GitHub, link da Vercel, link do vídeo (YouTube, não listado).
- **URL publicada:** https://cp3webdev.vercel.app/
- **Usuário do GitHub (fonte dos projetos):** `Larabeatriz08`
- **Pasta local do projeto:** `cp3webdev` (Windows, VS Code, PowerShell).
- **Uso de IA:** liberado e esperado. A dona **precisa saber explicar tudo** no código e mostrar como a IA foi configurada e conduzida.
- **Idioma:** conversa, README, commits (descrição) e textos da interface em **pt-BR**. Código (nomes de variáveis, funções, arquivos) em **inglês**.

## 2. Regras de comportamento da IA (obrigatórias)

1. **Uma coisa por vez.** Cada etapa é pequena, com seus próprios passos, teste e commit. Nunca entregar várias funcionalidades de uma vez.
2. **Pedir antes de preencher.** Tudo que depender de dado pessoal (nome, e-mail, textos de apresentação, links, chaves, contas) deve ser **solicitado à dona antes** de ser usado. Nunca inventar nem deixar valor fictício no portfólio.
3. **Explicar o porquê** de cada decisão, em linguagem que a dona consiga repetir no vídeo.
4. **Nunca afirmar que rodou algo que não rodou.** A IA não tem internet nem executa o projeto. Build, testes, lint e Lighthouse são rodados pela dona.
5. **Não atribuir causas sem evidência.** Quando a saída do terminal não mostrar o motivo de algo, dizer que não dá para saber.
6. **Avisar o que depende da dona:** criar contas e chaves, commits e pushes, medir Lighthouse, gravar o vídeo.
7. **Não inventar** versões, APIs ou comandos. Se houver incerteza, dizer.
8. **Escrever a mensagem de commit** de cada etapa separadamente, no padrão da seção 8, sempre como comando completo `git commit -m "..."`.
9. **Nunca colocar segredos no código.** Chaves só em `.env` (fora do repo) e listadas em `.env.example`. A dona não deve colar chaves no chat.
10. Antes de criar um arquivo novo, checar se já existe componente/hook/serviço reaproveitável.
11. **Pedir a saída do terminal** quando o estado do repositório for incerto, em vez de adivinhar. Usar `git --no-pager` para evitar o paginador.
12. **Testes manuais no navegador:** indicar o lugar exato de cada botão e o nome do menu na versão do Chrome em uso (ex.: **Request conditions** substitui "Network request blocking"). Não propor o modo _Offline_ para testar erro de API (ver seção 9).
13. **Manter este arquivo atualizado** (seção 0).

## 3. Requisitos obrigatórios (checklist de aceite)

Marcar `[x]` somente quando a dona confirmar que funciona. Itens implementados mas ainda não testados ficam `[ ]` com a observação.

### 3.1 Rotas

- [x] Rota individual por projeto: `/projetos/:slug` (rota existente)
- [x] Rota de projeto com dados reais do GitHub (cache reaproveitado da lista; 404 para repositório inexistente)
- [x] Página 404 amigável
- [x] Página amigável para falha no carregamento da API (rota `/erro`)
- [ ] Link compartilhado abre direto na página certa, inclusive com refresh (`vercel.json` criado; testar em `/projetos/<repo>` na URL publicada)

### 3.2 Estados de carregamento

- [x] Lista de projetos: skeleton, erro com "Tentar novamente" e lista vazia
- [x] Página de detalhe: skeleton, 404 e erro com "Tentar novamente" (testado com bloqueio de `api.github.com` no DevTools)
- [ ] Falha ao baixar o arquivo de uma página (lazy loading) deixa a tela vazia: adicionar **Error Boundary** com botão de recarregar (melhoria pendente, branch `feature/error-boundary`)
- [ ] Spinner no envio do formulário e botão de enviar desabilitado durante o envio (implementado e coberto por teste; falta confirmar com `npm test`)

### 3.3 Integração com GitHub

- [x] Projetos vêm da API do GitHub, sem cadastro manual
- [x] Card mostra descrição, linguagem e data da última atualização
- [x] Tratamento do limite de requisições (403/429), com mensagem específica

### 3.4 Formulário de contato

- [ ] Validação por campo com mensagem específica (formulário em `/contato` e testes escritos na Parte A; falta rodar)
- [x] Mensagem enviada por e-mail ao dono **e** salva no banco para o dashboard (confirmado: chegou ao Supabase e ao e-mail)
- [x] Feedback de sucesso e de erro

### 3.5 Dashboard do dono

- [ ] Login obrigatório, com redirecionamento (implementado na `feature/auth-and-dashboard`; falta testar)
- [ ] Lista de mensagens com "marcar como respondida" (implementado; falta testar)
- [ ] Seleção de projetos em destaque na home (painel + seção "Em destaque" na Home; falta testar)

### 3.6 Preferências do visitante

- [x] Tema claro/escuro persistido entre visitas (botão no cabeçalho; `localStorage`; sem clarão ao recarregar)

### 3.7 Interface

- [ ] Responsivo, testado em celular e desktop
- [x] Componentes reaproveitados (`Button`, `ButtonLink`, `GlassCard` e estilos centralizados em `buttonStyles`)
- [x] Identidade visual própria (paleta + glassmorphism, ver 6.1)
- [ ] (opcional na atividade) Elemento 3D interativo na home: **não será implementado** por causa do prazo (D21)

### 3.8 Performance

- [ ] Lighthouse **mobile ≥ 80** (medido no site publicado)
- [ ] Imagens otimizadas e com `loading="lazy"`
- [ ] Dashboard e cena 3D com lazy loading (páginas já carregadas com `React.lazy`; dashboard e 3D ainda não existem)
- [ ] Sem layout shift (cards e skeletons com altura fixa; falta conferir no Lighthouse)
- [ ] Sem requisições repetidas ao GitHub ao navegar (`staleTime` de 10 min; confirmar na aba Network)

### 3.9 Testes

- [ ] Validação do formulário (testes do schema e do formulário escritos na Parte A; falta rodar)
- [ ] Bloqueio do dashboard sem login (teste do `ProtectedRoute` escrito; falta rodar)

### 3.10 Deploy

- [x] URL pública (https://cp3webdev.vercel.app/)
- [x] Deploy automático a cada push na `main`
- [x] As seis variáveis `VITE_*` (GitHub, Supabase e EmailJS) cadastradas na Vercel, com Redeploy; formulário e e-mail testados no site publicado

### 3.11 Versionamento

- [x] Commits no padrão Conventional Commits, **validados automaticamente** (commitlint + Husky)
- [x] Estratégia de branches definida (GitHub Flow, seção 8)
- [ ] Padrões descritos no README (README gerado com nomenclatura, commits e branches; falta commitar)

### 3.12 Arquitetura e padronização

- [x] Estrutura de pastas com responsabilidades claras
- [ ] Componentes pequenos, lógica separada da apresentação (acompanhar a cada feature)
- [ ] Convenções de nomenclatura no README (já documentadas aqui)
- [x] Lint e formatação automáticos antes de cada commit

### 3.13 Repositório

- [ ] Público, com histórico distribuído ao longo do prazo
- [x] `.env` ignorado pelo Git e `.env.example` criado
- [ ] README com sobre o projeto, tecnologias e como rodar (README e `supabase/schema.sql` gerados; copiar para o repositório na branch `docs/final-readme`)

## 4. Stack e justificativas

Cada linha traz as alternativas comparadas, o critério e o que se aceita perder (material da parte 2 do vídeo).

| Área                                 | Escolha                                                  | Alternativas comparadas                      | Critério                                                                       | O que aceitamos perder                                                   |
| ------------------------------------ | -------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| Build/Framework                      | **Vite + React + TypeScript**                            | Next.js, Create React App                    | A atividade pede React; SPA simples, build rápido, deploy trivial na Vercel    | SSR e SEO nativo do Next.js                                              |
| Versão do TypeScript                 | **5.x (fixada)**                                         | TypeScript 7 (veio no template)              | `typescript-eslint` só aceita versões abaixo da 6.1 (D1)                       | Recursos novos da versão 7                                               |
| Rotas                                | **React Router**                                         | TanStack Router, wouter, Next.js             | Padrão de mercado, lazy loading por rota, documentação abundante               | Tipagem de rotas mais fraca que a do TanStack Router                     |
| Dados/cache                          | **TanStack Query**                                       | SWR, `useState` + `useEffect`                | Cache, loading e erro prontos; evita requisições repetidas ao GitHub           | Mais uma dependência                                                     |
| Formulário                           | **React Hook Form + Zod**                                | Validação manual, Formik + Yup               | Validação por campo, schema reaproveitável nos testes                          | Curva de aprendizado inicial                                             |
| Backend/Auth/DB                      | **Supabase**                                             | Firebase, Appwrite, PocketBase, Node próprio | Auth + Postgres + RLS prontos, plano gratuito, sem servidor para manter        | Dependência de serviço externo                                           |
| E-mail                               | **EmailJS**                                              | Formspree, backend próprio                   | Envio direto do front, sem servidor                                            | Chave pública exposta no front (mitigar restringindo domínios no painel) |
| Estado global                        | **Context API** (tema, auth)                             | Zustand, Redux Toolkit                       | Estado pequeno; zero dependência extra                                         | Menos ferramentas de debug                                               |
| Estilo                               | **Tailwind CSS v4**                                      | CSS Modules, MUI, shadcn/ui                  | Velocidade, bundle enxuto, tema escuro por classe, tokens de cor centralizados | Classes longas no JSX                                                    |
| 3D (opcional, não implementado: D21) | **React Three Fiber + drei** (lazy)                      | Three.js puro, Spline                        | Integra com React, controle fino de peso                                       | Bundle pesado, mitigado com lazy loading                                 |
| Testes                               | **Vitest + Testing Library**                             | Playwright                                   | Integra com Vite, rápido, suficiente para os 2 testes exigidos                 | Sem teste E2E em navegador real                                          |
| Qualidade                            | **ESLint + Prettier + Husky + lint-staged + commitlint** | Biome                                        | Ecossistema maduro, padrão pedido pela atividade                               | Mais arquivos de configuração                                            |
| Deploy                               | **Vercel**                                               | Netlify, Hostinger                           | Exigido na entrega; deploy automático por push; detecta Vite sozinha           | Lock-in leve                                                             |

**Instalados:** `react-router-dom`, `@tanstack/react-query`, `react-hook-form`, `zod`, `@hookform/resolvers`, `@supabase/supabase-js`, `@emailjs/browser`, `tailwindcss`, `@tailwindcss/vite`, `vitest`, `jsdom`, `@testing-library/*`, ESLint, Prettier, Husky, lint-staged, commitlint.

**Ainda não instalados:** React Three Fiber (3D opcional, fora do escopo por prazo).

## 5. Arquitetura

### 5.1 Estrutura de pastas

```
src/
├── components/        # UI genérica e reutilizável: Button, ButtonLink, buttonStyles, Field, fieldStyles, GlassCard, Layout, PageLoader, Spinner
├── features/          # Organização por funcionalidade
│   ├── projects/
│   │   ├── components/   # ProjectCard, ProjectCardSkeleton, ProjectList, ProjectDetailSkeleton
│   │   ├── hooks/        # useProjects, useProject, shouldRetry
│   │   └── services/     # githubApi (chamadas à API do GitHub e erros tipados)
│   ├── contact/       #   ContactForm, schema (Zod), testes e services/contactService (Supabase + EmailJS)
│   ├── dashboard/     #   MessageList, FeaturedSelector, hooks e services de mensagens (página carregada sob demanda, só após o login)
│   ├── auth/          #   AuthContext, AuthProvider, useAuth, LoginForm, loginSchema, ProtectedRoute e teste
│   └── theme/         #   ThemeContext, ThemeProvider, ThemeToggle, useTheme
├── pages/             # Uma por rota: Home, ProjectDetail, Contact, NotFound, ApiError (e Login, Dashboard)
├── hooks/             # Hooks genéricos (ex.: useLocalStorage)
├── services/          # Clientes de serviços externos genéricos (supabaseClient)
├── lib/               # Utilitários puros: config, formatDate, safeUrl, queryClient
├── types/             # Tipos compartilhados: project.ts
├── tests/             # Configuração dos testes (setup.ts)
├── App.tsx            # Rotas
├── index.css          # Tailwind, tokens de tema e de cor, glassmorphism
└── main.tsx           # Providers (Theme, QueryClient, Router)
```

Pastas vazias contêm um `.gitkeep` (o Git não guarda pastas vazias). Remover o `.gitkeep` quando a pasta receber o primeiro arquivo real.

Arquivos de configuração na raiz: `eslint.config.js`, `.prettierrc`, `.prettierignore`, `.lintstagedrc.json`, `commitlint.config.js`, `.gitattributes`, `.husky/`, `vite.config.ts`, `vercel.json`, `.env.example`, `.vscode/`.

### 5.2 Critério de divisão de componentes

- `components/`: **sem** conhecimento de negócio nem de API; recebem tudo por props.
- `features/`: tudo de uma funcionalidade fica junto (componente, hook, serviço, schema). Mudar uma funcionalidade mexe numa pasta só.
- `pages/`: apenas compõem features e definem o layout da rota; sem lógica de dados.
- **Regra de ouro:** componente não chama `fetch`/Supabase diretamente. Chamadas ficam em `services/` e são consumidas por hooks (`useX`) que usam TanStack Query.
- `src/services/` é só para clientes **genéricos** de serviços externos (Supabase, EmailJS). O serviço específico de uma funcionalidade fica dentro da própria feature.

### 5.3 Fluxo de dados

```
Componente → hook (TanStack Query) → service → API (GitHub / Supabase / EmailJS)
                 ↑ cache, loading, erro, vazio
```

### 5.4 Caminho de uma alteração até o deploy

```
git checkout -b feature/x → commits (lint-staged + commitlint rodam no commit)
→ push → Pull Request → merge na main → Vercel publica automaticamente
```

## 6. Convenções de código

| Item               | Convenção                                                  |
| ------------------ | ---------------------------------------------------------- |
| Componentes        | `PascalCase`, um por arquivo (`ProjectCard.tsx`)           |
| Hooks              | `camelCase` começando com `use` (`useProjects.ts`)         |
| Serviços           | `camelCase` terminando em `Api`/`Service` (`githubApi.ts`) |
| Funções/variáveis  | `camelCase`                                                |
| Constantes globais | `UPPER_SNAKE_CASE`                                         |
| Tipos/Interfaces   | `PascalCase` (`Project`, `ContactMessage`)                 |
| Pastas             | minúsculas, `kebab-case` quando composto                   |
| Testes             | `NomeDoArquivo.test.tsx`                                   |

Regras adicionais:

- TypeScript estrito; **proibido** `any` sem justificativa em comentário.
- Componentes pequenos (referência: até ~100 linhas). Passou disso, dividir.
- Todo componente que consome API trata **loading, erro e vazio**.
- Imagens sempre com `width`/`height` e `loading="lazy"` (exceto a principal acima da dobra).
- Links externos: `target="_blank"` sempre com `rel="noopener noreferrer"`; endereços de terceiros passam por `safeUrl`.
- Valores vindos da URL do navegador são codificados com `encodeURIComponent` ao entrar em chamadas de API.
- Sem `console.log` esquecido.
- Um arquivo que exporta componente não exporta hook nem constante (regra `react-refresh`); por isso o tema tem 4 arquivos.

**Formatação (Prettier):** sem ponto e vírgula, aspas simples, vírgula final (`all`), largura de 100 colunas. A formatação automática elimina discussões de estilo. O ESLint acha erros e o Prettier formata (`eslint-config-prettier` desliga as regras de estilo do ESLint que conflitariam).

### 6.1 Identidade visual

**Paleta**

| Cor       | Hex       | Uso                                                 |
| --------- | --------- | --------------------------------------------------- |
| Preto     | `#0A0A0A` | Destaque; fundo no tema escuro; texto no tema claro |
| Branco    | `#FFFFFF` | Texto no tema escuro; fundo no tema claro           |
| Laranja   | `#FF6A13` | Botão principal e destaques                         |
| Rosa bebê | `#FFC1D9` | Botão secundário, badges e detalhes                 |

Justificativa (acessibilidade e nota do Lighthouse): texto **preto** sobre laranja tem contraste ~7:1; **branco** sobre laranja fica ~2,9:1, abaixo do mínimo de 4,5:1. Regra: texto sobre laranja e rosa é **sempre preto**. Laranja não é cor de texto sobre fundo claro (por isso o "404" usa `text-foreground dark:text-brand-orange`).

Implementação: tokens em `src/index.css` (Tailwind v4). Cores que mudam com o tema: `bg-background`, `bg-surface`, `text-foreground`, `text-muted`, `border-line`. Cores da marca: `bg-brand-orange`, `bg-brand-pink`. **Proibido** cor hardcoded nos componentes. Cor semântica de erro: `text-danger` e `border-danger` (`#B91C1C` no tema claro, `#F87171` no escuro), ambas com contraste ≥ 4,5:1; usada nas mensagens de validação. Cor semântica de sucesso: `text-success` e `border-success` (`#15803D` no claro, `#4ADE80` no escuro), usada na confirmação de envio.

**Tema escuro** por classe (`<html class="dark">`), via `@custom-variant dark`. Um script no `index.html` aplica o tema salvo (ou o do sistema, na primeira visita) antes da renderização.

**Glassmorphism** (utilitário `glass`, camada `.ambient`, componente `GlassCard`):

- Blur máximo de 16px; vidro apenas em cartões e no cabeçalho; **nunca aninhar** elementos com vidro.
- Fundo ambiente com gradientes radiais (barato), nunca `filter: blur` grande.
- Texto sobre vidro com contraste mínimo de 4,5:1.
- Todo elemento de vidro usa `glass` junto com `border` e um arredondamento (`rounded-2xl`).
- Fallback sólido sem suporte a `backdrop-filter` e com `prefers-reduced-transparency`.
- Animações respeitam `prefers-reduced-motion` (`motion-safe` / `motion-reduce`).

## 7. Variáveis de ambiente

`.env` nunca é commitado. O `.env.example` lista:

```
VITE_GITHUB_USERNAME=
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

O Vite só lê o `.env` ao iniciar: **reiniciar o `npm run dev`** após alterá-lo. A Vercel **não lê o `.env` local**: toda variável precisa ser cadastrada em _Settings → Environment Variables_ (todos os ambientes) e o deploy refeito. Nunca usar chaves `service_role`/`secret` do Supabase no front. `VITE_SUPABASE_URL` é `https://<id-do-projeto>.supabase.co` (nunca o endereço do painel `supabase.com/dashboard/...`, que causa `ERR_FAILED`) e a chave pública é a `anon`/`publishable`.

## 8. Git

### 8.1 Estratégia de branches: GitHub Flow

- `main`: sempre estável e publicável; **cada push dispara o deploy**.
- Cada funcionalidade em branch própria, aberta a partir da `main` **atualizada** (`git checkout main` + `git pull`) e integrada por Pull Request. Não criar a próxima branch antes de mesclar a anterior.
- Nomes: `feature/<nome>`, `fix/<nome>`, `chore/<nome>`, `docs/<nome>`, `test/<nome>`, `perf/<nome>`.
- Justificativa: fluxo simples para projeto individual, com PR como registro de cada mudança. Aceitamos perder as branches de release/hotfix do Git Flow.
- Exceção registrada (D2): o setup inicial entrou direto na `main`.

### 8.2 Commits: Conventional Commits

Formato: `tipo(escopo opcional): descrição no imperativo, em português`

Tipos permitidos: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.

Exemplos:

```
feat: adiciona validação do formulário de contato
feat(dashboard): protege rota com redirecionamento para login
fix(projects): trata limite de requisições da API do GitHub
test(contact): cobre mensagens de erro por campo
perf(home): carrega cena 3D sob demanda
docs: atualiza CLAUDE.md com a paleta de cores
```

Regras: um assunto por commit; commits pequenos e frequentes; a IA **sempre** sugere a mensagem no padrão, separadamente. A regra `subject-case` do commitlint está desligada (D4).

### 8.3 Ordem das branches

1. ✅ Setup inicial: Vite, TypeScript, ESLint, Prettier, Husky, lint-staged, commitlint (direto na `main`)
2. ✅ Tailwind CSS
3. ✅ `chore/folder-structure`: estrutura de pastas, `.env.example`, `vercel.json`
4. ✅ `feature/routing-and-layout`: paleta, glassmorphism, React Router, rotas, 404, erro de API
5. ✅ `feature/theme-toggle`
6. ✅ `feature/github-projects`: API do GitHub, cache, cards, skeleton, erro e vazio
7. ✅ `feature/project-detail`: serviço movido para a feature, página de detalhe com dados reais
8. ✅ `feature/contact-form`: validação, formulário, testes, Supabase e EmailJS (falta mesclar o PR)
9. 🔄 `feature/auth-and-dashboard`: login, rota protegida, mensagens com "marcar como respondida" e projetos em destaque
10. ~~`feature/3d-hero`~~ (opcional na atividade, fora do escopo por prazo)
11. `test/critical-flows`
12. `perf/lighthouse-tuning`
13. `docs/final-readme`
14. (melhoria, se sobrar tempo) `feature/error-boundary`: proteção de erro em volta das páginas carregadas sob demanda

## 9. Qualidade e testes

- Scripts em uso: `dev`, `build`, `lint`, `format`, `preview`, `prepare`, `test` (`vitest run`) e `test:watch`.
- Testes ficam ao lado do arquivo (`*.test.ts` / `*.test.tsx`); a configuração fica em `src/tests/setup.ts`. Vitest com `jsdom`, imports explícitos de `vitest` (sem globals) e `cleanup` automático no setup.
- **pre-commit (Husky):** `lint-staged` roda ESLint e Prettier só nos arquivos do commit.
- **commit-msg (Husky):** `commitlint` valida a mensagem.
- Os arquivos de `.husky/` precisam estar em **LF**; o `.gitattributes` garante isso no Windows.
- **CI (GitHub Actions):** `lint` → `test` → `build` em PRs (a criar).
- **Testes obrigatórios:**
  1. Formulário: e-mail inválido, mensagem curta, campos obrigatórios, botão desabilitado durante o envio.
  2. Dashboard: usuário não autenticado é redirecionado para `/login`.
- O `npm run build` local passando **não garante** o deploy: todo arquivo importado precisa estar commitado (conferir com `git status` antes do push).
- **Teste manual de erro de API:** DevTools (`F12`) → ⋮ → More tools → **Request conditions** → adicionar `api.github.com` com ação **Block**. Abrir a Home ou o link direto de um projeto: deve aparecer o cartão de erro com "Tentar novamente"; ao desbloquear e clicar no botão, os dados voltam.
- **Não usar o modo Offline** para esse teste: ele bloqueia também os arquivos JS das páginas (carregados com `React.lazy`) e a tela fica vazia. Isso revelou uma fragilidade real, registrada na seção 3.2 (Error Boundary).

## 10. Performance (como atingir Lighthouse ≥ 80 mobile)

- Dividir por rota com `React.lazy`; Dashboard e cena 3D fora do bundle inicial.
- Fontes com `font-display: swap` e poucas famílias.
- Imagens em WebP/AVIF, dimensionadas, com `lazy`.
- Skeletons e cards com altura fixa (`h-56`); reservar espaço do canvas 3D (evita layout shift).
- `staleTime` de 10 min no TanStack Query para o GitHub; a página de detalhe reaproveita o cache da lista.
- Glassmorphism barato: blur ≤ 16px, vidro só em cartões e cabeçalho, fundo com gradientes.
- Se a nota ficar abaixo de 80: analisar o bundle (`rollup-plugin-visualizer`), reduzir o 3D no mobile ou carregá-lo só após interação/idle.
- **Medir no site publicado** (PageSpeed Insights, modo mobile) e registrar a nota no README.

## 11. Harness de IA (para a parte 3 do vídeo)

Itens que devem estar **versionados no repositório**:

| Item                    | Arquivo/local                                                        | Para que serve                                                           |
| ----------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Instruções do projeto   | `CLAUDE.md` (este arquivo)                                           | A IA lê arquitetura, convenções, commits e branches antes de cada tarefa |
| Convenções para humanos | `README.md`                                                          | As mesmas regras, para quem abre o repositório                           |
| Guardrails automáticos  | `eslint.config.js`, `.prettierrc`, `commitlint.config.js`, `.husky/` | Mesmo que a IA erre, o hook bloqueia código ou commit fora do padrão     |
| Configuração do editor  | `.vscode/settings.json`, `.vscode/extensions.json`                   | Formata ao salvar e recomenda as extensões                               |
| Skills (opcional)       | `.claude/skills/`                                                    | Receitas repetíveis (ex.: "criar feature nova")                          |
| MCPs (opcional)         | `.mcp.json`                                                          | Ex.: GitHub, para ler issues e PRs                                       |
| Agentes (opcional)      | `.claude/agents/`                                                    | Ex.: revisor de PR que confere o checklist da seção 3                    |

Preencher quando definido:

- **Ferramenta e modelo usados:** Claude (chat web) para planejar e gerar código; _confirmar modelo e justificar a escolha_
- **Skills configuradas:** `______`
- **MCPs configurados:** `______`
- **Agentes configurados:** `______`

Como o conjunto força os padrões: (1) a IA lê este arquivo → (2) gera código e commit no padrão → (3) hooks e CI rejeitam o que fugir → (4) o PR é conferido contra o checklist da seção 3 → (5) a regra da seção 0 mantém este arquivo alinhado ao código.

Evidências reais do harness funcionando (usar no vídeo):

- O commit foi **bloqueado** pelo lint-staged quando o Prettier não estava instalado, e mensagens fora do padrão são recusadas pelo commitlint.
- Um arquivo importado (`queryClient.ts`) estava só na máquina local: a conferência do `git status` e do `git ls-files` pegou o problema antes de quebrar o deploy.

## 12. Decisões tomadas durante o projeto

| #   | Decisão                                                                                                                                                                                                                                                                                    | Motivo                                                                                                                                                                                                                                                                              | O que aceitamos perder                                                                                            |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| D1  | Fixar **TypeScript 5** (`npm install -D typescript@5`)                                                                                                                                                                                                                                     | O template trouxe o TS 7.0.2 e o `typescript-eslint` exige versão abaixo da 6.1; o npm abortou com `ERESOLVE`. Evitamos `--force` porque esconde o conflito                                                                                                                         | Recursos da versão 7                                                                                              |
| D2  | Setup inicial **direto na `main`**; branch renomeada de `chore/setup-project` para `main`                                                                                                                                                                                                  | O repositório estava vazio, então o primeiro push criou a única branch como padrão e não havia base para um PR                                                                                                                                                                      | Um PR para o setup inicial                                                                                        |
| D3  | **Tailwind v4** com `@tailwindcss/vite`, sem `tailwind.config.js`                                                                                                                                                                                                                          | Configuração mínima; tokens com `@theme` no próprio CSS                                                                                                                                                                                                                             | Plugins antigos que exigem config em JS                                                                           |
| D4  | `subject-case` do commitlint **desligado**                                                                                                                                                                                                                                                 | Descrições em português: a regra padrão bloqueia caixas válidas                                                                                                                                                                                                                     | Verificação de caixa da descrição                                                                                 |
| D5  | `.gitattributes` com `.husky/* text eol=lf`                                                                                                                                                                                                                                                | No Windows, CRLF nos hooks causa falha ao executar                                                                                                                                                                                                                                  | Nenhuma relevante                                                                                                 |
| D6  | `vercel.json` com rewrite de todas as rotas para `/index.html`                                                                                                                                                                                                                             | Numa SPA, abrir ou atualizar `/projetos/x` daria 404 do servidor; assim o React Router decide a página                                                                                                                                                                              | Nenhuma relevante                                                                                                 |
| D7  | Estrutura **por funcionalidade** (`features/`) com `components/` só para UI genérica                                                                                                                                                                                                       | Alterar uma funcionalidade mexe numa pasta só; facilita explicar no vídeo                                                                                                                                                                                                           | Estrutura um pouco maior que a por tipo de arquivo                                                                |
| D8  | Paleta preto/branco/laranja/rosa bebê; texto preto sobre laranja e rosa                                                                                                                                                                                                                    | Contraste mínimo 4,5:1 (acessibilidade e Lighthouse)                                                                                                                                                                                                                                | Texto branco sobre botões coloridos                                                                               |
| D9  | Tema escuro por classe CSS (`dark`) e não só por `prefers-color-scheme`                                                                                                                                                                                                                    | Permite escolha manual persistida (requisito 6)                                                                                                                                                                                                                                     | Um pouco mais de código                                                                                           |
| D10 | Rotas com `BrowserRouter` + `<Routes>` e `React.lazy` + `Suspense` dentro do `Layout`                                                                                                                                                                                                      | Simples de explicar, divide por rota (um arquivo JS por página) e mantém o cabeçalho na tela durante o carregamento. Alternativa: `createBrowserRouter`                                                                                                                             | Loaders e actions do router de dados (o TanStack Query cobre a busca de dados)                                    |
| D11 | Glassmorphism com utilitário `glass` + `GlassCard` + fundo ambiente em gradientes radiais                                                                                                                                                                                                  | Identidade visual desejada; gradiente é barato e protege o Lighthouse mobile; vidro limitado a cartões e cabeçalho                                                                                                                                                                  | Efeito de vidro em áreas grandes e vários níveis de transparência                                                 |
| D12 | Tema com **Context + `localStorage`**, aplicado por script inline no `index.html` antes da renderização; primeira visita segue o sistema, a escolha manual passa a prevalecer                                                                                                              | O script evita o clarão de tema errado e o salto visual; salvar só no clique preserva a preferência do sistema. Alternativas: Zustand, biblioteca de tema                                                                                                                           | Um script inline no `<head>` e o contexto dividido em arquivos por causa da regra `react-refresh`                 |
| D13 | Integração com o GitHub via `fetch` em `githubApi.ts` + **TanStack Query** (`staleTime` 10 min); erros tipados (`rate_limit`, `not_found`, `network`, `config`); forks e arquivados ocultos; ordem por atualização recente                                                                 | Cache e estados prontos evitam requisições repetidas (3.8); erros tipados permitem mensagens específicas e tratam o limite da API (3.3); ocultar forks mantém só trabalho próprio. Alternativas: SWR, `useEffect` manual, axios                                                     | Dados com até 10 min de atraso; API sem autenticação limita a 60 req/hora por IP (mitigado pelo cache)            |
| D14 | Card e skeleton com **altura fixa** (`h-56`) e descrição em 3 linhas; card inteiro clicável por um único link no título; estilos de botão centralizados em `buttonStyles`                                                                                                                  | Altura igual evita salto de layout (CLS); um link por card melhora leitores de tela; um só lugar de estilo garante reaproveitamento (3.7). Alternativas: altura variável, `<a>` envolvendo o card                                                                                   | Cards com altura uniforme (texto longo é cortado)                                                                 |
| D15 | Página de detalhe usa o cache da lista como `initialData` (com `initialDataUpdatedAt`); `slug` codificado com `encodeURIComponent`; 404 reaproveitada quando o repositório não existe; links externos validados por `safeUrl` e com `rel="noopener noreferrer"`                            | Abrir um card sem nova requisição respeita o cache e economiza o limite de 60 req/hora; o slug vem da URL do navegador e não pode alterar o caminho da API; o campo "site" é escrito por terceiros e pode conter protocolos perigosos                                               | Um hook a mais e dois utilitários; detalhe pode ter até 10 min de atraso                                          |
| D16 | Serviço `githubApi` dentro de `features/projects/services/`; `src/services/` reservada a clientes externos genéricos                                                                                                                                                                       | Mantém tudo de uma funcionalidade junto (D7) e deixa o critério de divisão fácil de explicar                                                                                                                                                                                        | Nenhuma relevante                                                                                                 |
| D17 | Validação com **Zod + React Hook Form** (`mode: 'onTouched'`); o schema é a única fonte das regras e das mensagens; `ContactForm` recebe o envio por props (`onSubmit`) em vez de chamar serviços; formulário com `noValidate` e mensagens próprias                                        | Uma fonte de regras reaproveitada no formulário e nos testes; mensagem específica por campo (3.4); validar ao sair do campo evita erro prematuro; receber `onSubmit` por props separa apresentação de dados e permite testar sem rede. Alternativas: validação manual, Formik + Yup | Duas dependências a mais; limites repetidos no banco (SQL) por segurança                                          |
| D18 | Cor semântica `danger` para erros, definida nos temas claro e escuro                                                                                                                                                                                                                       | Evita cor hardcoded e garante contraste ≥ 4,5:1 nos dois temas                                                                                                                                                                                                                      | Mais um token a manter                                                                                            |
| D19 | Envio do contato: o **banco é salvo primeiro** e o e-mail (EmailJS) é só um aviso; falha no e-mail não invalida o envio; diagnóstico só em desenvolvimento (`console.error` com `import.meta.env.DEV`); o template do e-mail usa apenas `{{name}}`, `{{email}}` e `{{message}}`            | A mensagem nunca se perde: se o EmailJS cair, ela continua no dashboard; variáveis de template inexistentes chegam vazias. Alternativas: e-mail primeiro, ou função no servidor                                                                                                     | A chave pública do EmailJS fica exposta no front (mitigada restringindo domínios e pelo limite do plano gratuito) |
| D20 | Cor semântica `success` para confirmações, definida nos temas claro e escuro                                                                                                                                                                                                               | Mesmo critério da D18: sem cor hardcoded e contraste ≥ 4,5:1                                                                                                                                                                                                                        | Mais um token a manter                                                                                            |
| D21 | **3D opcional não implementado**                                                                                                                                                                                                                                                           | A atividade trata o 3D como opcional; o prazo é 03/11 e o 3D é o item mais pesado para o Lighthouse mobile. Prioridade: login, dashboard, README e vídeo                                                                                                                            | Elemento visual de impacto na home                                                                                |
| D22 | Autenticação com **Supabase Auth** (e-mail e senha) em um Context (`AuthProvider`); `ProtectedRoute` como rota-layout que redireciona para `/login` guardando a origem; a página do painel é carregada com `React.lazy` e só é baixada depois do login; cache de mensagens é limpo ao sair | O login e as regras de acesso já existem no Supabase, sem servidor próprio; a rota-layout protege várias páginas futuras; o chunk do painel não entra no pacote inicial (3.8). **A proteção real está nas regras do banco (RLS)**: o redirecionamento só melhora a experiência      | Sem recuperação de senha nem papéis de usuário; depende de o cadastro de novos usuários estar desligado           |
| D23 | Projetos em destaque guardados na tabela `featured_projects` (só o `slug`); a Home mostra a seção "Em destaque" antes dos demais; falha ao ler os destaques não quebra a lista (`retry: false`, trata como vazio)                                                                          | Um dado pequeno e público, editável só por quem está logado (RLS); a Home continua funcionando se o Supabase cair                                                                                                                                                                   | Destaques com até alguns segundos de atraso; sem ordem manual entre destaques                                     |
| D24 | Variáveis `VITE_*` mantidas com o prefixo na Vercel (tipo **Config**, não sensível), apesar do aviso da plataforma; nunca cadastrar chaves `secret` ou `service_role`; o nome da variável deve corresponder ao tipo do ID (`service_...` em `SERVICE_ID`, `template_...` em `TEMPLATE_ID`) | O Vite só lê no navegador o que tem o prefixo `VITE_`; todas as seis são públicas por natureza (a proteção do banco está na RLS). Um valor no campo errado fez o e-mail não sair pelo site                                                                                          | Os valores ficam visíveis no código do navegador                                                                  |
| D25 | Esquema do banco versionado em `supabase/schema.sql` e README com as instruções                                                                                                                                                                                                            | Quem clonar o projeto consegue recriar as tabelas e as regras de segurança sem depender de memória                                                                                                                                                                                  | Um arquivo a manter junto com o banco                                                                             |

## 13. Pendências que dependem da dona (a IA deve pedir antes de usar)

- [x] Usuário do GitHub: `Larabeatriz08`
- [x] `VITE_GITHUB_USERNAME` e as demais variáveis cadastradas na Vercel
- [ ] Nome completo, título/cargo e texto de apresentação para a home
- [x] E-mail que receberá as mensagens do formulário (configurado no painel do EmailJS, não no código)
- [x] Campos do formulário: nome, e-mail e mensagem (proposta aceita)
- [x] Contas e chaves: Supabase e EmailJS criados e no `.env` local. **Não colar as chaves no chat**
- [ ] Links de redes (LinkedIn, etc.), se desejar exibir
- [ ] Definir ferramenta, modelo, skills, MCPs e agentes do harness (seção 11)
- [ ] Confirmar o usuário do dashboard criado em **Supabase → Authentication → Users** e o cadastro de novos usuários **desligado**
- [ ] Confirmar se o repositório está **público**

## 14. Registro de mudanças

| Data       | Etapa / branch                    | Mudança                                                                                                                                                                                         | Seções alteradas                                          |
| ---------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| 01/11/2026 | Setup inicial                     | Vite + React + TS, ESLint, Prettier, Husky, lint-staged, commitlint; deploy na Vercel                                                                                                           | 3.10, 3.11, 3.12, 4, 9, 12 (D1, D2, D4, D5)               |
| 01/11/2026 | Tailwind                          | Tailwind v4, remoção do CSS do template                                                                                                                                                         | 4, 10, 12 (D3)                                            |
| 01/11/2026 | `chore/folder-structure`          | Estrutura de pastas, `.env.example`, `vercel.json`, limpeza do template                                                                                                                         | 3.12, 3.13, 5, 7, 12 (D6, D7)                             |
| 01/11/2026 | `feature/routing-and-layout`      | Paleta, glassmorphism, React Router com rotas `/`, `/projetos/:slug`, `/erro` e 404; lazy loading por página                                                                                    | 3.1, 3.7, 3.8, 6.1, 12 (D8–D11)                           |
| 01/11/2026 | `feature/theme-toggle`            | ThemeProvider, useTheme, ThemeToggle, script de tema no `index.html`, ajuste do 404                                                                                                             | 3.6, 6.1, 12 (D9, D12)                                    |
| 01/11/2026 | `feature/github-projects`         | Serviço do GitHub, hook com cache, cards, skeleton, estados de erro e vazio, Button reaproveitável                                                                                              | 3.2, 3.3, 3.8, 5.1, 12 (D13, D14)                         |
| 01/11/2026 | `feature/project-detail`          | Serviço movido para `features/projects/services`; useProject com cache da lista; safeUrl; ApiError com nova tentativa; página de detalhe com dados reais; CLAUDE.md ressincronizado             | 0, 2, 3.1, 3.2, 5.1, 5.2, 12 (D15, D16), 13, 14           |
| 01/11/2026 | `feature/project-detail` (testes) | Erro de API testado com bloqueio de `api.github.com`; registrada a fragilidade do lazy loading offline (Error Boundary pendente); regra 12 sobre testes no DevTools                             | 2, 3.1, 3.2, 8.3, 9, 14                                   |
| 02/11/2026 | `feature/contact-form` (Parte A)  | Vitest e Testing Library; schema Zod; Field, Spinner e ContactForm com erro por campo e botão bloqueado; página `/contato` com envio provisório; testes do schema e do formulário; cor `danger` | 3.2, 3.4, 3.9, 4, 5.1, 6.1, 8.3, 9, 12 (D17, D18), 13, 14 |
| 02/11/2026 | `feature/contact-form` (Parte B)  | Cliente do Supabase, serviço de envio (banco primeiro, EmailJS como aviso), página `/contato`, cor `success`, template de e-mail; 3D marcado como opcional e não implementado                   | 3.2, 3.4, 3.7, 4, 5.1, 6.1, 7, 8.3, 12 (D19–D21), 13, 14  |
| 02/11/2026 | `feature/auth-and-dashboard`      | AuthProvider, ProtectedRoute (com teste), tela de login, painel com mensagens e "marcar como respondida", seletor de destaques e seção "Em destaque" na Home                                    | 3.5, 3.9, 5.1, 8.3, 12 (D22, D23), 13, 14                 |
| 02/11/2026 | Publicação e documentação         | Variáveis cadastradas na Vercel; correção do `.env` (Service ID no campo certo); README, `supabase/schema.sql` e roteiro do vídeo gerados                                                       | 3.10, 3.11, 3.13, 12 (D24, D25), 13, 14                   |

## 15. Roteiro do vídeo (máx. 8 min, rosto e tela visíveis)

| Tempo     | Parte                      | Conteúdo                                                                                                                                                          |
| --------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0:00–0:30 | Abertura                   | Quem sou, o que o site faz, demo rápida                                                                                                                           |
| 0:30–3:00 | **1. Stack e arquitetura** | Tecnologias e conexões; diagrama de pastas e fluxo de dados; critério de divisão dos componentes; caminho branch → PR → deploy                                    |
| 3:00–5:00 | **2. Justificativas**      | Para cada escolha: o que comparei, critério, o que aceitei perder (seções 4 e 12)                                                                                 |
| 5:00–7:30 | **3. Harness de IA**       | Ferramenta/modelo e por quê; mostrar `CLAUDE.md`, skills, MCPs, agentes e hooks no repositório; como isso faz a IA seguir arquitetura, código, commits e branches |
| 7:30–8:00 | Fechamento                 | Resultado (Lighthouse, deploy) e aprendizados                                                                                                                     |

Publicar no YouTube como **não listado** (feito pela dona).

## 16. Definição de pronto (antes de entregar)

- [ ] Todos os itens da seção 3 marcados
- [ ] `npm run lint`, `npm test` e `npm run build` passando
- [ ] Site publicado, com refresh funcionando em `/projetos/...`
- [ ] Lighthouse mobile ≥ 80 medido no site publicado
- [ ] Repositório público, sem `.env`, com `.env.example` e README completos
- [ ] Histórico de commits distribuído e no padrão
- [ ] Seções 11 e 13 preenchidas
- [ ] Vídeo gravado (≤ 8 min), não listado no YouTube
- [ ] Três links entregues no Teams até **03/11**
