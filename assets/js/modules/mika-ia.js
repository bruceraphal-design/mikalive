// mika-ia.js - usa /api/ia, nunca expõe SECRET
var mikaUltimaResposta=""; var mikaUltimoTema=""; var mikaUltimaPlataforma="shop";
async function gerarComIA(tipo){
  try{
    var pergunta="";
    if(tipo==='shop'){ pergunta="Crie roteiro de vídeo de 30s para vender: "+(document.getElementById("nome-produto").value||"Produto")+", preço "+(document.getElementById("preco-produto").value||"")+", descrição: "+(document.getElementById("desc-produto").value||"")+". Gancho forte, benefício e CTA."; }
    else if(tipo==='insta'){ pergunta="Crie roteiro viral Instagram estilo "+document.getElementById("estilo-insta").value+" sobre "+(document.getElementById("tema-insta").value||"Produto")+", + legenda + hashtags."; }
    else if(tipo==='youtube'){ pergunta="Crie roteiro YouTube completo sobre "+(document.getElementById("tema-yt").value||"Vídeo")+", gancho, desenvolvimento e CTA."; }
    var res=await fetch('/api/ia',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pergunta:pergunta})});
    var dados=await res.json(); if(!res.ok) throw new Error(dados.erro||'Erro IA');
    if(tipo==='shop'){ document.getElementById("roteiro-shop").textContent=dados.resposta; document.getElementById("resultado-shop").classList.remove("hidden"); videoAtual={tipo:"shop",titulo:document.getElementById("nome-produto").value||"Produto",roteiro:dados.resposta,legenda:"",hashtags:"",criadoEm:new Date().toISOString()}; }
    else if(tipo==='insta'){ document.getElementById("roteiro-insta").textContent=dados.resposta; document.getElementById("resultado-insta").classList.remove("hidden"); videoAtual={tipo:"insta",titulo:document.getElementById("tema-insta").value||"Tema",roteiro:dados.resposta,legenda:"",hashtags:"",criadoEm:new Date().toISOString()}; }
    else if(tipo==='youtube'){ document.getElementById("roteiro-yt-ia").textContent=dados.resposta; document.getElementById("resultado-yt-ia").classList.remove("hidden"); videoAtual={tipo:"youtube",titulo:document.getElementById("tema-yt").value||"YouTube",roteiro:dados.resposta,legenda:"",hashtags:"",criadoEm:new Date().toISOString()}; }
  }catch(e){ alert("Erro IA: "+e.message+" - Verifica groq_api_key na Vercel."); }
}
async function perguntarMikaIA(){
  var tema=(document.getElementById("mika-tema").value||"").trim(); if(!tema){alert("Escreve o tema ou produto primeiro.");return;}
  var plat=document.getElementById("mika-plataforma").value; mikaUltimoTema=tema; mikaUltimaPlataforma=plat;
  document.getElementById("mika-resposta").textContent="✨ Mika IA pensando...";
  try{
    var pergunta="Você é a Mika IA, assistente de criação de conteúdo. Plataforma: "+plat+". Tema/produto: "+tema+". Crie roteiro completo, legenda e hashtags (se Instagram) ou título e descrição (se YouTube). Seja claro, vendedor e simples.";
    var res=await fetch('/api/ia',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pergunta:pergunta})});
    var dados=await res.json(); if(!res.ok) throw new Error(dados.erro||'Erro IA');
    mikaUltimaResposta=dados.resposta; document.getElementById("mika-resposta").textContent=dados.resposta;
  }catch(e){ document.getElementById("mika-resposta").textContent="Erro: "+e.message; }
}
async function melhorarMika(acao){
  if(!mikaUltimaResposta){alert("Gera primeiro com a Mika IA.");return;}
  document.getElementById("mika-resposta").textContent="✨ Melhorando: "+acao+"...";
  try{
    var res=await fetch('/api/ia',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pergunta:"Reescreva deixando "+acao+", mantendo o mesmo tema: "+mikaUltimoTema+". Texto original: "+mikaUltimaResposta})});
    var dados=await res.json(); if(!res.ok) throw new Error(dados.erro||'Erro');
    mikaUltimaResposta=dados.resposta; document.getElementById("mika-resposta").textContent=dados.resposta;
  }catch(e){ alert("Erro: "+e.message); }
}
function salvarMikaIAComoRoteiro(){ if(!mikaUltimaResposta){alert("Gera primeiro.");return;} var tipo=mikaUltimaPlataforma==='insta'?'insta':mikaUltimaPlataforma; DB.videos.push({id:"vid_"+Date.now(),tipo:tipo,titulo:mikaUltimoTema.slice(0,80),roteiro:mikaUltimaResposta,legenda:"",hashtags:"",criadoEm:new Date().toISOString(),favorito:false}); saveDB(); atualizarResumo(); alert("Salvo na biblioteca! ✅"); irPara('tela-conteudos'); }
