# Documentação do Projeto

## Visão Geral
Este projeto, chamado **vite_react_shadcn_ts**, é uma aplicação web desenvolvida com Vite, React e TypeScript. Ele utiliza Tailwind CSS e shadcn-ui (Radix UI) para estilização, e integrações com Supabase para backend (autenticação, banco de dados e storage). A aplicação permite criar, editar e gerenciar promoções e designs de forma intuitiva.

## Tecnologias Utilizadas
- **Framework/Bundler**: Vite
- **Linguagem**: TypeScript
- **Biblioteca UI**: React ^18
- **Estilização**: Tailwind CSS, tailwind-merge, tailwindcss-animate
- **Componentes**: shadcn-ui (Radix UI) e class-variance-authority (CVA)
- **Gerenciamento de Estado/Fetch**: React Query (@tanstack/react-query)
- **Formulários**: React Hook Form + @hookform/resolvers
- **Validação de Esquemas**: Zod
- **Roteamento**: React Router DOM
- **Integrações Adicionais**: html2canvas, recharts, embla-carousel, input-otp, vaul, sonner
- **Backend como Serviço**: Supabase (@supabase/supabase-js)

## Instalação
1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPO>
   cd <NOME_DO_PROJETO>
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação em modo desenvolvimento:
   ```bash
   npm run dev
   ```

## Scripts Disponíveis
- `npm run dev` &rarr; Inicia o servidor de desenvolvimento.
- `npm run build` &rarr; Gera build de produção em `dist/`.
- `npm run build:dev` &rarr; Gera build em modo development.
- `npm run preview` &rarr; Inicia pré-visualização da build.
- `npm run lint` &rarr; Executa ESLint em todo o projeto.

## Estrutura de Pastas
```
/
├─ public/               # Arquivos estáticos (imagens, favicon, index.html)
├─ src/
│  ├─ pages/             # Páginas de rota (React Router DOM)
│  ├─ components/        # Componentes reutilizáveis (UI, Layout, Promo)
│  │  ├─ ui/             # Elementos básicos (Botões, Inputs, Cards)
│  │  ├─ layout/         # Header, Footer, Nav
│  │  └─ promo/          # Componentes específicos de promoções
│  ├─ lib/               # Configurações e utilitários (Supabase client, helpers)
│  ├─ hooks/             # Custom hooks
│  ├─ contexts/          # React Context Providers
│  ├─ integrations/      # Lógica de integração com APIs (Supabase, html2canvas etc.)
│  ├─ App.tsx            # Root da aplicação
│  └─ index.tsx          # Ponto de entrada
├─ supabase/             # Configuração do Supabase (project_id)
├─ vite.config.ts        # Configuração do Vite
├─ tailwind.config.ts    # Configuração do Tailwind CSS
├─ postcss.config.js     # Configuração do PostCSS
├─ tsconfig.json         # Configurações TypeScript
└─ package.json          # Dependências e scripts
```

## Rotas Principais
| Rota            | Componente   | Descrição                               |
|-----------------|--------------|-----------------------------------------|
| `/`             | `Index`      | Página inicial                          |
| `/login`        | `Login`      | Tela de login                           |
| `/register`     | `Register`   | Página de cadastro                      |
| `/dashboard`    | `Dashboard`  | Painel após autenticação                |
| `/create-promo` | `CreatePromo`| Criar nova promoção                     |
| `/my-designs`   | `MyDesigns`  | Listar designs do usuário               |
| `/profile`      | `Profile`    | Perfil e configurações do usuário       |
| `*`             | `NotFound`   | Página 404                              |

## Integrações
- **Supabase**: Autenticação, banco de dados e storage. ID do projeto configurado em `supabase/config.toml`:
  ```toml
  project_id = "gmtxviujpnmxjyvtjvsn"
  ```
- **html2canvas**: Captura de elementos HTML como imagem.
- **Recharts**: Gráficos e visualizações de dados.
- **Embla Carousel**: Carrossel de imagens/components.

## Deploy
1. Gere a build de produção:
   ```bash
   npm run build
   ```
2. Hospede a pasta `dist/` em um serviço de hosting estático (Netlify, Vercel, S3, etc.).

## Licença
Este projeto está licenciado sob a licença **MIT**. 