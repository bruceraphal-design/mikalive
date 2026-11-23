/* MikaLIVE — ações e validações da área YouTube.
 * Extraídas da implementação principal atual. Dependências: $, mostrarErro, gerarComIA, salvarVideoAtual.
 */

function gerarComIASeguroYT() { var tema = $("tema-yt").value.trim(); var opiniao = $("yt-opiniao").value.trim(); if (!tema) { mostrarErro("Escreve o tema primeiro."); return; } if (!opiniao || opiniao.length < 15) { mostrarErro("Escreve sua opinião real com pelo menos 15 letras."); return; } gerarComIA('youtube'); }

function gerarTitulosYTSeguro() { var tema = $("tema-yt").value || "Vídeo"; $("ferramenta-yt-resultado").textContent = "✍️ 3 TÍTULOS:\n\n1. Eu testei " + tema + " e me surpreendi...\n2. " + tema + " - o que ninguém te conta\n3. Minha opinião sincera sobre " + tema; }

function salvarVideoYTSeguro() { var c1 = $("check-humano").checked; var c2 = $("check-original").checked; if (!c1 || !c2) { mostrarErro("Marca os 2 checks antes de salvar."); return; } salvarVideoAtual(); }
