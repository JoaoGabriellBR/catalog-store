# STG Catalog

Aplicação de loja virtual desenvolvida como parte de um teste técnico. O projeto simula uma vitrine online com catálogo, carrinho, favoritos e checkout, além de integração com Supabase e WhatsApp.

## Contexto do Teste Técnico

Este repositório foi criado para um processo seletivo e traz, como diferencial, a documentação transparente do uso de Inteligência Artificial durante o desenvolvimento. Todas as etapas foram auxiliadas por ferramentas como ChatGPT e Codex, mas com curadoria e decisões finais feitas manualmente.

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

- [ChatGPT](https://chat.openai.com/) para brainstorming, geração de código e revisão textual
- [OpenAI Codex](https://openai.com/blog/openai-codex) para sugestões de snippets durante o desenvolvimento

## Como a IA foi Utilizada

1. **Criação e refinamento de prompts**: prompts iterativos foram usados para definir arquitetura, modelagem de dados e padrões de estilo.
2. **Geração de código otimizado**: componentes de UI, hooks e serviços foram inicialmente gerados pela IA e posteriormente revisados.
3. **Melhoria de UI/UX**: sugestões de microinterações, responsividade e acessibilidade.
4. **Correções de bugs**: análise de stack traces e propostas de correção imediata.
5. **Otimização de performance**: recomendações de memoização, lazy loading e redução de payloads.

A IA atuou como parceira de desenvolvimento, oferecendo alternativas e insights, enquanto a implementação final, testes e ajustes ficaram sob responsabilidade humana.

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

## Considerações Finais

Este projeto demonstra domínio das tecnologias modernas de frontend e backend, aliado ao uso responsável de Inteligência Artificial para acelerar a entrega e manter alta qualidade. Agradeço a oportunidade de participar do processo seletivo e estou à disposição para esclarecimentos adicionais.

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
