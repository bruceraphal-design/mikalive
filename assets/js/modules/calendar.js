// calendar.js
function salvarCalendario(){
  var tema=(document.getElementById("cal-tema").value||"").trim();
  var plat=document.getElementById("cal-plataforma").value;
  var data=document.getElementById("cal-data").value;
  if(!tema||!data){alert("Preenche tema e data.");return;}
  DB.calendario.push({id:"cal_"+Date.now(),tema:tema,plataforma:plat,data:data,[STRIPPED] Date().toISOString()});
  saveDB(); document.getElementById("cal-tema").value=""; document.getElementById("cal-data").value="";
  renderCalendario(); renderCalendarioHoje(); alert("Planejamento salvo! ✅");
}
function renderCalendario(){
  var el=document.getElementById("lista-calendario"); if(!el) return;
  if(!DB.calendario.length){ el.innerHTML='<div class="card"><p>Nenhum planejamento ainda.</p></div>'; return; }
  el.innerHTML=DB.calendario.slice().sort(function(a,b){return a.data.localeCompare(b.data)}).map(function(c){
    return '<div class="list-item"><b>'+escapeHtml(c.tema)+'</b><small>'+escapeHtml(c.plataforma)+' • '+new Date(c.data+"T12:00:00").toLocaleDateString("pt-BR")+' • '+c.status+'</small><br><button class="btn btn-ghost btn-small" onclick="marcarCalendario(\''+c.id+'\',\'publicado\')">✅ Publicado</button><button class="btn btn-ghost btn-small" onclick="marcarCalendario(\''+c.id+'\',\'planejado\')">📅 Planejado</button><button class="btn btn-danger btn-small" onclick="excluirCalendario(\''+c.id+'\')">🗑️ Excluir</button></div>';
  }).join("");
}
function renderCalendarioHoje(){
  var el=document.getElementById("calendario-hoje"); if(!el) return;
  var hoje=new Date().toISOString().slice(0,10);
  var lista=DB.calendario.filter(function(c){return c.data===hoje});
  if(!lista.length){ el.innerHTML='<p>Nenhum conteúdo planejado pra hoje.</p>'; return; }
  el.innerHTML=lista.map(function(c){ return '<div class="list-item"><b>'+escapeHtml(c.tema)+'</b><small>'+escapeHtml(c.plataforma)+' • '+c.status+'</small></div>'; }).join("");
}
function marcarCalendario(id,status){ var c=DB.calendario.find(function(x){return x.id===id}); if(!c) return; c.status=status; saveDB(); renderCalendario(); renderCalendarioHoje(); }
function excluirCalendario(id){ if(!confirm("Excluir esse planejamento?")) return; DB.calendario=DB.calendario.filter(function(x){return x.id!==id}); saveDB(); renderCalendario(); renderCalendarioHoje(); }
