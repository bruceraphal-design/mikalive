# Módulos em migração

Estes arquivos foram preservados da pasta `Js/` original e organizados aqui.

**Importante:** a aplicação ativa carrega apenas `../app.js`, extraído do `index.html` principal. Estes módulos não são carregados automaticamente porque ainda existem funções globais e responsabilidades sobrepostas. Conectá-los todos de uma vez poderia sobrescrever funções e quebrar funcionalidades.

Migração segura:
1. Comparar cada módulo com a implementação equivalente em `../app.js`.
2. Atualizar o módulo usando a lógica mais recente da aplicação principal.
3. Remover duplicações e definir dependências explícitas.
4. Testar o módulo isoladamente.
5. Só então conectá-lo à aplicação e remover a implementação antiga de `app.js`.

A ordem sugerida é database, auth, navigation, shope, instagram, youtube, mika-ia, content-library, calendar e commission.
