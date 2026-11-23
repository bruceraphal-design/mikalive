/* MikaLIVE — navegação e troca de telas.

 * Extraída da implementação principal, preservando os IDs e o comportamento atual.

 * As funções de renderização são fornecidas por app.js e executadas após o carregamento.

 */

var filtroRoteiroAtual = 'shop', mostrarSoFavoritos = false;

function irPara(id) { mostrarTela(id); }

function mostrarTela(id) {
            var landing = $("landing"); var app = $("app"); var menu = $("menuBaixo");
            if (id === "tela-login") { if (landing) landing.style.display = "block"; if (app) app.classList.remove("visivel"); if (menu) menu.style.display = "none"; return; }
            if (landing) landing.style.display = "none"; if (app) app.classList.add("visivel"); if (menu) menu.style.display = "flex";
            document.querySelectorAll('.tela').forEach(function (t) { t.classList.remove('ativa'); });
            var el = $(id); if (el) el.classList.add('ativa');
            var mapa = { 'tela-inicio': 'm-inicio', 'tela-shop': 'm-shop', 'tela-mikaia': 'm-mikaia', 'tela-conteudos': 'm-conteudos', 'tela-conta': 'm-conta' };
            document.querySelectorAll('.menu-baixo button').forEach(function (b) { b.classList.remove('ativo'); });
            if (mapa[id]) { var mb = $(mapa[id]); if (mb) mb.classList.add('ativo'); }
            window.scrollTo(0, 0);
            if (id === "tela-conteudos") renderListaVideos();
            if (id === "tela-comissao") { atualizarComissoesTela(); renderComissoesReais(); }
            if (id === "tela-inicio") { atualizarResumo(); renderRecentes(); renderCalendarioHoje(); renderListaProdutos(); }
            if (id === "tela-conta") { mostrarCloudConfig(); atualizarListaChaves(); atualizarResumoConta(); var pd = $("perfil-detalhe"); if (pd && DB.usuario) pd.textContent = DB.usuario.nome + " • " + (DB.usuario.email || "Visitante"); }
            if (id === "tela-calendario") renderCalendario();
            if (id === "tela-shop") renderListaProdutos();
        }

function filtrarRoteirosPorPlataforma(f) { filtroRoteiroAtual = f; mostrarSoFavoritos = false;['aba-res-shop', 'aba-res-insta', 'aba-res-yt', 'aba-res-todos', 'aba-fav'].forEach(function (id) { var b = $(id); if (b) b.classList.remove('ativa'); }); var mapa = { shop: 'aba-res-shop', instagram: 'aba-res-insta', youtube: 'aba-res-yt', todos: 'aba-res-todos' }; var b = $(mapa[f]); if (b) b.classList.add('ativa'); renderListaVideos(); }

function filtrarFavoritos() { mostrarSoFavoritos = true; document.querySelectorAll('.aba').forEach(function (b) { b.classList.remove('ativa'); }); var b = $('aba-fav'); if (b) b.classList.add('ativa'); renderListaVideos(); }

function abrirGrupoConta(id, botao) { var c = $(id); if (!c) return; var aberto = c.classList.contains('aberto'); document.querySelectorAll('.grupo-conteudo').forEach(function (x) { x.classList.remove('aberto'); }); if (!aberto) c.classList.add('aberto'); }
