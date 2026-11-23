// app.js - carrega tudo por último
window.addEventListener("load",function(){
  setTimeout(initGoogleBtn,500);
  atualizarLogUI(); mostrarCloudConfig(); atualizarListaChaves(); atualizarResumoConta();
});
atualizarResumo(); atualizarLogUI(); atualizarResumoConta();
var restaurou=restaurarSessao();
if(!restaurou){ mostrarTela("tela-login"); }
