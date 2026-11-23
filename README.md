# MikaLIVE

Aplicação principal: `index.html` na raiz do repositório.

## Fonte oficial

- O `index.html` da raiz é a única entrada oficial e atual.
- CSS ativo: `assets/css/style.css`.
- Camada de dados: `assets/js/database.js`.
- Autenticação e sessão: `assets/js/auth.js`.
- Navegação: `assets/js/navigation.js`.
- Lógica principal e funcionalidades: `assets/js/app.js`.
- Ordem de carregamento: banco, autenticação, navegação, aplicação.
- `HTML/index.html` redireciona para a raiz; a versão anterior está em `archive/HTML-index-legacy.html`.

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
    app.js
    modules/                # módulos legados em migração
api/
archive/
HTML/
```

## Regra de atualização

1. A raiz define a versão oficial.
2. Atualize primeiro a implementação principal e depois migre a responsabilidade para o módulo correspondente.
3. Não carregue módulos legados em paralelo com os módulos ativos.
4. Migre uma responsabilidade por vez, mantendo IDs e contratos existentes, e valide no navegador antes de avançar.
5. CSS novo deve ficar em `assets/css/`.

## Estado da migração

- Banco de dados, autenticação/sessão e navegação foram separados da implementação principal preservando a lógica atual.
- Módulos antigos foram preservados em `assets/js/modules/` com prefixo `legacy-` quando existe módulo ativo correspondente.
- O token Google ainda é decodificado no navegador, sem validação criptográfica; validar no servidor antes de produção.
- A sincronização Supabase ainda usa e-mail/nome informado no cliente como identificador; implementar autenticação real e políticas RLS.
- A função de teste de comissão ainda insere dados na lista de comissões reais; não tratar como venda confirmada.
- O webhook precisa de assinatura obrigatória e persistência durável.
