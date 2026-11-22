// content-library.js - busca, favorito, editar, excluir
function salvarVideoAtual(){ try{ if(!videoAtual){alert("Gera o roteiro primeiro!");return;} DB.videos.push(Object.assign({},videoAtual,{id:"vid_"+Date.now(),favorito:false})); saveDB(); videoAtual=null; atualizarResumo(); alert("Roteiro salvo! Total: "+DB.videos.length); irPara('tela-conteudos'); }catch(e){alert("Erro ao salvar.");} }
function renderListaVideos(){
  var el=document.getElementById("lista-videos");
  var busca=(document.getElementById("busca-conteudo")?document.getElementById("busca-conteudo").value||"":"").toLowerCase();
  var lista=DB.videos.slice();
  if(mostrarSoFavoritos) lista=lista.filter(function(v){return v.favorito});
  else if(filtroRoteiroAtual!=='todos'){ lista=lista.filter(function(v){ if(filtroRoteiroAtual==='shop') return v.tipo==='shop'; if(filtroRoteiroAtual==='instagram') return v.tipo==='insta'||v.tipo==='instagram'; if(filtroRoteiroAtual==='youtube') return v.tipo==='youtube'; return true; }); }
  if(busca) lista=lista.filter(function(v){ return (v.titulo||"").toLowerCase().includes(busca) || (v.roteiro||"").toLowerCase().includes(busca); });
  var html="";
  if(!lista.length) html='<div class="card"><p>Nenhum conteúdo aqui ainda.</p></div>';
  else html=lista.slice().reverse().map(function(v){ return '<div class="list-item"><b>'+escapeHtml(v.titulo)+' '+(v.favorito?'⭐':'')+'</b><small>'+escapeHtml(v.tipo)+' • '+new Date(v.criadoEm).toLocaleDateString("pt-BR")+'</small><br><button class="btn btn-dark btn-small" onclick="abrirVideo(\''+v.id+'\')">👁️ Ver</button><button class="btn btn-ghost btn-small" onclick="favoritarVideo(\''+v.id+'\')">⭐ Favoritar</button><button class="btn btn-ghost btn-small" onclick="editarVideo(\''+v.id+'\')">✏️ Editar</button><button class="btn btn-danger btn-small" onclick="excluirVideo(\''+v.id+'\')">🗑️ Excluir</button></div>'; }).join("");
  if(el) el.innerHTML=html;
}
function renderRecentes(){ var el=document.getElementById("lista-recentes"); if(!el) return; if(!DB.videos.length){ el.innerHTML='<p>Nenhum roteiro ainda.</p>'; return; } el.innerHTML=DB.videos.slice().reverse().slice(0,3).map(function(v){ return '<div class="list-item"><b>'+escapeHtml(v.titulo)+'</b><small>'+escapeHtml(v.tipo)+' • '+new Date(v.criadoEm).toLocaleDateString("pt-BR")+'</small></div>'; }).join(""); }
function abrirVideo(id){ var v=DB.videos.find(function(x){return x.id===id}); if(!v) return; videoAbertoId=id; document.getElementById("modal-titulo").textContent=v.titulo; document.getElementById("modal-meta").textContent="Tipo: "+v.tipo+" • "+new Date(v.criadoEm).toLocaleString("pt-BR"); document.getElementById("modal-roteiro").textContent=v.roteiro||""; document.getElementById("modal-legenda").textContent=v.legenda||""; document.getElementById("modal-hashtags").textContent=v.hashtags||""; document.getElementById("modal-video").classList.remove("hidden"); }
function fecharModal(){ document.getElementById("modal-video").classList.add("hidden"); videoAbertoId=null; }
function copiarModal(){ var v=DB.videos.find(function(x){return x.id===videoAbertoId}); if(!v) return; copiarTextoDireto(v.titulo+"\n\n"+v.roteiro+"\n\n"+(v.legenda||"")+"\n\n"+(v.hashtags||"")); }
function copiarTextoDireto(txt){ try{ if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(function(){alert("Copiado!")}).catch(function(){alert("Não consegui copiar.")}); } }catch(e){} }
function copiarTexto(id){ var el=document.getElementById(id); if(!el) return; copiarTextoDireto(el.innerText); }
function excluirVideo(id){ if(!confirm("Excluir este roteiro?")) return; fazerBackupAutomatico("antes_excluir"); DB.videos=DB.videos.filter(function(v){return v.id!==id}); saveDB(); atualizarResumo(); renderListaVideos(); if(videoAbertoId===id) fecharModal(); }
function excluirVideoModal(){ if(videoAbertoId) excluirVideo(videoAbertoId); }
function favoritarVideo(id){ var v=DB.videos.find(function(x){return x.id===id}); if(!v) return; v.favorito=!v.favorito; saveDB(); renderListaVideos(); }
function favoritarVideoModal(){ if(videoAbertoId){ favoritarVideo(videoAbertoId); abrirVideo(videoAbertoId); } }
function editarVideo(id){ var v=DB.videos.find(function(x){return x.id===id}); if(!v) return; var novo=prompt("Editar título:",v.titulo); if(novo===null) return; var novoRoteiro=prompt("Editar roteiro:",v.roteiro); if(novoRoteiro===null) return; v.titulo=sanitizar(novo,120); v.roteiro=sanitizar(novoRoteiro,5000); saveDB(); renderListaVideos(); alert("Editado! ✅"); }
function editarVideoModal(){ if(videoAbertoId) editarVideo(videoAbertoId); }
function limparVideos(){ if(confirm("Apagar todos os roteiros?")){ fazerBackupAutomatico("antes_limpar"); DB.videos=[]; saveDB(); atualizarResumo(); renderListaVideos(); } }
