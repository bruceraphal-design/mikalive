// youtube.js
function prepararYT(){
  try{
    var canal=sanitizar(document.getElementById("canal-yt").value,300);
    if(!canal){alert("Escreve o link do canal primeiro");return;}
    if(!validarLink(canal)){alert("Link tem que começar com https://");return;}
    DB.conexoes.youtube={status:"preparada",canal:canal,conectadaEm:new Date().toISOString()}; saveDB();
    document.getElementById("canal-yt-salvo").textContent=canal; document.getElementById("resultado-yt").classList.remove("hidden");
  }catch(e){}
}
function gerarIdeiaYT(){
  try{
    var melhor=sanitizar(document.getElementById("yt-melhor-video").value,120);
    var views=sanitizar(document.getElementById("yt-views").value,10);
    if(!melhor){alert("Escreve qual vídeo teve mais views");return;}
    DB.youtubeManual={melhorVideo:melhor,views:parseInt(views||"0")||0}; saveDB();
    document.getElementById("ideia-yt-resultado").textContent="💡 IDEIA: Faça a PARTE 2 de \""+melhor+"\" ("+(views||"0")+" views) ou versão atualizada.";
  }catch(e){}
}
function gerarTitulosYT(){ var tema=document.getElementById("tema-yt").value||"Vídeo"; document.getElementById("ferramenta-yt-resultado").textContent="✍️ 5 TÍTULOS PARA: "+tema+"\n\n1. "+tema+" - O que ninguém te conta!\n2. Testei "+tema+" e me surpreendi!\n3. "+tema+" vale a pena em 2026?\n4. 5 erros em "+tema+" que você comete\n5. Como eu faço "+tema+" do zero"; }
function gerarDescricaoYT(){ var tema=document.getElementById("tema-yt").value||"Vídeo"; document.getElementById("ferramenta-yt-resultado").textContent="📝 DESCRIÇÃO PARA: "+tema+"\n\nNeste vídeo eu te mostro tudo sobre "+tema+", passo a passo, sem enrolação.\n\n⏰ Capítulos:\n00:00 Introdução\n01:00 O que é "+tema+"\n03:00 Como fazer\n05:00 Minha opinião\n\n🔑 Palavras-chave: "+tema.toLowerCase()+", tutorial, dicas, como fazer, review\n\nInscreva-se no canal!"; }
function gerarIdeiasShorts(){ var tema=document.getElementById("tema-yt").value||"Vídeo"; document.getElementById("ferramenta-yt-resultado").textContent="📱 5 IDEIAS DE SHORTS - "+tema+"\n\n1. "+tema+" em 30 segundos\n2. 3 curiosidades sobre "+tema+"\n3. Erro que todo mundo comete em "+tema+"\n4. Antes / Depois de "+tema+"\n5. Você sabia disso sobre "+tema+"?"; }
function salvarPlanejamentoYT(){ var tema=(document.getElementById("planej-yt-tema").value||"").trim(); if(!tema){alert("Escreve o tema.");return;} var dia=document.getElementById("planej-yt-dia").value; DB.planejamentoYT.push({id:"plan_"+Date.now(),tema:tema,dia:dia,criadoEm:new Date().toISOString()}); saveDB(); document.getElementById("planej-yt-tema").value=""; renderPlanejamentoYT(); }
function renderPlanejamentoYT(){ var el=document.getElementById("lista-planej-yt"); if(!el) return; if(!DB.planejamentoYT.length){ el.innerHTML="<p>Nenhum planejamento ainda.</p>"; return; } el.innerHTML=DB.planejamentoYT.map(function(p){ return '<div class="list-item"><b>'+escapeHtml(p.tema)+'</b><small>'+escapeHtml(p.dia)+'</small></div>'; }).join(""); }
