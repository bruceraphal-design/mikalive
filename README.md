# MikaLIVE

Aplicação principal: `index.html` na raiz do repositório.

## Fonte oficial

- O `index.html` da raiz é a única entrada oficial e atual.
- O CSS ativo fica em `assets/css/style.css`.
- A camada de dados ativa fica em `assets/js/database.js` e carrega antes de `assets/js/app.js`.
- A lógica principal da interface fica em `assets/js/app.js`.
- `HTML/index.html` redireciona para a raiz; a versão anterior foi preservada em `archive/HTML-index-legacy.html`.

## Estrutura

```text
index.html
assets/
  css/
    style.css
    legacy/
  js/
    database.js             # camada de dados ativa
    app.js                  # lógica principal da interface
    modules/                # módulos legados em migração
api/
archive/
HTML/
```

## Regra de atualização

1. A raiz define a versão oficial.
2. Atualize primeiro a implementação principal e depois migre a responsabilidade para o módulo correspondente.
3. Não carregue módulos legados em paralelo com funções já definidas em `database.js` ou `app.js`.
4. Migre um módulo por vez, mantendo IDs e contratos existentes, e valide no navegador antes de avançar.
5. CSS novo deve ficar em `assets/css/`.

## Estado da migração

- A camada de dados foi extraída da implementação principal, preservando sua lógica funcional nesta etapa.
- Os módulos antigos foram preservados em `assets/js/modules/`; a cópia anterior do banco foi mantida como `legacy-database.js`.
- A sincronização Supabase ainda identifica usuários pelo e-mail/nome informado no cliente. Antes de produção multiusuário, implementar autenticação Supabase e políticas RLS com identidade validada.
- A função de teste de comissão na interface ainda registra uma simulação na lista de comissões reais; não usar como confirmação de venda.
- O webhook precisa de validação obrigatória de assinatura e persistência durável antes de produção.
