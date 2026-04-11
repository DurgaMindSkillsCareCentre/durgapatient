import { useState, useEffect, useCallback } from 'react'
import { db } from './supabaseClient.js'
import { THERAPY_TEMPLATES, TEMPLATE_NOTES, DIAGNOSES, GENDERS } from './data.js'
import profileImg from '/profile.jpg'

// ── Brand ──────────────────────────────────────────────────────
const C = {
  plum:'#5B2D8E', plumD:'#3D1A6E', plumL:'#7B4DB0',
  teal:'#0E9E8E', tealL:'#14BDB0',
  gold:'#C89B0A', rose:'#C0557A',
  bg:'#F5F0FA', card:'#FFFFFF',
  text:'#1A1030', muted:'#7B6B9A', border:'#DDD0F0',
}

// ── Credentials ────────────────────────────────────────────────
const PSY_PASS   = import.meta.env.VITE_PSY_PASS   || 'Durga@2024'
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'DPC@Admin2024'
const USERS = {
  psychologist: { pass: PSY_PASS,   role: 'psychologist', name: 'Psychologist' },
  admin:        { pass: ADMIN_PASS, role: 'admin',        name: 'D. Durga (Admin)' },
}

// ── Helpers ────────────────────────────────────────────────────
const fmtDate = (s) => s ? new Date(s).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'
const fmtDT   = (s) => s ? new Date(s).toLocaleString('en-IN',  { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' }) : '—'

// ── Global CSS ─────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html{font-size:16px;scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:${C.bg};color:${C.text};min-height:100vh;overflow-x:hidden}

/* ── Typography ── */
.serif{font-family:'Playfair Display',serif}
.muted{color:${C.muted}}
.small{font-size:12px}
.bold{font-weight:600}

/* ── Inputs ── */
.inp{
  width:100%;padding:12px 14px;border:1.5px solid ${C.border};border-radius:10px;
  font-family:'DM Sans',sans-serif;font-size:15px;color:${C.text};background:#fff;
  transition:border .18s,box-shadow .18s;margin-bottom:14px;appearance:none;
}
.inp:focus{outline:none;border-color:${C.plum};box-shadow:0 0 0 3px rgba(91,45,142,.12)}
textarea.inp{resize:vertical;min-height:120px;line-height:1.6}
select.inp{cursor:pointer;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%237B6B9A' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px}
.lbl{display:block;font-size:11px;font-weight:600;color:${C.muted};letter-spacing:.7px;text-transform:uppercase;margin-bottom:5px}

/* ── Buttons ── */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:11px 20px;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;cursor:pointer;border:none;transition:all .18s;text-decoration:none;white-space:nowrap}
.btn:active{transform:scale(.97)}
.btn-primary{background:${C.plum};color:#fff}
.btn-primary:hover{background:${C.plumL}}
.btn-teal{background:${C.teal};color:#fff}
.btn-teal:hover{background:${C.tealL}}
.btn-gold{background:${C.gold};color:#fff}
.btn-rose{background:${C.rose};color:#fff}
.btn-ghost{background:transparent;color:${C.plum};border:1.5px solid ${C.border}}
.btn-ghost:hover{border-color:${C.plum};background:${C.bg}}
.btn-danger{background:#E53E3E;color:#fff}
.btn-danger:hover{background:#C53030}
.btn-sm{padding:7px 14px;font-size:12px;border-radius:8px}
.btn-full{width:100%}
.btn-icon{padding:10px;border-radius:10px;min-width:42px}

/* ── Cards ── */
.card{background:#fff;border-radius:16px;border:1.5px solid ${C.border};overflow:hidden;margin-bottom:18px}
.card-hd{padding:16px 20px;border-bottom:1px solid ${C.border};display:flex;align-items:center;justify-content:space-between;gap:10px}
.card-bd{padding:20px}
.card-title{font-family:'Playfair Display',serif;font-size:18px;font-weight:700;color:${C.plum}}

/* ── Pills ── */
.pill{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;line-height:1.4}
.p-plum{background:#EDE7F6;color:${C.plum}}
.p-teal{background:#E0F7F5;color:${C.teal}}
.p-gold{background:#FFF8E1;color:#966B00}
.p-rose{background:#FCE4EC;color:${C.rose}}
.p-gray{background:#F0EEF5;color:${C.muted}}

/* ── Alert ── */
.alert{padding:12px 16px;border-radius:10px;font-size:13px;margin-bottom:14px;display:flex;align-items:flex-start;gap:8px}
.alert-err{background:#FFF0F0;border:1px solid #FFB3B3;color:#B71C1C}
.alert-ok{background:#F0FFF4;border:1px solid #9AE6B4;color:#1B5E20}

/* ── Overlay / Modal ── */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:500;display:flex;align-items:flex-end;padding:0}
@media(min-width:640px){.overlay{align-items:center;padding:20px}}
.modal{background:#fff;border-radius:20px 20px 0 0;width:100%;max-height:92vh;overflow-y:auto;padding-bottom:env(safe-area-inset-bottom)}
@media(min-width:640px){.modal{border-radius:20px;max-width:680px;margin:auto;max-height:90vh}}
.modal-hd{padding:18px 20px;border-bottom:1px solid ${C.border};display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#fff;z-index:10}
.modal-bd{padding:20px}
.close-btn{background:${C.bg};border:none;border-radius:8px;width:34px;height:34px;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:${C.muted};flex-shrink:0}

/* ── Header ── */
.app-header{
  background:linear-gradient(135deg,${C.plumD} 0%,${C.plum} 100%);
  padding:12px 16px;display:flex;align-items:center;gap:12px;
  position:sticky;top:0;z-index:200;
  box-shadow:0 2px 12px rgba(0,0,0,.25);
}
.hdr-photo{width:46px;height:46px;border-radius:50%;border:2px solid rgba(255,255,255,.4);object-fit:cover;flex-shrink:0}
.hdr-info{flex:1;min-width:0}
.hdr-org{font-family:'Playfair Display',serif;font-size:15px;font-weight:700;color:#fff;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hdr-name{font-size:11px;color:rgba(255,255,255,.8);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hdr-cred{font-size:10px;color:rgba(255,255,255,.6)}
.hdr-right{display:flex;align-items:center;gap:8px;flex-shrink:0}

/* ── Bottom Nav (mobile) ── */
.bottom-nav{
  position:fixed;bottom:0;left:0;right:0;
  background:#fff;border-top:1.5px solid ${C.border};
  display:flex;z-index:200;
  padding-bottom:env(safe-area-inset-bottom);
  box-shadow:0 -2px 12px rgba(91,45,142,.1);
}
.bnav-btn{flex:1;display:flex;flex-direction:column;align-items:center;padding:9px 0 7px;cursor:pointer;background:none;border:none;gap:3px;transition:all .18s}
.bnav-btn .bnav-icon{font-size:20px}
.bnav-btn .bnav-label{font-size:10px;font-weight:600;color:${C.muted};letter-spacing:.3px}
.bnav-btn.active .bnav-label{color:${C.plum}}
.bnav-btn.active .bnav-indicator{width:24px;height:3px;background:${C.plum};border-radius:2px;position:absolute;top:0}
.bnav-btn{position:relative}

/* ── Layout ── */
.main{padding:16px 14px 90px;max-width:900px;margin:0 auto}
@media(min-width:768px){.main{padding:24px 24px 32px}}

/* ── Stats grid ── */
.stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px}
@media(min-width:600px){.stats-grid{grid-template-columns:repeat(4,1fr)}}
.stat-card{background:#fff;border-radius:14px;padding:16px;border:1.5px solid ${C.border};text-align:center}
.stat-n{font-family:'Playfair Display',serif;font-size:32px;font-weight:700}
.stat-l{font-size:11px;color:${C.muted};font-weight:500;margin-top:2px}

/* ── Patient cards (mobile list) ── */
.pt-card{background:#fff;border-radius:14px;border:1.5px solid ${C.border};padding:14px 16px;margin-bottom:10px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:border-color .18s,box-shadow .18s}
.pt-card:hover,.pt-card:active{border-color:${C.plum};box-shadow:0 4px 16px rgba(91,45,142,.12)}
.pt-avatar{width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,${C.plum},${C.teal});display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:18px;flex-shrink:0;font-family:'Playfair Display',serif}
.pt-info{flex:1;min-width:0}
.pt-name{font-weight:600;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pt-meta{font-size:12px;color:${C.muted};margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pt-arrow{color:${C.muted};font-size:18px}

/* ── Table (desktop) ── */
@media(min-width:768px){
  .pt-card{display:none}
  .pt-table-wrap{display:block}
}
.pt-table-wrap{display:none}
.pt-table{width:100%;border-collapse:collapse}
.pt-table th{text-align:left;padding:10px 14px;font-size:11px;font-weight:600;color:${C.muted};letter-spacing:.7px;text-transform:uppercase;background:${C.bg};white-space:nowrap}
.pt-table td{padding:13px 14px;border-top:1px solid ${C.border};font-size:13px;vertical-align:middle}
.pt-table tr:hover td{background:${C.bg}}

/* ── Form grid ── */
.fg{display:grid;grid-template-columns:1fr;gap:0 16px}
@media(min-width:540px){.fg{grid-template-columns:1fr 1fr}}
.fg .full{grid-column:1/-1}
.fg-item{margin-bottom:0}

/* ── Search bar ── */
.search-wrap{position:relative;flex:1}
.search-wrap .inp{padding-left:38px;margin-bottom:0}
.search-ico{position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:16px;color:${C.muted};pointer-events:none}

/* ── Session ── */
.sess-item{border:1.5px solid ${C.border};border-radius:12px;padding:14px;margin-bottom:10px}
.sess-meta{font-size:11px;color:${C.muted};margin-bottom:8px;display:flex;gap:10px;flex-wrap:wrap;align-items:center}
.sess-note{font-size:13px;white-space:pre-wrap;line-height:1.7;color:${C.text}}

/* ── Template preview ── */
.tmpl-preview{background:${C.bg};border:1px solid ${C.border};border-radius:10px;padding:12px;font-size:12px;white-space:pre-wrap;line-height:1.6;color:${C.muted};max-height:160px;overflow-y:auto;margin-bottom:14px}

/* ── Login ── */
.login-bg{min-height:100vh;display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,${C.plumD},${C.plum} 55%,${C.teal});padding:20px}
.login-card{background:#fff;border-radius:22px;padding:36px 28px;width:100%;max-width:400px;box-shadow:0 32px 80px rgba(0,0,0,.3)}
.login-photo{width:80px;height:80px;border-radius:50%;border:3px solid ${C.plum};object-fit:cover;display:block;margin:0 auto 12px}
.rainbow{height:4px;border-radius:2px;background:linear-gradient(90deg,${C.plum},${C.teal},${C.gold},${C.rose});margin:14px 0 24px}

/* ── Divider ── */
.divider{height:1px;background:${C.border};margin:16px 0}

/* ── Tabs inside modal ── */
.tab-row{display:flex;border-bottom:1.5px solid ${C.border};margin-bottom:18px;gap:2px;overflow-x:auto}
.tab-btn{padding:10px 16px;border:none;background:none;cursor:pointer;font-size:13px;font-weight:500;color:${C.muted};white-space:nowrap;border-bottom:2px solid transparent;margin-bottom:-1.5px;transition:all .18s}
.tab-btn.active{color:${C.plum};border-bottom-color:${C.plum};font-weight:600}

/* ── FAB ── */
.fab{position:fixed;right:18px;bottom:82px;width:56px;height:56px;border-radius:50%;background:${C.plum};color:#fff;font-size:28px;border:none;box-shadow:0 4px 20px rgba(91,45,142,.4);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:100;transition:all .2s}
.fab:active{transform:scale(.93)}
@media(min-width:768px){.fab{display:none}}

/* ── Empty ── */
.empty{text-align:center;padding:48px 20px;color:${C.muted}}
.empty-icon{font-size:48px;margin-bottom:12px}

/* ── Admin table ── */
.adm-table{width:100%;border-collapse:collapse;font-size:12px}
.adm-table th,.adm-table td{padding:9px 12px;border:1px solid ${C.border}}
.adm-table th{background:${C.bg};font-weight:600;color:${C.muted};font-size:11px;text-transform:uppercase}

/* ── Scroll ── */
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:${C.border};border-radius:4px}

/* ── Toast ── */
.toast{position:fixed;top:80px;right:16px;left:16px;z-index:999;max-width:360px;margin:0 auto;animation:fadeIn .25s ease}
@media(min-width:600px){.toast{left:auto;right:20px;margin:0}}
@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}

/* ── Responsive tweaks ── */
.flex{display:flex;align-items:center}
.flex-wrap{flex-wrap:wrap}
.gap-8{gap:8px}
.gap-12{gap:12px}
.ml-auto{margin-left:auto}
.mb-14{margin-bottom:14px}
.mb-18{margin-bottom:18px}
.w-full{width:100%}
.overflow-auto{overflow-x:auto}
`

// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [user,     setUser]     = useState(null)
  const [tab,      setTab]      = useState('dashboard')
  const [patients, setPatients] = useState([])
  const [search,   setSearch]   = useState('')
  const [loading,  setLoading]  = useState(false)
  const [modal,    setModal]    = useState(null)  // null|'add'|'view'|'session'
  const [selected, setSelected] = useState(null)
  const [toast,    setToast]    = useState(null)
  const [sessionData, setSessionData] = useState([])

  const showToast = (msg, type='ok') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // ── Load patients ────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true)
    try { setPatients(await db.fetchPatients(search)) }
    catch(e) { showToast('Database error: ' + e.message, 'err') }
    finally { setLoading(false) }
  }, [search])

  useEffect(() => { if (user) load() }, [user, search, load])

  // ── Load sessions for selected patient ──────────────────────
  const loadSessions = async (pid) => {
    try { setSessionData(await db.fetchSessions(pid)) }
    catch(e) { showToast('Could not load sessions', 'err') }
  }

  const openPatient = async (p) => {
    setSelected(p)
    await loadSessions(p.id)
    setModal('view')
  }

  // ── CRUD ─────────────────────────────────────────────────────
  const addPatient = async (form) => {
    try {
      await db.addPatient(form)
      setModal(null)
      showToast('Patient registered ✓')
      load()
    } catch(e) { showToast(e.message, 'err') }
  }

  const updatePatient = async (id, form) => {
    try {
      const updated = await db.updatePatient(id, form)
      setSelected(updated)
      showToast('Record updated ✓')
      load()
    } catch(e) { showToast(e.message, 'err') }
  }

  const deletePatient = async (id) => {
    if (!window.confirm('Delete this patient? All session notes will also be deleted.')) return
    try {
      await db.deletePatient(id)
      setModal(null); setSelected(null)
      showToast('Patient deleted', 'err')
      load()
    } catch(e) { showToast(e.message, 'err') }
  }

  const addSession = async (pid, notes, template, therapist) => {
    try {
      await db.addSession({ patient_id: pid, notes, template, therapist })
      await loadSessions(pid)
      showToast('Session note saved ✓')
    } catch(e) { showToast(e.message, 'err') }
  }

  const deleteSession = async (sid, pid) => {
    if (!window.confirm('Delete this session note?')) return
    try {
      await db.deleteSession(sid)
      await loadSessions(pid)
      showToast('Session deleted', 'err')
    } catch(e) { showToast(e.message, 'err') }
  }

  // ── Auth guard ───────────────────────────────────────────────
  if (!user) return <LoginScreen onLogin={setUser} />

  const tabs = [
    { key:'dashboard', icon:'🏠', label:'Home' },
    { key:'patients',  icon:'👥', label:'Patients' },
    ...(user.role === 'admin' ? [{ key:'admin', icon:'⚙️', label:'Admin' }] : []),
  ]

  return (
    <>
      <style>{CSS}</style>

      {/* Toast */}
      {toast && (
        <div className="toast">
          <div className={`alert alert-${toast.type}`}>{toast.msg}</div>
        </div>
      )}

      {/* Header */}
      <header className="app-header">
        <img src={profileImg} className="hdr-photo" alt="D. Durga" />
        <div className="hdr-info">
          <div className="hdr-org">Durga Psychiatric Centre</div>
          <div className="hdr-name">D. Durga &nbsp;|&nbsp; DPN, DAHM, BBA, MBA, MSW</div>
          <div className="hdr-cred">Founder &amp; CEO</div>
        </div>
        <div className="hdr-right">
          <span style={{ fontSize:11, color:'rgba(255,255,255,.7)' }}>{user.name}</span>
          <button className="btn btn-sm" style={{ background:'rgba(255,255,255,.15)', color:'#fff', border:'1px solid rgba(255,255,255,.25)', padding:'6px 12px' }} onClick={() => setUser(null)}>Logout</button>
        </div>
      </header>

      {/* Main */}
      <main className="main">
        {tab === 'dashboard' && (
          <Dashboard patients={patients} onGoPatients={() => setTab('patients')} />
        )}
        {tab === 'patients' && (
          <PatientsTab
            patients={patients} search={search} setSearch={setSearch}
            loading={loading} onAdd={() => setModal('add')} onOpen={openPatient}
          />
        )}
        {tab === 'admin' && user.role === 'admin' && (
          <AdminPanel patients={patients} onDelete={deletePatient} />
        )}
      </main>

      {/* FAB – mobile add button */}
      {tab === 'patients' && (
        <button className="fab" onClick={() => setModal('add')}>+</button>
      )}

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        {tabs.map(t => (
          <button key={t.key} className={`bnav-btn ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
            {tab === t.key && <span className="bnav-indicator" />}
            <span className="bnav-icon">{t.icon}</span>
            <span className="bnav-label" style={{ color: tab === t.key ? C.plum : C.muted }}>{t.label}</span>
          </button>
        ))}
      </nav>

      {/* Modals */}
      {modal === 'add' && (
        <PatientFormModal title="Register New Patient" onClose={() => setModal(null)} onSave={addPatient} />
      )}
      {modal === 'view' && selected && (
        <PatientViewModal
          patient={selected} sessions={sessionData} user={user}
          onClose={() => { setModal(null); setSelected(null) }}
          onUpdate={(form) => updatePatient(selected.id, form)}
          onDelete={() => deletePatient(selected.id)}
          onAddSession={(notes, tmpl) => addSession(selected.id, notes, tmpl, user.name)}
          onDeleteSession={(sid) => deleteSession(sid, selected.id)}
        />
      )}
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
//  LOGIN
// ═══════════════════════════════════════════════════════════════
function LoginScreen({ onLogin }) {
  const [un, setUn] = useState('')
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')

  const handle = () => {
    const u = USERS[un.toLowerCase().trim()]
    if (!u || u.pass !== pw) { setErr('Incorrect username or password.'); return }
    onLogin(u)
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="login-bg">
        <div className="login-card">
          <img src={profileImg} className="login-photo" alt="D. Durga" />
          <h1 className="serif" style={{ textAlign:'center', fontSize:22, color:C.plum, lineHeight:1.3 }}>
            Durga Psychiatric Centre
          </h1>
          <p style={{ textAlign:'center', fontSize:13, color:C.muted, marginTop:4 }}>
            D. Durga &nbsp;·&nbsp; DPN, DAHM, BBA, MBA, MSW
          </p>
          <p style={{ textAlign:'center', fontSize:11, color:C.muted }}>Founder &amp; CEO</p>
          <div className="rainbow" />
          {err && <div className="alert alert-err">{err}</div>}
          <label className="lbl">Username</label>
          <input className="inp" placeholder="psychologist  or  admin" value={un} onChange={e => setUn(e.target.value)} onKeyDown={e => e.key==='Enter' && handle()} autoCapitalize="none" />
          <label className="lbl">Password</label>
          <input className="inp" type="password" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key==='Enter' && handle()} />
          <button className="btn btn-primary btn-full" style={{ marginTop:4 }} onClick={handle}>Sign In →</button>
          <p style={{ textAlign:'center', fontSize:11, color:'#bbb', marginTop:16 }}>
            🔒 Secure Clinical Records · Chennai
          </p>
        </div>
      </div>
    </>
  )
}

// ═══════════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════════
function Dashboard({ patients, onGoPatients }) {
  const diagMap = {}
  patients.forEach(p => { diagMap[p.diagnosis] = (diagMap[p.diagnosis]||0)+1 })
  const topDiag = Object.entries(diagMap).sort((a,b) => b[1]-a[1]).slice(0,5)

  const thisMonth = patients.filter(p => {
    try { return new Date(p.created_at).getMonth() === new Date().getMonth() } catch { return false }
  }).length

  return (
    <div>
      <h2 className="serif mb-18" style={{ fontSize:26, color:C.plum }}>Dashboard</h2>

      <div className="stats-grid">
        {[
          { n: patients.length, l:'Total Patients',    c:C.plum },
          { n: thisMonth,       l:'This Month',         c:C.teal },
          { n: topDiag.length,  l:'Diagnoses Tracked',  c:C.gold },
          { n: THERAPY_TEMPLATES.length, l:'Therapy Templates', c:C.rose },
        ].map(s => (
          <div className="stat-card" key={s.l}>
            <div className="stat-n" style={{ color:s.c }}>{s.n}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-hd"><span className="card-title">Top Diagnoses</span></div>
        <div className="card-bd">
          {topDiag.length === 0
            ? <p className="muted small">No patients yet. Register your first patient.</p>
            : topDiag.map(([d,n]) => (
              <div key={d} style={{ marginBottom:12 }}>
                <div className="flex gap-8 mb-14" style={{ marginBottom:4 }}>
                  <span style={{ fontSize:13, flex:1 }}>{d}</span>
                  <span className="bold small" style={{ color:C.plum }}>{n}</span>
                </div>
                <div style={{ height:6, background:C.border, borderRadius:3 }}>
                  <div style={{ height:6, background:C.plum, borderRadius:3, width:`${(n/patients.length)*100}%`, transition:'width .4s' }} />
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="card">
        <div className="card-hd"><span className="card-title">Quick Actions</span></div>
        <div className="card-bd" style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <button className="btn btn-primary btn-full" onClick={onGoPatients}>👥 View All Patients</button>
          <button className="btn btn-teal btn-full" onClick={onGoPatients}>+ Register New Patient</button>
          <div className="divider" />
          <p className="small muted">📞 +91 93422 65841 | +91 73959 44527</p>
          <p className="small muted">🌐 www.durgacounselingcentre.com</p>
          <p className="small muted">🌐 www.durgamindskillcare.in</p>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  PATIENTS LIST
// ═══════════════════════════════════════════════════════════════
function PatientsTab({ patients, search, setSearch, loading, onAdd, onOpen }) {
  return (
    <div>
      <div className="flex gap-8 mb-18 flex-wrap">
        <h2 className="serif" style={{ fontSize:24, color:C.plum }}>Patients</h2>
        <div className="ml-auto flex gap-8">
          <div className="search-wrap">
            <span className="search-ico">🔍</span>
            <input className="inp" placeholder="Search name / mobile / diagnosis…" value={search} onChange={e => setSearch(e.target.value)} style={{ margin:0 }} />
          </div>
          <button className="btn btn-primary" onClick={onAdd} style={{ whiteSpace:'nowrap' }}>+ Add</button>
        </div>
      </div>

      {loading && <p className="muted small" style={{ textAlign:'center', padding:24 }}>Loading…</p>}

      {!loading && patients.length === 0 && (
        <div className="empty">
          <div className="empty-icon">🗂️</div>
          <p>No patients found. Tap <strong>+ Add</strong> to register one.</p>
        </div>
      )}

      {/* Mobile cards */}
      {patients.map(p => (
        <div className="pt-card" key={p.id} onClick={() => onOpen(p)}>
          <div className="pt-avatar">{p.name.charAt(0).toUpperCase()}</div>
          <div className="pt-info">
            <div className="pt-name">{p.name}</div>
            <div className="pt-meta">{p.patient_code} · {p.mobile}</div>
            <div className="pt-meta" style={{ marginTop:2 }}>
              <span className="pill p-plum">{p.diagnosis?.slice(0,30)}{p.diagnosis?.length>30?'…':''}</span>
            </div>
          </div>
          <span className="pt-arrow">›</span>
        </div>
      ))}

      {/* Desktop table */}
      <div className="pt-table-wrap">
        <div className="card" style={{ marginTop:0 }}>
          <div className="overflow-auto">
            <table className="pt-table">
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Mobile</th>
                  <th>Diagnosis</th><th>Therapy</th><th>Registered</th><th></th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id}>
                    <td><span className="pill p-plum">{p.patient_code}</span></td>
                    <td className="bold">{p.name}</td>
                    <td>{p.mobile}</td>
                    <td style={{ maxWidth:200, fontSize:12 }}>{p.diagnosis}</td>
                    <td><span className="pill p-gold">{p.therapy_tmpl || 'MANUAL'}</span></td>
                    <td className="small muted">{fmtDate(p.created_at)}</td>
                    <td><button className="btn btn-ghost btn-sm" onClick={() => onOpen(p)}>Open →</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {patients.length === 0 && !loading && (
              <div className="empty"><div className="empty-icon">🗂️</div><p>No patients found.</p></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  PATIENT FORM MODAL
// ═══════════════════════════════════════════════════════════════
function PatientFormModal({ title, initial={}, onClose, onSave }) {
  const [form, setForm] = useState({
    name:'', dob:'', gender:'', mobile:'', alt_mobile:'',
    address:'', city:'Chennai', state:'Tamil Nadu', pincode:'',
    diagnosis:'', therapy_tmpl:'MANUAL', referred_by:'', notes:'',
    ...initial
  })
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const set = (k,v) => setForm(f => ({ ...f, [k]:v }))

  const save = async () => {
    if (!form.name.trim())      { setErr('Patient name is required.'); return }
    if (!form.mobile.trim())    { setErr('Mobile number is required.'); return }
    if (!form.diagnosis.trim()) { setErr('Please select a diagnosis.'); return }
    setBusy(true)
    await onSave(form)
    setBusy(false)
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-hd">
          <span className="card-title">{title}</span>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-bd">
          {err && <div className="alert alert-err">{err}</div>}
          <div className="fg">
            <div className="fg-item full">
              <label className="lbl">Full Name *</label>
              <input className="inp" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Patient's full name" />
            </div>
            <div className="fg-item">
              <label className="lbl">Date of Birth</label>
              <input className="inp" type="date" value={form.dob} onChange={e=>set('dob',e.target.value)} />
            </div>
            <div className="fg-item">
              <label className="lbl">Gender</label>
              <select className="inp" value={form.gender} onChange={e=>set('gender',e.target.value)}>
                <option value="">Select</option>
                {GENDERS.map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="fg-item">
              <label className="lbl">Mobile *</label>
              <input className="inp" value={form.mobile} onChange={e=>set('mobile',e.target.value)} placeholder="+91 XXXXX XXXXX" type="tel" />
            </div>
            <div className="fg-item">
              <label className="lbl">Alternate Mobile</label>
              <input className="inp" value={form.alt_mobile} onChange={e=>set('alt_mobile',e.target.value)} placeholder="Optional" type="tel" />
            </div>
            <div className="fg-item full">
              <label className="lbl">Address</label>
              <input className="inp" value={form.address} onChange={e=>set('address',e.target.value)} placeholder="Door No., Street, Area" />
            </div>
            <div className="fg-item">
              <label className="lbl">City</label>
              <input className="inp" value={form.city} onChange={e=>set('city',e.target.value)} />
            </div>
            <div className="fg-item">
              <label className="lbl">State</label>
              <input className="inp" value={form.state} onChange={e=>set('state',e.target.value)} />
            </div>
            <div className="fg-item">
              <label className="lbl">Pincode</label>
              <input className="inp" value={form.pincode} onChange={e=>set('pincode',e.target.value)} placeholder="600001" type="number" />
            </div>
            <div className="fg-item">
              <label className="lbl">Referred By</label>
              <input className="inp" value={form.referred_by} onChange={e=>set('referred_by',e.target.value)} placeholder="Doctor / Self / Walk-in" />
            </div>
            <div className="fg-item full">
              <label className="lbl">Primary Diagnosis *</label>
              <select className="inp" value={form.diagnosis} onChange={e=>set('diagnosis',e.target.value)}>
                <option value="">— Select Diagnosis —</option>
                {DIAGNOSES.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="fg-item full">
              <label className="lbl">Psychotherapy Approach</label>
              <select className="inp" value={form.therapy_tmpl} onChange={e=>set('therapy_tmpl',e.target.value)}>
                {['General','Relationship','Sexual Health','Specialty'].map(cat => (
                  <optgroup key={cat} label={`── ${cat} ──`}>
                    {THERAPY_TEMPLATES.filter(t=>t.cat===cat).map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="fg-item full">
              <label className="lbl">Initial Notes</label>
              <textarea className="inp" value={form.notes} onChange={e=>set('notes',e.target.value)} placeholder="Chief complaint, presenting concerns…" />
            </div>
          </div>
          <div className="flex gap-8" style={{ justifyContent:'flex-end', marginTop:8 }}>
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={save} disabled={busy}>{busy ? 'Saving…' : '💾 Save Patient'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  PATIENT VIEW MODAL
// ═══════════════════════════════════════════════════════════════
function PatientViewModal({ patient, sessions, user, onClose, onUpdate, onDelete, onAddSession, onDeleteSession }) {
  const [tab, setTab] = useState('profile')
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...patient })
  const [noteText, setNoteText] = useState('')
  const [tmpl, setTmpl] = useState(patient.therapy_tmpl || 'MANUAL')
  const [busy, setBusy] = useState(false)

  const setF = (k,v) => setForm(f => ({ ...f, [k]:v }))

  const saveEdit = async () => {
    setBusy(true)
    await onUpdate(form)
    setEditing(false)
    setBusy(false)
  }

  const saveNote = async () => {
    if (!noteText.trim()) return
    setBusy(true)
    await onAddSession(noteText, tmpl)
    setNoteText('')
    setBusy(false)
  }

  const useTmpl = () => setNoteText(TEMPLATE_NOTES[tmpl] || TEMPLATE_NOTES['MANUAL'])

  const info = (l, v) => (
    <div key={l} style={{ marginBottom:12 }}>
      <div className="lbl" style={{ marginBottom:2 }}>{l}</div>
      <div style={{ fontSize:14, fontWeight:500 }}>{v || '—'}</div>
    </div>
  )

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-hd">
          <div style={{ flex:1, minWidth:0 }}>
            <div className="card-title" style={{ whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{patient.name}</div>
            <div className="flex gap-8" style={{ marginTop:4, flexWrap:'wrap' }}>
              <span className="pill p-plum">{patient.patient_code}</span>
              <span className="pill p-teal" style={{ fontSize:10 }}>{patient.diagnosis?.slice(0,24)}{patient.diagnosis?.length>24?'…':''}</span>
            </div>
          </div>
          <div className="flex gap-8">
            <button className="btn btn-danger btn-sm" onClick={onDelete}>🗑️</button>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal-bd">
          {/* Tabs */}
          <div className="tab-row">
            {['profile','note','history'].map(t => (
              <button key={t} className={`tab-btn ${tab===t?'active':''}`} onClick={() => { setTab(t); setEditing(false) }}>
                {t==='profile'?'👤 Profile':t==='note'?'📝 Add Session':'📋 History ('+sessions.length+')'}
              </button>
            ))}
          </div>

          {/* ── Profile ── */}
          {tab==='profile' && !editing && (
            <>
              <div className="fg">
                {info('Patient ID', patient.patient_code)}
                {info('Name', patient.name)}
                {info('Date of Birth', patient.dob ? fmtDate(patient.dob) : null)}
                {info('Gender', patient.gender)}
                {info('Mobile', patient.mobile)}
                {info('Alt. Mobile', patient.alt_mobile)}
                {info('Address', [patient.address, patient.city, patient.state, patient.pincode].filter(Boolean).join(', '))}
                {info('Diagnosis', patient.diagnosis)}
                {info('Therapy', THERAPY_TEMPLATES.find(t=>t.value===patient.therapy_tmpl)?.label || patient.therapy_tmpl)}
                {info('Referred By', patient.referred_by)}
                {info('Initial Notes', patient.notes)}
                {info('Registered', fmtDT(patient.created_at))}
              </div>
              <button className="btn btn-ghost btn-full" onClick={() => setEditing(true)}>✏️ Edit Patient</button>
            </>
          )}

          {/* ── Edit ── */}
          {tab==='profile' && editing && (
            <div className="fg">
              {['name','mobile','alt_mobile','address','city','state','pincode','referred_by'].map(k => (
                <div className="fg-item" key={k}>
                  <label className="lbl">{k.replace('_',' ')}</label>
                  <input className="inp" value={form[k]||''} onChange={e=>setF(k,e.target.value)} />
                </div>
              ))}
              <div className="fg-item full">
                <label className="lbl">Diagnosis</label>
                <select className="inp" value={form.diagnosis} onChange={e=>setF('diagnosis',e.target.value)}>
                  {DIAGNOSES.map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="fg-item full">
                <label className="lbl">Therapy Template</label>
                <select className="inp" value={form.therapy_tmpl} onChange={e=>setF('therapy_tmpl',e.target.value)}>
                  {THERAPY_TEMPLATES.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div className="fg-item full">
                <label className="lbl">Notes</label>
                <textarea className="inp" value={form.notes||''} onChange={e=>setF('notes',e.target.value)} />
              </div>
              <div className="fg-item full flex gap-8" style={{ justifyContent:'flex-end' }}>
                <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={saveEdit} disabled={busy}>{busy?'Saving…':'💾 Save'}</button>
              </div>
            </div>
          )}

          {/* ── Add Session Note ── */}
          {tab==='note' && (
            <div>
              <label className="lbl">Therapy Template</label>
              <select className="inp" value={tmpl} onChange={e=>setTmpl(e.target.value)}>
                {['General','Relationship','Sexual Health','Specialty'].map(cat => (
                  <optgroup key={cat} label={`── ${cat} ──`}>
                    {THERAPY_TEMPLATES.filter(t=>t.cat===cat).map(t=>(
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <div className="flex gap-8 mb-14">
                <p className="small muted" style={{ flex:1 }}>Template preview (tap to load into notes):</p>
                <button className="btn btn-ghost btn-sm" onClick={useTmpl}>📋 Load Template</button>
              </div>
              <div className="tmpl-preview">{TEMPLATE_NOTES[tmpl] || TEMPLATE_NOTES['MANUAL']}</div>

              <label className="lbl">Session Notes</label>
              <textarea className="inp" rows={12} value={noteText}
                placeholder="Type or tap 'Load Template' above to auto-fill the structured note…"
                onChange={e=>setNoteText(e.target.value)} />

              <button className="btn btn-teal btn-full" onClick={saveNote} disabled={busy}>
                {busy ? 'Saving…' : '💾 Save Session Note'}
              </button>
            </div>
          )}

          {/* ── History ── */}
          {tab==='history' && (
            <div>
              {sessions.length === 0
                ? <div className="empty"><div className="empty-icon">📋</div><p>No session notes yet.</p></div>
                : sessions.map(s => (
                  <div className="sess-item" key={s.id}>
                    <div className="sess-meta">
                      <span>📅 {fmtDT(s.session_date || s.created_at)}</span>
                      <span>👤 {s.therapist}</span>
                      {s.template && <span className="pill p-gold">{s.template}</span>}
                      <button className="btn btn-danger btn-sm" style={{ marginLeft:'auto', padding:'3px 8px', fontSize:11 }}
                        onClick={() => onDeleteSession(s.id)}>🗑️</button>
                    </div>
                    <div className="sess-note">{s.notes}</div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
//  ADMIN PANEL
// ═══════════════════════════════════════════════════════════════
function AdminPanel({ patients, onDelete }) {
  const exportCSV = () => {
    const header = 'Patient ID,Name,Mobile,Gender,DOB,Address,City,State,Diagnosis,Therapy,Referred By,Registered\n'
    const rows = patients.map(p =>
      [p.patient_code,p.name,p.mobile,p.gender,p.dob,p.address,p.city,p.state,p.diagnosis,p.therapy_tmpl,p.referred_by,fmtDate(p.created_at)]
        .map(v=>`"${(v||'').replace(/"/g,'""')}"`)
        .join(',')
    ).join('\n')
    const blob = new Blob([header+rows], { type:'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `DPC_Patients_${new Date().toLocaleDateString('en-IN').replace(/\//g,'-')}.csv`
    a.click()
  }

  return (
    <div>
      <div className="flex gap-8 mb-18 flex-wrap">
        <h2 className="serif" style={{ fontSize:26, color:C.plum }}>Admin Panel</h2>
        <button className="btn btn-gold ml-auto" onClick={exportCSV}>⬇️ Export CSV</button>
      </div>

      <div className="stats-grid" style={{ marginBottom:18 }}>
        <div className="stat-card"><div className="stat-n" style={{ color:C.plum }}>{patients.length}</div><div className="stat-l">Total Patients</div></div>
        <div className="stat-card"><div className="stat-n" style={{ color:C.teal }}>32</div><div className="stat-l">Therapy Templates</div></div>
      </div>

      <div className="card">
        <div className="card-hd">
          <span className="card-title">All Patients</span>
          <span className="small muted">{patients.length} records</span>
        </div>
        <div className="overflow-auto">
          <table className="adm-table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Mobile</th><th>Diagnosis</th><th>Registered</th><th>Action</th></tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id}>
                  <td><span className="pill p-plum">{p.patient_code}</span></td>
                  <td className="bold">{p.name}</td>
                  <td>{p.mobile}</td>
                  <td style={{ maxWidth:180 }}>{p.diagnosis}</td>
                  <td>{fmtDate(p.created_at)}</td>
                  <td><button className="btn btn-danger btn-sm" onClick={()=>onDelete(p.id)}>Delete</button></td>
                </tr>
              ))}
              {patients.length===0 && (
                <tr><td colSpan={6} style={{ textAlign:'center', padding:24, color:C.muted }}>No patients yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-hd"><span className="card-title">Login Credentials</span></div>
        <div className="card-bd">
          <table className="adm-table">
            <thead><tr><th>Role</th><th>Username</th><th>Password (change in .env)</th><th>Access Level</th></tr></thead>
            <tbody>
              <tr><td>Psychologist</td><td>psychologist</td><td>Durga@2024</td><td>Full CRUD – All Patients</td></tr>
              <tr><td>Admin (D. Durga)</td><td>admin</td><td>DPC@Admin2024</td><td>Full Access + Export CSV</td></tr>
            </tbody>
          </table>
          <p className="small muted" style={{ marginTop:10 }}>⚠️ Update passwords in <code>.env</code> file before going live on Netlify.</p>
        </div>
      </div>
    </div>
  )
}
