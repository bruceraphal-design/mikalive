// instagram.js
function hashtagsPorNicho(nicho){ var m={beleza:"#skincare #beleza #cuidadoscomapele #achadinhos #produtobom #dicasdebeleza #mikalive",casa:"#achadinhos #casalinda #utilidades #dicasdecasa #produtosuteis #achadinhosshopee #mikalive",moda:"#moda #look #achadinhos #modafeminina #estilo #tendencia #mikalive",fitness:"#fitness #saude #treino #vidasaudavel #dicasfitness #mikalive",geral:"#viral #achadinhos #shop #dica #produtobom #foryou #fyp #mikalive"}; return m[nicho]||m.geral; }
function gerarVideoInsta(){
  try{
    var tema=sanitizar(document.getElementById("tema-insta").value,120)||"Produto da Shop";
    var nicho=document.getElementById("nicho-insta").value;
    var link=sanitizar(document.getElementById("link-insta-shop").value,500)||"Link na bio";
    var roteiro="🎬 ROTEIRO INSTA (15-20s)\n\n0-2s GANCHO: \""+tema+"\"\n2-8s Mostra em uso.\n8-12s PROVA: Sua reação real.\n12-15s CTA: \"Comenta EU QUERO que eu te mando o link!\"";
    var legenda="🤯 "+tema+"\nComenta EU QUERO que eu te mando o link!\n🔗 "+link;
    var hashtags=hashtagsPorNicho(nicho);
    document.getElementById("roteiro-insta").textContent=roteiro; document.getElementById("legenda-insta").textContent=legenda; document.getElementById("hashtags-insta").textContent=hashtags; document.getElementById("resultado-insta").classList.remove("hidden");
    videoAtual={tipo:"insta",titulo:tema,roteiro:roteiro,legenda:legenda,hashtags:hashtags,criadoEm:new Date().toISOString()};
  }catch(e){alert("Erro ao gerar.");}
}
function gerarIdeiasReels(){ var tema=document.getElementById("tema-insta").value||"Produto"; var txt="💡 5 IDEIAS DE REELS PARA: "+tema+"\n\n1. Antes / Depois usando "+tema+"\n2. 3 erros que todo mundo comete com "+tema+"\n3. Testando "+tema+" pela primeira vez\n4. "+tema+" vale a pena? Minha opinião sincera\n5. Rotina completa usando "+tema; document.getElementById("ferramenta-insta-resultado").textContent=txt; }
function gerarSerieConteudo(){
  var tema=document.getElementById("tema-insta").value||"Produto";
  var txt="🎬 SÉRIE DE 5 VÍDEOS - TEMA: "+tema+"\n\nVÍDEO 1 - GANCHO: \"Você conhece "+tema+"?\"\nRoteiro: Apresentação + curiosidade\nLegenda: Você já conhecia? Comenta SIM\n\nVÍDEO 2 - GANCHO: \"3 motivos pra ter "+tema+"\"\nRoteiro: Benefício 1, 2, 3\nLegenda: Qual motivo te convenceu?\n\nVÍDEO 3 - GANCHO: \"Testei "+tema+" por 7 dias\"\nRoteiro: Dia 1, dia 3, dia 7\nLegenda: Quer parte 2? Comenta PARTE 2\n\nVÍDEO 4 - GANCHO: \"Erros com "+tema+"\"\nRoteiro: Erro 1, 2, 3 e como corrigir\nLegenda: Você já cometeu algum?\n\nVÍDEO 5 - GANCHO: \"Vale a pena "+tema+"?\"\nRoteiro: Opinião sincera + CTA\nLegenda: Comenta EU QUERO que eu mando o link";
  document.getElementById("ferramenta-insta-resultado").textContent=txt;
  videoAtual={tipo:"insta",titulo:"Série: "+tema,roteiro:txt,legenda:"",hashtags:hashtagsPorNicho(document.getElementById("nicho-insta").value),criadoEm:new Date().toISOString()};
}
function gerarLegendasEstilos(){ var tema=document.getElementById("tema-insta").value||"Produto"; document.getElementById("ferramenta-insta-resultado").textContent="✍️ LEGENDAS EM 3 ESTILOS - "+tema+"\n\n1. DIRETA:\n"+tema+" por um preço que cabe no bolso. Link na bio!\n\n2. HISTÓRIA:\nEu não acreditava até testar "+tema+". Agora não fico sem.\n\n3. ENGAJAMENTO:\nVocê já usou "+tema+"? Comenta SIM ou NÃO 👇"; }
function mostrarBancoHashtags(){ var nicho=document.getElementById("nicho-insta").value; document.getElementById("ferramenta-insta-resultado").textContent=" #️⃣ BANCO DE HASHTAGS - "+nicho+"\n\n"+hashtagsPorNicho(nicho)+"\n\nDica: use 10 a 15 hashtags."; }
function gerarCTA(){ var ctas=["Comenta EU QUERO que eu te mando o link!","Salva esse vídeo pra não perder!","Marca aquela amiga que precisa ver isso!","Comenta PARTE 2 se quiser continuação!","Segue pra mais achadinhos como esse!"]; document.getElementById("ferramenta-insta-resultado").textContent="💬 CHAMADAS PRA COMENTÁRIOS:\n\n• "+ctas.join("\n• "); }
