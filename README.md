# MikaLIVE

Aplicação principal: `index.html` na raiz do repositório.

## Regra de versão

- O `index.html` da raiz é a fonte oficial e atual do produto.
- `HTML/index.html` é mantido como rota de compatibilidade e redireciona para a aplicação principal.
- A versão anterior de `HTML/index.html` foi preservada em `archive/HTML-index-legacy.html`.
- Não desenvolver funcionalidades independentes na versão arquivada.

## Estrutura

```text
index.html                 # entrada oficial da aplicação
assets/
  css/
    style.css              # estilos extraídos do index.html principal
    legacy/                # folhas CSS antigas preservadas
  js/
    app.js                 # lógica atual extraída do index.html principal
    modules/               # módulos antigos preservados para migração gradual
api/                       # funções serverless
archive/                   # versões antigas preservadas
HTML/                      # rota de compatibilidade
```

## Como atualizar

1. Faça a alteração funcional na aplicação principal.
2. Se a lógica pertencer a um módulo, migre-a para `assets/js/modules/` e valide os IDs, nomes globais e dependências antes de conectá-la.
3. Não carregue módulos antigos em paralelo com `assets/js/app.js` enquanto houver funções globais duplicadas.
4. Mantenha CSS novo em `assets/css/`.
5. Teste login, navegação, criação de roteiros, biblioteca, calendário, IA e comissões antes de publicar.

## Estado técnico conhecido

- A extração inicial de CSS e JavaScript mantém o conteúdo que estava embutido no HTML principal.
- Os módulos existentes foram preservados, mas não foram conectados automaticamente: há sobreposição de funções globais e isso precisa ser resolvido módulo por módulo.
- O webhook de comissões foi movido para `api/webhook-comissao.js`. A implementação atual ainda usa memória para deduplicação e não persiste pedidos; não considerar processamento financeiro de produção até integrar validação oficial e persistência durável.
- As chaves e segredos devem permanecer em variáveis de ambiente no servidor, nunca no HTML ou nos módulos do navegador.
- `HTML/index.html` não é mais uma segunda aplicação: redireciona para a raiz.
