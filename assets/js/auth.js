/* MikaLIVE — autenticação e sessão.

 * Extraído da implementação principal sem alterar seu comportamento nesta etapa.

 * ATENÇÃO: a validação do token Google ainda precisa ser feita no servidor antes de produção.

 */

var CLIENT_ID = getConfig().GOOGLE_CLIENT_ID;

var googleEmailAtual = "";

function salvarSessao() { try { if (DB.usuario) localStorage.setItem(SESSION_KEY, JSON.stringify({ usuario: DB.usuario, salvaEm: new Date().toISOString() })); } catch (e) { } }

function restaurarSessao() { try { var raw = localStorage.getItem(SESSION_KEY); if (!raw) return false; var s = JSON.parse(raw); if (!s || !s.usuario || !s.usuario.nome) return false; var dias = (Date.now() - new Date(s.salvaEm).getTime()) / (1000 * 60 * 60 * 24); if (dias > SESSION_DIAS) { localStorage.removeItem(SESSION_KEY); return false; } DB.usuario = s.usuario; if (s.usuario.email) googleEmailAtual = s.usuario.email; saveDB(); var si = $("sessao-info"); if (si) si.textContent = "🔒 Sessão • expira em " + Math.max(0, Math.ceil(SESSION_DIAS - dias)) + " dias"; atualizarResumo(); mostrarTela("tela-inicio"); return true; } catch (e) { return false; } }

function entrarPainel(nome, email, foto) { try { var nl = sanitizar(nome, 100) || "Usuário"; var el = sanitizar(email, 150) || ""; if (el && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el)) { mostrarErro("Email inválido."); return; } googleEmailAtual = el; DB.usuario = { nome: nl, email: el, foto: foto || "", logadoEm: new Date().toISOString() }; saveDB(); salvarSessao(); var si = $("sessao-info"); if (si) si.textContent = "🔒 Sessão segura • 30 dias"; var sa = $("saudacao"); if (sa) sa.textContent = "Olá, " + nl.split(" ")[0] + " 👋"; atualizarResumo(); mostrarTela("tela-inicio"); } catch (e) { mostrarErro("Erro ao entrar."); } }

function handleGoogleCredential(res) { try { var payload = JSON.parse(atob(res.credential.split(".")[1])); var t = $("google-btn-temp"); if (t) t.remove(); entrarPainel(payload.name || "Usuário", payload.email || "", payload.picture || ""); } catch (e) { mostrarErro("Erro ao logar."); } }

function loginGoogle() { var btn = $("btnGoogle"); if (btn) btn.textContent = "Entrando..."; if (!CLIENT_ID) { if (btn) btn.textContent = "Continuar com Google"; mostrarErro("GOOGLE_CLIENT_ID não configurado. Use visitante por enquanto."); return; } if (typeof google === "undefined" || !google.accounts) { if (btn) btn.textContent = "Continuar com Google"; mostrarErro("Google carregando, espera 2s."); return; } google.accounts.id.initialize({ client_id: CLIENT_ID, callback: handleGoogleCredential, auto_select: false }); var old = $("google-btn-temp"); if (old) old.remove(); var div = document.createElement("div"); div.id = "google-btn-temp"; div.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:9999;display:flex;align-items:center;justify-content:center"; div.innerHTML = '<div style="background:#1e1e32;padding:24px;border-radius:16px;text-align:center;max-width:320px;width:90%"><p style="color:#fff;font-weight:700;margin-bottom:12px">Escolha sua conta Google</p><div id="btn-google-real" style="display:flex;justify-content:center"></div><p style="color:#aaa;font-size:12px;margin-top:14px;cursor:pointer" onclick="document.getElementById(\'google-btn-temp\').remove()">Fechar</p></div>'; document.body.appendChild(div); google.accounts.id.renderButton($("btn-google-real"), { theme: "filled_black", size: "large", width: 280 }); google.accounts.id.prompt(); if (btn) btn.textContent = "Continuar com Google"; }

function initGoogleBtn() { if (!CLIENT_ID) return; if (typeof google === "undefined" || !google.accounts) return; google.accounts.id.initialize({ client_id: CLIENT_ID, callback: handleGoogleCredential }); var area = $("google-btn-area"); if (area && !area.innerHTML) { google.accounts.id.renderButton(area, { theme: "filled_black", size: "large", width: 280, text: "signin_with" }); } }

function entrarVisitante() { var btn = $("btnVisitante"); if (btn) btn.textContent = "Entrando..."; entrarPainel("Visitante", "", ""); }

function sair() { try { DB.usuario = null; googleEmailAtual = ""; saveDB(); localStorage.removeItem(SESSION_KEY); } catch (e) { } mostrarTela("tela-login"); }

function sairDoGoogle() { if (!confirm("Sair do Google?")) return; try { if (typeof google !== "undefined" && google.accounts && google.accounts.id) { google.accounts.id.disableAutoSelect(); if (googleEmailAtual) google.accounts.id.revoke(googleEmailAtual, function () { }); } } catch (e) { } DB.usuario = null; googleEmailAtual = ""; saveDB(); try { localStorage.removeItem(SESSION_KEY); } catch (e) { } alert("Você saiu! ✅"); mostrarTela("tela-login"); setTimeout(initGoogleBtn, 300); }
