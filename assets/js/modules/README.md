# Módulos legados em migração

Estes módulos foram preservados da pasta `Js/` original. A aplicação ativa carrega os módulos de primeiro nível em `assets/js/` na ordem documentada no README.

**Não carregue estes módulos legados automaticamente em conjunto com a aplicação principal:** alguns repetem funções globais e podem sobrescrever implementações atuais.

Migração segura:
1. Comparar o módulo legado com a implementação ativa correspondente.
2. Migrar uma responsabilidade por vez.
3. Remover duplicações e declarar dependências.
4. Testar no navegador antes de ativar.
5. Atualizar esta documentação após cada módulo migrado.

Ordem sugerida: navegação, Shopee, Instagram, YouTube, Mika IA, biblioteca, calendário e comissões.
