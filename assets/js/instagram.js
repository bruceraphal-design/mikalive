/* MikaLIVE — ferramentas de conteúdo para Instagram.
 * Extraídas da versão principal atual. Dependências: sanitizar, $, mostrarErro, videoAtual.
 */

function gerarVideoInsta() {
            var tema = sanitizar($("tema-insta").value, 120) || "Achadinho"; var estilo = $("estilo-insta").value; var opiniao = sanitizar($("insta-opiniao").value, 500) || "";
            if (!opiniao) { mostrarErro("Escreve sua opinião real primeiro."); return; }
            var link = $("link-insta-shop").value || "Link na bio";
            var roteiro = "🎬 ROTEIRO INSTAGRAM - " + tema + "\nEstilo: " + estilo + "\n🔥 GANCHO: \"Para tudo! Precisa ver isso...\"\n🎯 MEIO: Minha opinião: " + opiniao + ".\n✅ CTA: \"Comenta EU QUERO!\"";
            var legenda = tema + " que você PRECISA ver! 😱\nMinha opinião: " + opiniao + "\nLink na bio 💜\n" + link; var tags = "#reels #shopee #achadinhos #viral #oferta";
            $("roteiro-insta").textContent = roteiro; $("legenda-insta").textContent = legenda; $("hashtags-insta").textContent = tags; $("resultado-insta").style.display = "block";
            videoAtual = { tipo: "insta", titulo: tema, roteiro: roteiro, legenda: legenda, hashtags: tags, criadoEm: new Date().toISOString() };
        }

function gerarLegendasEstilos() { $("ferramenta-insta-resultado").textContent = "✍️ 3 ESTILOS:\n\n1. VENDEDORA: \"Link na bio, corre!\"\n2. ENGRAÇADA: \"Eu comprando de novo...\"\n3. PROVA: \"7 vendas hoje!\""; }

function mostrarBancoHashtags() { $("ferramenta-insta-resultado").textContent = "#️⃣ BANCO:\n\nBeleza: #skincare #beleza\nCasa: #achadinhos #casa\nModa: #moda #look\nFitness: #fitness #treino"; }

function gerarCTA() { $("ferramenta-insta-resultado").textContent = "💬 CTA:\n\n\"Comenta EU QUERO!\"\n\"Salva pra não perder!\"\n\"Marca aquela amiga!\""; }
