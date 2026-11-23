/* MikaLIVE — camada de dados do aplicativo principal.

 * Extraída da implementação oficial da raiz, preservando sua lógica atual.

 * As dependências de interface são resolvidas em app.js após o carregamento dos dois scripts.

 */

window.MIKA_CONFIG = window.MIKA_CONFIG || { GOOGLE_CLIENT_ID: "", SUPABASE_URL: "", SUPABASE_ANON_KEY: "" };

var DB_KEY = "mikalive_db_v10", SESSION_KEY = "mikalive_session_v10", BACKUP_AUTO_KEY = "mikalive_backup_auto_v10", LOG_KEY = "mikalive_log_v10", CLOUD_KEY = "mikalive_cloud_config_v11", SESSION_DIAS = 30, USER_KEYS_KEY = "mikalive_user_keys_v12";

function getConfig() { var w = window.MIKA_CONFIG || {}; var s = {}; try { s = JSON.parse(localStorage.getItem("mikalive_cloud_config_v11") || "{}") || {}; } catch (e) { s = {}; } return { GOOGLE_CLIENT_ID: w.GOOGLE_CLIENT_ID || "", SUPABASE_URL: w.SUPABASE_URL || s.url || "", SUPABASE_ANON_KEY: w.SUPABASE_ANON_KEY || s.key || "" }; }

function atualizarResumoConta() { var rn = $("resumo-nuvem"); var dn = $("dot-nuvem"); var cfg = getCloudConfig(); if (rn) { if (cfg && cfg.url) { rn.textContent = '✅ Conectada'; if (dn) dn.textContent = '🟢'; } else { rn.textContent = 'Não conectada'; if (dn) dn.textContent = '🔴'; } } var rc = $("resumo-chaves"); if (rc) { var q = Object.keys(getUserKeys()).length; rc.textContent = q === 0 ? 'Nenhuma salva' : '✅ ' + q + ' salvas'; } }

function getUserKeys() { try { return JSON.parse(localStorage.getItem(USER_KEYS_KEY) || "{}"); } catch (e) { return {}; } }

function setUserKeys(o) { localStorage.setItem(USER_KEYS_KEY, JSON.stringify(o)); }

function getChaveAssinante(s) { var a = getUserKeys(); return (a[s] && a[s].publica) || ""; }

function salvarChaveAssinante() { var s = $("key-servico").value; var p = ($("key-publica").value || "").trim(); if (!p) { mostrarErro("Cola a chave pública."); return; } if (/service_role|sk_live|gsk_|senha|secret/i.test(p)) { mostrarErro("Isso parece SECRET! Não cole."); return; } var a = getUserKeys(); a[s] = { publica: p, salvaEm: new Date().toISOString() }; setUserKeys(a); $("key-publica").value = ""; $("key-status").textContent = "✅ Salva."; atualizarListaChaves(); }

function removerChaveAssinante() { var s = $("key-servico").value; var a = getUserKeys(); if (!a[s]) { mostrarErro("Nenhuma chave."); return; } if (!confirm("Remover?")) return; delete a[s]; setUserKeys(a); atualizarListaChaves(); }

function apagarTodasChaves() { if (!confirm("Apagar TODAS?")) return; localStorage.removeItem(USER_KEYS_KEY); localStorage.removeItem(CLOUD_KEY); atualizarListaChaves(); alert("✅ Apagadas."); }

function atualizarListaChaves() { var el = $("lista-chaves-assinante"); if (!el) return; var a = getUserKeys(); var n = Object.keys(a); el.innerHTML = n.length ? ("Salvas: " + n.map(function (x) { return "✅ " + x; }).join(" • ")) : "Nenhuma chave salva."; atualizarResumoConta(); }

function getCloudConfig() { var c = getConfig(); if (c.SUPABASE_URL && c.SUPABASE_ANON_KEY) return { url: c.SUPABASE_URL, key: c.SUPABASE_ANON_KEY }; try { return JSON.parse(localStorage.getItem(CLOUD_KEY) || "null"); } catch (e) { return null; } }

