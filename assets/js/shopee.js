/* MikaLIVE — geração de roteiro para Shopee.

 * Função extraída do index.html principal. Mantém os campos e o comportamento da versão atual.

 * Dependências globais: $, sanitizar, parsePreco, videoAtual, DB e renderListaProdutos (carregadas nos outros scripts).

 */

function gerarVideoShop() {
            var link = sanitizar($("link-shop").value, 500);
            var nome = sanitizar($("nome-produto").value, 120) || "Tv box";
            if (link && !$("nome-produto").value) nome = link;
            var preco = parsePreco($("preco-produto").value) || 200;
            var desc = sanitizar($("desc-produto").value, 1000) || "Proporciona mais para minha tv";
            var opiniao = sanitizar($("shop-opiniao").value, 500) || "minha experiência real";
            var roteiro = "🎬 ROTEIRO SHOPEE - " + nome + "\n\n🔥 GANCHO: \"Para de pagar caro! Olha esse " + nome.toLowerCase() + "...\"\n\n🎯 MEIO: " + desc + ". Preço R$ " + preco.toFixed(2).replace(".", ",") + ". Minha opinião: " + opiniao + ".\n\n✅ CTA: \"Link na bio / carrinho laranja!\"";
            $("roteiro-shop").textContent = roteiro; $("resultado-shop").style.display = "block";
            videoAtual = { tipo: "shop", titulo: nome, roteiro: roteiro, legenda: nome + " que todo mundo tá amando! 💜", hashtags: "#shopee #achadinhos #oferta", criadoEm: new Date().toISOString() };
            if (link) { var norm = link.toLowerCase(); var ja = DB.produtos.find(function (p) { return (p.linkNormalizado || "") === norm; }); if (!ja) { DB.produtos.push({ link: link, linkNormalizado: norm, nome: nome, preco: preco, criadoEm: new Date().toISOString() }); saveDB(); } renderListaProdutos(); }
        }
