// navigation.js - trocar de tela, pastas, grupos
var filtroRoteiroAtual='shop'; var mostrarSoFavoritos=false;
function irPara(id){ mostrarTela(id); }
function abrirTela(id){ mostrarTela(id); }
function voltarPainel(){ mostrarTela("tela-inicio"); }
function mostrarTela(id){
  var telas=["tela-login","tela-inicio","tela-shop","tela-insta","tela-youtube","tela-mikaia","tela-conteudos","tela-calendario","tela-comissao","tela-conta"];
  telas.forEach(function(t){ var el=document.getElementById(t); if(el) el.classList.add("hidden"); });
  var el=document.getElementById(id); if(el) el.classList.remove("hidden");
  document.querySelectorAll('.nav-btn').forEach(function(b){ b.classList.toggle('ativo', b.getAttribute('data-tela')===id); });
  window.scrollTo(0,0);
  if(id==="tela-conteudos") renderListaVideos();
  if(id==="tela-comissao"){ atualizarComissoesTela(); renderComissoesReais(); }
  if(id==="tela-inicio"){ atualizarResumo(); renderRecentes(); renderCalendarioHoje(); renderListaProdutos(); }
  if(id==="tela-conta"){ mostrarCloudConfig(); atualizarListaChaves(); atualizarResumoConta(); var pd=document.getElementById("perfil-detalhe"); if(pd&&DB.usuario) pd.textContent=DB.usuario.nome+" • "+(DB.usuario.email||"Visitante"); }
  if(id==="tela-calendario") renderCalendario();
  if(id==="tela-youtube") renderPlanejamentoYT();
  if(id==="tela-shop") renderListaProdutos();
}
function abrirGrupoConta(id,botao){
  var c=document.getElementById(id); if(!c) return;
  var aberto=c.classList.contains('aberto');
  document.querySelectorAll('.grupo-conteudo').forEach(function(x){x.classList.remove('aberto')});
  document.querySelectorAll('.seta-grupo').forEach(function(s){s.textContent='›'});
  if(!aberto){ c.classList.add('aberto'); if(botao){ var s=botao.querySelector('.seta-grupo'); if(s) s.textContent='⌄'; } }
}
function filtrarRoteirosPorPlataforma(f){
  filtroRoteiroAtual=f; mostrarSoFavoritos=false;
  ['aba-res-shop','aba-res-insta','aba-res-yt','aba-res-todos','aba-fav'].forEach(function(id){ var b=document.getElementById(id); if(b) b.classList.remove('ativa'); });
  var mapa={shop:'aba-res-shop',instagram:'aba-res-insta',youtube:'aba-res-yt',todos:'aba-res-todos'};
  var b=document.getElementById(mapa[f]); if(b) b.classList.add('ativa'); renderListaVideos();
}
function filtrarFavoritos(){ mostrarSoFavoritos=true; document.querySelectorAll('.aba').forEach(function(b){b.classList.remove('ativa')}); var b=document.getElementById('aba-fav'); if(b) b.classList.add('ativa'); renderListaVideos(); }
function abrirPastaResultado(p){ atualizarResumo(); }
