# STG Catalog

Aplicação de loja virtual desenvolvida como parte de um teste técnico. O projeto simula uma vitrine online com catálogo, carrinho, favoritos e checkout, além de integração com Supabase e WhatsApp.

## Contexto do Teste Técnico

Este repositório foi criado para um processo seletivo e traz, como diferencial, a documentação transparente do uso de Inteligência Artificial durante o desenvolvimento. Todas as etapas foram auxiliadas por ferramentas como ChatGPT e Codex, mas com curadoria e decisões finais feitas manualmente.

## Principais Funcionalidades

- Catálogo de produtos com busca e filtragem.
- Página de detalhes com galeria de imagens e informações técnicas.
- Carrinho persistente com cálculo de subtotal e frete.
- Lista de favoritos.
- Checkout com validação de formulário e envio de pedido via WhatsApp.
- Histórico de pedidos sincronizado com Supabase.

## Tecnologias Utilizadas

**Frontend**

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)

**Backend/Database**

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

```bash
# Clonar o repositório
git clone <url-do-repositorio>
cd stg-catalog

# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

Configure as variáveis de ambiente do Supabase em um arquivo `.env.local` antes de iniciar o servidor.

## Evidências Visuais

Inclua screenshots ou GIFs das principais telas (catálogo, detalhes, carrinho e checkout) na pasta `docs/` ou dentro de `public/`. Referencie-os nesta seção para enriquecer a apresentação do projeto.

## Considerações Finais

Este projeto demonstra domínio das tecnologias modernas de frontend e backend, aliado ao uso responsável de Inteligência Artificial para acelerar a entrega e manter alta qualidade. Agradeço a oportunidade de participar do processo seletivo e estou à disposição para esclarecimentos adicionais.