function getUserIdNuvem() { if (DB.usuario && DB.usuario.email) return "google_" + DB.usuario.email.toLowerCase(); return "visitante_" + (DB.usuario ? DB.usuario.nome : "anonimo"); }

function salvarConfigNuvem() { var url = ($("cloud-url").value || "").trim(); var key = ($("cloud-key").value || "").trim(); if (!url.startsWith("https://") || !url.includes("supabase.co")) { mostrarErro("URL inválida."); return; } if (key.length < 20) { mostrarErro("Chave inválida."); return; } localStorage.setItem(CLOUD_KEY, JSON.stringify({ url: url.replace(/\/$/, ""), key: key })); $("cloud-status").textContent = "✅ Configurada."; atualizarResumoConta(); }

function mostrarCloudConfig() { var c = getCloudConfig(); if (!c) { atualizarResumoConta(); return; } var u = $("cloud-url"); var k = $("cloud-key"); var s = $("cloud-status"); if (u) u.value = c.url; if (k) k.value = "****" + c.key.slice(-4); if (s) s.textContent = "✅ Configurada."; atualizarResumoConta(); }

async function tentarSyncCloud() { var cfg = getCloudConfig(); if (!cfg) { mostrarErro("Configura a nuvem primeiro!"); return false; } try { fazerBackupAutomatico("antes_sync"); var res = await fetch(cfg.url + "/rest/v1/mikalive_sync?on_conflict=user_id", { method: "POST", headers: { "apikey": cfg.key, "Authorization": "Bearer " + cfg.key, "Content-Type": "application/json", "Prefer": "resolution=merge-duplicates,return=representation" }, body: JSON.stringify({ user_id: getUserIdNuvem(), dados: DB, atualizado_em: new Date().toISOString() }) }); if (!res.ok) throw new Error("Supabase " + res.status); DB.sync.ultimaSync = new Date().toISOString(); saveDB(); alert("✅ Sincronizado!"); return true; } catch (e) { mostrarErro("❌ " + e.message); return false; } }

async function baixarDaNuvem() { var cfg = getCloudConfig(); if (!cfg) { mostrarErro("Configura a nuvem primeiro."); return; } if (!confirm("Baixar da nuvem? Vai substituir os dados.")) return; try { fazerBackupAutomatico("antes_baixar"); var res = await fetch(cfg.url + "/rest/v1/mikalive_sync?user_id=eq." + encodeURIComponent(getUserIdNuvem()) + "&select=dados", { headers: { "apikey": cfg.key, "Authorization": "Bearer " + cfg.key } }); var arr = await res.json(); if (!arr || !arr.length || !arr[0].dados) { mostrarErro("Nenhum dado na nuvem."); return; } var v = validarBackup(arr[0].dados); if (!v.ok) { mostrarErro("❌ " + v.erro); return; } DB = arr[0].dados; saveDB(); atualizarResumo(); alert("✅ Baixado!"); irPara('tela-inicio'); } catch (e) { mostrarErro("Erro: " + e.message); } }

