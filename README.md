# MikaLIVE

Aplicação principal: `index.html` na raiz do repositório.

## Fonte oficial

- O `index.html` da raiz é a única entrada oficial.
- CSS: `assets/css/style.css`.
- Camada de dados: `assets/js/database.js`.
- Autenticação/sessão: `assets/js/auth.js`.
- Navegação: `assets/js/navigation.js`.
- Ferramenta Shopee: `assets/js/shopee.js`.
- Funcionalidades restantes da interface: `assets/js/app.js`.
- Ordem: banco, autenticação, navegação, Shopee, aplicação.
- `HTML/index.html` redireciona para a raiz; versão anterior em `archive/HTML-index-legacy.html`.

## Estrutura

```text
index.html
assets/
  css/
    style.css
    legacy/
  js/
    database.js
    auth.js
    navigation.js
    shopee.js
    app.js
    modules/                # módulos legados em migração
api/
archive/
HTML/
```

## Regra de atualização

A raiz é a fonte oficial. Migre cada funcionalidade para seu módulo usando exatamente a implementação atual da raiz como referência. Não carregue módulos legados em paralelo. Teste no navegador antes de avançar.

## Estado da migração

- Banco, autenticação/sessão, navegação e geração de roteiro Shopee foram separados da aplicação principal preservando a lógica atual.
- Os módulos antigos foram preservados em `assets/js/modules/` com prefixo `legacy-`.
- O token Google ainda é decodificado no navegador, sem validação criptográfica; validar no servidor antes de produção.
- A sincronização Supabase ainda usa e-mail/nome do cliente como identificador; implementar autenticação real e políticas RLS.
- A função de teste de comissão ainda registra uma simulação na lista de comissões reais; não tratar como venda confirmada.
- O webhook precisa de assinatura obrigatória e persistência durável.
