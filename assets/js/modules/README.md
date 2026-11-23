# Módulos legados em migração

Estes módulos foram preservados da pasta `Js/` original. A aplicação ativa carrega `../database.js` e `../app.js`.

**Não carregue estes módulos automaticamente em conjunto com a aplicação principal:** alguns repetem funções globais e podem sobrescrever a implementação atual.

Migração segura:
1. Comparar o módulo com a lógica atual de `../database.js` e `../app.js`.
2. Migrar uma responsabilidade por vez.
3. Remover duplicações e declarar dependências.
4. Testar no navegador antes de ativar.
5. Atualizar esta documentação após cada módulo migrado.

Ordem sugerida: autenticação, navegação, Shopee, Instagram, YouTube, Mika IA, biblioteca, calendário e comissões.