function registrarLog(t, m) { try { var logs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]"); logs.push({ tipo: String(t).slice(0, 30), mensagem: String(m).slice(0, 200), data: new Date().toISOString() }); if (logs.length > 100) logs = logs.slice(-100); localStorage.setItem(LOG_KEY, JSON.stringify(logs)); atualizarLogUI(); } catch (e) { } }

function atualizarLogUI() { try { var el = $("log-erros-info"); if (!el) return; var logs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]"); var err = logs.filter(function (l) { return l.tipo === "erro"; }); el.textContent = err.length ? ("⚠️ " + err.length + " erro(s)") : "✅ Nenhum erro."; } catch (e) { } }

function verLogSeguranca() { try { var logs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]"); if (!logs.length) { alert("✅ Log limpo."); return; } var txt = "🛡️ LOG:\n\n"; logs.slice(-20).reverse().forEach(function (l) { txt += "[" + new Date(l.data).toLocaleString("pt-BR") + "] " + l.tipo + ": " + l.mensagem + "\n"; }); alert(txt); } catch (e) { mostrarErro("Erro ao ler log."); } }

function validarBackup(im) { if (!im || typeof im !== "object") return { ok: false, erro: "Backup inválido" }; if (!im.versao) return { ok: false, erro: "Sem versão" }; if (!Array.isArray(im.videos)) return { ok: false, erro: "Sem vídeos" }; if (!Array.isArray(im.produtos)) return { ok: false, erro: "Sem produtos" }; return { ok: true }; }

function fazerBackupAutomatico(m) { try { localStorage.setItem(BACKUP_AUTO_KEY, JSON.stringify({ data: new Date().toISOString(), motivo: m || "auto", dados: DB })); } catch (e) { } }

function restaurarBackupAutomatico() { try { var raw = localStorage.getItem(BACKUP_AUTO_KEY); if (!raw) { mostrarErro("Nenhum backup."); return; } var b = JSON.parse(raw); if (!b || !b.dados) { mostrarErro("Backup corrompido."); return; } if (!confirm("Restaurar backup de " + new Date(b.data).toLocaleString("pt-BR") + "?")) return; DB = b.dados; saveDB(); atualizarResumo(); alert("Restaurado! ✅"); irPara('tela-inicio'); } catch (e) { mostrarErro("Erro ao restaurar."); } }

function exportarDados() { try { fazerBackupAutomatico("antes_exportar"); var blob = new Blob([JSON.stringify(DB, null, 2)], { type: "application/json" }); var url = URL.createObjectURL(blob); var a = document.createElement("a"); a.href = url; a.download = "mikalive-backup-v10.json"; a.click(); URL.revokeObjectURL(url); } catch (e) { mostrarErro("Erro ao exportar."); } }

function importarDados(event) { var file = event.target.files[0]; if (!file) return; if (file.size > 5 * 1024 * 1024) { mostrarErro("Arquivo muito grande!"); event.target.value = ""; return; } var r = new FileReader(); r.onload = function () { try { var imp = JSON.parse(r.result); var v = validarBackup(imp); if (!v.ok) { mostrarErro("❌ " + v.erro); return; } fazerBackupAutomatico("antes_importar"); DB.videos = DB.videos.concat(imp.videos.filter(function (v) { return !DB.videos.some(function (x) { return x.id === v.id; }); })); if (imp.calendario) DB.calendario = imp.calendario; saveDB(); atualizarResumo(); alert("Importado!"); irPara('tela-inicio'); } catch (e) { mostrarErro("Erro ao importar."); } }; r.readAsText(file); event.target.value = ""; }

function getDBPadrao() { return { versao: "10", usuario: null, produtos: [], videos: [], calendario: [], comissoes: { reais: { total: 0, vendas: 0, lista: [] }, simuladas: { total: 0, vendas: 0, lista: [] } }, conexoes: { shop: { status: "nao_conectada" }, instagram: { status: "nao_conectada" }, youtube: { status: "nao_conectada", canal: "" } }, sync: { ultimaSync: null, pendente: false }, criadoEm: new Date().toISOString() }; }

function loadDB() { try { var raw = localStorage.getItem(DB_KEY); if (!raw) return getDBPadrao(); var p = JSON.parse(raw); if (!p || typeof p !== "object" || !Array.isArray(p.videos)) return getDBPadrao(); var base = getDBPadrao(); var out = Object.assign({}, base, p); out.comissoes = Object.assign({}, base.comissoes, p.comissoes || {}); if (!Array.isArray(out.calendario)) out.calendario = []; out.videos.forEach(function (v) { if (v.favorito === undefined) v.favorito = false; }); return out; } catch (e) { return getDBPadrao(); } }

function saveDB() { try { localStorage.setItem(DB_KEY, JSON.stringify(DB)); DB.sync.pendente = true; atualizarSyncUI(); } catch (e) { } }

function atualizarSyncUI() { var txt = $("sync-texto"); if (!txt) return; if (DB.sync && DB.sync.ultimaSync) { txt.innerText = "Última sync: " + new Date(DB.sync.ultimaSync).toLocaleString("pt-BR"); } else { txt.innerText = "Só neste dispositivo"; } }

var DB = loadDB();
