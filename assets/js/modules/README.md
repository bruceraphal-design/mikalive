# Módulos legados em migração

Estes arquivos foram preservados da pasta `Js/` original. Os módulos ativos ficam no primeiro nível de `assets/js/` e são carregados na ordem documentada no README.

Não carregue os módulos legados junto com a aplicação principal: alguns repetem funções globais e podem sobrescrever implementações atuais.

Migre uma responsabilidade por vez a partir da implementação atual da raiz, remova duplicações, preserve IDs e contratos e teste no navegador antes de ativar.

Próximas áreas: YouTube, Mika IA, biblioteca, calendário e comissões.
