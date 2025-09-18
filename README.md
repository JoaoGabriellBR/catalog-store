# Catalog

Experiência de e-commerce completa, com catálogo, carrinho, favoritos e checkout, unindo Supabase e WhatsApp.

## Principais Funcionalidades

- Catálogo de produtos com busca e filtragem.
- Página de detalhes com galeria de imagens e informações técnicas.
- Carrinho persistente com cálculo de subtotal e frete.
- Lista de favoritos do usuário.
- Checkout com validação de formulário e envio de pedido via WhatsApp.
- Histórico de pedidos sincronizado com Supabase.

## Tecnologias Utilizadas

**Front-end**

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)

**Back-end/Banco de Dados**

- [Supabase](https://supabase.com/)

**Outros**

- [lucide-react](https://lucide.dev/) para ícones
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

**Ferramentas de IA**

- [ChatGPT](https://chat.openai.com/) para brainstorming.
- [OpenAI Codex](https://openai.com/blog/openai-codex) para revisões e sugestões de snippets durante o desenvolvimento.

## Como a IA foi Utilizada

1. **Criação e refinamento de prompts**: prompts iterativos foram usados para definir arquitetura, modelagem de dados e padrões de estilo.
2. **Melhoria de UI/UX**: sugestões de microinterações, responsividade e acessibilidade.
3. **Correções de bugs**: análise de stack traces e propostas de correção imediata.
4. **Otimização de performance**: recomendações de memoização, lazy loading e redução de payloads.
5. **Aprimoramento do código**: Revisão de acessibilidade, responsividade e segurança.

## Benefícios do Uso de IA

- Redução do tempo de desenvolvimento.
- Aumento da produtividade.
- Garantia de padrões de código e boas práticas.
- Inspiração para soluções criativas e escaláveis.

## Instalação e Execução

### 🔨 Guia de instalação

Clone o projeto

```bash
  git clone https://github.com/JoaoGabriellBR/stg-catalog-challenge.git
```

Entre no diretório do projeto

```bash
  cd stg-catalog-challenge
```

Instale as dependências

```bash
  npm install
```

Configure suas variáveis de ambiente em `.env.local` antes de iniciar o servidor.
   ```js
   NEXT_PUBLIC_SUPABASE_URL = 'ENTER YOUR SUPABASE URL';
   NEXT_PUBLIC_SUPABASE_ANON_KEY = 'ENTER YOUR SUPABASE ANON KEY';
   ```

Inicie o servidor

```bash
  npm run dev
```
## 🔗 Links

[![Deploy][Deploy]][Deploy-url]
[![Github][GitHub]][GitHub-url]

<!-- MARKDOWN LINKS & IMAGES -->
[Website]: https://img.shields.io/badge/site%20oficial-22C55E?style=for-the-badge
[Website-url]: https://up-write.vercel.app

[Deploy]: https://img.shields.io/badge/deploy-000?style=for-the-badge&logo=ko-fi&logoColor=white
[Deploy-url]: https://stg-catalog-challenge-two.vercel.app

[GitHub]: https://img.shields.io/badge/-Github-black.svg?style=for-the-badge&logo=github&colorB=blue
[GitHub-url]: https://github.com/JoaoGabriellBR/stg-catalog-challenge
