import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #fdf8f5; --card: #fff; --rose: #c97a8a; --rose-light: #f5e6ea;
    --rose-mid: #e8b4be; --gold: #c4906a; --green: #7a9e7e; --blue: #7a9ab5;
    --navy: #3d2b35; --text: #3d2b35; --muted: #9e8a8e; --radius: 14px;
  }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }
  .app { min-height: 100vh; }
  .header { background: var(--navy); color: white; padding: 16px 20px 12px; position: sticky; top: 0; z-index: 100; }
  .header-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .header h1 { font-family: 'Playfair Display', serif; font-size: 1.2rem; font-weight: 900; }
  .subtitle { font-size: .68rem; color: rgba(255,255,255,.45); letter-spacing: .09em; text-transform: uppercase; }
  .nav { display: flex; gap: 5px; flex-wrap: wrap; }
  .nav-btn { background: rgba(255,255,255,.08); color: rgba(255,255,255,.65); border: 1px solid rgba(255,255,255,.12); padding: 5px 11px; border-radius: 20px; cursor: pointer; font-family: 'DM Sans',sans-serif; font-size: .76rem; font-weight: 500; transition: all .2s; }
  .nav-btn.active { background: var(--rose); color: white; border-color: var(--rose); font-weight: 700; }
  .content { flex: 1; padding: 16px 14px; max-width: 860px; margin: 0 auto; width: 100%; }
  .note-card { background: var(--card); border-radius: var(--radius); padding: 14px; margin-bottom: 12px; box-shadow: 0 2px 12px rgba(201,122,138,.08); border-left: 4px solid var(--navy); }
  .note-card.grammar { border-left-color: var(--green); }
  .note-card.vocab { border-left-color: var(--blue); }
  .note-card.error { border-left-color: var(--rose); }
  .note-date { font-size: .66rem; color: var(--muted); font-weight: 700; letter-spacing: .06em; text-transform: uppercase; margin-bottom: 3px; }
  .note-title { font-family: 'Playfair Display',serif; font-size: .95rem; font-weight: 700; color: var(--navy); margin-bottom: 7px; }
  .tag { display: inline-block; padding: 2px 8px; border-radius: 20px; font-size: .67rem; font-weight: 600; margin-right: 3px; margin-bottom: 3px; }
  .tag-grammar { background: #e8f2e8; color: var(--green); }
  .tag-vocab { background: #e5eef5; color: var(--blue); }
  .tag-error { background: var(--rose-light); color: var(--rose); }
  .conj-table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: .79rem; }
  .conj-table th { background: var(--navy); color: white; padding: 6px 9px; text-align: left; font-weight: 600; font-size: .76rem; }
  .conj-table td { padding: 5px 9px; border-bottom: 1px solid #f5ece8; }
  .conj-table tr:last-child td { border-bottom: none; }
  .conj-table tr:nth-child(even) td { background: #fdf5f2; }
  .error-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px; padding: 8px; background: #fdf8f6; border-radius: 10px; }
  .error-wrong { background: #fff0f2; border-radius: 8px; padding: 7px 9px; }
  .error-correct { background: #f0f7f0; border-radius: 8px; padding: 7px 9px; }
  .error-label { font-size: .64rem; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; margin-bottom: 2px; }
  .error-text { font-size: .84rem; font-style: italic; }
  .error-reason { font-size: .75rem; color: var(--muted); margin-top: 4px; font-style: italic; grid-column: 1/-1; }
  .vocab-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); gap: 7px; margin-top: 7px; }
  .vocab-item { background: #fdf5f2; border-radius: 10px; padding: 9px 11px; border: 1px solid #f5e6e0; }
  .vocab-fr { font-size: .88rem; font-style: italic; color: var(--blue); font-weight: 600; margin-bottom: 2px; }
  .vocab-zh { font-size: .8rem; color: var(--text); margin-bottom: 2px; }
  .vocab-ex { font-size: .71rem; color: var(--muted); font-style: italic; }
  .stat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; margin-bottom: 14px; }
  .stat-card { background: var(--card); border-radius: var(--radius); padding: 12px; box-shadow: 0 2px 10px rgba(201,122,138,.08); text-align: center; }
  .stat-num { font-family: 'Playfair Display',serif; font-size: 1.8rem; font-weight: 900; color: var(--rose); }
  .stat-label { font-size: .7rem; color: var(--muted); margin-top: 2px; }
  .filter-bar { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 12px; }
  .filter-btn { background: var(--card); border: 1.5px solid #e8d8d4; border-radius: 20px; padding: 3px 11px; font-size: .72rem; cursor: pointer; font-family: 'DM Sans',sans-serif; transition: all .2s; color: var(--muted); }
  .filter-btn.active { background: var(--navy); color: white; border-color: var(--navy); font-weight: 600; }
  .add-btn { background: var(--rose); color: white; border: none; border-radius: 8px; padding: 7px 14px; cursor: pointer; font-size: .79rem; font-family: 'DM Sans',sans-serif; font-weight: 700; }
  .big-btn { background: var(--navy); color: white; border: none; border-radius: 10px; padding: 10px 20px; cursor: pointer; font-size: .88rem; font-family: 'DM Sans',sans-serif; font-weight: 600; width: 100%; margin-top: 6px; }
  .check-btn { background: var(--navy); color: white; border: none; border-radius: 8px; padding: 6px 13px; cursor: pointer; font-size: .79rem; font-family: 'DM Sans',sans-serif; font-weight: 500; margin-top: 5px; }
  .form-input { width: 100%; border: 1.5px solid #e8d8d4; border-radius: 8px; padding: 7px 11px; font-size: .83rem; font-family: 'DM Sans',sans-serif; outline: none; margin-bottom: 7px; background: #fdf8f5; }
  .form-input:focus { border-color: var(--rose); }
  .form-label { font-size: .71rem; font-weight: 600; color: var(--navy); margin-bottom: 3px; display: block; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .modal-overlay { position: fixed; inset: 0; background: rgba(61,43,53,.45); z-index: 200; display: flex; align-items: flex-end; }
  .modal { background: var(--bg); border-radius: 18px 18px 0 0; padding: 18px; width: 100%; max-height: 80vh; overflow-y: auto; }
  .modal-title { font-family: 'Playfair Display',serif; font-size: 1.05rem; font-weight: 700; color: var(--navy); margin-bottom: 14px; }
  .modal-close { float: right; background: none; border: none; font-size: 1.1rem; cursor: pointer; color: var(--muted); }
  .exo-wrap { background: #fdf5f2; border-radius: 10px; padding: 12px; margin-bottom: 10px; border: 1px solid #f0e0da; }
  .exo-type { font-size: .65rem; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--gold); margin-bottom: 4px; }
  .exo-q { font-size: .86rem; font-weight: 600; margin-bottom: 8px; line-height: 1.5; }
  .opt-btn { display: block; width: 100%; background: white; border: 1.5px solid #e8d8d4; border-radius: 8px; padding: 6px 12px; text-align: left; cursor: pointer; font-size: .83rem; font-family: 'DM Sans',sans-serif; transition: all .2s; margin-bottom: 4px; }
  .opt-btn.correct { background: #edf7ed; border-color: var(--green); color: var(--green); font-weight: 600; }
  .opt-btn.wrong { background: var(--rose-light); border-color: var(--rose); color: var(--rose); }
  .opt-btn:disabled { cursor: default; }
  .feedback { margin-top: 6px; padding: 6px 10px; border-radius: 8px; font-size: .8rem; }
  .feedback.correct { background: #edf7ed; color: var(--green); }
  .feedback.wrong { background: var(--rose-light); color: var(--rose); }
  .fill-input { border: 1.5px solid #e8d8d4; border-radius: 8px; padding: 5px 9px; font-size: .84rem; font-family: 'DM Sans',sans-serif; outline: none; min-width: 120px; background: white; }
  .fill-input.correct { border-color: var(--green); background: #edf7ed; }
  .fill-input.wrong { border-color: var(--rose); background: var(--rose-light); }
  .streak-bar { display: flex; gap: 4px; margin: 10px 0; }
  .streak-day { width: 26px; height: 26px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: .67rem; font-weight: 700; }
  .streak-day.done { background: var(--green); color: white; }
  .streak-day.today { background: var(--rose); color: white; }
  .streak-day.empty { background: rgba(255,255,255,.12); color: rgba(255,255,255,.35); }
  .api-box { background: #fdf0f2; border-radius: 10px; padding: 11px 13px; margin-bottom: 12px; border: 1px solid #f0d0d8; }
  .api-input { width: 100%; border: 1px solid #e8d0d5; border-radius: 8px; padding: 6px 9px; font-size: .82rem; font-family: 'DM Sans',sans-serif; outline: none; background: white; }
  .checklist-wrap { background: var(--card); border-radius: var(--radius); padding: 14px 16px; box-shadow: 0 2px 10px rgba(201,122,138,.08); margin-bottom: 14px; }
  .checklist-title { font-size: .7rem; font-weight: 700; color: var(--navy); margin-bottom: 10px; letter-spacing: .05em; text-transform: uppercase; }
  .checklist-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f5ece8; cursor: pointer; }
  .checklist-item:last-child { border-bottom: none; }
  .check-circle { width: 22px; height: 22px; min-width: 22px; border-radius: 50%; border: 2px solid #e8d0d5; display: flex; align-items: center; justify-content: center; transition: all .2s; background: white; }
  .check-circle.checked { background: var(--rose); border-color: var(--rose); }
  .check-label { font-size: .88rem; flex: 1; transition: all .2s; }
  .check-label.checked { color: var(--muted); text-decoration: line-through; }
  .check-custom-input { border: none; background: transparent; font-size: .88rem; font-family: 'DM Sans',sans-serif; outline: none; flex: 1; color: var(--text); }
  .check-custom-input::placeholder { color: #ccc; }
  .progress-row { display: flex; align-items: center; gap: 8px; margin-top: 10px; }
  .progress-bar { flex: 1; height: 5px; background: #f0e0da; border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--rose); border-radius: 3px; transition: width .4s ease; }
  .progress-text { font-size: .72rem; color: var(--muted); min-width: 35px; text-align: right; }
`;

const GRAMMAR=[{id:"g001",date:"05/12",type:"grammar",title:"反身動詞（Verbes pronominaux）",tags:["反身動詞","複合過去式"],rules:["結構：se + 動詞，表示「自己對自己做某件事」","複合過去式永遠用 être 作助動詞","PP 需配合主詞性別：levé(m) / levée(f)","身體部位後置時 PP 不配合性別：je me suis brossé les dents ✓","否定：ne + 反身代名詞 + suis + pas + PP"],table:{headers:["主詞","反身代名詞","現在式","複合過去式（f）"],rows:[["je","me (m')","je me lève","je me suis levée"],["tu","te (t')","tu te lèves","tu t'es levée"],["il/elle","se (s')","il se lève","elle s'est levée"],["nous","nous","nous nous levons","nous nous sommes levées"],["vous","vous","vous vous levez","vous vous êtes levées"],["ils/elles","se (s')","ils se lèvent","elles se sont levées"]]},myExamples:["Je me suis levée à onze heures aujourd'hui.","Je me suis démaquillée et brossé les dents pendant la douche.","Je me suis endormie à deux heures.","Je me suis fait les ongles."]},{id:"g002",date:"05/12",type:"grammar",title:"複合過去式：avoir vs être",tags:["複合過去式","avoir","être"],rules:["avoir + PP：一般動詞（manger→mangé, voir→vu, prendre→pris）","avoir 的 PP 不配合主詞性別","être + PP：VANDERTRAMP 14個位移動詞 + 所有反身動詞","être 的 PP 一定配合主詞性別"],myExamples:["J'ai étudié le français avec toi hier soir. ✓（avoir，PP不加e）","Je me suis endormie à deux heures. ✓（être，反身動詞）","Je suis encore allée chez le docteur ce soir. ✓（être，aller）"]},{id:"g003",date:"05/13",type:"grammar",title:"現在式 vs 複合過去式",tags:["現在式","複合過去式","時態"],rules:["現在式 = 習慣、事實（tous les jours）","複合過去式 = 某一次、已完成（hier, ce matin）","avant 後通常接 imparfait（三級會學）→ 先記：j'étais","身體感覺永遠用 avoir（j'ai faim/soif/chaud/froid）"],myExamples:["Je me maquille le matin.（習慣）","Mais hier je ne me suis pas maquillée.（某一次）","J'ai toujours trop faim.（avoir，不是 être）"]},{id:"g004",date:"05/13",type:"grammar",title:"encore / déjà / toujours / ne...plus",tags:["副詞"],rules:["déjà = 已經","encore = 還/又","toujours = 一直/還是","ne...plus = 不再"],myExamples:["J'ai déjà fini le travail aujourd'hui.","Je suis encore malade.","J'ai toujours trop faim.","Je ne suis plus anxieuse."]},{id:"g005",date:"05/14",type:"grammar",title:"imparfait 未完成過去式（入門）",tags:["imparfait","時態"],rules:["過去持續的狀態/習慣用 imparfait，不用 PC","avant 後面通常接 imparfait","現在先記：j'étais = 我以前是"],myExamples:["Avant, j'étais fermée, mais maintenant je suis plus ouverte. ✓","⚠️ Avant, j'ai été fermée. ✗（持續狀態不用PC）"]},{id:"g006",date:"05/14",type:"grammar",title:"比較級：plus / moins / mieux",tags:["比較級","形容詞","副詞"],rules:["形容詞「更...」→ plus + 形容詞：je suis plus patiente","形容詞「比較不...」→ moins + 形容詞：je suis moins anxieuse","名詞「更多...」→ plus de + 名詞：j'ai plus de patience","動詞「更好」→ mieux（不是 plus bien）：je vais mieux","⚠️ mieux 只修飾動詞，不修飾形容詞"],myExamples:["Avant, j'étais très fermée, mais maintenant je suis plus ouverte.","Avant, j'étais impatiente, mais maintenant je suis plus patiente.","Je vais mieux aujourd'hui !"]}];
const VOCAB=[{id:"v001",date:"05/13",type:"vocab",title:"個性形容詞",tags:["個性","形容詞"],items:[{fr:"timide",zh:"害羞",ex:"Avant, j'étais timide."},{fr:"ouvert(e)",zh:"開朗/開放",ex:"Je suis plus ouverte aux autres."},{fr:"fermé(e)",zh:"封閉/內斂",ex:"Avant, j'étais très fermée."},{fr:"sociable",zh:"愛社交",ex:"Je suis plus sociable."},{fr:"sérieux/sérieuse",zh:"認真",ex:"Elle est très sérieuse."},{fr:"curieux/curieuse",zh:"好奇",ex:"Je suis curieuse de tout !"},{fr:"patient(e)",zh:"有耐心",ex:"Maintenant je suis plus patiente."},{fr:"anxieux/anxieuse",zh:"焦慮",ex:"Je ne suis plus anxieuse."},{fr:"confiant(e)",zh:"有自信",ex:"Elle est très confiante."},{fr:"indépendant(e)",zh:"獨立",ex:"Je suis très indépendante."},{fr:"sensible",zh:"敏感",ex:"Il est très sensible."},{fr:"optimiste",zh:"樂觀",ex:"Avant j'étais optimiste."},{fr:"pessimiste",zh:"悲觀",ex:"Maintenant un peu pessimiste."}]},{id:"v002",date:"05/12",type:"vocab",title:"反身動詞：日常作息",tags:["反身動詞","日常"],items:[{fr:"se lever",zh:"起床",ex:"Je me suis levée à 9h."},{fr:"se coucher",zh:"就寢",ex:"Je me couche tard."},{fr:"s'endormir",zh:"睡著",ex:"Je me suis endormie à 2h."},{fr:"s'habiller",zh:"穿衣服",ex:"Je me suis habillée vite."},{fr:"se doucher",zh:"淋浴",ex:"Je me suis douchée."},{fr:"se maquiller",zh:"化妝",ex:"Je me maquille le matin."},{fr:"se démaquiller",zh:"卸妝",ex:"Je me suis démaquillée."},{fr:"se brosser les dents",zh:"刷牙",ex:"Je me suis brossé les dents."},{fr:"se reposer",zh:"休息",ex:"Je me suis reposée à la maison."},{fr:"se faire les ongles",zh:"做指甲",ex:"Je me suis fait les ongles."}]},{id:"v003",date:"05/14",type:"vocab",title:"哲學詞彙入門",tags:["哲學","抽象名詞"],items:[{fr:"la liberté",zh:"自由",ex:"La liberté est essentielle."},{fr:"la conscience",zh:"意識/良知",ex:"Il a une conscience développée."},{fr:"l'existence (f)",zh:"存在",ex:"L'existence précède l'essence."},{fr:"la vérité",zh:"真理",ex:"Quelle est la vérité ?"},{fr:"la raison",zh:"理性",ex:"La raison guide nos actions."},{fr:"la pensée",zh:"思想/思考",ex:"La pensée humaine est complexe."}]}];
const ERRORS=[{id:"e001",date:"05/12",category:"時態",wrong:"j'ai été fermée",correct:"j'étais fermée",reason:"過去持續狀態用 imparfait，不用複合過去式",myNote:"avant 後面要用 imparfait！"},{id:"e002",date:"05/12",category:"否定",wrong:"je ne me suis maquillée pas",correct:"je ne me suis pas maquillée",reason:"ne...pas 夾住助動詞（suis），PP 在最後",myNote:"ne + me suis + pas + PP"},{id:"e003",date:"05/12",category:"avoir/être",wrong:"je suis toujours trop faim",correct:"j'ai toujours trop faim",reason:"faim 是名詞，身體感覺用 avoir",myNote:"avoir faim/soif/chaud/froid — 永遠是 avoir！"},{id:"e004",date:"05/12",category:"介係詞",wrong:"je vais faire du Pilates à dimanche",correct:"je vais faire du Pilates dimanche",reason:"法文星期幾前不加介係詞",myNote:"dimanche / lundi — 不需要 à"},{id:"e005",date:"05/12",category:"反身動詞",wrong:"je me s'endormi",correct:"je me suis endormie",reason:"je 的反身代名詞是 me（不是 se）；女性加 e",myNote:"je → me，il/elle → se"},{id:"e006",date:"05/12",category:"冠詞",wrong:"j'ai mangé la nouille",correct:"j'ai mangé des nouilles",reason:"麵條是複數（des nouilles），不加定冠詞",myNote:"des nouilles（複數不特定）"},{id:"e007",date:"05/13",category:"複合過去式",wrong:"j'ai étudiée",correct:"j'ai étudié",reason:"avoir 的 PP 不配合主詞性別，不加 e",myNote:"avoir → PP 永遠不變！"},{id:"e008",date:"05/13",category:"形容詞",wrong:"je ne suis plus anxieux",correct:"je ne suis plus anxieuse",reason:"女性：anxieux → anxieuse（~eux → ~euse）",myNote:"記得用陰性形容詞！"},{id:"e009",date:"05/14",category:"比較級",wrong:"je suis ouverte mieux",correct:"je suis plus ouverte",reason:"形容詞的「更...」用 plus + adj，不用 mieux",myNote:"mieux 只修飾動詞（je vais mieux）！"}];

function normalizeAns(s){return(s||'').trim().toLowerCase().replace(/[''`´]/g,"'").replace(/\s+/g,' ');}
function getTodayKey(){return new Date().toISOString().slice(0,10);}

function Checklist(){
  const todayKey=getTodayKey();
  const[checked,setChecked]=useState(()=>{try{return JSON.parse(localStorage.getItem('cl_'+todayKey)||'[]');}catch{return[];}});
  const[custom,setCustom]=useState(()=>{try{return localStorage.getItem('cl_custom')||'';}catch{return'';}});
  const toggle=(id)=>{const n=checked.includes(id)?checked.filter(c=>c!==id):[...checked,id];setChecked(n);try{localStorage.setItem('cl_'+todayKey,JSON.stringify(n));}catch{}};
  const saveCustom=(v)=>{setCustom(v);try{localStorage.setItem('cl_custom',v);}catch{}};
  const tasks=[{id:"t1",label:"法語助手單字",fixed:true},{id:"t2",label:"與 Claude 對話練習法文",fixed:true},{id:"t3",label:"Le français facile",fixed:true},{id:"t4",label:"",fixed:false}];
  const done=tasks.filter(t=>checked.includes(t.id)&&(t.fixed||custom)).length;
  const total=tasks.filter(t=>t.fixed||custom).length;
  const pct=total>0?Math.round((done/total)*100):0;
  return(
    <div className="checklist-wrap">
      <div className="checklist-title">✅ 今日任務</div>
      {tasks.map(t=>{
        const isCustom=!t.fixed;const isDone=checked.includes(t.id);
        if(isCustom&&!custom)return(<div key={t.id} className="checklist-item" style={{cursor:'default'}}><div className="check-circle" style={{borderStyle:'dashed'}}/><input className="check-custom-input" placeholder="新增自訂任務..." value={custom} onChange={e=>saveCustom(e.target.value)} onClick={e=>e.stopPropagation()}/></div>);
        return(<div key={t.id} className="checklist-item" onClick={()=>toggle(t.id)}><div className={`check-circle ${isDone?'checked':''}`}>{isDone&&<span style={{color:'white',fontSize:'.7rem',fontWeight:700}}>✓</span>}</div>{isCustom?<input className="check-custom-input" style={{textDecoration:isDone?'line-through':'none',color:isDone?'var(--muted)':'var(--text)'}} value={custom} onChange={e=>saveCustom(e.target.value)} onClick={e=>e.stopPropagation()}/>:<span className={`check-label ${isDone?'checked':''}`}>{t.label}</span>}</div>);
      })}
      <div className="progress-row"><div className="progress-bar"><div className="progress-fill" style={{width:`${pct}%`}}/></div><div className="progress-text">{done}/{total}</div></div>
    </div>
  );
}

function MCQ({ex}){const[sel,setSel]=useState(null);return(<div className="exo-wrap"><div className="exo-type">選擇題</div><div className="exo-q">{ex.q}</div>{ex.opts.map((o,n)=><button key={n} disabled={sel!==null} className={`opt-btn ${sel===null?'':n===ex.ans?'correct':sel===n?'wrong':''}`} onClick={()=>setSel(n)}>{String.fromCharCode(65+n)}. {o}</button>)}{sel!==null&&<div className={`feedback ${sel===ex.ans?'correct':'wrong'}`}>{sel===ex.ans?'✓ 正確！':'✗ 再想想！'} {ex.exp}</div>}</div>);}

function FillIn({ex}){
  const[vals,setVals]=useState(ex.blanks.map(()=>''));const[done,setDone]=useState(false);const[hint,setHint]=useState(false);
  const isOk=(v,b)=>normalizeAns(v)===normalizeAns(b);const allOk=done&&vals.every((v,i)=>isOk(v,ex.blanks[i]));
  return(<div className="exo-wrap"><div className="exo-type">填空題</div><div className="exo-q">{ex.q}</div><div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:6}}>{ex.blanks.map((b,i)=><span key={i} style={{display:'flex',alignItems:'center',gap:3}}><span style={{fontSize:'.72rem',color:'#bbb'}}>({i+1})</span><input className={`fill-input ${done?(isOk(vals[i],b)?'correct':'wrong'):''}`} value={vals[i]} disabled={done} onChange={e=>{const nv=[...vals];nv[i]=e.target.value;setVals(nv);}} placeholder="填入..."/></span>)}</div><button onClick={()=>setHint(h=>!h)} style={{background:'none',border:'none',cursor:'pointer',fontSize:'.74rem',color:'var(--gold)',fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>💡 提示 {hint?'▲':'▼'}</button>{hint&&<p style={{fontSize:'.74rem',color:'var(--muted)',marginBottom:5}}>{ex.hint}</p>}{!done?<button className="check-btn" onClick={()=>setDone(true)}>確認答案</button>:<div><div className={`feedback ${allOk?'correct':'wrong'}`}>{allOk?'✓ 全對！':'答案：'+ex.blanks.join(' / ')}</div><button className="check-btn" style={{marginTop:4}} onClick={()=>{setVals(ex.blanks.map(()=>''));setDone(false);}}>重試</button></div>}</div>);
}

function AddModal({type,onClose,onSave}){
  const[form,setForm]=useState({});const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const today=new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'});
  return(<div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}>✕</button>
    {type==='error'&&<><div className="modal-title">❌ 新增錯誤記錄</div><label className="form-label">分類</label><input className="form-input" placeholder="時態" onChange={e=>set('category',e.target.value)}/><div className="form-row"><div><label className="form-label">❌ 我寫的</label><input className="form-input" onChange={e=>set('wrong',e.target.value)}/></div><div><label className="form-label">✓ 正確版本</label><input className="form-input" onChange={e=>set('correct',e.target.value)}/></div></div><label className="form-label">原因</label><input className="form-input" onChange={e=>set('reason',e.target.value)}/><label className="form-label">我的筆記（可選）</label><input className="form-input" onChange={e=>set('myNote',e.target.value)}/><button className="big-btn" onClick={()=>{if(!form.wrong||!form.correct)return;onSave({...form,id:`e${Date.now()}`,date:today});onClose();}}>儲存</button></>}
    {type==='grammar'&&<><div className="modal-title">📗 新增文法筆記</div><label className="form-label">標題</label><input className="form-input" onChange={e=>set('title',e.target.value)}/><label className="form-label">標籤（逗號分隔）</label><input className="form-input" onChange={e=>set('tags',e.target.value)}/><label className="form-label">規則（每行一條）</label><textarea className="form-input" rows={4} onChange={e=>set('rules',e.target.value)} style={{resize:'vertical'}}/><label className="form-label">我的例句（每行一句）</label><textarea className="form-input" rows={3} onChange={e=>set('examples',e.target.value)} style={{resize:'vertical'}}/><button className="big-btn" onClick={()=>{if(!form.title)return;onSave({id:`g${Date.now()}`,date:today,type:'grammar',title:form.title,tags:(form.tags||'').split(',').map(t=>t.trim()).filter(Boolean),rules:(form.rules||'').split('\n').filter(Boolean),myExamples:(form.examples||'').split('\n').filter(Boolean)});onClose();}}>儲存</button></>}
    {type==='vocab'&&<><div className="modal-title">📘 新增詞彙</div><label className="form-label">標題</label><input className="form-input" onChange={e=>set('title',e.target.value)}/><label className="form-label">標籤</label><input className="form-input" onChange={e=>set('tags',e.target.value)}/><label className="form-label">詞彙（每行：法文|中文|例句）</label><textarea className="form-input" rows={5} placeholder="la liberté|自由|La liberté est essentielle." onChange={e=>set('items',e.target.value)} style={{resize:'vertical'}}/><button className="big-btn" onClick={()=>{if(!form.title)return;const items=(form.items||'').split('\n').filter(Boolean).map(l=>{const[fr,zh,ex]=l.split('|');return{fr:fr?.trim(),zh:zh?.trim(),ex:ex?.trim()};}).filter(i=>i.fr&&i.zh);onSave({id:`v${Date.now()}`,date:today,type:'vocab',title:form.title,tags:(form.tags||'').split(',').map(t=>t.trim()).filter(Boolean),items});onClose();}}>儲存</button></>}
  </div></div>);
}

export default function App(){
  const[tab,setTab]=useState('today');
  const[grammar,setGrammar]=useState(GRAMMAR);
  const[vocab,setVocab]=useState(VOCAB);
  const[errors,setErrors]=useState(ERRORS);
  const[modal,setModal]=useState(null);
  const[apiKey,setApiKey]=useState('');
  const[exercises,setExercises]=useState([]);
  const[generating,setGenerating]=useState(false);
  const[genError,setGenError]=useState('');
  const[showApi,setShowApi]=useState(false);
  const[gramFilter,setGramFilter]=useState('all');
  const[vocabFilter,setVocabFilter]=useState('all');
  const[errFilter,setErrFilter]=useState('all');
  const[activeExId,setActiveExId]=useState(null);

  const today=new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'});
  const days=['一','二','三','四','五','六','日'];
  const todayIdx=(new Date().getDay()+6)%7;

  const handleSave=(type,data)=>{if(type==='error')setErrors(p=>[data,...p]);if(type==='grammar')setGrammar(p=>[data,...p]);if(type==='vocab')setVocab(p=>[data,...p]);};

  const generateEx=async(tg)=>{
    if(!apiKey.trim()){setShowApi(true);return;}
    setGenerating(true);setGenError('');setExercises([]);
    const ctx=tg?`文法主題：${tg.title}\n規則：${(tg.rules||[]).join('\n')}\n例句：${(tg.myExamples||[]).join('\n')}`:`錯誤記錄：${errors.slice(0,6).map(e=>`${e.wrong} → ${e.correct}（${e.reason}）`).join('\n')}`;
    const prompt=`根據以下內容，為 A1-A2 法語學習者出 5 道練習題（選擇題或填空題混合）：\n${ctx}\n只輸出純 JSON 陣列，不要任何其他文字：\n[{"type":"選","q":"題目","opts":["A","B","C"],"ans":0,"exp":"解釋"},{"type":"填","q":"___","blanks":["答案"],"hint":"提示"}]`;
    try{
      const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':apiKey.trim(),'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1200,messages:[{role:'user',content:prompt}]})});
      const data=await res.json();if(!res.ok)throw new Error(data.error?.message||`HTTP ${res.status}`);
      const raw=(data.content?.[0]?.text||'').trim();let parsed;try{parsed=JSON.parse(raw);}catch{const m=raw.match(/\[[\s\S]*\]/);if(!m)throw new Error('格式錯誤');parsed=JSON.parse(m[0]);}
      setExercises(parsed);
    }catch(e){setGenError(`生成失敗：${e.message}`);}
    setGenerating(false);
  };

  const gramTags=['all',...new Set(grammar.flatMap(n=>n.tags))];
  const vocabTags=['all',...new Set(vocab.flatMap(n=>n.tags))];
  const errCats=['all',...new Set(errors.map(e=>e.category))];
  const fGram=gramFilter==='all'?grammar:grammar.filter(n=>n.tags.includes(gramFilter));
  const fVocab=vocabFilter==='all'?vocab:vocab.filter(n=>n.tags.includes(vocabFilter));
  const fErr=errFilter==='all'?errors:errors.filter(e=>e.category===errFilter);
  const philo=[{fr:'la liberté',zh:'自由',ex:"La liberté est essentielle à l'existence humaine."},{fr:'la conscience',zh:'意識/良知',ex:"Il a une conscience très développée."},{fr:"l'existence (f)",zh:'存在',ex:"L'existence précède l'essence. (Sartre)"},{fr:'la vérité',zh:'真理',ex:"Quelle est la vérité ?"},{fr:'la raison',zh:'理性',ex:"La raison guide nos actions."}];
  const p=philo[new Date().getDate()%5];

  return(
    <div className="app">
      <style>{style}</style>
      <div className="header">
        <div className="header-top"><span style={{fontSize:'1.5rem'}}>🌹</span><div><h1>Mon Journal d'Apprentissage</h1><div className="subtitle">每日學習筆記 · 文法 · 詞彙 · 錯誤日記</div></div></div>
        <div className="nav">{[{id:'today',l:'📅 今日'},{id:'grammar',l:'📗 文法'},{id:'vocab',l:'📘 詞彙'},{id:'errors',l:'❌ 錯誤日記'}].map(t=><button key={t.id} className={`nav-btn ${tab===t.id?'active':''}`} onClick={()=>{setTab(t.id);setExercises([]);setActiveExId(null);}}>{t.l}</button>)}</div>
      </div>
      <div className="content">
        {tab==='today'&&<div>
          <div style={{background:'var(--navy)',borderRadius:'var(--radius)',padding:'16px',color:'white',marginBottom:14}}>
            <div style={{fontSize:'.67rem',color:'rgba(255,255,255,.45)',letterSpacing:'.08em',textTransform:'uppercase',marginBottom:3}}>今天 · {today}</div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:900,marginBottom:10}}>Bonjour ! Tu vas bien ? 🌹</div>
            <div className="streak-bar">{days.map((d,i)=><div key={i} className={`streak-day ${i<todayIdx?'done':i===todayIdx?'today':'empty'}`}>{d}</div>)}</div>
            <div style={{fontSize:'.67rem',color:'rgba(255,255,255,.4)',marginTop:4}}>本週學習進度</div>
          </div>
          <Checklist/>
          <div className="stat-grid"><div className="stat-card"><div className="stat-num">{grammar.length}</div><div className="stat-label">文法筆記</div></div><div className="stat-card"><div className="stat-num">{vocab.reduce((s,n)=>s+n.items.length,0)}</div><div className="stat-label">個詞彙</div></div><div className="stat-card"><div className="stat-num">{errors.length}</div><div className="stat-label">錯誤記錄</div></div></div>
          <div style={{background:'var(--card)',borderRadius:'var(--radius)',padding:'14px 16px',boxShadow:'0 2px 10px rgba(201,122,138,.08)',borderLeft:'4px solid var(--rose)',marginBottom:14}}>
            <div style={{fontSize:'.7rem',fontWeight:700,color:'var(--rose)',marginBottom:6,letterSpacing:'.05em',textTransform:'uppercase'}}>💡 今日哲學詞彙</div>
            <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.05rem',color:'var(--navy)',fontStyle:'italic'}}>{p.fr}</div>
            <div style={{fontSize:'.84rem',color:'var(--muted)',margin:'2px 0'}}>{p.zh}</div>
            <div style={{fontSize:'.79rem',fontStyle:'italic',color:'var(--blue)'}}>{p.ex}</div>
          </div>
          <div style={{background:'var(--card)',borderRadius:'var(--radius)',padding:'14px 16px',boxShadow:'0 2px 10px rgba(201,122,138,.08)',borderLeft:'4px solid var(--navy)'}}>
            <div style={{fontSize:'.7rem',fontWeight:700,color:'var(--navy)',marginBottom:8,letterSpacing:'.05em',textTransform:'uppercase'}}>📝 最近的錯誤提醒</div>
            {errors.slice(0,3).map(e=><div key={e.id} style={{display:'flex',alignItems:'center',gap:6,marginBottom:5,fontSize:'.81rem'}}><span style={{color:'var(--rose)',fontStyle:'italic',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.wrong}</span><span style={{color:'#ccc',flexShrink:0}}>→</span><span style={{color:'var(--green)',fontStyle:'italic',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.correct}</span></div>)}
            <button onClick={()=>setTab('errors')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'.73rem',color:'var(--muted)',fontFamily:"'DM Sans',sans-serif",padding:0,marginTop:3}}>查看全部 →</button>
          </div>
        </div>}

        {tab==='grammar'&&<div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div style={{fontSize:'.79rem',color:'var(--muted)'}}>{grammar.length} 條文法筆記</div><button className="add-btn" onClick={()=>setModal('grammar')}>+ 新增</button></div>
          <div className="filter-bar">{gramTags.map(t=><button key={t} className={`filter-btn ${gramFilter===t?'active':''}`} onClick={()=>setGramFilter(t)}>{t==='all'?'全部':t}</button>)}</div>
          {fGram.map(note=><div key={note.id} className="note-card grammar">
            <div className="note-date">{note.date}</div><div className="note-title">{note.title}</div>
            <div style={{marginBottom:7}}>{note.tags.map(t=><span key={t} className="tag tag-grammar">{t}</span>)}</div>
            {note.rules&&<div style={{marginBottom:8}}>{note.rules.map((r,i)=><div key={i} style={{display:'flex',gap:7,marginBottom:4,fontSize:'.82rem',lineHeight:1.6}}><span style={{color:'var(--rose)',fontWeight:700,minWidth:14}}>▸</span><span>{r}</span></div>)}</div>}
            {note.table&&<table className="conj-table" style={{marginBottom:8}}><thead><tr>{note.table.headers.map((h,i)=><th key={i}>{h}</th>)}</tr></thead><tbody>{note.table.rows.map((row,i)=><tr key={i}>{row.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody></table>}
            {note.myExamples&&note.myExamples.length>0&&<div style={{marginBottom:10}}><div style={{fontSize:'.7rem',fontWeight:700,color:'var(--navy)',marginBottom:4}}>✍️ 我的例句</div>{note.myExamples.map((ex,i)=><div key={i} style={{fontSize:'.8rem',fontStyle:'italic',color:'var(--blue)',marginBottom:2}}>{ex}</div>)}</div>}
            <button onClick={()=>{if(activeExId===note.id){setActiveExId(null);setExercises([]);return;}setActiveExId(note.id);setExercises([]);generateEx(note);}} style={{background:'var(--rose-light)',color:'var(--rose)',border:'1px solid var(--rose-mid)',borderRadius:8,padding:'6px 13px',cursor:'pointer',fontSize:'.78rem',fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>{activeExId===note.id?'✕ 收起練習':'✨ 出練習題'}</button>
            {activeExId===note.id&&<div style={{marginTop:12}}>
              {showApi&&<div className="api-box"><div style={{fontSize:'.73rem',fontWeight:600,color:'var(--navy)',marginBottom:3}}>Anthropic API Key</div><input className="api-input" type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="sk-ant-..."/></div>}
              {genError&&<div style={{fontSize:'.77rem',color:'var(--rose)',marginBottom:6}}>{genError}</div>}
              {generating&&<div style={{fontSize:'.82rem',color:'var(--muted)',padding:'10px 0'}}>⏳ 生成中...</div>}
              {exercises.length>0&&exercises.map((ex,i)=>ex.type==='填'?<FillIn key={i} ex={ex}/>:<MCQ key={i} ex={ex}/>)}
            </div>}
          </div>)}
        </div>}

        {tab==='vocab'&&<div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div style={{fontSize:'.79rem',color:'var(--muted)'}}>{vocab.reduce((s,n)=>s+n.items.length,0)} 個詞彙</div><button className="add-btn" onClick={()=>setModal('vocab')}>+ 新增</button></div>
          <div className="filter-bar">{vocabTags.map(t=><button key={t} className={`filter-btn ${vocabFilter===t?'active':''}`} onClick={()=>setVocabFilter(t)}>{t==='all'?'全部':t}</button>)}</div>
          {fVocab.map(g=><div key={g.id} className="note-card vocab"><div className="note-date">{g.date}</div><div className="note-title">{g.title}</div><div style={{marginBottom:7}}>{g.tags.map(t=><span key={t} className="tag tag-vocab">{t}</span>)}</div><div className="vocab-grid">{g.items.map((item,i)=><div key={i} className="vocab-item"><div className="vocab-fr">{item.fr}</div><div className="vocab-zh">{item.zh}</div>{item.ex&&<div className="vocab-ex">{item.ex}</div>}</div>)}</div></div>)}
        </div>}

        {tab==='errors'&&<div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div style={{fontSize:'.79rem',color:'var(--muted)'}}>{errors.length} 條錯誤記錄</div><button className="add-btn" onClick={()=>setModal('error')}>+ 新增</button></div>
          <div className="filter-bar">{errCats.map(c=><button key={c} className={`filter-btn ${errFilter===c?'active':''}`} onClick={()=>setErrFilter(c)}>{c==='all'?'全部':c}</button>)}</div>
          {fErr.map(err=><div key={err.id} className="note-card error">
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}><div className="note-date">{err.date}</div><span className="tag tag-error">{err.category}</span></div>
            <div className="error-row"><div className="error-wrong"><div className="error-label" style={{color:'var(--rose)'}}>❌ 我寫的</div><div className="error-text" style={{color:'var(--rose)',fontStyle:'italic'}}>{err.wrong}</div></div><div className="error-correct"><div className="error-label" style={{color:'var(--green)'}}>✓ 正確</div><div className="error-text" style={{color:'var(--green)',fontStyle:'italic'}}>{err.correct}</div></div><div className="error-reason">💡 {err.reason}</div>{err.myNote&&<div style={{fontSize:'.73rem',color:'var(--navy)',fontWeight:600,gridColumn:'1/-1',paddingTop:4,borderTop:'1px dashed #f0dfe0',marginTop:2}}>📝 {err.myNote}</div>}</div>
          </div>)}
          <div style={{marginTop:14,background:'var(--rose-light)',borderRadius:12,padding:14,border:'1px dashed var(--rose-mid)'}}>
            <div style={{fontSize:'.84rem',fontWeight:600,color:'var(--navy)',marginBottom:7}}>🤖 根據我的錯誤生成針對性練習</div>
            {showApi&&<div className="api-box"><div style={{fontSize:'.73rem',fontWeight:600,color:'var(--navy)',marginBottom:3}}>Anthropic API Key</div><input className="api-input" type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="sk-ant-..."/><div style={{fontSize:'.67rem',color:'var(--muted)',marginTop:2}}>Key 只存在頁面，不會儲存。</div></div>}
            {genError&&<div style={{fontSize:'.77rem',color:'var(--rose)',marginBottom:6}}>{genError}</div>}
            <div style={{display:'flex',gap:7}}>
              <button onClick={()=>generateEx(null)} disabled={generating} style={{background:generating?'#ddd':'var(--rose)',color:generating?'#999':'white',border:'none',borderRadius:9,padding:'8px 16px',cursor:generating?'not-allowed':'pointer',fontWeight:700,fontSize:'.82rem',fontFamily:"'DM Sans',sans-serif"}}>{generating?'⏳ 生成中...':'✨ 生成練習題'}</button>
              {!showApi&&<button onClick={()=>setShowApi(true)} style={{background:'none',border:'1px solid var(--rose-mid)',borderRadius:9,padding:'7px 11px',cursor:'pointer',fontSize:'.77rem',color:'var(--rose)',fontFamily:"'DM Sans',sans-serif"}}>API Key</button>}
            </div>
            {exercises.length>0&&<div style={{marginTop:12}}><div style={{fontSize:'.79rem',fontWeight:700,color:'var(--navy)',marginBottom:8}}>針對你的弱點出的 {exercises.length} 題：</div>{exercises.map((ex,i)=>ex.type==='填'?<FillIn key={i} ex={ex}/>:<MCQ key={i} ex={ex}/>)}</div>}
          </div>
        </div>}
      </div>
      {modal&&<AddModal type={modal} onClose={()=>setModal(null)} onSave={data=>handleSave(modal,data)}/>}
    </div>
  );
}
