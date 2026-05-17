import { useState, useEffect, useRef } from "react";

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
  .api-box { background: #fdf0f2; border-radius: 10px; padding: 11px 13px; margin-bottom: 12px; border: 1px solid #f0d0d8; }
  .api-input { width: 100%; border: 1px solid #e8d0d5; border-radius: 8px; padding: 6px 9px; font-size: .82rem; font-family: 'DM Sans',sans-serif; outline: none; background: white; }
  .checklist-wrap { background: var(--card); border-radius: var(--radius); padding: 14px 16px; box-shadow: 0 2px 10px rgba(201,122,138,.08); margin-bottom: 14px; }
  .checklist-title { font-size: .7rem; font-weight: 700; color: var(--navy); margin-bottom: 10px; letter-spacing: .05em; text-transform: uppercase; }
  .checklist-item { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f5ece8; cursor: pointer; }
  .checklist-item:last-child { border-bottom: none; }
  .check-circle { width: 22px; height: 22px; min-width: 22px; border-radius: 50%; border: 2px solid #e8d0d5; display: flex; align-items: center; justify-content: center; transition: all .2s; background: white; }
  .check-circle.checked { background: var(--rose); border-color: var(--rose); }
  .check-label { font-size: .88rem; flex: 1; }
  .check-label.checked { color: var(--muted); text-decoration: line-through; }
  .check-custom-input { border: none; background: transparent; font-size: .88rem; font-family: 'DM Sans',sans-serif; outline: none; flex: 1; color: var(--text); }
  .check-custom-input::placeholder { color: #ccc; }
  .progress-row { display: flex; align-items: center; gap: 8px; margin-top: 10px; }
  .progress-bar { flex: 1; height: 5px; background: #f0e0da; border-radius: 3px; overflow: hidden; }
  .progress-fill { height: 100%; background: var(--rose); border-radius: 3px; transition: width .4s ease; }
  .progress-text { font-size: .72rem; color: var(--muted); min-width: 35px; text-align: right; }
  .vocab-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); gap: 10px; margin-top: 7px; }
  .vocab-flip-wrap { perspective: 800px; height: 110px; cursor: pointer; }
  .vocab-flip-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transition: transform .4s cubic-bezier(.4,0,.2,1); }
  .vocab-flip-wrap.flipped .vocab-flip-inner { transform: rotateY(180deg); }
  .vocab-front, .vocab-back { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 10px; padding: 10px 12px; display: flex; flex-direction: column; justify-content: center; }
  .vocab-front { background: #fdf5f2; border: 1px solid #f5e6e0; }
  .vocab-back { background: linear-gradient(135deg, #e8f2e8, #d4ecd4); transform: rotateY(180deg); border: 1px solid #c8e0c8; }
  .vocab-fr { font-size: .9rem; font-style: italic; color: var(--blue); font-weight: 700; margin-bottom: 4px; }
  .vocab-ex { font-size: .71rem; color: var(--muted); font-style: italic; line-height: 1.4; }
  .vocab-zh { font-size: .88rem; color: var(--green); font-weight: 700; margin-bottom: 3px; }
  .vocab-hint { font-size: .63rem; color: var(--muted); text-align: right; margin-top: auto; }
  .error-practice { background: var(--card); border-radius: var(--radius); padding: 14px; margin-bottom: 12px; box-shadow: 0 2px 12px rgba(201,122,138,.08); border-left: 4px solid var(--rose); }
  .error-wrong-display { background: #fff0f2; border-radius: 8px; padding: 10px 12px; margin-bottom: 10px; }
  .error-wrong-label { font-size: .65rem; font-weight: 700; color: var(--rose); letter-spacing: .05em; text-transform: uppercase; margin-bottom: 3px; }
  .error-wrong-text { font-size: .95rem; font-style: italic; color: var(--rose); }
  .error-input-row { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; }
  .error-input { flex: 1; border: 1.5px solid #e8d8d4; border-radius: 8px; padding: 8px 12px; font-size: .88rem; font-family: 'DM Sans',sans-serif; outline: none; background: white; }
  .error-input:focus { border-color: var(--rose); }
  .error-input.correct { border-color: var(--green); background: #edf7ed; }
  .error-input.wrong { border-color: var(--rose); background: var(--rose-light); }
  .error-submit-btn { background: var(--navy); color: white; border: none; border-radius: 8px; padding: 8px 14px; cursor: pointer; font-size: .8rem; font-family: 'DM Sans',sans-serif; font-weight: 600; white-space: nowrap; }
  .error-reveal { background: #f0fff4; border-radius: 8px; padding: 10px 12px; margin-top: 8px; border: 1px solid #c8e0c8; }
  .error-correct-label { font-size: .65rem; font-weight: 700; color: var(--green); letter-spacing: .05em; text-transform: uppercase; margin-bottom: 3px; }
  .error-correct-text { font-size: .92rem; font-style: italic; color: var(--green); font-weight: 600; margin-bottom: 5px; }
  .error-reason-text { font-size: .8rem; color: var(--muted); margin-bottom: 3px; }
  .error-note-text { font-size: .78rem; color: var(--navy); font-weight: 600; }
  .mastered-badge { display: inline-flex; align-items: center; gap: 4px; background: #e8f2e8; color: var(--green); border-radius: 20px; padding: 2px 8px; font-size: .68rem; font-weight: 700; margin-left: 6px; }
  .attempts-dots { display: flex; gap: 3px; }
  .attempt-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); }
  .confetti-wrap { position: fixed; inset: 0; pointer-events: none; z-index: 999; overflow: hidden; }
  .confetti-piece { position: absolute; border-radius: 50%; animation: confettiFall linear forwards; }
  @keyframes confettiFall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(100vh) rotate(720deg); opacity: 0; } }
  .quote-card { background: var(--navy); border-radius: var(--radius); padding: 20px 18px; color: white; margin-bottom: 14px; position: relative; overflow: hidden; }
  .quote-deco { position: absolute; top: -10px; left: 12px; font-size: 5rem; color: rgba(255,255,255,.06); font-family: 'Playfair Display',serif; line-height: 1; pointer-events: none; }
  .quote-date { font-size: .67rem; color: rgba(255,255,255,.45); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 10px; }
  .quote-fr { font-family: 'Playfair Display',serif; font-size: 1.15rem; font-weight: 700; line-height: 1.5; margin-bottom: 8px; }
  .quote-zh { font-size: .8rem; color: rgba(255,255,255,.65); line-height: 1.6; margin-bottom: 6px; }
  .quote-source { font-size: .72rem; color: #e8b4be; font-style: italic; }
`;

const QUOTES=[
  {fr:"Je pense, donc je suis.",zh:"我思故我在。",source:"笛卡爾 René Descartes"},
  {fr:"L'enfer, c'est les autres.",zh:"他人即地獄。",source:"沙特 Jean-Paul Sartre, Huis Clos"},
  {fr:"On ne naît pas femme : on le devient.",zh:"女人不是天生的，而是被塑造的。",source:"西蒙·波娃 Simone de Beauvoir"},
  {fr:"La liberté des uns s'arrête où commence celle des autres.",zh:"個人自由的邊界，是他人自由的起點。",source:"約翰·斯圖爾特·彌爾（法語流傳版）"},
  {fr:"Connais-toi toi-même.",zh:"認識你自己。",source:"蘇格拉底 Socrate"},
  {fr:"Le cœur a ses raisons que la raison ne connaît point.",zh:"心有其理，理性無從知曉。",source:"巴斯卡 Blaise Pascal, Pensées"},
  {fr:"Tout ce qui est beau est difficile autant que rare.",zh:"凡美好之物，皆艱難而稀有。",source:"斯賓諾莎 Baruch Spinoza, Éthique"},
  {fr:"La vie est brève, l'art est long.",zh:"生命短暫，藝術長久。",source:"希波克拉底 Hippocrate"},
  {fr:"Être ou ne pas être, telle est la question.",zh:"生存還是毀滅，這是個問題。",source:"莎士比亞 Shakespeare, Hamlet（法譯）"},
  {fr:"L'imagination est plus importante que le savoir.",zh:"想像力比知識更重要。",source:"愛因斯坦 Albert Einstein"},
  {fr:"Ce que nous savons est une goutte, ce que nous ignorons est un océan.",zh:"我們所知不過一滴水，我們所不知是整片海洋。",source:"牛頓 Isaac Newton"},
  {fr:"Aimer, c'est trouver sa richesse hors de soi.",zh:"愛，是在自身之外找到自己的財富。",source:"阿蘭 Alain, Propos sur le bonheur"},
  {fr:"La vérité est rarement pure et n'est jamais simple.",zh:"真理鮮少純粹，從不簡單。",source:"王爾德 Oscar Wilde"},
  {fr:"Le doute est le commencement de la sagesse.",zh:"懷疑是智慧的起點。",source:"亞里斯多德（法語流傳版）"},
  {fr:"Il faut imaginer Sisyphe heureux.",zh:"我們必須想像薛西弗斯是快樂的。",source:"卡繆 Albert Camus, Le Mythe de Sisyphe"},
  {fr:"La beauté sauvera le monde.",zh:"美將拯救世界。",source:"杜斯妥也夫斯基 Dostoïevski（法譯）"},
  {fr:"On ne voit bien qu'avec le cœur.",zh:"用心才能看清本質，眼睛往往會蒙蔽你。",source:"聖修伯里 Saint-Exupéry, Le Petit Prince"},
  {fr:"Chaque jour est une nouvelle vie pour le sage.",zh:"對智者而言，每天都是嶄新的生命。",source:"莫里哀 Molière"},
  {fr:"Le bonheur est une idée neuve en Europe.",zh:"幸福是歐洲的一個新觀念。",source:"聖茹斯特 Saint-Just, 1794"},
  {fr:"La philosophie est un combat contre l'ensorcelage de notre intelligence.",zh:"哲學是對抗我們智識被魔法迷惑的鬥爭。",source:"維根斯坦 Wittgenstein（法譯）"},
];

// 新到舊排列
const GRAMMAR=[
  {id:"g008",date:"05/18",type:"grammar",title:"aimer 等喜好動詞 + 定冠詞",tags:["冠詞","喜好動詞"],rules:["aimer / adorer / détester / préférer 後面永遠接定冠詞 le/la/les","泛指「我喜歡這類東西」→ 定冠詞（不是 des）","J'aime les films d'horreur. ✓（不是 des films）","Je déteste la pluie. ✓（泛指雨這件事）","⚠️ 例外：être + 職業/國籍 → 不加冠詞"],myExamples:["J'aime les films d'action et d'horreur.","J'adore le chocolat.","Je déteste la routine."],mySentences:[]},
  {id:"g007",date:"05/15",type:"grammar",title:"j'allais + infinitif（本來要...）",tags:["imparfait","表達意圖"],rules:["j'allais + 原形動詞 = 本來打算要...（結果沒有）","je devais + 原形動詞 = 本來應該要...（結果沒有）","j'avais prévu de + 原形動詞 = 本來計畫要...（更正式）","parce que + 母音開頭 → parce qu'（縮寫！）"],myExamples:["J'allais aller chez mon ami, mais il est très occupé parce qu'il travaille à une agence de comptabilité.","Je devais sortir, mais j'ai mes règles donc je reste à la maison."],mySentences:[]},
  {id:"g006",date:"05/14",type:"grammar",title:"比較級：plus / moins / mieux",tags:["比較級","形容詞","副詞"],rules:["形容詞「更...」→ plus + 形容詞：je suis plus patiente","形容詞「比較不...」→ moins + 形容詞：je suis moins anxieuse","名詞「更多...」→ plus de + 名詞：j'ai plus de patience","動詞「更好」→ mieux（不是 plus bien）：je vais mieux","⚠️ mieux 只修飾動詞，不修飾形容詞"],myExamples:["Avant, j'étais très fermée, mais maintenant je suis plus ouverte.","Avant, j'étais impatiente, mais maintenant je suis plus patiente.","Je vais mieux aujourd'hui !"],mySentences:[]},
  {id:"g005",date:"05/14",type:"grammar",title:"imparfait 未完成過去式（入門）",tags:["imparfait","時態"],rules:["過去持續的狀態/習慣用 imparfait，不用 PC","avant 後面通常接 imparfait","現在先記：j'étais = 我以前是"],myExamples:["Avant, j'étais fermée, mais maintenant je suis plus ouverte. ✓","⚠️ Avant, j'ai été fermée. ✗（持續狀態不用PC）"],mySentences:[]},
  {id:"g004",date:"05/13",type:"grammar",title:"encore / déjà / toujours / ne...plus",tags:["副詞"],rules:["déjà = 已經","encore = 還/又","toujours = 一直/還是","ne...plus = 不再"],myExamples:["J'ai déjà fini le travail aujourd'hui.","Je suis encore malade.","J'ai toujours trop faim.","Je ne suis plus anxieuse."],mySentences:[]},
  {id:"g003",date:"05/13",type:"grammar",title:"現在式 vs 複合過去式",tags:["現在式","複合過去式","時態"],rules:["現在式 = 習慣、事實（tous les jours）","複合過去式 = 某一次、已完成（hier, ce matin）","avant 後通常接 imparfait（三級會學）→ 先記：j'étais","身體感覺永遠用 avoir（j'ai faim/soif/chaud/froid）"],myExamples:["Je me maquille le matin.（習慣）","Mais hier je ne me suis pas maquillée.（某一次）","J'ai toujours trop faim.（avoir，不是 être）"],mySentences:[]},
  {id:"g002",date:"05/12",type:"grammar",title:"複合過去式：avoir vs être",tags:["複合過去式","avoir","être"],rules:["avoir + PP：一般動詞（manger→mangé, voir→vu, prendre→pris）","avoir 的 PP 不配合主詞性別","être + PP：VANDERTRAMP 14個位移動詞 + 所有反身動詞","être 的 PP 一定配合主詞性別"],myExamples:["J'ai étudié le français avec toi hier soir. ✓（avoir，PP不加e）","Je me suis endormie à deux heures. ✓（être，反身動詞）","Je suis rentrée à la maison et j'ai dîné avec mes parents.","J'ai lavé mes vêtements, j'ai vu un film hongkongais.","J'ai bu du vin rouge ce soir."],mySentences:[]},
  {id:"g001",date:"05/12",type:"grammar",title:"反身動詞（Verbes pronominaux）",tags:["反身動詞","複合過去式"],rules:["結構：se + 動詞，表示「自己對自己做某件事」","複合過去式永遠用 être 作助動詞","PP 需配合主詞性別：levé(m) / levée(f)","身體部位後置時 PP 不配合性別：je me suis brossé les dents ✓","否定：ne + 反身代名詞 + suis + pas + PP"],table:{headers:["主詞","反身代名詞","現在式","複合過去式（f）"],rows:[["je","me (m')","je me lève","je me suis levée"],["tu","te (t')","tu te lèves","tu t'es levée"],["il/elle","se (s')","il se lève","elle s'est levée"],["nous","nous","nous nous levons","nous nous sommes levées"],["vous","vous","vous vous levez","vous vous êtes levées"],["ils/elles","se (s')","ils se lèvent","elles se sont levées"]]},myExamples:["Je me suis levée à onze heures aujourd'hui.","Je me suis démaquillée et brossé les dents pendant la douche.","Je me suis endormie à deux heures.","Je me suis fait les ongles."],mySentences:[]},
];

// 新到舊排列
const VOCAB=[
  {id:"v005",date:"05/18",type:"vocab",title:"電影相關詞彙",tags:["電影","文化"],items:[{fr:"un film hongkongais",zh:"香港電影",ex:"J'ai vu un film hongkongais hier."},{fr:"un film américain",zh:"美國電影",ex:"J'aime les films américains."},{fr:"un film taïwanais",zh:"台灣電影",ex:"Il y a beaucoup de bons films taïwanais."},{fr:"un film policier",zh:"犯罪/警察電影",ex:"Infernal Affairs est un film policier."},{fr:"un film d'action",zh:"動作片",ex:"J'aime les films d'action."},{fr:"un film dramatique",zh:"劇情片",ex:"C'est un film dramatique très émouvant."},{fr:"un film d'horreur",zh:"恐怖片",ex:"J'aime les films d'horreur."},{fr:"un film romantique",zh:"愛情片",ex:"On regarde un film romantique ce soir ?"},{fr:"un documentaire",zh:"紀錄片",ex:"J'ai regardé un documentaire sur la nature."},{fr:"un agent infiltré",zh:"臥底",ex:"Le film parle d'un agent infiltré dans la mafia."},{fr:"ce genre de films",zh:"這種類型的電影",ex:"J'aime bien ce genre de films."}]},
  {id:"v004",date:"05/15",type:"vocab",title:"日常實用表達",tags:["日常","表達"],items:[{fr:"j'ai mes règles",zh:"我月經來了",ex:"J'ai mes règles, donc je reste à la maison."},{fr:"tout à l'heure",zh:"等一下/待會",ex:"Je vais dormir tout à l'heure."},{fr:"bientôt",zh:"很快、即將",ex:"Il arrive bientôt."},{fr:"pendant la journée",zh:"白天（期間）",ex:"J'ai travaillé pendant la journée."},{fr:"une agence de comptabilité",zh:"會計事務所",ex:"Il travaille à une agence de comptabilité."},{fr:"parce qu'il/elle",zh:"因為他/她（母音縮寫）",ex:"parce qu'il est malade / parce qu'elle est occupée"},{fr:"j'allais + infinitif",zh:"本來打算要...",ex:"J'allais sortir, mais il pleut."},{fr:"je devais + infinitif",zh:"本來應該要...",ex:"Je devais travailler, mais je suis restée."}]},
  {id:"v003",date:"05/14",type:"vocab",title:"哲學詞彙入門",tags:["哲學","抽象名詞"],items:[{fr:"la liberté",zh:"自由",ex:"La liberté est essentielle."},{fr:"la conscience",zh:"意識/良知",ex:"Il a une conscience développée."},{fr:"l'existence (f)",zh:"存在",ex:"L'existence précède l'essence."},{fr:"la vérité",zh:"真理",ex:"Quelle est la vérité ?"},{fr:"la raison",zh:"理性",ex:"La raison guide nos actions."},{fr:"la pensée",zh:"思想/思考",ex:"La pensée humaine est complexe."}]},
  {id:"v002",date:"05/12",type:"vocab",title:"反身動詞：日常作息",tags:["反身動詞","日常"],items:[{fr:"se lever",zh:"起床",ex:"Je me suis levée à 9h."},{fr:"se coucher",zh:"就寢",ex:"Je me couche tard."},{fr:"s'endormir",zh:"睡著",ex:"Je me suis endormie à 2h."},{fr:"s'habiller",zh:"穿衣服",ex:"Je me suis habillée vite."},{fr:"se doucher",zh:"淋浴",ex:"Je me suis douchée."},{fr:"se maquiller",zh:"化妝",ex:"Je me maquille le matin."},{fr:"se démaquiller",zh:"卸妝",ex:"Je me suis démaquillée."},{fr:"se brosser les dents",zh:"刷牙",ex:"Je me suis brossé les dents."},{fr:"se reposer",zh:"休息",ex:"Je me suis reposée à la maison."},{fr:"se faire les ongles",zh:"做指甲",ex:"Je me suis fait les ongles."}]},
  {id:"v001",date:"05/12",type:"vocab",title:"個性形容詞",tags:["個性","形容詞"],items:[{fr:"timide",zh:"害羞",ex:"Avant, j'étais timide."},{fr:"ouvert(e)",zh:"開朗/開放",ex:"Je suis plus ouverte aux autres."},{fr:"fermé(e)",zh:"封閉/內斂",ex:"Avant, j'étais très fermée."},{fr:"sociable",zh:"愛社交",ex:"Je suis plus sociable."},{fr:"sérieux/sérieuse",zh:"認真",ex:"Elle est très sérieuse."},{fr:"curieux/curieuse",zh:"好奇",ex:"Je suis curieuse de tout !"},{fr:"patient(e)",zh:"有耐心",ex:"Maintenant je suis plus patiente."},{fr:"anxieux/anxieuse",zh:"焦慮",ex:"Je ne suis plus anxieuse."},{fr:"confiant(e)",zh:"有自信",ex:"Elle est très confiante."},{fr:"indépendant(e)",zh:"獨立",ex:"Je suis très indépendante."},{fr:"sensible",zh:"敏感",ex:"Il est très sensible."},{fr:"optimiste",zh:"樂觀",ex:"Avant j'étais optimiste."},{fr:"pessimiste",zh:"悲觀",ex:"Maintenant un peu pessimiste."},{fr:"occupé(e)",zh:"忙碌",ex:"Il est très occupé cette semaine."}]},
];

// 新到舊排列
const ERRORS_INIT=[
  {id:"e014",date:"05/18",category:"冠詞",wrong:"j'aime des films",correct:"j'aime les films",reason:"aimer/adorer/détester + 泛指 → 定冠詞 les，不是 des",myNote:"喜好動詞後永遠用 le/la/les！",attempts:0,mastered:false},
  {id:"e013",date:"05/18",category:"關係代名詞",wrong:"qu'ils sont policiers",correct:"qui sont policiers",reason:"qui 用於主詞位置，que/qu' 用於受詞位置",myNote:"des hommes QUI sont... / le film QUE j'ai vu",attempts:0,mastered:false},
  {id:"e012",date:"05/18",category:"詞彙",wrong:"un film hongkong",correct:"un film hongkongais",reason:"地名要形容詞化：Hong Kong → hongkongais",myNote:"國家/地方 → 形容詞：taïwanais / américain / hongkongais",attempts:0,mastered:false},
  {id:"e011",date:"05/18",category:"冠詞",wrong:"j'ai bu vin rouge",correct:"j'ai bu du vin rouge",reason:"飲料/食物的「一些」用部分冠詞 du/de la，不能省略",myNote:"boire + du/de la/de l'：du vin / de la bière / de l'eau",attempts:0,mastered:false},
  {id:"e010",date:"05/15",category:"縮寫",wrong:"parce que il",correct:"parce qu'il",reason:"parce que + 母音 → parce qu'（elision）",myNote:"que → qu' 在母音前：parce qu'il, parce qu'elle",attempts:0,mastered:false},
  {id:"e009",date:"05/15",category:"縮寫",wrong:"je étudie / je écoute",correct:"j'étudie / j'écoute",reason:"je + 母音開頭的動詞 → j'（elision）",myNote:"je → j' 在母音前，跟 de/que 一樣！",attempts:0,mastered:false},
  {id:"e008",date:"05/15",category:"詞彙",wrong:"une agence de comptable",correct:"une agence de comptabilité",reason:"comptable = 會計師（人），comptabilité = 會計（領域）",myNote:"職業/人 vs 領域/學科 要分清楚",attempts:0,mastered:false},
  {id:"e007",date:"05/15",category:"詞彙",wrong:"dans le jour",correct:"pendant la journée",reason:"「白天期間」用 pendant la journée，不是 dans le jour",myNote:"pendant la journée = 白天 / le soir = 傍晚",attempts:0,mastered:false},
  {id:"e006",date:"05/13",category:"複合過去式",wrong:"j'ai étudiée",correct:"j'ai étudié",reason:"avoir 的 PP 不配合主詞性別，不加 e",myNote:"avoir → PP 永遠不變！",attempts:0,mastered:false},
  {id:"e005",date:"05/13",category:"形容詞",wrong:"je ne suis plus anxieux",correct:"je ne suis plus anxieuse",reason:"女性：anxieux → anxieuse（~eux → ~euse）",myNote:"記得用陰性形容詞！",attempts:0,mastered:false},
  {id:"e004",date:"05/12",category:"比較級",wrong:"je suis ouverte mieux",correct:"je suis plus ouverte",reason:"形容詞的「更...」用 plus + adj，不用 mieux",myNote:"mieux 只修飾動詞（je vais mieux）！",attempts:0,mastered:false},
  {id:"e003",date:"05/12",category:"冠詞",wrong:"j'ai mangé la nouille",correct:"j'ai mangé des nouilles",reason:"麵條是複數（des nouilles），不加定冠詞",myNote:"des nouilles（複數不特定）",attempts:0,mastered:false},
  {id:"e002",date:"05/12",category:"反身動詞",wrong:"je me s'endormi",correct:"je me suis endormie",reason:"je 的反身代名詞是 me（不是 se）；女性加 e",myNote:"je → me，il/elle → se",attempts:0,mastered:false},
  {id:"e001",date:"05/12",category:"介係詞",wrong:"je vais faire du Pilates à dimanche",correct:"je vais faire du Pilates dimanche",reason:"法文星期幾前不加介係詞",myNote:"dimanche / lundi — 不需要 à",attempts:0,mastered:false},
  {id:"e000",date:"05/12",category:"時態",wrong:"j'ai été fermée",correct:"j'étais fermée",reason:"過去持續狀態用 imparfait，不用複合過去式",myNote:"avant 後面要用 imparfait！",attempts:0,mastered:false},
  {id:"e00x",date:"05/12",category:"否定",wrong:"je ne me suis maquillée pas",correct:"je ne me suis pas maquillée",reason:"ne...pas 夾住助動詞（suis），PP 在最後",myNote:"ne + me suis + pas + PP",attempts:0,mastered:false},
  {id:"e00y",date:"05/12",category:"avoir/être",wrong:"je suis toujours trop faim",correct:"j'ai toujours trop faim",reason:"faim 是名詞，身體感覺用 avoir",myNote:"avoir faim/soif/chaud/froid — 永遠是 avoir！",attempts:0,mastered:false},
];

const DEFAULT_TASKS=[{id:"t1",label:"法語助手單字",fixed:true},{id:"t2",label:"與 Claude 對話練習法文",fixed:true},{id:"t3",label:"Le français facile",fixed:true},{id:"t4",label:"",fixed:false}];

// 凌晨3點重置
function getTodayKey(){
  const now=new Date();
  if(now.getHours()<3){now.setDate(now.getDate()-1);}
  return now.toISOString().slice(0,10);
}
function getQuoteOfDay(){const d=new Date();const idx=(d.getFullYear()*366+d.getMonth()*31+d.getDate())%QUOTES.length;return QUOTES[idx];}

function Confetti({onDone}){
  const pieces=Array.from({length:40},(_,i)=>({id:i,x:Math.random()*100,color:['#c97a8a','#c4906a','#7a9e7e','#7a9ab5','#f5e6ea','#e8f2e8'][Math.floor(Math.random()*6)],delay:Math.random()*0.5,duration:1.2+Math.random()*0.8,size:6+Math.random()*6}));
  useEffect(()=>{const t=setTimeout(onDone,2000);return()=>clearTimeout(t);},[]);
  return(<div className="confetti-wrap">{pieces.map(p=><div key={p.id} className="confetti-piece" style={{left:`${p.x}%`,background:p.color,width:p.size,height:p.size,animationDelay:`${p.delay}s`,animationDuration:`${p.duration}s`}}/>)}</div>);
}

function Checklist({onAllDone}){
  const todayKey=getTodayKey();
  const[checked,setChecked]=useState(()=>{try{return JSON.parse(localStorage.getItem('cl_'+todayKey)||'[]');}catch{return[];}});
  const[custom,setCustom]=useState(()=>{try{return localStorage.getItem('cl_custom')||'';}catch{return'';}});
  const prevDone=useRef(false);
  const toggle=(id)=>{const n=checked.includes(id)?checked.filter(c=>c!==id):[...checked,id];setChecked(n);try{localStorage.setItem('cl_'+todayKey,JSON.stringify(n));}catch{}};
  const saveCustom=(v)=>{setCustom(v);try{localStorage.setItem('cl_custom',v);}catch{}};
  const tasks=DEFAULT_TASKS;
  const total=tasks.filter(t=>t.fixed||custom).length;
  const done=tasks.filter(t=>checked.includes(t.id)&&(t.fixed||custom)).length;
  const pct=total>0?Math.round((done/total)*100):0;
  const allDone=done===total&&total>0;
  useEffect(()=>{if(allDone&&!prevDone.current){onAllDone();}prevDone.current=allDone;},[allDone]);
  return(
    <div className="checklist-wrap">
      <div className="checklist-title">✅ Tâches du jour</div>
      {tasks.map(t=>{
        const isCustom=!t.fixed;const isDone=checked.includes(t.id);
        if(isCustom&&!custom)return(<div key={t.id} className="checklist-item" style={{cursor:'default'}}><div className="check-circle" style={{borderStyle:'dashed'}}/><input className="check-custom-input" placeholder="Ajouter une tâche..." value={custom} onChange={e=>saveCustom(e.target.value)} onClick={e=>e.stopPropagation()}/></div>);
        return(<div key={t.id} className="checklist-item" onClick={()=>toggle(t.id)}><div className={`check-circle ${isDone?'checked':''}`}>{isDone&&<span style={{color:'white',fontSize:'.7rem',fontWeight:700}}>✓</span>}</div>{isCustom?<input className="check-custom-input" style={{textDecoration:isDone?'line-through':'none',color:isDone?'var(--muted)':'var(--text)'}} value={custom} onChange={e=>saveCustom(e.target.value)} onClick={e=>e.stopPropagation()}/>:<span className={`check-label ${isDone?'checked':''}`}>{t.label}</span>}</div>);
      })}
      <div className="progress-row"><div className="progress-bar"><div className="progress-fill" style={{width:`${pct}%`}}/></div><div className="progress-text">{done}/{total}</div></div>
    </div>
  );
}

function VocabCard({item}){
  const[flipped,setFlipped]=useState(false);
  return(<div className={`vocab-flip-wrap ${flipped?'flipped':''}`} onClick={()=>setFlipped(f=>!f)}><div className="vocab-flip-inner"><div className="vocab-front"><div className="vocab-fr">{item.fr}</div>{item.ex&&<div className="vocab-ex">{item.ex}</div>}<div className="vocab-hint">點擊看中文 →</div></div><div className="vocab-back"><div className="vocab-zh">{item.zh}</div><div className="vocab-ex" style={{color:'#5a8a5a'}}>{item.fr}</div></div></div></div>);
}

// 答對後隱藏紅色區塊
function ErrorPracticeCard({err,onUpdate}){
  const[input,setInput]=useState('');
  const[result,setResult]=useState(null);
  const[revealed,setRevealed]=useState(false);
  const check=()=>{
    const correct=input.trim()===err.correct.trim();
    setResult(correct?'correct':'wrong');
    if(correct){setRevealed(true);const na=err.attempts+1;onUpdate(err.id,{attempts:na,mastered:na>=3});}
  };
  const retry=()=>{setInput('');setResult(null);};
  return(
    <div className="error-practice">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <div style={{display:'flex',alignItems:'center',gap:6}}><div className="note-date">{err.date}</div><span className="tag tag-error">{err.category}</span>{err.mastered&&<span className="mastered-badge">✓ 已掌握</span>}</div>
        {err.attempts>0&&<div className="attempts-dots">{Array.from({length:Math.min(err.attempts,5)}).map((_,i)=><div key={i} className="attempt-dot"/>)}</div>}
      </div>

      {/* 答對後隱藏紅色區塊 */}
      {!revealed&&(
        <div className="error-wrong-display">
          <div className="error-wrong-label">❌ 我寫的</div>
          <div className="error-wrong-text">{err.wrong}</div>
        </div>
      )}

      {!revealed?(
        <>
          <div style={{fontSize:'.78rem',color:'var(--navy)',fontWeight:600,marginBottom:6}}>✏️ 正確版本是？</div>
          <div className="error-input-row">
            <input className={`error-input ${result==='correct'?'correct':result==='wrong'?'wrong':''}`} value={input} onChange={e=>{setInput(e.target.value);setResult(null);}} placeholder="輸入正確的句子..." onKeyDown={e=>e.key==='Enter'&&check()} disabled={result==='correct'}/>
            {result!=='correct'&&<button className="error-submit-btn" onClick={check}>確認</button>}
          </div>
          {result==='wrong'&&<div style={{display:'flex',gap:8,marginTop:4}}>
            <button onClick={retry} style={{background:'none',border:'1px solid var(--rose)',borderRadius:8,padding:'5px 12px',cursor:'pointer',fontSize:'.78rem',color:'var(--rose)',fontFamily:"'DM Sans',sans-serif"}}>再試一次</button>
            <button onClick={()=>setRevealed(true)} style={{background:'none',border:'1px solid #ddd',borderRadius:8,padding:'5px 12px',cursor:'pointer',fontSize:'.78rem',color:'var(--muted)',fontFamily:"'DM Sans',sans-serif"}}>看答案</button>
          </div>}
        </>
      ):(
        <div className="error-reveal">
          <div className="error-correct-label">✓ 正確</div>
          <div className="error-correct-text">{err.correct}</div>
          <div className="error-reason-text">💡 {err.reason}</div>
          {err.myNote&&<div className="error-note-text">📝 {err.myNote}</div>}
        </div>
      )}
    </div>
  );
}

function MySentenceInput({onSave}){
  const[val,setVal]=useState('');
  const submit=()=>{if(!val.trim())return;onSave(val);setVal('');};
  return(<div style={{display:'flex',gap:6,marginTop:4}}><input value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()} placeholder="Écris une phrase avec cette règle..." style={{flex:1,border:'1.5px solid #e8d8d4',borderRadius:8,padding:'6px 10px',fontSize:'.82rem',fontFamily:"'DM Sans',sans-serif",outline:'none',background:'white'}}/><button onClick={submit} style={{background:'var(--rose)',color:'white',border:'none',borderRadius:8,padding:'6px 12px',cursor:'pointer',fontSize:'.78rem',fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>+</button></div>);
}

function MCQ({ex}){const[sel,setSel]=useState(null);return(<div className="exo-wrap"><div className="exo-type">選擇題</div><div className="exo-q">{ex.q}</div>{ex.opts.map((o,n)=><button key={n} disabled={sel!==null} className={`opt-btn ${sel===null?'':n===ex.ans?'correct':sel===n?'wrong':''}`} onClick={()=>setSel(n)}>{String.fromCharCode(65+n)}. {o}</button>)}{sel!==null&&<div className={`feedback ${sel===ex.ans?'correct':'wrong'}`}>{sel===ex.ans?'✓ 正確！':'✗ 再想想！'} {ex.exp}</div>}</div>);}

function FillIn({ex}){
  const[vals,setVals]=useState(ex.blanks.map(()=>''));const[done,setDone]=useState(false);const[hint,setHint]=useState(false);
  const isOk=(v,b)=>v.trim()===b.trim();const allOk=done&&vals.every((v,i)=>isOk(v,ex.blanks[i]));
  return(<div className="exo-wrap"><div className="exo-type">填空題</div><div className="exo-q">{ex.q}</div><div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:6}}>{ex.blanks.map((b,i)=><span key={i} style={{display:'flex',alignItems:'center',gap:3}}><span style={{fontSize:'.72rem',color:'#bbb'}}>({i+1})</span><input className={`fill-input ${done?(isOk(vals[i],b)?'correct':'wrong'):''}`} value={vals[i]} disabled={done} onChange={e=>{const nv=[...vals];nv[i]=e.target.value;setVals(nv);}} placeholder="填入..."/></span>)}</div><button onClick={()=>setHint(h=>!h)} style={{background:'none',border:'none',cursor:'pointer',fontSize:'.74rem',color:'var(--gold)',fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>💡 提示 {hint?'▲':'▼'}</button>{hint&&<p style={{fontSize:'.74rem',color:'var(--muted)',marginBottom:5}}>{ex.hint}</p>}{!done?<button className="check-btn" onClick={()=>setDone(true)}>確認答案</button>:<div><div className={`feedback ${allOk?'correct':'wrong'}`}>{allOk?'✓ 全對！':'答案：'+ex.blanks.join(' / ')}</div><button className="check-btn" style={{marginTop:4}} onClick={()=>{setVals(ex.blanks.map(()=>''));setDone(false);}}>重試</button></div>}</div>);
}

function AddModal({type,onClose,onSave}){
  const[form,setForm]=useState({});const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const today=new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'});
  return(<div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}>✕</button>
    {type==='error'&&<><div className="modal-title">❌ Nouvelle erreur</div><label className="form-label">分類</label><input className="form-input" placeholder="時態" onChange={e=>set('category',e.target.value)}/><div className="form-row"><div><label className="form-label">❌ 我寫的</label><input className="form-input" onChange={e=>set('wrong',e.target.value)}/></div><div><label className="form-label">✓ 正確版本</label><input className="form-input" onChange={e=>set('correct',e.target.value)}/></div></div><label className="form-label">原因</label><input className="form-input" onChange={e=>set('reason',e.target.value)}/><label className="form-label">我的筆記（可選）</label><input className="form-input" onChange={e=>set('myNote',e.target.value)}/><button className="big-btn" onClick={()=>{if(!form.wrong||!form.correct)return;onSave({...form,id:`e${Date.now()}`,date:today,attempts:0,mastered:false});onClose();}}>儲存</button></>}
    {type==='grammar'&&<><div className="modal-title">📗 Nouvelle note</div><label className="form-label">標題</label><input className="form-input" onChange={e=>set('title',e.target.value)}/><label className="form-label">標籤（逗號分隔）</label><input className="form-input" onChange={e=>set('tags',e.target.value)}/><label className="form-label">規則（每行一條）</label><textarea className="form-input" rows={4} onChange={e=>set('rules',e.target.value)} style={{resize:'vertical'}}/><label className="form-label">我的例句（每行一句）</label><textarea className="form-input" rows={3} onChange={e=>set('examples',e.target.value)} style={{resize:'vertical'}}/><button className="big-btn" onClick={()=>{if(!form.title)return;onSave({id:`g${Date.now()}`,date:today,type:'grammar',title:form.title,tags:(form.tags||'').split(',').map(t=>t.trim()).filter(Boolean),rules:(form.rules||'').split('\n').filter(Boolean),myExamples:(form.examples||'').split('\n').filter(Boolean),mySentences:[]});onClose();}}>儲存</button></>}
    {type==='vocab'&&<><div className="modal-title">📘 Nouveau vocabulaire</div><label className="form-label">標題</label><input className="form-input" onChange={e=>set('title',e.target.value)}/><label className="form-label">標籤</label><input className="form-input" onChange={e=>set('tags',e.target.value)}/><label className="form-label">詞彙（每行：法文|中文|例句）</label><textarea className="form-input" rows={5} placeholder="la liberté|自由|La liberté est essentielle." onChange={e=>set('items',e.target.value)} style={{resize:'vertical'}}/><button className="big-btn" onClick={()=>{if(!form.title)return;const items=(form.items||'').split('\n').filter(Boolean).map(l=>{const[fr,zh,ex]=l.split('|');return{fr:fr?.trim(),zh:zh?.trim(),ex:ex?.trim()};}).filter(i=>i.fr&&i.zh);onSave({id:`v${Date.now()}`,date:today,type:'vocab',title:form.title,tags:(form.tags||'').split(',').map(t=>t.trim()).filter(Boolean),items});onClose();}}>儲存</button></>}
  </div></div>);
}

export default function App(){
  const[tab,setTab]=useState('today');
  const[grammar,setGrammar]=useState(GRAMMAR);
  const[vocab,setVocab]=useState(VOCAB);
  const[errors,setErrors]=useState(ERRORS_INIT);
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
  const[showConfetti,setShowConfetti]=useState(false);

  const todayFr=new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const quote=getQuoteOfDay();

  const handleSave=(type,data)=>{if(type==='error')setErrors(p=>[data,...p]);if(type==='grammar')setGrammar(p=>[data,...p]);if(type==='vocab')setVocab(p=>[data,...p]);};
  const updateError=(id,updates)=>setErrors(p=>p.map(e=>e.id===id?{...e,...updates}:e));
  const addMySentence=(gramId,sentence)=>{if(!sentence.trim())return;setGrammar(p=>p.map(g=>g.id===gramId?{...g,mySentences:[...(g.mySentences||[]),sentence]}:g));};

  const generateEx=async(tg)=>{
    if(!apiKey.trim()){setShowApi(true);return;}
    setGenerating(true);setGenError('');setExercises([]);
    const ctx=tg?`文法主題：${tg.title}\n規則：${(tg.rules||[]).join('\n')}\n例句：${(tg.myExamples||[]).join('\n')}`:`錯誤記錄：${errors.slice(0,6).map(e=>`${e.wrong} → ${e.correct}（${e.reason}）`).join('\n')}`;
    const prompt=`根據以下內容，為 A1-A2 法語學習者出 5 道練習題（選擇題或填空題混合）：\n${ctx}\n只輸出純 JSON 陣列，不要任何其他文字：\n[{"type":"選","q":"題目","opts":["A","B","C"],"ans":0,"exp":"解釋"},{"type":"填","q":"___","blanks":["答案"],"hint":"提示"}]`;
    try{
      const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':apiKey.trim(),'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1200,messages:[{role:'user',content:prompt}]})});
      const data=await res.json();if(!res.ok)throw new Error(data.error?.message||`HTTP ${res.status}`);
      const raw=(data.content?.[0]?.text||'').trim();let parsed;try{parsed=JSON.parse(raw);}catch{const m=raw.match(/\[[\s\S]*\]/);if(!m)throw new Error('格式錯誤');parsed=JSON.parse(m[0]);}
      setExercises(parsed);
    }catch(e){setGenError(`生成失敗：${e.message}`);}
    setGenerating(false);
  };

  const gramTags=['all',...new Set(grammar.flatMap(n=>n.tags))];
  const vocabTags=['all',...new Set(vocab.flatMap(n=>n.tags))];
  const errCats=['all','未掌握','已掌握',...new Set(errors.map(e=>e.category))];
  const fGram=gramFilter==='all'?grammar:grammar.filter(n=>n.tags.includes(gramFilter));
  const fVocab=vocabFilter==='all'?vocab:vocab.filter(n=>n.tags.includes(vocabFilter));
  const fErr=errFilter==='all'?errors:errFilter==='已掌握'?errors.filter(e=>e.mastered):errFilter==='未掌握'?errors.filter(e=>!e.mastered):errors.filter(e=>e.category===errFilter);
  const masteredCount=errors.filter(e=>e.mastered).length;

  return(
    <div className="app">
      <style>{style}</style>
      {showConfetti&&<Confetti onDone={()=>setShowConfetti(false)}/>}
      <div className="header">
        <div className="header-top"><span style={{fontSize:'1.5rem'}}>🌹</span><div><h1>Mon Journal d'Apprentissage</h1><div className="subtitle">筆記 · 詞彙 · 錯誤日記</div></div></div>
        <div className="nav">{[{id:'today',l:"📅 Aujourd'hui"},{id:'grammar',l:'📗 Grammaire'},{id:'vocab',l:'📘 Vocabulaire'},{id:'errors',l:'❌ Erreurs'}].map(t=><button key={t.id} className={`nav-btn ${tab===t.id?'active':''}`} onClick={()=>{setTab(t.id);setExercises([]);setActiveExId(null);}}>{t.l}</button>)}</div>
      </div>
      <div className="content">

        {tab==='today'&&<div>
          <div className="quote-card">
            <div className="quote-deco">"</div>
            <div className="quote-date">{todayFr}</div>
            <div className="quote-fr">« {quote.fr} »</div>
            <div className="quote-zh">{quote.zh}</div>
            <div className="quote-source">— {quote.source}</div>
          </div>
          <Checklist onAllDone={()=>setShowConfetti(true)}/>
          <div style={{background:'var(--card)',borderRadius:'var(--radius)',padding:'14px 16px',boxShadow:'0 2px 10px rgba(201,122,138,.08)',marginBottom:14}}>
            <div style={{fontSize:'.7rem',fontWeight:700,color:'var(--navy)',marginBottom:10,letterSpacing:'.05em',textTransform:'uppercase'}}>📊 Statistiques</div>
            <div className="stat-grid">
              <div className="stat-card"><div className="stat-num">{grammar.length}</div><div className="stat-label">notes de grammaire</div></div>
              <div className="stat-card"><div className="stat-num">{vocab.reduce((s,v)=>s+v.items.length,0)}</div><div className="stat-label">mots appris</div></div>
              <div className="stat-card"><div className="stat-num">{masteredCount}<span style={{fontSize:'1rem',color:'#ccc'}}>/{errors.length}</span></div><div className="stat-label">erreurs maîtrisées</div></div>
            </div>
          </div>
          <div style={{background:'var(--card)',borderRadius:'var(--radius)',padding:'14px 16px',boxShadow:'0 2px 10px rgba(201,122,138,.08)',borderLeft:'4px solid var(--navy)'}}>
            <div style={{fontSize:'.7rem',fontWeight:700,color:'var(--navy)',marginBottom:8,letterSpacing:'.05em',textTransform:'uppercase'}}>📝 Erreurs récentes</div>
            {errors.filter(e=>!e.mastered).slice(0,3).map(e=><div key={e.id} style={{display:'flex',alignItems:'center',gap:6,marginBottom:5,fontSize:'.81rem'}}><span style={{color:'var(--rose)',fontStyle:'italic',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.wrong}</span><span style={{color:'#ccc',flexShrink:0}}>→ ?</span></div>)}
            <button onClick={()=>setTab('errors')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'.73rem',color:'var(--muted)',fontFamily:"'DM Sans',sans-serif",padding:0,marginTop:3}}>Pratiquer →</button>
          </div>
        </div>}

        {tab==='grammar'&&<div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div style={{fontSize:'.79rem',color:'var(--muted)'}}>{grammar.length} notes</div>
            <button className="add-btn" onClick={()=>setModal('grammar')}>+ Ajouter</button>
          </div>
          <div className="filter-bar">{gramTags.map(t=><button key={t} className={`filter-btn ${gramFilter===t?'active':''}`} onClick={()=>setGramFilter(t)}>{t==='all'?'Tout':t}</button>)}</div>
          {fGram.map(note=>(
            <div key={note.id} className="note-card grammar">
              <div className="note-date">{note.date}</div>
              <div className="note-title">{note.title}</div>
              <div style={{marginBottom:7}}>{note.tags.map(t=><span key={t} className="tag tag-grammar">{t}</span>)}</div>
              {note.rules&&<div style={{marginBottom:8}}>{note.rules.map((r,i)=><div key={i} style={{display:'flex',gap:7,marginBottom:4,fontSize:'.82rem',lineHeight:1.6}}><span style={{color:'var(--rose)',fontWeight:700,minWidth:14}}>▸</span><span>{r}</span></div>)}</div>}
              {note.table&&<table className="conj-table" style={{marginBottom:8}}><thead><tr>{note.table.headers.map((h,i)=><th key={i}>{h}</th>)}</tr></thead><tbody>{note.table.rows.map((row,i)=><tr key={i}>{row.map((c,j)=><td key={j}>{c}</td>)}</tr>)}</tbody></table>}
              {note.myExamples&&note.myExamples.length>0&&<div style={{marginBottom:10}}><div style={{fontSize:'.7rem',fontWeight:700,color:'var(--navy)',marginBottom:4}}>✍️ Mes exemples</div>{note.myExamples.map((ex,i)=><div key={i} style={{fontSize:'.8rem',fontStyle:'italic',color:'var(--blue)',marginBottom:2}}>{ex}</div>)}</div>}
              <div style={{borderTop:'1px dashed #f0dfe0',paddingTop:10,marginTop:6}}>
                <div style={{fontSize:'.7rem',fontWeight:700,color:'var(--navy)',marginBottom:6}}>💬 Mes phrases</div>
                {(note.mySentences||[]).map((s,i)=><div key={i} style={{fontSize:'.82rem',fontStyle:'italic',color:'var(--text)',marginBottom:3,padding:'4px 8px',background:'#fdf5f2',borderRadius:6}}>{s}</div>)}
                <MySentenceInput onSave={s=>addMySentence(note.id,s)}/>
              </div>
              <button onClick={()=>{if(activeExId===note.id){setActiveExId(null);setExercises([]);return;}setActiveExId(note.id);setExercises([]);generateEx(note);}}
                style={{marginTop:10,background:'var(--rose-light)',color:'var(--rose)',border:'1px solid var(--rose-mid)',borderRadius:8,padding:'6px 13px',cursor:'pointer',fontSize:'.78rem',fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>
                {activeExId===note.id?'✕ Fermer':'✨ Générer exercices'}
              </button>
              {activeExId===note.id&&<div style={{marginTop:12}}>
                {showApi&&<div className="api-box"><div style={{fontSize:'.73rem',fontWeight:600,color:'var(--navy)',marginBottom:3}}>Anthropic API Key</div><input className="api-input" type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="sk-ant-..."/></div>}
                {genError&&<div style={{fontSize:'.77rem',color:'var(--rose)',marginBottom:6}}>{genError}</div>}
                {generating&&<div style={{fontSize:'.82rem',color:'var(--muted)',padding:'10px 0'}}>⏳ Génération...</div>}
                {exercises.length>0&&exercises.map((ex,i)=>ex.type==='填'?<FillIn key={i} ex={ex}/>:<MCQ key={i} ex={ex}/>)}
              </div>}
            </div>
          ))}
        </div>}

        {tab==='vocab'&&<div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div style={{fontSize:'.79rem',color:'var(--muted)'}}>{vocab.reduce((s,n)=>s+n.items.length,0)} mots</div>
            <button className="add-btn" onClick={()=>setModal('vocab')}>+ Ajouter</button>
          </div>
          <div className="filter-bar">{vocabTags.map(t=><button key={t} className={`filter-btn ${vocabFilter===t?'active':''}`} onClick={()=>setVocabFilter(t)}>{t==='all'?'Tout':t}</button>)}</div>
          {fVocab.map(group=>(
            <div key={group.id} className="note-card vocab">
              <div className="note-date">{group.date}</div>
              <div className="note-title">{group.title}</div>
              <div style={{marginBottom:7}}>{group.tags.map(t=><span key={t} className="tag tag-vocab">{t}</span>)}</div>
              <div style={{fontSize:'.72rem',color:'var(--muted)',marginBottom:8}}>👆 點擊卡片翻面看中文</div>
              <div className="vocab-grid">{group.items.map((item,i)=><VocabCard key={i} item={item}/>)}</div>
            </div>
          ))}
        </div>}

        {tab==='errors'&&<div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div style={{fontSize:'.79rem',color:'var(--muted)'}}>{errors.filter(e=>!e.mastered).length} à pratiquer · {masteredCount} maîtrisées</div>
            <button className="add-btn" onClick={()=>setModal('error')}>+ Ajouter</button>
          </div>
          <div className="filter-bar">{errCats.map(c=><button key={c} className={`filter-btn ${errFilter===c?'active':''}`} onClick={()=>setErrFilter(c)}>{c==='all'?'Tout':c}</button>)}</div>
          {fErr.map(err=><ErrorPracticeCard key={err.id} err={err} onUpdate={updateError}/>)}
          <div style={{marginTop:14,background:'var(--rose-light)',borderRadius:12,padding:14,border:'1px dashed var(--rose-mid)'}}>
            <div style={{fontSize:'.84rem',fontWeight:600,color:'var(--navy)',marginBottom:7}}>🤖 Générer exercices ciblés</div>
            {showApi&&<div className="api-box"><div style={{fontSize:'.73rem',fontWeight:600,color:'var(--navy)',marginBottom:3}}>Anthropic API Key</div><input className="api-input" type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="sk-ant-..."/><div style={{fontSize:'.67rem',color:'var(--muted)',marginTop:2}}>Key 只存在頁面，不會儲存。</div></div>}
            {genError&&<div style={{fontSize:'.77rem',color:'var(--rose)',marginBottom:6}}>{genError}</div>}
            <div style={{display:'flex',gap:7}}>
              <button onClick={()=>generateEx(null)} disabled={generating} style={{background:generating?'#ddd':'var(--rose)',color:generating?'#999':'white',border:'none',borderRadius:9,padding:'8px 16px',cursor:generating?'not-allowed':'pointer',fontWeight:700,fontSize:'.82rem',fontFamily:"'DM Sans',sans-serif"}}>{generating?'⏳ Génération...':'✨ Générer'}</button>
              {!showApi&&<button onClick={()=>setShowApi(true)} style={{background:'none',border:'1px solid var(--rose-mid)',borderRadius:9,padding:'7px 11px',cursor:'pointer',fontSize:'.77rem',color:'var(--rose)',fontFamily:"'DM Sans',sans-serif"}}>API Key</button>}
            </div>
            {exercises.length>0&&<div style={{marginTop:12}}><div style={{fontSize:'.79rem',fontWeight:700,color:'var(--navy)',marginBottom:8}}>{exercises.length} exercices :</div>{exercises.map((ex,i)=>ex.type==='填'?<FillIn key={i} ex={ex}/>:<MCQ key={i} ex={ex}/>)}</div>}
          </div>
        </div>}

      </div>
      {modal&&<AddModal type={modal} onClose={()=>setModal(null)} onSave={data=>handleSave(modal,data)}/>}
    </div>
  );
}
