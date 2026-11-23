# MikaLIVE

Aplicação principal: `index.html` na raiz do repositório.

## Fonte oficial

- O `index.html` da raiz é a única entrada oficial e atual.
- CSS ativo: `assets/css/style.css`.
- Camada de dados ativa: `assets/js/database.js`.
- Autenticação e sessão: `assets/js/auth.js`.
- Lógica principal da interface: `assets/js/app.js`.
- Os scripts carregam nesta ordem: banco, autenticação, aplicação.
- `HTML/index.html` redireciona para a raiz; a versão anterior foi preservada em `archive/HTML-index-legacy.html`.

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
    app.js
    modules/                # módulos legados em migração
api/
archive/
HTML/
```

## Regra de atualização

1. A raiz define a versão oficial.
2. Atualize primeiro a implementação principal e depois migre a responsabilidade para o módulo correspondente.
3. Não carregue módulos legados em paralelo com funções já definidas nos módulos ativos.
4. Migre uma responsabilidade por vez, mantendo IDs e contratos existentes, e valide no navegador antes de avançar.
5. CSS novo deve ficar em `assets/css/`.

## Estado da migração

- Banco de dados e autenticação/sessão foram separados da implementação principal preservando a lógica atual.
- Os módulos antigos foram preservados em `assets/js/modules/` com prefixo `legacy-` quando existe módulo ativo correspondente.
- O token Google ainda é apenas decodificado no navegador; isso não valida sua assinatura. Implementar validação server-side antes de produção.
- A sincronização Supabase ainda identifica usuários por e-mail/nome no cliente. Implementar autenticação real e políticas RLS antes de uso multiusuário.
- A função de teste de comissão ainda registra uma simulação na lista de comissões reais; não usar como confirmação de venda.
- O webhook precisa de assinatura obrigatória e persistência durável antes de produção.
