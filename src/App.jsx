import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@300;400;500;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #f8f4ed; --card: #fff; --rose: #e07b4a; --rose-light: #fdeee6;
    --rose-mid: #f0c4a8; --gold: #c9b890; --green: #4a7c6f; --blue: #5a8fa0;
    --navy: #2d4a3e; --text: #2a3a34; --muted: #7a9088; --radius: 14px;
    --dark-bg: #1a2820; --dark-card: #243830; --dark-navy: #1a2820;
    --dark-text: #e8f0ec; --dark-muted: #7aaa90;
  }
  body.dark {
    --bg: #1a2820;
    --card: #243830;
    --navy: #2d6a58;
    --text: #dceee8;
    --muted: #7aaa90;
    --rose: #e07b4a;
    --rose-light: #2a3028;
    --rose-mid: #4a6a5a;
    --gold: #c9a870;
    --green: #5aaa8a;
    --blue: #7ab5c8;
    --radius: 14px;
  }
  body.dark .note-card,body.dark .stat-card,body.dark .checklist-wrap,body.dark .chapter-card,body.dark .sec-hdr,body.dark .sec-body,body.dark .exo-wrap,body.dark .search-result,body.dark .error-practice,body.dark .error-input { background: #1c2b25 !important; }
  body.dark .note-card { box-shadow: 0 2px 12px rgba(0,0,0,.5); border-left-color: #3a7a64; }
  body.dark .grammar.note-card { border-left-color: #5aaa8a; }
  body.dark .vocab.note-card { border-left-color: #6aaab8; }
  body.dark .error.note-card { border-left-color: #e07b4a; }
  body.dark .chapter-card { color: var(--text) !important; }
  body.dark .chapter-card .cdate { color: #e07b4a !important; }
  body.dark .chapter-card .ctag { color: var(--muted) !important; }
  body.dark .chapter-card.active { background: #3a7a64 !important; }
  body.dark .sec-hdr { border-left-color: #3a7a64; box-shadow: 0 2px 8px rgba(0,0,0,.3); }
  body.dark .exo-wrap { border-color: #2e4a40; }
  body.dark .opt-btn { background: #253d35 !important; border-color: #3a5048; color: var(--text); }
  body.dark .form-input { background: #253d35 !important; border-color: #3a5048; color: var(--text); }
  body.dark .modal { background: #111917 !important; }
  body.dark .modal-overlay { background: rgba(0,0,0,.7); }
  body.dark .filter-main-btn { background: #1c2b25 !important; border-color: #3a5048; color: var(--muted); }
  body.dark .filter-main-btn.active { background: #3a7a64 !important; color: white; border-color: #3a7a64; }
  body.dark .filter-main-btn.open { background: #2a1a10 !important; color: #e07b4a; border-color: #5a3828; }
  body.dark .filter-sub-row { background: #1c2b25 !important; }
  body.dark .filter-sub-btn { background: #111917 !important; border-color: #3a5048; color: var(--text); }
  body.dark .filter-sub-btn.active { background: #e07b4a !important; color: white; }
  body.dark .search-input { background: #1c2b25 !important; border-color: #3a5048; color: var(--text); }
  body.dark .search-result { border-left-color: transparent; }
  body.dark .search-result:hover { border-left-color: #e07b4a; }
  body.dark .search-result-title { color: var(--text); }
  body.dark .vocab-front { background: #1c2b25 !important; border-color: #3a5048; }
  body.dark .vocab-fr { color: #6aaab8 !important; }
  body.dark .vocab-back { background: linear-gradient(135deg, #1a3028, #142420) !important; }
  body.dark .vocab-zh { color: #5aaa8a !important; }
  body.dark .vocab-hint { color: var(--muted); }
  body.dark .error-wrong-display { background: #2a1810 !important; }
  body.dark .error-wrong-text { color: #e07b4a; }
  body.dark .error-input { border-color: #3a5048; }
  body.dark .error-reveal { background: #142820 !important; border-color: #2e5a48; }
  body.dark .error-correct-text { color: #5aaa8a; }
  body.dark .check-circle { background: #111917 !important; border-color: #3a5048; }
  body.dark .conj-table th { background: #3a7a64; }
  body.dark .conj-table td { border-color: #2e4a40; color: var(--text); }
  body.dark .conj-table tr:nth-child(even) td { background: #16261e !important; }
  body.dark .highlight { background: rgba(201,168,112,.08) !important; border-left-color: var(--gold); color: var(--text); }
  body.dark .tip-box { background: linear-gradient(135deg, #1c2b25, #162018) !important; color: var(--text); }
  body.dark .dl-text,.dl-speaker,.sum-text,.fr,.gram-title { color: inherit; }
  body.dark .sum-text { color: var(--text); }
  body.dark .fr { color: #6aaab8 !important; }
  body.dark .gram-title { color: var(--text) !important; }
  body.dark .api-box { background: #2a1810 !important; border-color: #5a3828; }
  body.dark .api-input { background: #1c2b25 !important; border-color: #3a5048; color: var(--text); }
  body.dark .quote-card { background: #1c2b25 !important; }
  body.dark .week-label { color: var(--muted); }
  body.dark .week-label::after { background: #2e4a40; }
  body.dark .week-label::after { background: #3a5048; }
  body { font-family: 'Nunito', sans-serif; background: var(--bg); color: var(--text); }
  .app { min-height: 100vh; }
  .header { background: var(--navy); color: white; padding: 16px 20px 12px; position: sticky; top: 0; z-index: 100; }
  .header-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .header h1 { font-family: 'Lora', serif; font-size: 1.2rem; font-weight: 900; }
  .subtitle { font-size: .68rem; color: rgba(255,255,255,.45); letter-spacing: .09em; text-transform: uppercase; }
  .nav { display: flex; gap: 5px; flex-wrap: wrap; }
  .nav-btn { background: rgba(255,255,255,.08); color: rgba(255,255,255,.65); border: 1px solid rgba(255,255,255,.12); padding: 5px 11px; border-radius: 20px; cursor: pointer; font-family: 'DM Sans',sans-serif; font-size: .76rem; font-weight: 500; transition: all .2s; }
  .nav-btn.active { background: var(--rose); color: white; border-color: var(--rose); font-weight: 700; }
  .content { padding: 16px 14px; max-width: 860px; margin: 0 auto; width: 100%; }

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
  .tag-course { background: #fef3e2; color: var(--gold); }

  .conj-table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: .79rem; }
  .conj-table th { background: var(--navy); color: white; padding: 6px 9px; text-align: left; font-weight: 600; font-size: .76rem; }
  .conj-table td { padding: 5px 9px; border-bottom: 1px solid #f5ece8; }
  .conj-table tr:last-child td { border-bottom: none; }
  .conj-table tr:nth-child(even) td { background: #fdf5f2; }

  .stat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 9px; margin-bottom: 14px; }
  .stat-card { background: var(--card); border-radius: var(--radius); padding: 12px; box-shadow: 0 2px 10px rgba(201,122,138,.08); text-align: center; }
  .stat-num { font-family: 'Playfair Display',serif; font-size: 1.8rem; font-weight: 900; color: var(--rose); }
  .stat-label { font-size: .7rem; color: var(--muted); margin-top: 2px; }

  /* 大分類篩選 */
  .filter-wrap { margin-bottom: 12px; }
  .filter-main-row { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 6px; }
  .filter-main-btn { background: var(--card); border: 1.5px solid #e8d8d4; border-radius: 20px; padding: 4px 12px; font-size: .74rem; cursor: pointer; font-family: 'DM Sans',sans-serif; transition: all .2s; color: var(--muted); font-weight: 500; display: flex; align-items: center; gap: 4px; }
  .filter-main-btn.active { background: var(--navy); color: white; border-color: var(--navy); font-weight: 600; }
  .filter-main-btn.open { background: var(--rose-light); color: var(--rose); border-color: var(--rose-mid); font-weight: 600; }
  .filter-sub-row { display: flex; gap: 4px; flex-wrap: wrap; padding: 6px 8px; background: var(--rose-light); border-radius: 10px; margin-bottom: 4px; }
  .filter-sub-btn { background: white; border: 1px solid var(--rose-mid); border-radius: 20px; padding: 3px 10px; font-size: .7rem; cursor: pointer; font-family: 'DM Sans',sans-serif; color: var(--navy); transition: all .2s; }
  .filter-sub-btn.active { background: var(--rose); color: white; border-color: var(--rose); font-weight: 600; }

  .add-btn { background: var(--rose); color: white; border: none; border-radius: 8px; padding: 7px 14px; cursor: pointer; font-size: .79rem; font-family: 'DM Sans',sans-serif; font-weight: 700; }
  .big-btn { background: var(--navy); color: white; border: none; border-radius: 10px; padding: 10px 20px; cursor: pointer; font-size: .88rem; font-family: 'DM Sans',sans-serif; font-weight: 600; width: 100%; margin-top: 6px; }
  .check-btn { background: var(--navy); color: white; border: none; border-radius: 8px; padding: 6px 13px; cursor: pointer; font-size: .79rem; font-family: 'DM Sans',sans-serif; font-weight: 500; margin-top: 5px; }
  .link-btn { background: none; border: 1px solid var(--green); border-radius: 8px; padding: 4px 10px; cursor: pointer; font-size: .73rem; color: var(--green); font-family: 'DM Sans',sans-serif; font-weight: 600; }
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

  .week-group { margin-bottom: 18px; }
  .week-label { font-size: .7rem; font-weight: 700; color: var(--muted); letter-spacing: .08em; text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
  .week-label::after { content: ''; flex: 1; height: 1px; background: #e0d0cc; }
  .chapter-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)); gap: 8px; }
  .chapter-card { background: white; border: 2px solid transparent; border-radius: var(--radius); padding: 11px 13px; cursor: pointer; transition: all .2s; box-shadow: 0 2px 6px rgba(201,122,138,.08); }
  .chapter-card:hover { border-color: var(--rose); transform: translateY(-2px); }
  .chapter-card.active { border-color: var(--navy); background: var(--navy); color: white; }
  .chapter-card .cdate { font-size: .68rem; font-weight: 700; color: var(--rose); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 3px; }
  .chapter-card.active .cdate { color: var(--rose-mid); }
  .chapter-card .ctopic { font-size: .82rem; font-weight: 500; line-height: 1.3; }
  .chapter-card .ctag { font-size: .65rem; color: var(--muted); margin-top: 4px; }
  .chapter-card.active .ctag { color: rgba(255,255,255,.5); }
  .chapter-card .clevel { font-size: .62rem; font-weight: 700; padding: 1px 6px; border-radius: 10px; display: inline-block; margin-bottom: 4px; }
  .chapter-card .clevel.lv1 { background: #e8f2e8; color: var(--green); }
  .chapter-card .clevel.lv2 { background: #e5eef5; color: var(--blue); }
  .chapter-card .clevel.lv3 { background: var(--rose-light); color: var(--rose); }
  .chapter-card.active .clevel { background: rgba(255,255,255,.15); color: rgba(255,255,255,.8); }

  .section { margin-bottom: 16px; }
  .sec-hdr { display: flex; align-items: center; gap: 10px; background: white; border-radius: var(--radius); padding: 12px 16px; cursor: pointer; box-shadow: 0 2px 8px rgba(201,122,138,.06); border-left: 4px solid var(--navy); transition: all .2s; user-select: none; }
  .sec-icon { font-size: 1.1rem; }
  .sec-title { font-family: 'Lora', serif; font-size: .95rem; font-weight: 700; flex: 1; }
  .sec-toggle { color: var(--muted); font-size: .85rem; transition: transform .3s; }
  .sec-toggle.open { transform: rotate(180deg); }
  .sec-body { background: white; border-radius: 0 0 var(--radius) var(--radius); padding: 14px; margin-top: -4px; box-shadow: 0 4px 12px rgba(201,122,138,.06); }
  .sum-pt { display: flex; gap: 9px; align-items: flex-start; padding: 8px 0; border-bottom: 1px solid #f5ece8; }
  .sum-pt:last-child { border-bottom: none; }
  .sum-bullet { width: 20px; height: 20px; min-width: 20px; background: var(--navy); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: .62rem; font-weight: 700; margin-top: 2px; }
  .sum-text { font-size: .84rem; line-height: 1.6; }
  .fr { color: var(--blue); font-style: italic; font-weight: 500; }
  .gram-blk { margin-bottom: 16px; }
  .gram-title { font-weight: 700; font-size: .86rem; color: var(--navy); margin-bottom: 7px; display: flex; align-items: center; gap: 6px; }
  .gram-title::before { content: ''; width: 3px; height: 14px; background: var(--rose); border-radius: 2px; display: inline-block; }
  .highlight { background: rgba(196,144,106,.1); padding: 8px 12px; border-radius: 8px; border-left: 3px solid var(--gold); margin: 6px 0; font-size: .83rem; line-height: 1.7; white-space: pre-line; }
  .fc-wrap { perspective: 1000px; margin-bottom: 14px; }
  .fc { width: 100%; min-height: 120px; position: relative; transform-style: preserve-3d; transition: transform .45s cubic-bezier(.4,0,.2,1); cursor: pointer; }
  .fc.flipped { transform: rotateY(180deg); }
  .fc-f, .fc-b { position: absolute; top: 0; left: 0; right: 0; min-height: 120px; backface-visibility: hidden; border-radius: var(--radius); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; text-align: center; }
  .fc-f { background: linear-gradient(135deg, var(--navy), #5d3a47); color: white; }
  .fc-b { background: linear-gradient(135deg, #f0f9f4, #dff2ea); color: var(--text); transform: rotateY(180deg); }
  .fc-word { font-family: 'Lora', serif; font-size: 1.3rem; font-weight: 700; margin-bottom: 5px; }
  .fc-hint { font-size: .68rem; opacity: .55; letter-spacing: .06em; text-transform: uppercase; }
  .fc-meaning { font-family: 'Lora', serif; font-size: 1.1rem; font-weight: 700; color: var(--navy); margin-bottom: 6px; }
  .fc-ex { font-size: .8rem; font-style: italic; line-height: 1.5; color: #444; }
  .fc-gender { font-size: .72rem; padding: 2px 7px; border-radius: 20px; margin-bottom: 4px; font-weight: 600; }
  .fc-gender.m { background: rgba(122,154,181,.2); color: var(--blue); }
  .fc-gender.f { background: rgba(201,122,138,.2); color: var(--rose); }
  .card-nav { display: flex; align-items: center; gap: 9px; justify-content: center; margin-top: 8px; }
  .cnav-btn { background: var(--navy); color: white; border: none; border-radius: 8px; padding: 6px 13px; cursor: pointer; font-family: 'DM Sans',sans-serif; font-weight: 500; font-size: .8rem; }
  .cnav-btn:disabled { opacity: .3; cursor: not-allowed; }
  .card-counter { font-size: .76rem; color: var(--muted); min-width: 50px; text-align: center; }
  .card-flip-hint { text-align: center; font-size: .7rem; color: var(--muted); margin-bottom: 6px; }
  .dialogue-line { display: flex; gap: 9px; margin-bottom: 8px; align-items: flex-start; }
  .dl-speaker { font-size: .72rem; font-weight: 700; color: var(--rose); min-width: 42px; padding-top: 2px; }
  .dl-text { font-size: .84rem; font-style: italic; line-height: 1.5; }
  .tip-box { background: linear-gradient(135deg, #fdf5f2, #fde8e0); border-radius: 10px; padding: 10px 14px; border-left: 3px solid var(--rose); font-size: .82rem; line-height: 1.6; white-space: pre-line; margin-top: 8px; }

  .search-input-wrap { position: relative; margin-bottom: 14px; }
  .search-input { width: 100%; border: 2px solid #e8d8d4; border-radius: 12px; padding: 10px 16px 10px 40px; font-size: .88rem; font-family: 'DM Sans',sans-serif; outline: none; background: white; }
  .search-input:focus { border-color: var(--rose); }
  .search-icon { position: absolute; left: 13px; top: 50%; transform: translateY(-50%); color: var(--muted); }
  .search-result { background: white; border-radius: var(--radius); padding: 12px 14px; margin-bottom: 8px; cursor: pointer; box-shadow: 0 2px 8px rgba(201,122,138,.08); border-left: 3px solid transparent; transition: all .2s; }
  .search-result:hover { border-left-color: var(--rose); transform: translateX(2px); }
  .search-result-title { font-weight: 700; font-size: .86rem; color: var(--navy); margin-bottom: 3px; }
  .search-result-meta { font-size: .72rem; color: var(--muted); }
  .search-result-snippet { font-size: .8rem; color: var(--text); margin-top: 4px; font-style: italic; }
  mark { background: rgba(201,122,138,.2); color: var(--rose); border-radius: 3px; padding: 0 2px; }

  .copy-toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--navy); color: white; padding: 10px 20px; border-radius: 20px; font-size: .82rem; font-family: 'DM Sans',sans-serif; z-index: 999; box-shadow: 0 4px 16px rgba(0,0,0,.2); animation: toastIn .3s ease; }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
`;

const QUOTES=[
  {fr:"Je pense, donc je suis.",zh:"我思故我在。",source:"笛卡爾 René Descartes"},
  {fr:"L'enfer, c'est les autres.",zh:"他人即地獄。",source:"沙特 Jean-Paul Sartre"},
  {fr:"On ne naît pas femme : on le devient.",zh:"女人不是天生的，而是被塑造的。",source:"西蒙·波娃 Simone de Beauvoir"},
  {fr:"La liberté des uns s'arrête où commence celle des autres.",zh:"個人自由的邊界，是他人自由的起點。",source:"約翰·斯圖爾特·彌爾"},
  {fr:"Connais-toi toi-même.",zh:"認識你自己。",source:"蘇格拉底 Socrate"},
  {fr:"Le cœur a ses raisons que la raison ne connaît point.",zh:"心有其理，理性無從知曉。",source:"巴斯卡 Blaise Pascal"},
  {fr:"Tout ce qui est beau est difficile autant que rare.",zh:"凡美好之物，皆艱難而稀有。",source:"斯賓諾莎 Baruch Spinoza"},
  {fr:"La vie est brève, l'art est long.",zh:"生命短暫，藝術長久。",source:"希波克拉底 Hippocrate"},
  {fr:"L'imagination est plus importante que le savoir.",zh:"想像力比知識更重要。",source:"愛因斯坦 Albert Einstein"},
  {fr:"Il faut imaginer Sisyphe heureux.",zh:"我們必須想像薛西弗斯是快樂的。",source:"卡繆 Albert Camus"},
  {fr:"On ne voit bien qu'avec le cœur.",zh:"用心才能看清本質。",source:"聖修伯里 Saint-Exupéry"},
  {fr:"Chaque jour est une nouvelle vie pour le sage.",zh:"對智者而言，每天都是嶄新的生命。",source:"莫里哀 Molière"},
  {fr:"Le bonheur est une idée neuve en Europe.",zh:"幸福是歐洲的一個新觀念。",source:"聖茹斯特 Saint-Just"},
  {fr:"La vérité est rarement pure et n'est jamais simple.",zh:"真理鮮少純粹，從不簡單。",source:"王爾德 Oscar Wilde"},
  {fr:"Aimer, c'est trouver sa richesse hors de soi.",zh:"愛，是在自身之外找到自己的財富。",source:"阿蘭 Alain"},
  {fr:"La beauté sauvera le monde.",zh:"美將拯救世界。",source:"杜斯妥也夫斯基 Dostoïevski"},
  {fr:"Le doute est le commencement de la sagesse.",zh:"懷疑是智慧的起點。",source:"亞里斯多德"},
  {fr:"Ce que nous savons est une goutte, ce que nous ignorons est un océan.",zh:"我們所知不過一滴水，我們所不知是整片海洋。",source:"牛頓 Isaac Newton"},
  {fr:"La philosophie est un combat contre l'ensorcelage de notre intelligence.",zh:"哲學是對抗我們智識被魔法迷惑的鬥爭。",source:"維根斯坦 Wittgenstein"},
  {fr:"La vie sans examen ne vaut pas la peine d'être vécue.",zh:"未經審視的生命不值得活。",source:"蘇格拉底 Socrate"},
];

// 文法筆記大分類設定
const GRAM_CATEGORIES=[
  {id:'all',label:'全部',subs:[]},
  {id:'時態',label:'時態',subs:['imparfait','PC','條件句','時態','複合過去式','avoir','être']},
  {id:'動詞',label:'動詞',subs:['反身動詞','喜好動詞','動詞搭配','表達意圖']},
  {id:'名詞',label:'名詞/冠詞',subs:['陰陽性','冠詞','指示形容詞','名詞']},
  {id:'其他',label:'其他',subs:['副詞','比較級','介係詞','形容詞']},
];

// 詞彙大分類設定
const VOCAB_CATEGORIES=[
  {id:'all',label:'全部',subs:[]},
  {id:'日常',label:'日常',subs:['日常','表達','反身動詞']},
  {id:'文化',label:'文化',subs:['電影','文學','文化']},
  {id:'學習',label:'學習',subs:['哲學','形容詞','抽象名詞']},
  {id:'旅遊',label:'旅遊',subs:['旅遊','天氣','實用']},
  {id:'食物',label:'🍴 食物',subs:['食物','nourriture','légumes','fruits']},
];

const CHAPTERS = [
  {
    id:"0120", level:"1", noteLinks:[], date:"01/20", weekday:"二", topic:"自我介紹・字母",
    tags:["s'appeler","tu/vous","字母拼法"],
    summary:[
      {text:"問候語：", fr:"Bonjour / Bonsoir / Salut / Ça va ?"},
      {text:"介紹名字：", fr:"Je m'appelle ___. / Comment tu t'appelles ?"},
      {text:"動詞 s'appeler 變化：je m'appelle / tu t'appelles / il s'appelle / ils s'appellent"},
      {text:"tu（親密）vs vous（禮貌）—朋友家人用 tu，陌生人長輩用 vous"},
      {text:"符號：accent grave (è à ù)，accent aigu (é)，cédille (ç)，apostrophe (')"},
    ],
    flashcards:[
      {word:"Je m'appelle", meaning:"我叫做", example:"Je m'appelle Marie."},
      {word:"Bonjour", meaning:"你好（白天）", example:"Bonjour mademoiselle !"},
      {word:"Bonsoir", meaning:"晚上好", example:"Bonsoir, comment ça va ?"},
      {word:"Enchanté(e)", meaning:"很高興認識你", example:"Je m'appelle Lucas. Enchanté !"},
      {word:"Ça va ?", meaning:"你好嗎？（非正式）", example:"Ça va bien, merci !"},
      {word:"Comment", meaning:"怎麼（疑問詞）", example:"Comment tu t'appelles ?"},
    ],
    grammar:[
      {title:"動詞 s'appeler 全變化",table:{headers:["主詞","動詞","注意"],rows:[["je","m'appelle","兩個 l"],["tu","t'appelles","兩個 l"],["il / elle","s'appelle","兩個 l"],["nous","nous appelons","一個 l"],["vous","vous appelez","一個 l"],["ils / elles","s'appellent","兩個 l"]]}},
      {title:"tu vs vous",content:"tu → 朋友、家人、同事、同學（親密）\nvous → 不熟識的人、長輩、上司、客戶（禮貌）\n也可用 vous 對「你們」（複數）\n\n例：Comment tu t'appelles ?（朋友間）\n    Comment vous appelez-vous ?（禮貌）"},
    ],
    exercises:[
      {type:"選",q:"和陌生長輩第一次見面應說：",opts:["Comment tu t'appelles ?","Comment vous appelez-vous ?","Il s'appelle comment ?"],ans:1,exp:"對不熟識長輩用 vous（禮貌形）"},
      {type:"選",q:"「她叫 Marie。」",opts:["Il s'appelle Marie.","Elle s'appelle Marie.","Je s'appelle Marie."],ans:1,exp:"女性主詞 elle，動詞 s'appelle"},
      {type:"填",q:"— ___ m'appelle Lucas. Et toi ? — Je m'___ Paul.",blanks:["Je","appelle"],hint:"填主詞代名詞和動詞"},
    ],
    dialogue:[
      {s:"Yida",t:"Bonjour mademoiselle."},{s:"Bella",t:"Bonjour monsieur."},
      {s:"Yida",t:"Comment ça va ?"},{s:"Bella",t:"Très bien, merci et vous ?"},
      {s:"Yida",t:"Bien, merci. Je m'appelle Yida, et vous ?"},{s:"Bella",t:"Je m'appelle Bella. Enchantée !"},
      {s:"Yida",t:"Enchanté. Bonne journée !"},
    ],
    tip:"Enchanté（男）/ Enchantée（女）— 第一個法文陰陽性例子！"
  },
  {
    id:"0122", level:"1", noteLinks:[], date:"01/22", weekday:"四", topic:"國籍・職業・être・parler",
    tags:["être","形容詞陰陽","否定 ne...pas"],
    summary:[
      {text:"être 動詞：je suis / tu es / il est / nous sommes / vous êtes / ils sont"},
      {text:"國籍形容詞有陰陽性：", fr:"français / française，coréen / coréenne"},
      {text:"職業字尾 -ste 陰陽同形：artiste, dentiste, styliste"},
      {text:"否定句：ne + 動詞 + pas（母音前縮為 n'）：", fr:"Je ne parle pas japonais."},
      {text:"介紹他人：", fr:"C'est Eva. Elle est allemande. Elle parle français."},
    ],
    flashcards:[
      {word:"français(e)", meaning:"法國的 / 法文", example:"Je suis française. Je parle français."},
      {word:"être", meaning:"是（動詞）", example:"Il est acteur. Elle est étudiante."},
      {word:"parler", meaning:"說（語言）", example:"Vous parlez quelles langues ?"},
      {word:"étudiant(e)", meaning:"學生", example:"Elle est étudiante à l'université."},
      {word:"comptable", meaning:"會計師（陰陽同形）", example:"Elle est comptable."},
      {word:"un peu", meaning:"一點點", example:"Je parle un peu français."},
    ],
    grammar:[
      {title:"動詞 être（現在式）",table:{headers:["主詞","être","例句"],rows:[["je","suis","Je suis étudiant."],["tu","es","Tu es français ?"],["il / elle","est","Il est acteur."],["nous","sommes","Nous sommes taïwanais."],["vous","êtes","Vous êtes prof ?"],["ils / elles","sont","Elles sont actrices."]]}},
      {title:"國籍形容詞陰陽性規則",content:"① +e → 陰性：anglais→anglaise, français→française\n② ~en→~enne：coréen→coréenne, italien→italienne\n③ 同形：belge, russe, suisse（無需變化）\n④ ~eur/~eux → ~euse：chanteur→chanteuse\n\n★ 陰性形容詞發音有尾子音！"},
      {title:"否定句 ne...pas",content:"結構：主詞 + ne + 動詞 + pas\nJe ne parle pas espagnol. ✓\n動詞母音開頭：ne → n'\nIl n'est pas français. ✓"},
    ],
    exercises:[
      {type:"選",q:"「她是韓國人。」",opts:["Elle est coréen.","Elle est coréenne.","Il est coréenne."],ans:1,exp:"女性主詞 → 陰性形容詞：coréenne"},
      {type:"選",q:"「我不說義大利語。」",opts:["Je ne parle pas l'italien.","Je ne parle pas italien.","Je ne pas parle italien."],ans:1,exp:"語言前不加冠詞：parler + 語言（無冠詞）"},
      {type:"填",q:"Je ___ (être) taïwanaise. / Elle ___ (parler) pas anglais. (注意否定)",blanks:["suis","ne parle"],hint:"être: je suis / 否定 ne...pas"},
    ],
    dialogue:[
      {s:"Eva",t:"Je m'appelle Eva Conti. Je suis allemande."},{s:"Eva",t:"Je suis députée européenne."},
      {s:"Eva",t:"Je parle allemand, français et un peu polonais."},
      {s:"Interviewer",t:"Vous parlez combien de langues ?"},{s:"Eva",t:"Je parle trois langues : allemand, français et polonais."},
    ],
    tip:"職業前 être 不加冠詞：Je suis prof. ✓\n但 C'est 後要加：C'est une prof. ✓"
  },
  {
    id:"0127", level:"1", noteLinks:[], date:"01/27", weekday:"二", topic:"數字・國家・介係詞 en/au/aux",
    tags:["數字0-1000","國家陰陽","介係詞"],
    summary:[
      {text:"數字特殊：70=soixante-dix，80=quatre-vingts（有s），81=quatre-vingt-un（無s），90=quatre-vingt-dix"},
      {text:"mille 永遠不加 s：deux mille（不說 deux milles）"},
      {text:"國家陰陽性：字尾 -e 通常陰性（la France），其餘通常陽性（le Japon）"},
      {text:"介係詞規則：", fr:"陰性→en，陽性→au，複數→aux，小領土→à"},
      {text:"動詞 habiter + 城市：", fr:"J'habite à Taipei, à Taïwan."},
    ],
    flashcards:[
      {word:"la France",gender:"f",meaning:"法國",example:"Il habite en France."},
      {word:"le Japon",gender:"m",meaning:"日本",example:"Elle habite au Japon."},
      {word:"les États-Unis",meaning:"美國（複數）",example:"J'habite aux États-Unis."},
      {word:"soixante-dix",meaning:"七十（60+10）",example:"Elle a soixante-dix ans."},
      {word:"quatre-vingts",meaning:"八十（4×20）",example:"Il a quatre-vingts ans."},
      {word:"habiter",meaning:"居住",example:"Tu habites où ? J'habite à Paris."},
    ],
    grammar:[
      {title:"國家介係詞 ★最重要規則之一",content:"🔵 陰性國家（字尾e）→ en：en France / en Chine / en Espagne / en Italie\n🟢 陽性國家 → au：au Japon / au Canada / au Brésil / au Maroc\n🟡 複數國家 → aux：aux États-Unis / aux Philippines\n🔴 小領土/島/城市 → à：à Taïwan / à Paris / à Singapour\n\n⚠️ 例外：le Mexique（字尾e但陽性）→ au Mexique\n⚠️ l'Iran, l'Iraq（陽性母音）→ en Iran（不用 au）"},
      {title:"縮合冠詞（à + le = au）",content:"à + le → au：Je vais AU cinéma.\nà + les → aux：Je vais AUX États-Unis.\nà + la → 不縮合：à LA plage.\nà + l' → 不縮合：à L'hôtel."},
      {title:"數字規則",content:"★ 21, 31, 41, 51, 61, 71 用 et un（加連接詞 et）\n★ 81, 91 不用 et：quatre-vingt-un, quatre-vingt-onze\n★ 80 有 s（quatre-vingts），81-89 無 s\n★ 100 = cent（有 s：deux cents；但 201 無 s：deux cent un）"},
    ],
    exercises:[
      {type:"選",q:"「他住在日本。」",opts:["Il habite en Japon.","Il habite au Japon.","Il habite à Japon."],ans:1,exp:"Japon 陽性 → 介係詞 au"},
      {type:"選",q:"90 的法文：",opts:["nonante","quatre-vingt-dix","huitante"],ans:1,exp:"法語 90 = 4×20+10 = quatre-vingt-dix（瑞士說 nonante）"},
      {type:"填",q:"Elle habite ___ Chine. / Il habite ___ Canada. / Nous habitons ___ États-Unis.",blanks:["en","au","aux"],hint:"Chine(f)→en, Canada(m)→au, États-Unis(pl)→aux"},
    ],
    dialogue:[
      {s:"A",t:"Où est la Chine ?"},{s:"B",t:"C'est en Asie."},
      {s:"A",t:"Où est Tokyo ?"},{s:"B",t:"C'est au Japon."},
      {s:"A",t:"Où est New York ?"},{s:"B",t:"C'est aux États-Unis."},
      {s:"A",t:"Où est Taïwan ?"},{s:"B",t:"C'est en Asie ! Taïwan est en Asie."},
    ],
    tip:"練習：Où est la Belgique ? → C'est en Europe. La Belgique est en Europe."
  },
  {
    id:"0129", level:"1", noteLinks:[], date:"01/29", weekday:"四", topic:"Qui est-ce ?・連音 liaison",
    tags:["qui est-ce","c'est/il est","連音規則"],
    summary:[
      {text:"問人：", fr:"Qui est-ce ? = Qui c'est ? = C'est qui ?（這是誰？）"},
      {text:"C'est + 名字/冠詞+名詞：", fr:"C'est Stromae. C'est un chanteur belge."},
      {text:"il est / elle est + 形容詞（無冠詞）：", fr:"Il est belge. Elle est chanteuse."},
      {text:"連音（liaison）：必發在代名詞+動詞、冠詞+名詞之間：ils_ont, les_enfants"},
      {text:"否定：", fr:"Ce n'est pas un acteur. C'est un chanteur."},
    ],
    flashcards:[
      {word:"Qui est-ce ?",meaning:"這是誰？",example:"Qui est-ce ? C'est Céline Dion."},
      {word:"C'est + article + nom",meaning:"這是...（後接冠詞+名詞）",example:"C'est un chanteur canadien."},
      {word:"il est / elle est",meaning:"他/她是...（後接形容詞）",example:"Il est musicien. Elle est française."},
      {word:"un chanteur",gender:"m",meaning:"歌手（男）",example:"Stromae est un chanteur belge."},
      {word:"une chanteuse",gender:"f",meaning:"歌手（女）",example:"Joyce Jonathan est une chanteuse française."},
      {word:"la liaison",meaning:"連音",example:"ils_ont [il-z-õ], les_enfants [le-z-ɑ̃fɑ̃]"},
    ],
    grammar:[
      {title:"C'est vs il est / elle est",content:"C'est + 冠詞 + 名詞：C'est UN acteur.\nC'est + 姓名：C'est Stromae.\nC'est + 強調代名詞：C'est moi !\n\nil est / elle est + 形容詞（無冠詞）：Il est acteur. Elle est belge.\n\n⚠️ 如果形容詞前有冠詞一定用 C'est：C'est UN acteur BELGE."},
      {title:"連音規則（Liaison）",content:"必須連音：\n① 代名詞+動詞：ils_ont, nous_avons, vous_êtes\n② 冠詞+名詞：les_enfants, un_homme\n③ 形容詞+名詞（形容詞在前）：un grand_arbre\n\n禁止連音（H aspiré）：\nles / haricots → 不連音（[le a-ri-ko]）"},
    ],
    exercises:[
      {type:"選",q:"「這是一位法國演員。」",opts:["Il est un acteur français.","C'est un acteur français.","C'est acteur français."],ans:1,exp:"冠詞+名詞前用 C'est"},
      {type:"選",q:"「她是比利時人。」（形容詞，無冠詞）",opts:["C'est elle belge.","Elle est belge.","Elle est une belge."],ans:1,exp:"形容詞前不加冠詞：Elle est belge."},
      {type:"填",q:"A: Qui est-ce ? B: C'___ Céline Dion. C'est une chanteuse ___. (canada→adj)",blanks:["est","canadienne"],hint:"C'est + nom / canadien(m)→canadienne(f)"},
    ],
    dialogue:[
      {s:"A",t:"Qui est-ce ?"},{s:"B",t:"C'est Stromae."},
      {s:"A",t:"C'est un chanteur ?"},{s:"B",t:"Oui, c'est un chanteur."},
      {s:"A",t:"C'est un Belge ?"},{s:"B",t:"Oui, c'est ça !"},
      {s:"A",t:"Et elle, qui est-ce ?"},{s:"B",t:"C'est Joyce Jonathan. C'est une chanteuse française."},
    ],
    tip:"C'est ça = 沒錯！是個很好用的確認句。"
  },
  {
    id:"0203", level:"1", noteLinks:[], date:"02/03", weekday:"二", topic:"-er 規則動詞・日常活動",
    tags:["-er動詞","habiter","否定"],
    summary:[
      {text:"-er 規則動詞字尾：-e / -es / -e / -ons / -ez / -ent（唸法：je/tu/il 同音）"},
      {text:"主要動詞：parler, habiter, écouter, regarder, travailler, chanter"},
      {text:"疑問句三種說法：口語（升調）、est-ce que、倒裝"},
      {text:"否定：ne...pas 夾住動詞", fr:"Je n'habite pas à Paris."},
      {text:"故事：Lucas, Mélissa, Florent, Noémie 來巴黎參加音樂舞蹈營"},
    ],
    flashcards:[
      {word:"habiter",meaning:"居住",example:"J'habite à Taipei, à Taïwan."},
      {word:"écouter",meaning:"聽",example:"J'écoute de la musique classique."},
      {word:"regarder",meaning:"看",example:"Il regarde des films sur Netflix."},
      {word:"travailler",meaning:"工作",example:"Elle travaille dans un café."},
      {word:"chanter",meaning:"唱歌",example:"Laurent Voulzy chante « Belle-île-en-mer »."},
      {word:"un stage",gender:"m",meaning:"實習/研習營",example:"Ils sont à Paris pour le stage « Musique et Danse »."},
    ],
    grammar:[
      {title:"-er 規則動詞變化（以 parler 為例）",table:{headers:["主詞","parler","habiter","écouter"],rows:[["je/j'","parle","habite","écoute"],["tu","parles","habites","écoutes"],["il/elle","parle","habite","écoute"],["nous","parlons","habitons","écoutons"],["vous","parlez","habitez","écoutez"],["ils/elles","parlent","habitent","écoutent"]]}},
      {title:"疑問句三種方式",content:"① 口語（升調）：Tu habites à Paris ?\n② 標準（est-ce que）：Est-ce que tu habites à Paris ?\n③ 正式（倒裝）：Habites-tu à Paris ?\n\n帶疑問詞：\noù：Tu habites où ? / Où habites-tu ?\ncomment：Comment tu t'appelles ?\nquand：Tu travailles quand ?\nquel(le)：Quelle est ta nationalité ?"},
    ],
    exercises:[
      {type:"選",q:"「你在哪裡住？」（標準問法）",opts:["Où tu habites ?","Où est-ce que tu habites ?","Où habite tu ?"],ans:1,exp:"標準疑問句：Où est-ce que + 主詞 + 動詞"},
      {type:"選",q:"「她不看電視。」",opts:["Elle ne regarde pas la télé.","Elle ne regarde la télé pas.","Elle pas regarde la télé."],ans:0,exp:"ne...pas 夾住動詞：Elle NE regarde PAS la télé."},
      {type:"填",q:"Nous ___ (habiter) à Lyon. / Ils ___ (travailler) dans un restaurant.",blanks:["habitons","travaillent"],hint:"nous → -ons / ils → -ent"},
    ],
    dialogue:[
      {s:"A",t:"Vous habitez à Paris ?"},{s:"B",t:"Non, je n'habite pas à Paris. J'habite à Lyon, en France."},
      {s:"A",t:"Vous travaillez ?"},{s:"B",t:"Non, je suis étudiant. Et vous ?"},
      {s:"A",t:"Moi, je travaille dans un café."},
    ],
    tip:"habitez → ez 字尾（= 99.9% 的動詞 vous 字尾，例外：vous êtes / faites / dites）"
  },
  {
    id:"0205", level:"1", noteLinks:[], date:"02/05", weekday:"四", topic:"形容詞・喜好表達 aimer",
    tags:["形容詞陰陽","aimer+inf","喜好表達"],
    summary:[
      {text:"形容詞七種變化規則：+e、~er→~ère、~on→~onne、~eux→~euse、~teur→~trice 等"},
      {text:"aimer + 原形動詞：", fr:"J'aime voyager. / J'adore lire."},
      {text:"aimer + 定冠詞 + 名詞：", fr:"J'aime la musique. / J'aime le chocolat."},
      {text:"程度表達：", fr:"J'adore > J'aime beaucoup > J'aime bien > Je n'aime pas > Je déteste"},
      {text:"形容詞位置：通常在名詞後（grand, beau 等少數在名詞前）"},
    ],
    flashcards:[
      {word:"grand(e)",meaning:"高大的 / 重要的",example:"Un grand homme = 偉人（不是高個子）"},
      {word:"beau / belle",meaning:"美麗的/帥的（不規則）",example:"C'est un bel hôtel. Elle est belle."},
      {word:"j'adore",meaning:"我超愛",example:"J'adore la cuisine française !"},
      {word:"je déteste",meaning:"我討厭",example:"Je déteste faire la vaisselle."},
      {word:"nouveau / nouvelle",meaning:"新的（不規則）",example:"C'est un nouvel appartement."},
      {word:"vieux / vieille",meaning:"舊的/老的（不規則）",example:"C'est un vieux livre."},
    ],
    grammar:[
      {title:"形容詞陰陽性變化規則",content:"① 一般：+e → étudiant→étudiante, grand→grande\n② ~er→~ère：cuisinier→cuisinière\n③ ~on→~onne：bon→bonne, mignon→mignonne\n④ ~en→~enne：ancien→ancienne\n⑤ ~eux→~euse：sérieux→sérieuse, heureux→heureuse\n⑥ ~teur→~trice：acteur→actrice, directeur→directrice\n⑦ 不規則：beau→belle, nouveau→nouvelle, vieux→vieille, blanc→blanche"},
      {title:"beau/nouveau/vieux 的特殊形",content:"在陽性單數+母音/h開頭名詞前：\nbeau → bel：un BEL hôtel, un BEL homme\nnouveau → nouvel：un NOUVELappartement\nvieux → vieil：un VIEIL ami\n\n陰性：belle, nouvelle, vieille（一般形）"},
    ],
    exercises:[
      {type:"選",q:"「一位新女學生」",opts:["un nouveau étudiante","une nouvelle étudiante","une nouvel étudiante"],ans:1,exp:"étudiante是陰性，nouvelle是beau/nouveau的陰性形"},
      {type:"選",q:"「她喜歡旅行。」",opts:["Elle aime le voyager.","Elle aime voyager.","Elle aime du voyager."],ans:1,exp:"aimer + 原形動詞（無冠詞）：Elle aime voyager."},
      {type:"填",q:"Il est ___ (sérieux→f?). / C'est une ___ (directeur→f) de l'école.",blanks:["sérieuse","directrice"],hint:"~eux→~euse / ~teur→~trice"},
    ],
    dialogue:[
      {s:"A",t:"Qu'est-ce que vous aimez ?"},{s:"B",t:"J'adore la musique et j'aime beaucoup voyager."},
      {s:"A",t:"Vous aimez le sport ?"},{s:"B",t:"Pas beaucoup. Je préfère lire."},
      {s:"A",t:"Vous aimez la cuisine française ?"},{s:"B",t:"Oui, j'aime beaucoup ça !"},
    ],
    tip:"aimer bien ≠ 非常喜歡！aimer bien 其實是「還蠻喜歡」，程度比 aimer beaucoup 低。"
  },
  {
    id:"0210", level:"1", noteLinks:[], date:"02/10", weekday:"二", topic:"冠詞系統・家庭成員",
    tags:["定冠詞","不定冠詞","de+冠詞縮合"],
    summary:[
      {text:"定冠詞（特定）：le / la / l' / les — 用於泛指或已知的事物"},
      {text:"不定冠詞（某一個）：un / une / des — 用於第一次提及"},
      {text:"de + le = du / de + les = des（所有格縮合）"},
      {text:"問東西：", fr:"Qu'est-ce que c'est ? → C'est un/une..."},
      {text:"問人：", fr:"Qui est-ce ? → C'est + 姓名"},
      {text:"家庭成員：père, mère, frère, sœur, fils, fille, oncle, tante, cousin(e)"},
    ],
    flashcards:[
      {word:"le / la / l' / les",meaning:"定冠詞（the）",example:"J'aime le chocolat. J'aime la musique."},
      {word:"un / une / des",meaning:"不定冠詞（a / some）",example:"C'est un livre. Ce sont des livres."},
      {word:"du / de la",meaning:"部分冠詞（一些）",example:"Je mange du riz. Elle boit de la bière."},
      {word:"le frère",gender:"m",meaning:"兄弟",example:"Mon frère s'appelle Thomas."},
      {word:"la sœur",gender:"f",meaning:"姊妹",example:"J'ai une petite sœur."},
      {word:"Qu'est-ce que c'est ?",meaning:"這是什麼？",example:"Qu'est-ce que c'est ? C'est un stylo."},
    ],
    grammar:[
      {title:"冠詞總覽",table:{headers:["","陽性(m)","陰性(f)","母音/h","複數"],rows:[["定冠詞 le/la","le café","la table","l'hôtel","les cafés"],["不定冠詞 un/une","un café","une table","un hôtel","des cafés"],["部分冠詞 du/de la","du café","de la bière","de l'eau","des pâtes"]]}},
      {title:"de + 冠詞縮合",content:"de + le → du：le sac DU professeur（老師的包包）\nde + les → des：le livre DES étudiants（學生的書）\nde + la → 不縮合：la voiture DE LA directrice\nde + l' → 不縮合：le nom DE L'étudiant"},
      {title:"否定後冠詞變化",content:"肯定：J'ai UN chien. Je mange DE LA viande.\n否定：Je n'ai pas DE chien. Je ne mange pas DE viande.\n\n⚠️ 定冠詞否定時不變：Je n'aime pas LE chocolat.（定冠詞不變）"},
    ],
    exercises:[
      {type:"選",q:"「一把吉他」",opts:["le guitare","la guitare","une guitare"],ans:2,exp:"第一次提及=不定冠詞，guitare是陰性→une"},
      {type:"選",q:"「我愛法文。」（泛指）",opts:["J'aime un français.","J'aime le français.","J'aime de français."],ans:1,exp:"泛指語言/喜好用定冠詞：J'aime LE français."},
      {type:"填",q:"C'est le livre ___ (de+le) prof. / J'ai ___ (un/une) amie française.",blanks:["du","une"],hint:"de+le=du / amie是陰性母音開頭→une"},
    ],
    dialogue:[
      {s:"A",t:"Qu'est-ce que c'est ?"},{s:"B",t:"C'est le sac de la sœur de mon ami."},
      {s:"A",t:"Qui est-ce ?"},{s:"B",t:"C'est ma copine. Elle s'appelle Sara."},
      {s:"A",t:"Elle est française ?"},{s:"B",t:"Non, elle est belge mais elle habite à Paris."},
    ],
    tip:"du（du pain 一些麵包）= de + le 縮合，是所有格！別跟部分冠詞搞混了。"
  },
  {
    id:"0212", level:"1", noteLinks:[], date:"02/12", weekday:"四", topic:"avoir・年齡・感覺・數字複習",
    tags:["avoir","年齡","感覺表達"],
    summary:[
      {text:"avoir 動詞：j'ai / tu as / il a / nous avons / vous avez / ils ont"},
      {text:"年齡一定用 avoir，不用 être：", fr:"J'ai 25 ans.（不說 Je suis 25 ans）"},
      {text:"avoir + 感覺（名詞）：avoir faim / soif / chaud / froid / sommeil / peur / mal"},
      {text:"avoir + 物品：", fr:"J'ai une voiture rouge."},
      {text:"否定後接 de/d'：", fr:"Je n'ai pas de frère. / Il n'a pas d'amis."},
    ],
    flashcards:[
      {word:"avoir faim",meaning:"肚子餓",example:"J'ai très faim. On mange ?"},
      {word:"avoir soif",meaning:"口渴",example:"Tu as soif ? Je cherche de l'eau."},
      {word:"avoir peur (de)",meaning:"害怕",example:"J'ai peur des cafards."},
      {word:"avoir chaud / froid",meaning:"感覺熱/冷",example:"J'ai chaud ! Ouvre la fenêtre."},
      {word:"avoir ___ ans",meaning:"幾歲",example:"Il a trente-cinq ans."},
      {word:"avoir envie de",meaning:"想要（欲望）",example:"J'ai envie de dormir."},
    ],
    grammar:[
      {title:"動詞 avoir（現在式）",table:{headers:["主詞","avoir","例句"],rows:[["j'","ai","J'ai un chat."],["tu","as","Tu as quel âge ?"],["il / elle","a","Elle a 25 ans."],["nous","avons","Nous avons une maison."],["vous","avez","Vous avez des frères ?"],["ils / elles","ont","Ils ont soif."]]}},
      {title:"être vs avoir（不要搞混！）",content:"être + adjectif（形容詞）：Je suis fatigué.\nhave + noun（名詞）：J'ai faim.\n\n★ 年齡 → avoir：J'ai 30 ans. ✓（絕對不說 Je suis 30 ans）\n★ 感覺（法文用名詞表達）→ avoir：J'ai faim. ✓\n                    （不說 Je suis faimé）"},
    ],
    exercises:[
      {type:"選",q:"「她三十歲。」",opts:["Elle est trente ans.","Elle a trente ans.","Elle est trente."],ans:1,exp:"年齡用 avoir：Elle A trente ans."},
      {type:"選",q:"「我沒有車。」",opts:["Je n'ai pas une voiture.","Je n'ai pas de voiture.","Je n'ai pas la voiture."],ans:1,exp:"否定後接 de：Je n'ai pas DE voiture."},
      {type:"填",q:"Vous ___ quel âge ? (avoir) / J'ai ___ (chaud/froid), ouvre la fenêtre !",blanks:["avez","chaud"],hint:"vous → avez / 熱=chaud，冷=froid"},
    ],
    dialogue:[
      {s:"A",t:"Tu as quel âge ?"},{s:"B",t:"J'ai 30 ans. Et toi ?"},
      {s:"A",t:"Moi aussi, j'ai 30 ans ! Tu as faim ?"},{s:"B",t:"Oui, j'ai très faim."},
      {s:"A",t:"On va au restaurant ?"},{s:"B",t:"Bonne idée ! J'ai envie de sushi."},
    ],
    tip:"Moi aussi（我也是）/ Moi non plus（我也不）/ Moi si（我相反，我有/是）"
  },
  {
    id:"0224", level:"1", noteLinks:[], date:"02/24", weekday:"二", topic:"疑問句・quel・所有格形容詞",
    tags:["est-ce que","quel/quelle","ton/ta/votre"],
    summary:[
      {text:"疑問句三種：升調、est-ce que、倒裝（正式）"},
      {text:"quel/quelle（哪個/什麼）+ 名詞：", fr:"Quelle est votre nationalité ? Quel âge avez-vous ?"},
      {text:"所有格 tu：ton（陽性）/ ta（陰性）/ tes（複數）"},
      {text:"所有格 vous：votre / votre / vos"},
      {text:"陰性名詞母音開頭用 ton（非 ta）：", fr:"ton amie, ton adresse, ton omelette"},
    ],
    flashcards:[
      {word:"quel / quelle",meaning:"哪個/什麼（疑問形容詞）",example:"Quel est ton prénom ? Quelle heure est-il ?"},
      {word:"ton / ta / tes",meaning:"你的（tu 所有格）",example:"ton livre, ta voiture, tes amis"},
      {word:"votre / vos",meaning:"您的/你們的",example:"Votre nom ? Vos parents ?"},
      {word:"est-ce que",meaning:"是否（疑問句標記）",example:"Est-ce que tu habites à Paris ?"},
      {word:"Quelle est votre adresse ?",meaning:"您的地址是？",example:"J'habite au 24, rue de Rivoli."},
      {word:"ton amie",meaning:"你的女性朋友（陰性母音前用 ton）",example:"C'est ton amie ? Elle est sympathique."},
    ],
    grammar:[
      {title:"所有格形容詞（tu / vous）",table:{headers:["","陽性(m)","陰性(f)","複數"],rows:[["tu（你的）","ton","ta / ton*","tes"],["vous（您的）","votre","votre","vos"],["son/sa（他/她的）","son","sa / son*","ses"]]}},
      {title:"quel / quelle 疑問形容詞",content:"quel + 陽性名詞：Quel est ton prénom ?\nquelle + 陰性名詞：Quelle est ta nationalité ?\nquels + 陽性複數：Quels sont tes films préférés ?\nquelles + 陰性複數：Quelles langues tu parles ?\n\n★ 陰性母音前所有格：mon/ton/son（不用 ma/ta/sa）\n例：TON adresse（非 ta adresse）"},
    ],
    exercises:[
      {type:"選",q:"「你的朋友（女性）」",opts:["ta amie","ton amie","votre amie"],ans:1,exp:"陰性名詞但以母音開頭→用 ton（非 ta）"},
      {type:"選",q:"「您的名字是什麼？」（正式）",opts:["Quel est ton prénom ?","Quel est votre prénom ?","Quelles est votre prénom ?"],ans:1,exp:"正式用 votre / prénom 陽性→quel"},
      {type:"填",q:"___ (quel/quelle) est votre profession ? / C'est ___ (ton/ta) livre ?",blanks:["Quelle","ton"],hint:"profession 陰性→quelle / livre 陽性→ton"},
    ],
    dialogue:[
      {s:"Noémie",t:"Quel est votre nom ?"},{s:"Mina",t:"Je m'appelle Mina Choi."},
      {s:"Noémie",t:"Quelle est votre nationalité ?"},{s:"Mina",t:"Je suis belge et coréenne."},
      {s:"Noémie",t:"Et votre profession ?"},{s:"Mina",t:"Je suis stagiaire ici."},
    ],
    tip:"ton amie（不是 ta amie）— 陰性名詞以母音開頭時，發音規則強迫使用 ton/mon/son"
  },
  {
    id:"0226", level:"1", noteLinks:[], date:"02/26", weekday:"四", topic:"vouloir・lire/écrire・代名詞 on",
    tags:["vouloir","lire/écrire","on=nous"],
    summary:[
      {text:"vouloir 現在式：je veux / tu veux / il veut / nous voulons / vous voulez / ils veulent"},
      {text:"條件式（禮貌）：je voudrais（我想要...），比 je veux 更有禮貌"},
      {text:"lire（讀）和 écrire（寫）不規則動詞"},
      {text:"代名詞 on 有三種用法：=人們、=nous（我們）、=某人"},
      {text:"12 個月份：janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre"},
    ],
    flashcards:[
      {word:"je veux",meaning:"我想要（直接）",example:"Je veux aller au cinéma."},
      {word:"je voudrais",meaning:"我想要（禮貌）",example:"Je voudrais un café, s'il vous plaît."},
      {word:"lire",meaning:"閱讀",example:"Tu lis quoi ? Je lis un roman policier."},
      {word:"écrire",meaning:"書寫",example:"Elle écrit des chansons."},
      {word:"On",meaning:"人們/我們/某人",example:"On parle français en France. On y va ?"},
      {word:"un roman",gender:"m",meaning:"小說",example:"J'aime lire des romans d'amour."},
    ],
    grammar:[
      {title:"vouloir 變化",table:{headers:["主詞","vouloir（直陳式）","vouloir（條件式）"],rows:[["je","veux","voudrais"],["tu","veux","voudrais"],["il/elle","veut","voudrait"],["nous","voulons","voudrions"],["vous","voulez","voudriez"],["ils/elles","veulent","voudraient"]]}},
      {title:"lire 和 écrire 變化",table:{headers:["主詞","lire（讀）","écrire（寫）"],rows:[["je","lis","écris"],["tu","lis","écris"],["il/elle","lit","écrit"],["nous","lisons","écrivons"],["vous","lisez","écrivez"],["ils/elles","lisent","écrivent"]]}},
      {title:"代名詞 on 的用法",content:"1) on = 人們（泛稱）：On parle français en France.\n2) on = nous（口語）：On va au cinéma ? = Nous allons au cinéma ?\n3) on = quelqu'un（某人）：On frappe à la porte.\n4) on = tu/vous（帶攻擊性）：On ne dit pas bonjour ?"},
    ],
    exercises:[
      {type:"選",q:"「我想要一杯咖啡，請。」（禮貌）",opts:["Je veux un café.","Je voudrais un café, s'il vous plaît.","Je voulais un café."],ans:1,exp:"禮貌請求用條件式：je voudrais"},
      {type:"選",q:"「她讀什麼？」",opts:["Qu'est-ce qu'elle lise ?","Qu'est-ce qu'elle lit ?","Qu'est-ce qu'elle lisez ?"],ans:1,exp:"lire → il/elle lit"},
      {type:"填",q:"On ___ (parler) français en France. / Je ___ (vouloir, 禮貌) un thé.",blanks:["parle","voudrais"],hint:"on 動詞如 il / voudrais=條件式"},
    ],
    dialogue:[
      {s:"Au café",t:""},{s:"Client",t:"Bonjour monsieur, je voudrais un café, s'il vous plaît."},
      {s:"Serveur",t:"Oui, bien sûr. Et pour vous, madame ?"},{s:"Cliente",t:"Un thé au lait, s'il vous plaît."},
      {s:"Serveur",t:"Très bien. Vous désirez autre chose ?"},{s:"Client",t:"Non, c'est tout. Merci."},
    ],
    tip:"咖啡廳必備：Je voudrais + 飲品/食物 + s'il vous plaît.\n比 Je veux 禮貌且自然！"
  },
  {
    id:"0303", level:"1", noteLinks:[], date:"03/03", weekday:"二", topic:"課文閱讀・il y a・命令式",
    tags:["il y a","命令式","閱讀理解"],
    summary:[
      {text:"il y a（有）：", fr:"Il y a un restaurant dans cet hôtel. / Il y a des problèmes."},
      {text:"命令式（impératif）：去掉主詞，-er 動詞去掉 s（tu形）"},
      {text:"命令式例子：", fr:"Regarde ! / Regardez ! / Regardons !"},
      {text:"冠詞選擇練習：à l'hôtel — une chambre / une personne / une nuit / une clé"},
      {text:"Si！= 用來回答否定問句：", fr:"Tu n'es pas étudiant ? — Si, je suis étudiant !"},
    ],
    flashcards:[
      {word:"il y a",meaning:"有（there is/are）",example:"Il y a un cinéma dans la rue."},
      {word:"une chambre",gender:"f",meaning:"房間",example:"J'ai réservé une chambre pour deux nuits."},
      {word:"être fermé(e)",meaning:"關閉的",example:"Le restaurant est fermé aujourd'hui."},
      {word:"être ouvert(e)",meaning:"開放的",example:"Le bar est ouvert jusqu'à minuit."},
      {word:"Si !",meaning:"有/是的！（反駁否定問句）",example:"Tu n'es pas français ? — Si, je suis français !"},
      {word:"près de",meaning:"在...附近",example:"Il y a une station de métro près d'ici."},
    ],
    grammar:[
      {title:"命令式（Impératif）—-er 動詞",content:"tu 形：去掉 s → Regarde ! / Parle ! / Écoute !\nvous 形：直接去掉主詞 → Regardez ! / Écoutez !\nnous 形：直接去掉主詞 → Regardons ! / Parlons !\n\n★ -er 動詞 tu 形命令式去掉 s，但 y/en 前例外加回 s：\nVas-y ! / Parles-en !"},
      {title:"Oui vs Si",content:"問句是肯定句 → 用 oui 或 non\n問句是否定句 → 用 si（是的，反駁）或 non\n\n例：\nTu es étudiant ? — Oui / Non.\nTu n'es pas étudiant ? — Si, je suis étudiant ! ← 反駁否定"},
    ],
    exercises:[
      {type:"選",q:"「附近有地鐵站嗎？」",opts:["Il a une station près d'ici ?","Il y a une station de métro près d'ici ?","Y a station de métro ici ?"],ans:1,exp:"il y a = there is/are，固定表達"},
      {type:"選",q:"「你不說中文嗎？— ___，我說中文。」",opts:["Oui","Si","Non"],ans:1,exp:"反駁否定問句用 Si！"},
      {type:"填",q:"___ (il y a) une piscine dans l'hôtel ? / Le musée est ___ (ouvert/fermé) le lundi.",blanks:["Il y a","fermé"],hint:"il y a固定 / 博物館週一通常關閉"},
    ],
    dialogue:[
      {s:"Cliente",t:"Bonjour, j'ai réservé une chambre."},{s:"Employé",t:"Oui, madame. C'est pour combien de nuits ?"},
      {s:"Cliente",t:"Deux nuits."},{s:"Employé",t:"Voici votre clé. Chambre 323."},
      {s:"Cliente",t:"Il y a un restaurant dans l'hôtel ?"},{s:"Employé",t:"Oui, mais il est fermé aujourd'hui. Le bar est ouvert."},
    ],
    tip:"il y a 可以表達：① 存在（有）② 時間距離（前）：Il y a deux jours = 兩天前"
  },
  {
    id:"0305", level:"1", noteLinks:[], date:"03/05", weekday:"四", topic:"複習 niveau 1・所有動詞",
    tags:["總複習","動詞總表","être/avoir/faire"],
    summary:[
      {text:"複習所有重要動詞：être, avoir, faire, savoir, connaître, aller, vouloir, prendre, comprendre"},
      {text:"複習疑問句：Comment ? Où ? Quand ? Qui ? Quoi / Que ? Quel(le) ?"},
      {text:"複習文章閱讀：從文章中找人物的國籍、職業、興趣"},
      {text:"職業詞彙複習：steward, hôtesse de l'air, journaliste, présentateur/présentatrice"},
      {text:"學習從法文文章判斷正確/錯誤信息（Vrai / Faux）"},
    ],
    flashcards:[
      {word:"faire",meaning:"做/從事",example:"Qu'est-ce que tu fais ? Je fais du sport."},
      {word:"savoir",meaning:"知道/會（技能）",example:"Je sais nager. Tu sais cuisiner ?"},
      {word:"connaître",meaning:"認識（人/地）",example:"Je connais Paris. Tu connais Lucas ?"},
      {word:"prendre",meaning:"拿/搭/喝",example:"Je prends le métro. Tu prends un café ?"},
      {word:"comprendre",meaning:"理解/了解",example:"Tu comprends ? Oui, je comprends."},
      {word:"journaliste",meaning:"記者（陰陽同形）",example:"Il est journaliste à TF1."},
    ],
    grammar:[
      {title:"關鍵不規則動詞總整理",table:{headers:["動詞","je","tu","il/elle","ils/elles"],rows:[["être（是）","suis","es","est","sont"],["avoir（有）","ai","as","a","ont"],["faire（做）","fais","fais","fait","font"],["aller（去）","vais","vas","va","vont"],["vouloir（要）","veux","veux","veut","veulent"],["prendre（拿）","prends","prends","prend","prennent"],["connaître（識）","connais","connais","connaît","connaissent"],["savoir（知）","sais","sais","sait","savent"]]}},
    ],
    exercises:[
      {type:"選",q:"「你知道他住哪裡嗎？」",opts:["Tu sais où il habite ?","Tu connais où il habite ?","Tu sais où il habitez ?"],ans:0,exp:"savoir + 子句（where/when/how...）"},
      {type:"選",q:"「她認識巴黎嗎？」",opts:["Elle sait Paris ?","Elle connaît Paris ?","Elle comprend Paris ?"],ans:1,exp:"connaître + 地方/人名"},
      {type:"填",q:"Je ___ (prendre) le bus. / Ils ___ (comprendre) le français.",blanks:["prends","comprennent"],hint:"prendre: je prends / comprendre: ils comprennent"},
    ],
    dialogue:[
      {s:"A",t:"Tu connais Harry Roselmack ?"},{s:"B",t:"Non, je ne connais pas. Qui est-ce ?"},
      {s:"A",t:"C'est un journaliste français. Il présente le journal à TF1."},{s:"B",t:"Ah, je sais ! Il est très sympathique."},
      {s:"A",t:"Tu sais où il est né ?"},{s:"B",t:"Non, je ne sais pas."},
    ],
    tip:"savoir vs connaître 記憶法：savoir = KNOW HOW（技能+子句），connaître = KNOW who/where（認識人地）"
  },
  {
    id:"0310", level:"1", noteLinks:[], date:"03/10", weekday:"二", topic:"aller（問候）・地址・身體狀況",
    tags:["comment allez-vous","adresse","aller bien/mal"],
    summary:[
      {text:"aller 除了「去」還可以問候：", fr:"Ça va ? / Comment vas-tu ? / Comment allez-vous ?"},
      {text:"回答：", fr:"Ça va bien. / Je vais bien. / Pas très bien."},
      {text:"詢問第三者：", fr:"Comment va ton père ? Il va bien. / Comment vont tes parents ?"},
      {text:"地址：Il habite au 35, rue Notre-Dame, à Montréal."},
      {text:"email 唸法：ddelage@hotmail.com = d - d - e - l - a - g - e - arobase - hotmail - point - com"},
    ],
    flashcards:[
      {word:"Comment allez-vous ?",meaning:"您好嗎？（正式）",example:"— Comment allez-vous ? — Ça va, merci."},
      {word:"aller bien",meaning:"身體/狀況好",example:"Il va bien. Et toi ?"},
      {word:"une adresse",gender:"f",meaning:"地址",example:"Quelle est votre adresse ?"},
      {word:"maintenant",meaning:"現在",example:"J'habite à Montréal maintenant."},
      {word:"un bébé",gender:"m",meaning:"嬰兒",example:"Votre bébé, c'est un garçon ou une fille ?"},
      {word:"un an",gender:"m",meaning:"一歲/一年",example:"Le garçon a un an."},
    ],
    grammar:[
      {title:"動詞 aller 的問候用法",table:{headers:["問候對象","問句","回答"],rows:[["對方（tu）","Ça va ? / Tu vas bien ?","Ça va bien / Je vais bien"],["對方（vous）","Vous allez bien ? / Comment allez-vous ?","Ça va, merci."],["第三者（他/她）","Comment va ton père ?","Il va bien."],["第三者（複數）","Comment vont tes parents ?","Ils vont bien."]]}},
    ],
    exercises:[
      {type:"選",q:"「你父親好嗎？」（tu 形式）",opts:["Comment va votre père ?","Comment va ton père ?","Comment vont ton père ?"],ans:1,exp:"tu → ton（所有格），va（單數）"},
      {type:"選",q:"「他們很好。」",opts:["Il vont bien.","Ils va bien.","Ils vont bien."],ans:2,exp:"ils → vont（aller複數）"},
      {type:"填",q:"— Ça ___ (aller) ? — Oui, je ___ bien. Et vous ?",blanks:["va","vais"],hint:"Ça va ? / je vais bien"},
    ],
    dialogue:[
      {s:"David",t:"Salut Céline, tu vas bien ?"},{s:"Céline",t:"Oui, ça va bien. Et toi ?"},
      {s:"David",t:"Je vais bien, merci. J'habite à Montréal maintenant."},{s:"Céline",t:"Au Canada ? Quelle est ton adresse ?"},
      {s:"David",t:"35, rue Notre-Dame, à Montréal. Et mon email : ddelage@hotmail.com"},
    ],
    tip:"arobase = @ 符號；point = . 符號。法文報電子郵件時一定要說出這些符號！"
  },
  {
    id:"0312", level:"1", noteLinks:[], date:"03/12", weekday:"四", topic:"-er 特殊動詞・Mina・對話練習",
    tags:["-cer/-ger/-eler","Mina 對話","職場用語"],
    summary:[
      {text:"-cer 動詞：nous 前 c → ç：", fr:"commencer → nous commençons"},
      {text:"-ger 動詞：nous 前 g → ge：", fr:"manger → nous mangeons"},
      {text:"~é+子音+er 動詞：je/tu/il 的 é → è：", fr:"préférer → je préfère"},
      {text:"appeler/jeter 型：je/tu/il 的字母重複：", fr:"appeler → j'appelle"},
      {text:"職場對話：Enchanté(e) de faire votre connaissance. / Pardon, je suis désolé(e)."},
    ],
    flashcards:[
      {word:"commencer",meaning:"開始（-cer型）",example:"Le cours commence à 19h."},
      {word:"manger",meaning:"吃（-ger型）",example:"Nous mangeons à midi."},
      {word:"préférer",meaning:"較喜歡（é→è型）",example:"Je préfère le thé au café."},
      {word:"j'appelle",meaning:"我打電話/我叫",example:"J'appelle tous les jours."},
      {word:"Pardon !",meaning:"抱歉/什麼？",example:"Pardon, vous pouvez répéter ?"},
      {word:"désolé(e)",meaning:"很抱歉",example:"Je suis désolé d'être en retard."},
    ],
    grammar:[
      {title:"-er 動詞特殊類型",table:{headers:["類型","規則","例子"],rows:[["-cer型","nous前 c→ç","commençons, plaçons"],[ "-ger型","nous前 g→ge","mangeons, voyageons"],["é+c+er型","je/tu/il: é→è","préfère, répète"],["eler/eter型","je/tu/il: 字母重複","j'appelle, il jette"]]}},
      {title:"acheter 型（e+c+er）",content:"acheter, geler, peser... 字母 e 加重音符\nje achète / tu achètes / il achète\nnous achetons（無重音，正常）\n\n⚠️ 別把 préférer 和 acheter 搞混：\npréférer: je PRÉFÈRE（é→è）\nacheter: j'ACHÈTE（e加accent）"},
    ],
    exercises:[
      {type:"選",q:"「我們開始。」",opts:["Nous commençons.","Nous commençons.","Nous commenceons."],ans:0,exp:"-cer動詞 nous 前 c→ç：commençons"},
      {type:"選",q:"「我更喜歡茶。」",opts:["Je préférer le thé.","Je préférons le thé.","Je préfère le thé."],ans:2,exp:"préférer: je préfère（é→è）"},
      {type:"填",q:"Nous ___ (manger) à midi. / J'___ (appeler) mon ami.",blanks:["mangeons","appelle"],hint:"-ger: mangeons / appeler: j'appelle（重複l）"},
    ],
    dialogue:[
      {s:"Fabrice",t:"Mina Choi, voici Pierre Méra, assistant export."},{s:"Pierre",t:"Enchanté, mademoiselle Joy."},
      {s:"Mina",t:"Non, je m'appelle Choi. C.H.O.I."},{s:"Pierre",t:"Oh, pardon ! Je suis désolé."},
      {s:"Mina",t:"C'est un nom coréen."},{s:"Pierre",t:"Vous parlez très bien français !"},
    ],
    tip:"Enchanté de faire votre connaissance. = 很高興認識您。（比 Enchanté 更正式）"
  },
  {
    id:"0317", level:"2", noteLinks:[], date:"03/17", weekday:"二", topic:"aller・faire du/de la・jouer à/de",
    tags:["aller+lieu","faire du sport","jouer"],
    summary:[
      {text:"aller + 介係詞 + 地點：je vais au cinéma / à la piscine / à l'école / aux États-Unis"},
      {text:"faire + du/de la/de l' + 活動：faire du sport, faire de la natation, faire du piano"},
      {text:"否定：ne...pas DE：", fr:"Je ne fais pas de sport. / Il ne fait pas de musique."},
      {text:"jouer de（樂器）vs jouer à（運動/遊戲）"},
      {text:"chez + 人：Je vais chez mes parents. / avec + 人：Je viens avec toi."},
    ],
    flashcards:[
      {word:"faire du sport",meaning:"做運動",example:"Je fais du sport trois fois par semaine."},
      {word:"faire de la natation",meaning:"游泳",example:"Elle fait de la natation le week-end."},
      {word:"jouer au tennis",meaning:"打網球",example:"Tu sais jouer au tennis ?"},
      {word:"jouer de la guitare",meaning:"彈吉他",example:"Il joue de la guitare depuis dix ans."},
      {word:"aller au cinéma",meaning:"去電影院",example:"On va au cinéma ce soir ?"},
      {word:"chez",meaning:"在某人家/在某店",example:"Je vais chez le dentiste demain."},
    ],
    grammar:[
      {title:"faire de la/du/de l' 規則",content:"faire + du（陽性活動）：faire du ski, du vélo, du jogging, du piano, du sport\nfaire + de la（陰性活動）：faire de la danse, de la natation, de la guitare\nfaire + de l'（母音開頭）：faire de l'équitation\n\n⚠️ 否定 → 全變 de：\nJe ne fais pas DE sport. / Elle ne fait pas DE natation."},
      {title:"jouer à vs jouer de",content:"jouer À（競賽/遊戲）：au tennis / au foot / aux échecs / à la poupée\njouer DE（樂器）：du piano / de la guitare / du violon / de l'accordéon\n\n記憶法：DE la musique（音樂），À le sport（運動比賽）"},
      {title:"動詞 aller 和 faire",table:{headers:["主詞","aller（去）","faire（做）"],rows:[["je","vais","fais"],["tu","vas","fais"],["il/elle","va","fait"],["nous","allons","faisons"],["vous","allez","faites"],["ils/elles","vont","font"]]}},
    ],
    exercises:[
      {type:"選",q:"「她打網球。」",opts:["Elle joue de tennis.","Elle joue au tennis.","Elle fait au tennis."],ans:1,exp:"網球是運動→jouer À：au tennis（à+le）"},
      {type:"選",q:"「我不做運動。」",opts:["Je ne fais pas du sport.","Je ne fais pas de sport.","Je ne fais de sport."],ans:1,exp:"否定後 du→de：Je ne fais pas DE sport."},
      {type:"填",q:"Je vais ___ cinéma. (au/à la) — Elle fait ___ guitare. (de la/du)",blanks:["au","de la"],hint:"cinéma(m)→au / guitare(f)→de la"},
    ],
    dialogue:[
      {s:"A",t:"Qu'est-ce que tu fais ce week-end ?"},{s:"B",t:"Je vais au cinéma samedi et je fais du vélo dimanche."},
      {s:"A",t:"Tu aimes le sport ?"},{s:"B",t:"Oui, je fais du yoga et de la natation."},
      {s:"A",t:"Tu joues d'un instrument ?"},{s:"B",t:"Oui, je joue de la guitare depuis deux ans."},
    ],
    tip:"週末必備對話：Qu'est-ce que tu fais ce week-end ? — Je vais + lieu / Je fais + activité"
  },
  {
    id:"0319", level:"2", noteLinks:[], date:"03/19", weekday:"四", topic:"aller 複習・週末活動造句",
    tags:["aller複習","週末活動","chez/avec"],
    summary:[
      {text:"複習 aller + 介係詞 + 地點的各種組合"},
      {text:"你們（vous）幾乎所有動詞都是 -ez 結尾，只有三個例外：vous êtes / faites / dites"},
      {text:"四季：le printemps（春）、l'été（夏）、l'automne（秋）、l'hiver（冬）"},
      {text:"「去運動」可說 aller à la salle de sport / aller au gym"},
      {text:"voir（看）：Je vais voir un film / voir mon ami"},
    ],
    flashcards:[
      {word:"Je vais chez mes parents.",meaning:"我去我父母家。",example:"Ce week-end, je vais chez ma grand-mère."},
      {word:"Je vais voir",meaning:"我去看（某人/某物）",example:"Je vais voir un film américain."},
      {word:"l'été",gender:"m",meaning:"夏天",example:"En été, je vais à la plage."},
      {word:"prendre le train",meaning:"搭火車",example:"Je prends le train pour Kaohsiung."},
      {word:"un concert",gender:"m",meaning:"演唱會",example:"Je vais au concert de Twice !"},
      {word:"vous dites",meaning:"你們說（dire的例外）",example:"Qu'est-ce que vous dites ?"},
    ],
    grammar:[
      {title:"vous 動詞的三個例外",content:"99.9% 動詞：vous + -ez\n例：parlez, habitez, faites...\n\n⚠️ 三個例外：\nvous ÊTES（être）\nvous FAITES（faire）\nvous DITES（dire）\n\n其他全部是 -ez！"},
    ],
    exercises:[
      {type:"選",q:"「你們說什麼？」（dire）",opts:["Qu'est-ce que vous ditez ?","Qu'est-ce que vous dites ?","Qu'est-ce que vous direz ?"],ans:1,exp:"dire例外：vous dites（不是 ditez）"},
      {type:"選",q:"「她去她朋友那裡。」",opts:["Elle va à son ami.","Elle va chez son ami.","Elle va avec son ami."],ans:1,exp:"去某人家用 chez：aller chez quelqu'un"},
      {type:"填",q:"En ___ (été/hiver), je vais à la plage. / Il va ___ (chez/avec) ses parents.",blanks:["été","chez"],hint:"夏天去海邊 / 去某人家=chez"},
    ],
    dialogue:[
      {s:"A",t:"Qu'est-ce que vous faites ce week-end ?"},{s:"B",t:"Je vais chez ma mère à Nouveau Taipei."},
      {s:"A",t:"Vous allez comment ?"},{s:"B",t:"Je prends le train."},
      {s:"A",t:"Et dimanche ?"},{s:"B",t:"Je vais au musée avec ma sœur. Il y a une expo de tableaux."},
    ],
    tip:"chez + 人（去某人家）vs à + 地點（去某地）：chez ma mère / à l'hôpital"
  },
  {
    id:"0324", level:"2", noteLinks:[], date:"03/24", weekday:"二", topic:"代名詞重讀形・情感狀況",
    tags:["pronoms toniques","moi/toi/lui","強調句型"],
    summary:[
      {text:"強調代名詞（pronoms toniques）：moi, toi, lui, elle, nous, vous, eux, elles"},
      {text:"用途：① 句首強調 Moi, je fais la cuisine. ② C'est 後面 C'est moi ! ③ 介係詞後 avec toi / chez eux"},
      {text:"家庭狀況：Je suis célibataire / marié(e) / divorcé(e) / veuf (veuve)."},
      {text:"tous [tus]（代名詞）vs tous [tu]（形容詞）"},
      {text:"城市文化：Dijon et la moutarde / la France et ses vins / Taïwan et son tofu puant 😄"},
    ],
    flashcards:[
      {word:"Moi, je...",meaning:"我嘛，我...（強調）",example:"Moi, j'adore le chocolat."},
      {word:"C'est moi !",meaning:"是我！",example:"Qui est là ? C'est moi, Marie !"},
      {word:"avec moi / toi",meaning:"和我/你",example:"Tu viens avec moi ?"},
      {word:"chez eux / elles",meaning:"在他們/她們家",example:"On se retrouve chez eux ?"},
      {word:"être marié(e)",meaning:"已婚",example:"Il est marié. Elle est mariée."},
      {word:"être célibataire",meaning:"單身",example:"Je suis célibataire."},
    ],
    grammar:[
      {title:"強調代名詞（Pronoms toniques）",table:{headers:["主詞代名詞","強調代名詞","例句"],rows:[["je","moi","Moi, j'aime le sport."],["tu","toi","Et toi ?"],["il","lui","Lui, il ne sait pas."],["elle","elle","Elle, elle est sympa."],["nous","nous","Nous, nous sommes prêts."],["vous","vous","Et vous ?"],["ils","eux","Eux, ils travaillent."],["elles","elles","Elles, elles restent."]]}},
      {title:"強調代名詞三大用途",content:"① 句首強調（+ 主詞代名詞重複）：\nMoi, je fais la cuisine. Toi, tu fais la vaisselle.\n\n② C'est + pronom tonique：\nC'est moi. C'est toi. C'est lui.\n\n③ 介係詞後（à, avec, sans, pour, chez, de...）：\nJe viens AVEC TOI. Je pense À LUI. On va CHEZ EUX."},
    ],
    exercises:[
      {type:"選",q:"「我愛巧克力，你呢？」",opts:["J'aime le chocolat. Et tu ?","Moi, j'aime le chocolat. Et toi ?","Moi, je aime le chocolat. Et tu ?"],ans:1,exp:"句首強調：Moi, je... / 問對方：Et toi ?"},
      {type:"選",q:"「她去他家。」",opts:["Elle va à lui.","Elle va chez lui.","Elle va avec lui maison."],ans:1,exp:"去某人家→chez + 強調代名詞：chez lui"},
      {type:"填",q:"A: Je vais au ciné. Tu viens avec ___? B: D'accord, je viens avec ___.",blanks:["moi","toi"],hint:"邀請用 moi / 回應用 toi"},
    ],
    dialogue:[
      {s:"A",t:"Tu viens avec moi au cinéma ?"},{s:"B",t:"D'accord, je viens avec toi !"},
      {s:"A",t:"Et lui, il vient ?"},{s:"B",t:"Lui, il ne peut pas. Il travaille."},
      {s:"A",t:"On va chez eux après ?"},{s:"B",t:"Bonne idée !"},
    ],
    tip:"記憶法：介係詞後一定用強調代名詞！avec MOI / pour TOI / sans LUI / chez ELLES"
  },
  {
    id:"0326", level:"2", noteLinks:[], date:"03/26", weekday:"四", topic:"近未來式・savoir/connaître・邀請",
    tags:["futur proche","savoir vs connaître","邀請/拒絕"],
    summary:[
      {text:"近未來式：aller（現在式）+ 原形動詞"},
      {text:"例：", fr:"Je vais visiter Paris. / Il va pleuvoir. / Attention, tu vas tomber !"},
      {text:"savoir + 原形動詞（技能/知識）：", fr:"Je sais nager. / Tu sais où il habite ?"},
      {text:"connaître + 名詞（認識人/地方）：", fr:"Je connais Paris. / Tu connais Mélissa ?"},
      {text:"邀請表達：", fr:"Tu veux venir ? / On va au ciné ? / J'aimerais bien faire..."},
    ],
    flashcards:[
      {word:"aller + infinitif",meaning:"近未來式",example:"Elle va partir en vacances demain."},
      {word:"savoir",meaning:"知道/會（技能）",example:"Je sais faire du café !"},
      {word:"connaître",meaning:"認識（人/地）",example:"Je connais un bon restaurant japonais."},
      {word:"Il va pleuvoir.",meaning:"快要下雨了。",example:"Le ciel est gris : il va pleuvoir."},
      {word:"Désolé(e), je suis pris(e).",meaning:"抱歉，我已有約了。",example:"Désolé, je suis déjà pris ce soir."},
      {word:"Avec plaisir !",meaning:"很樂意！",example:"Tu viens dîner ? — Avec plaisir !"},
    ],
    grammar:[
      {title:"近未來式（Futur proche）",content:"結構：sujet + aller（présent）+ infinitif\n\n肯定：Je vais manger. / Ils vont partir.\n否定：Je NE vais PAS manger. / Il NE va PAS pleuvoir.\n問句：Tu vas venir ? / Est-ce que vous allez partir ?\n\n用途：\n① 即將發生：Attention ! Tu vas tomber !\n② 計畫：Nous allons visiter Paris en juillet.\n③ 可預期的事：Le ciel est gris : il va pleuvoir."},
      {title:"savoir vs connaître 對比",table:{headers:["savoir（知道/會）","connaître（認識/了解）"],rows:[["+ infinitif：Je sais nager.","+ nom（人）：Je connais Marie."],["+ 疑問子句：Je sais où il habite.","+ nom（地）：Je connais Paris."],["seul = réponse：Je sais !","+ nom（事物）：Je connais son nom."]]}},
    ],
    exercises:[
      {type:"選",q:"「她明天要去巴黎。」",opts:["Elle va à Paris demain.","Elle va aller à Paris demain.","Elle aller à Paris demain."],ans:1,exp:"近未來式：elle va + 原形動詞 aller"},
      {type:"選",q:"「你認識這個好餐廳嗎？」",opts:["Tu sais ce bon restaurant ?","Tu connais ce bon restaurant ?","Tu comprends ce bon restaurant ?"],ans:1,exp:"認識地方→connaître"},
      {type:"填",q:"Je ___ (savoir) jouer du piano. / Tu ___ (connaître) un bon médecin ?",blanks:["sais","connais"],hint:"savoir: je sais / connaître: tu connais"},
    ],
    dialogue:[
      {s:"A",t:"On va au cinéma ce soir ?"},{s:"B",t:"Je voudrais bien, mais je dois travailler."},
      {s:"A",t:"Et samedi ?"},{s:"B",t:"Samedi, je vais être libre !"},
      {s:"A",t:"On se retrouve devant le ciné à 20h ?"},{s:"B",t:"D'accord. À samedi !"},
    ],
    tip:"邀請 → 接受：Oui, avec plaisir ! / D'accord ! / Je veux bien !\n邀請 → 拒絕：Je voudrais bien, mais... / Désolé(e), j'ai..."
  },
  {
    id:"0331", level:"2", noteLinks:[], date:"03/31", weekday:"二", topic:"vouloir・pouvoir・devoir（-oir動詞）",
    tags:["vouloir","pouvoir","devoir"],
    summary:[
      {text:"三個重要 -oir 動詞：vouloir（想要）、pouvoir（可以/能）、devoir（必須/應該）"},
      {text:"pouvoir：je peux / tu peux / il peut / nous pouvons / vous pouvez / ils peuvent"},
      {text:"devoir：je dois / tu dois / il doit / nous devons / vous devez / ils doivent"},
      {text:"用法：vouloir/pouvoir/devoir + 原形動詞"},
      {text:"avoir envie de = vouloir（口語較自然）：", fr:"Je n'ai pas envie de danser."},
    ],
    flashcards:[
      {word:"je peux",meaning:"我可以",example:"Je peux venir avec toi ?"},
      {word:"je dois",meaning:"我必須",example:"Je dois travailler demain."},
      {word:"il peut",meaning:"他可以/可能",example:"Il peut arriver en retard."},
      {word:"Vous pouvez...?",meaning:"您可以...嗎？（請求）",example:"Vous pouvez répéter, s'il vous plaît ?"},
      {word:"avoir envie de",meaning:"想要（欲望）",example:"Je n'ai pas envie de sortir."},
      {word:"il faut",meaning:"必須/需要（非人稱）",example:"Il faut parler français ici."},
    ],
    grammar:[
      {title:"vouloir / pouvoir / devoir 變化",table:{headers:["主詞","vouloir（想）","pouvoir（能）","devoir（必須）"],rows:[["je","veux","peux","dois"],["tu","veux","peux","dois"],["il/elle","veut","peut","doit"],["nous","voulons","pouvons","devons"],["vous","voulez","pouvez","devez"],["ils/elles","veulent","peuvent","doivent"]]}},
      {title:"三個動詞的語氣差別",content:"vouloir：主觀意願（want）\nJe veux aller au cinéma.（我想去電影院）\n\npouvoir：能力或許可（can / may）\nJe peux venir ? Est-ce que je peux ouvrir la fenêtre ?\n\ndevoir：義務或必要（must / have to）\nJe dois partir maintenant. Tu dois travailler."},
    ],
    exercises:[
      {type:"選",q:"「她必須工作。」",opts:["Elle veut travailler.","Elle doit travailler.","Elle peut travailler."],ans:1,exp:"必須→devoir：Elle doit travailler."},
      {type:"選",q:"「您可以說慢一點嗎？」（請求）",opts:["Vous voulez parler plus lentement ?","Vous pouvez parler plus lentement ?","Vous devez parler plus lentement ?"],ans:1,exp:"客氣請求用 pouvoir：Vous POUVEZ...?"},
      {type:"填",q:"Je ne ___ (vouloir) pas danser. / Il ___ (devoir) arriver à 8h.",blanks:["veux","doit"],hint:"vouloir: je veux / devoir: il doit"},
    ],
    dialogue:[
      {s:"Noémie",t:"Tu veux danser ?"},{s:"Florent",t:"Non, je veux partir."},
      {s:"Noémie",t:"Mais tu dois rester ! Le spectacle commence bientôt."},{s:"Florent",t:"Je sais, mais je n'ai pas envie de danser."},
      {s:"Noémie",t:"Tu peux faire un effort ?"},{s:"Florent",t:"D'accord, d'accord..."},
    ],
    tip:"Je ne peux pas（我沒辦法）vs Je ne veux pas（我不想）— 意思差很多！"
  },
  {
    id:"0402", level:"2", noteLinks:[], date:"04/02", weekday:"四", topic:"日期・節日・邀請文字",
    tags:["la date","les fêtes","invitation écrite"],
    summary:[
      {text:"星期：lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche"},
      {text:"詢問日期：Quel jour sommes-nous ? / On est le combien ?"},
      {text:"回答：Nous sommes / On est + 星期 + 日期 + 月份"},
      {text:"法國節日：le jour de l'An, la Chandeleur, la Saint-Valentin, Pâques, le 14 juillet..."},
      {text:"書面邀請格式：地點+日期開頭，Chers amis，正文，署名"},
    ],
    flashcards:[
      {word:"Quel jour sommes-nous ?",meaning:"今天星期幾？",example:"Nous sommes mardi. C'est mardi."},
      {word:"On est le combien ?",meaning:"今天幾號？",example:"On est le 5 janvier."},
      {word:"le 14 juillet",gender:"m",meaning:"法國國慶日（bastille日）",example:"Le 14 juillet, il y a un feu d'artifice."},
      {word:"Pâques",gender:"f",meaning:"復活節",example:"À Pâques, les enfants cherchent des œufs en chocolat."},
      {word:"un anniversaire",gender:"m",meaning:"生日/週年紀念",example:"C'est mon anniversaire le 4 décembre."},
      {word:"souhaiter",meaning:"祝福",example:"Je vous souhaite une bonne année !"},
    ],
    grammar:[
      {title:"日期的說法",content:"詢問：Quel jour sommes-nous ? / Quelle est la date ?\n\n回答公式：\n星期：Nous sommes mardi. / C'est mardi.\n日期：Nous sommes le 25. / On est le 25.\n完整：Nous sommes mardi 25 novembre 2025.\n\n序數：le 1er（premier），le 2, le 3... le 31\n      只有 premier 用序數，其他全用基數"},
    ],
    exercises:[
      {type:"選",q:"「今天是幾號？」",opts:["Quel jour sommes-nous ?","On est le combien ?","Quelle heure est-il ?"],ans:1,exp:"問幾號：On est le combien ? / Quelle est la date ?"},
      {type:"選",q:"「今天是一月一日。」",opts:["C'est le un janvier.","C'est le premier janvier.","C'est premier janvier."],ans:1,exp:"1號用序數 premier：le premier janvier"},
      {type:"填",q:"Mon anniversaire, c'est ___ 4 décembre. / Nous ___ (être) jeudi aujourd'hui.",blanks:["le","sommes"],hint:"日期前加 le / être: nous sommes"},
    ],
    dialogue:[
      {s:"A",t:"On est le combien, aujourd'hui ?"},{s:"B",t:"On est le 2 avril. Et quel jour ?"},
      {s:"A",t:"C'est jeudi."},{s:"B",t:"Ton anniversaire, c'est quand ?"},
      {s:"A",t:"Mon anniversaire, c'est le 15 mai. Et toi ?"},{s:"B",t:"Moi, c'est le 3 décembre. Bientôt !"},
    ],
    tip:"法國國定假日記憶：1/1日、2/2可麗餅節、2/14情人節、5/1勞動節、7/14國慶日、12/25聖誕節"
  },
  {
    id:"0407", level:"2", noteLinks:[], date:"04/07", weekday:"二", topic:"時間表達・ouvrir/fermer・finir",
    tags:["quelle heure est-il","ouvrir/fermer","-ir動詞"],
    summary:[
      {text:"時間：Il est + heure(s) + 分鐘"},
      {text:"非正式：et demie（半）、et quart（一刻）、moins le quart（差一刻）、midi / minuit"},
      {text:"正式（24h制）：Il est quinze heures trente."},
      {text:"ouvrir / fermer（開/關）及 commencer / finir（開始/結束）"},
      {text:"-ir 規則動詞（finir型）：je finis / il finit / nous finissons / ils finissent"},
    ],
    flashcards:[
      {word:"Il est quelle heure ?",meaning:"現在幾點？",example:"Il est dix heures et quart."},
      {word:"et demie",meaning:"...點半",example:"Il est sept heures et demie. (7:30)"},
      {word:"moins le quart",meaning:"差一刻（...點三刻）",example:"Il est cinq heures moins le quart. (4:45)"},
      {word:"midi / minuit",meaning:"正午 / 午夜",example:"Il est midi cinq. (12:05)"},
      {word:"ouvrir",meaning:"開（門/店）",example:"Le café ouvre à huit heures."},
      {word:"finir",meaning:"結束/完成",example:"Le cours finit à vingt et une heures cinquante."},
    ],
    grammar:[
      {title:"時間表達對照",table:{headers:["時刻","正式（24h）","非正式"],rows:[["09:20","neuf heures vingt","neuf heures vingt"],["15:30","quinze heures trente","trois heures et demie"],["16:45","seize heures quarante-cinq","cinq heures moins le quart"],["00:15","zéro heure quinze","minuit et quart"],["12:00","douze heures","midi"]]}},
      {title:"finir 型 -ir 動詞（第2類）",table:{headers:["主詞","finir","choisir","réussir"],rows:[["je","finis","choisis","réussis"],["tu","finis","choisis","réussis"],["il/elle","finit","choisit","réussit"],["nous","finissons","choisissons","réussissons"],["vous","finissez","choisissez","réussissez"],["ils/elles","finissent","choisissent","réussissent"]]}},
    ],
    exercises:[
      {type:"選",q:"16:45 非正式說法：",opts:["seize heures quarante-cinq","cinq heures moins le quart","cinq heures et quart"],ans:1,exp:"16:45 = 17:00 - 15min = cinq heures moins le quart"},
      {type:"選",q:"「我們選擇這部電影。」",opts:["Nous choisisons ce film.","Nous choisissons ce film.","Nous choisisez ce film."],ans:1,exp:"-ir 動詞 nous → -issons：choisissons"},
      {type:"填",q:"Le cours ___ (commencer) à 19h et ___ (finir) à 21h50.",blanks:["commence","finit"],hint:"commencer: il commence / finir: il finit"},
    ],
    dialogue:[
      {s:"客人",t:"Bonjour, le musée est ouvert ?"},{s:"Employé",t:"Oui, il est ouvert de 9h à 17h30."},
      {s:"客人",t:"Il ferme le lundi ?"},{s:"Employé",t:"Oui, c'est fermé le lundi."},
      {s:"客人",t:"Il est quelle heure maintenant ?"},{s:"Employé",t:"Il est quinze heures. Vous avez le temps !"},
    ],
    tip:"詢問開放時間：C'est ouvert de quelle heure à quelle heure ? / Il ouvre / ferme à quelle heure ?"
  },
  {
    id:"0409", level:"2", noteLinks:[], date:"04/09", weekday:"四", topic:"時間複習・一天作息・出生日期",
    tags:["à quelle heure","moments de la journée","naître"],
    summary:[
      {text:"問時間：À quelle heure...? / ...à quelle heure ?"},
      {text:"一天的時段：le matin（6-12h）、le midi（12-13h）、l'après-midi（13-18h）、le soir（18-23h）、la nuit（23-6h）"},
      {text:"出生日期：Je suis né(e) le 2 décembre 1995. / Je suis né(e) en septembre."},
      {text:"réussir（成功）：je réussis / nous réussissons / ils réussissent"},
      {text:"問睡眠習慣：Tu dors combien d'heures par jour ? Tu vas au lit à quelle heure ?"},
    ],
    flashcards:[
      {word:"Je suis né(e) le...",meaning:"我出生於...（日期）",example:"Je suis née le 3 mai 1998."},
      {word:"le matin",gender:"m",meaning:"早上",example:"Je prends le petit-déjeuner le matin."},
      {word:"le soir",gender:"m",meaning:"晚上",example:"Je dîne le soir à 19h."},
      {word:"Bonne journée !",meaning:"祝美好的一天！",example:"Au revoir ! Bonne journée !"},
      {word:"Bonne nuit !",meaning:"晚安！",example:"Je vais dormir. Bonne nuit !"},
      {word:"dormir",meaning:"睡覺",example:"Tu dors combien d'heures par nuit ?"},
    ],
    grammar:[
      {title:"問出生年月日",content:"年：Tu es né(e) en quelle année ? — Je suis né(e) en 1998.\n月：Tu es né(e) quel mois ? — Je suis né(e) en septembre.\n日：Tu es né(e) à quelle date ? — Je suis né(e) le 3 mai 1998.\n時：Tu es né(e) à quelle heure ? — Je suis né(e) à 22h30.\n\n★ 注意：né(e) 過去分詞，女性加 e：\nIl est né. / Elle est née."},
    ],
    exercises:[
      {type:"選",q:"「你幾點睡覺？」",opts:["Tu vas au lit à quelle heure ?","Tu dors quelle heure ?","Tu es dormi à quelle heure ?"],ans:0,exp:"aller au lit = 就寢：Tu vas au lit à quelle heure ?"},
      {type:"選",q:"「她出生於 1990 年。」",opts:["Elle est née en 1990.","Elle est né en 1990.","Elle a née en 1990."],ans:0,exp:"naître 用 être，女性 → née（加 e）"},
      {type:"填",q:"Je suis ___ (naître, f) ___ 5 juin 2000.",blanks:["née","le"],hint:"女性naître→née / 日期前加 le"},
    ],
    dialogue:[
      {s:"A",t:"Tu commences à travailler à quelle heure ?"},{s:"B",t:"Je commence à neuf heures."},
      {s:"A",t:"Et tu finis à quelle heure ?"},{s:"B",t:"Je finis à dix-huit heures."},
      {s:"A",t:"Tu es né(e) quel mois ?"},{s:"B",t:"Je suis née en décembre. Mon anniversaire, c'est le 15 décembre."},
    ],
    tip:"一天結尾的祝福：bonne journée（白天）/ bon après-midi / bonne soirée / bonne nuit"
  },
  {
    id:"0414", level:"2", noteLinks:[], date:"04/14", weekday:"二", topic:"複合過去式（avoir）・不規則 PP",
    tags:["passé composé","avoir","participe passé"],
    summary:[
      {text:"複合過去式 = avoir/être（現在式）+ 過去分詞（participe passé）"},
      {text:"-er 動詞 PP：-é（parler→parlé, manger→mangé）"},
      {text:"-ir 動詞 PP：-i（finir→fini, choisir→choisi）"},
      {text:"-re 動詞 PP：-u（attendre→attendu, vendre→vendu）"},
      {text:"重要不規則：voir→vu, prendre→pris, boire→bu, faire→fait, écrire→écrit, lire→lu"},
      {text:"否定：ne...pas 夾住助動詞", fr:"Je n'ai pas mangé."},
    ],
    flashcards:[
      {word:"j'ai mangé",meaning:"我吃了",example:"Hier, j'ai mangé une pizza."},
      {word:"il a fait",meaning:"他做了",example:"Il a fait du sport ce matin."},
      {word:"elle a pris",meaning:"她拿了/搭了",example:"Elle a pris le métro."},
      {word:"nous avons vu",meaning:"我們看了",example:"Nous avons vu ce film la semaine dernière."},
      {word:"j'ai bu",meaning:"我喝了",example:"J'ai bu un café noir à midi."},
      {word:"il a écrit",meaning:"他寫了",example:"Il a écrit une chanson pour elle."},
    ],
    grammar:[
      {title:"常見不規則過去分詞",content:"voir → vu（看）\nprendre → pris（拿/搭）\nboire → bu（喝）\nfaire → fait（做）\nécrire → écrit（寫）\nlire → lu（讀）\nvouloir → voulu / pouvoir → pu / devoir → dû\navoir → eu / être → été\nmettre → mis / perdre → perdu\nvenir → venu / partir → parti（改用 être）"},
      {title:"否定句型",content:"否定：ne...pas 夾住助動詞（avoir）\nJe N'ai PAS mangé.\nIl N'a PAS fait de sport.\nElles N'ont PAS vu ce film.\n\n注意：ne → n' 在母音前：\nJe N'ai pas（不說 ne ai pas）"},
    ],
    exercises:[
      {type:"選",q:"「昨天她看了一部電影。」",opts:["Hier, elle a regardé un film.","Hier, elle regardé un film.","Hier, elle a regarder un film."],ans:0,exp:"PC = avoir + PP：elle A regardÉ"},
      {type:"選",q:"「我沒有喝咖啡。」",opts:["Je n'ai pas bu de café.","Je n'ai pas bu du café.","Je n'ai pas boire de café."],ans:0,exp:"否定：ne...pas + bu（boire→bu）+ de（否定後去 du）"},
      {type:"填",q:"Tu ___ (voir, tu) ce film ? — Non, je n'___ pas ___ (voir) ce film.",blanks:["as vu","ai","vu"],hint:"voir→vu / 否定：n'ai pas vu"},
    ],
    dialogue:[
      {s:"A",t:"Tu as fait quoi hier soir ?"},{s:"B",t:"J'ai regardé la télé et j'ai lu un roman."},
      {s:"A",t:"Tu as mangé quoi ?"},{s:"B",t:"J'ai mangé des spaghettis. Et toi ?"},
      {s:"A",t:"Moi, je n'ai pas diné à la maison. Je suis allé au restaurant."},
    ],
    tip:"時間詞配合 PC：hier（昨天）、ce matin（今早）、la semaine dernière（上週）、en 2024（2024年）"
  },
  {
    id:"0416", level:"2", noteLinks:[], date:"04/16", weekday:"四", topic:"複合過去式（être）+ 代動詞",
    tags:["être+PC","VANDERTRAMP","se lever"],
    summary:[
      {text:"14 個位移動詞用 être 作助動詞（VANDERTRAMP 記憶法）"},
      {text:"用 être 時，PP 要和主詞陰陽性/單複數一致"},
      {text:"例：Il est allé. / Elle est allée. / Ils sont allés. / Elles sont allées."},
      {text:"代動詞（se + verbe）也用 être：se lever→elle s'est levée"},
      {text:"Si / avoir / être 這3種動詞用法整合練習"},
    ],
    flashcards:[
      {word:"elle est partie",meaning:"她離開了",example:"Son assistante est partie en vacances."},
      {word:"il est arrivé",meaning:"他到了",example:"Le train est arrivé en retard."},
      {word:"elle est née en 1968",meaning:"她生於1968年",example:"Céline Dion est née en 1968."},
      {word:"se lever",meaning:"起床（代動詞）",example:"Tu t'es levé(e) à quelle heure ?"},
      {word:"se coucher",meaning:"就寢",example:"Elle s'est couchée à minuit."},
      {word:"tomber amoureux",meaning:"愛上某人",example:"Il est tombé amoureux d'elle."},
    ],
    grammar:[
      {title:"VANDERTRAMP — être 的 14 個動詞",content:"V - Venir（venu）    A - Aller（allé）\nN - Naître（né）     D - Descendre（descendu）\nE - Entrer（entré）  R - Rester（resté）\nT - Tomber（tombé）  R - Retourner（retourné）\nA - Arriver（arrivé）M - Mourir（mort）\nP - Partir（parti）\n+ Sortir（sorti）, Monter（monté）, Passer（passé）\n\n★ 全部過去分詞需配合主詞性別/數量！"},
      {title:"être + PP 的陰陽性變化",table:{headers:["主詞","aller 過去式","partir 過去式"],rows:[["il","est allé","est parti"],["elle","est allée (+e)","est partie (+e)"],["ils","sont allés (+s)","sont partis (+s)"],["elles","sont allées (+es)","sont parties (+es)"]]}},
    ],
    exercises:[
      {type:"選",q:"「她去了電影院。」（女性）",opts:["Elle est allé au cinéma.","Elle est allée au cinéma.","Elle a allé au cinéma."],ans:1,exp:"aller用être，女性→allée（加e）"},
      {type:"選",q:"「她幾點起床？」",opts:["Elle a levé à quelle heure ?","Elle s'est levée à quelle heure ?","Elle est levée à quelle heure ?"],ans:1,exp:"代動詞 se lever：elle s'est levée（être + PP）"},
      {type:"填",q:"Ils ___ (partir) en vacances. / Elle ___ (se coucher) à minuit.",blanks:["sont partis","s'est couchée"],hint:"partir→être / se coucher→être+代動詞"},
    ],
    dialogue:[
      {s:"A",t:"Tu t'es levée à quelle heure ce matin ?"},{s:"B",t:"Je me suis levée à sept heures et demie."},
      {s:"A",t:"Et tu es arrivée au bureau à quelle heure ?"},{s:"B",t:"Je suis arrivée à neuf heures. J'ai pris le métro."},
      {s:"A",t:"Tu n'es pas allée à la réunion ?"},{s:"B",t:"Si ! Je suis arrivée juste à l'heure."},
    ],
    tip:"Si！= 反駁否定問句的「有/是的！」\nTu n'es pas allée ? — SI, je suis allée !（≠ Oui）"
  },
  {
    id:"0421", level:"2", noteLinks:[], date:"04/21", weekday:"二", topic:"過去式總複習・souhaiter・Mélina",
    tags:["PC綜合","être/avoir","祝福語"],
    summary:[
      {text:"複合過去式總複習：avoir vs être 助動詞選擇"},
      {text:"動詞階段：La journée de Noémie — 綜合用法練習（先用 avoir，位移用 être）"},
      {text:"祝福語：Félicitations ! / Tous mes vœux ! / Bon anniversaire ! / Bonne chance !"},
      {text:"日記詞彙：un journal intime, faire un stage, s'inscrire à, dynamique"},
      {text:"ascenseur（電梯）/ escalator（手扶梯）/ escalier（樓梯）"},
    ],
    flashcards:[
      {word:"Félicitations !",meaning:"恭喜！",example:"Tu as réussi ton examen ! Félicitations !"},
      {word:"Tous mes vœux !",meaning:"獻上我所有祝福！",example:"Pour votre mariage : tous mes vœux de bonheur !"},
      {word:"Bonne chance !",meaning:"祝你好運！",example:"Tu as un entretien demain ? Bonne chance !"},
      {word:"Santé !",meaning:"乾杯！（健康）",example:"À votre santé !"},
      {word:"dynamique",meaning:"有活力的",example:"C'est une personne très dynamique."},
      {word:"un stage",gender:"m",meaning:"實習",example:"Elle fait un stage dans cette entreprise."},
    ],
    grammar:[
      {title:"La journée de Noémie（PC 練習）",content:"① Elle A répété Notre-Dame de Paris à 10h. （avoir）\n② Elle A déjeuné avec Florent à midi.（avoir）\n③ Elle EST allée au jardin du Luxembourg.（être）\n④ Elle EST rentrée à la Cité seule.（être）\n\n規則：動作一般用 avoir，位移/變化用 être！"},
    ],
    exercises:[
      {type:"選",q:"「她回家了。」",opts:["Elle a rentrée à la maison.","Elle est rentrée à la maison.","Elle a rentré à la maison."],ans:1,exp:"rentrer = 位移動詞 → être：elle est rentrée"},
      {type:"選",q:"「他唱了一首歌。」",opts:["Il est chanté une chanson.","Il a chanté une chanson.","Il a chanter une chanson."],ans:1,exp:"chanter 不是位移動詞 → avoir：il a chanté"},
      {type:"填",q:"Elle ___ (aller) au marché et ___ (acheter) des fleurs.",blanks:["est allée","a acheté"],hint:"aller→être（est allée）/ acheter→avoir（a acheté）"},
    ],
    dialogue:[
      {s:"A",t:"Tu as passé une bonne journée ?"},{s:"B",t:"Oui, j'ai travaillé le matin, puis je suis allée au musée."},
      {s:"A",t:"Tu es rentrée à quelle heure ?"},{s:"B",t:"Je suis rentrée vers 19h. Et toi ?"},
      {s:"A",t:"Moi, je suis resté à la maison. J'ai regardé un film."},
    ],
    tip:"Bon voyage ! / Bon appétit ! / Bon travail ! / Bonnes vacances !\n這些 bon/bonne + 名詞 的表達超實用！"
  },
  {
    id:"0423", level:"2", noteLinks:[], date:"04/23", weekday:"四", topic:"PC 複習・介係詞複習・預約",
    tags:["PC複習","介係詞總整","fixer un rendez-vous"],
    summary:[
      {text:"複合過去式整體複習：-er→é / -ir→i / -re→u 規則，加上不規則"},
      {text:"介係詞動詞搭配複習：aller au/à la/aux/chez / faire du/de la / jouer de/au"},
      {text:"預約表達：", fr:"Je voudrais prendre un rendez-vous. / C'est possible vendredi ?"},
      {text:"avoir peur de + nom/verbe：", fr:"J'ai peur du dentiste. / J'ai peur de faire des erreurs."},
      {text:"venir de（來自）：", fr:"Je viens du Japon. / Elle vient de France. / Ils viennent des Philippines."},
    ],
    flashcards:[
      {word:"Je voudrais prendre RDV.",meaning:"我想要預約。",example:"Bonjour, je voudrais prendre un rendez-vous avec le docteur."},
      {word:"venir de",meaning:"來自",example:"Je viens du Japon. / Elle vient de France."},
      {word:"avoir peur de",meaning:"害怕...",example:"J'ai peur de parler une langue étrangère."},
      {word:"c'était",meaning:"那（過去）是（imparfait）",example:"C'était intéressant !"},
      {word:"tout le monde",meaning:"所有人/大家",example:"Bonjour à tout le monde !"},
      {word:"une erreur",gender:"f",meaning:"錯誤",example:"J'ai peur de faire des erreurs."},
    ],
    grammar:[
      {title:"venir de（來自）",content:"de + 陰性國家：Je viens DE France / DE Chine / D'Espagne\ndu + 陽性國家：Je viens DU Japon / DU Canada\ndes + 複數國家：Elle vient DES Philippines / DES États-Unis\nde + 城市：Il vient DE Paris / DE Taipei\n\n★ venir → je viens, tu viens, il vient, nous venons, vous venez, ils viennent"},
      {title:"介係詞總表（去/在）",content:"aller à（城市）→ à Paris / à Taipei\naller en（陰性國家）→ en France / en Chine\naller au（陽性國家）→ au Japon / au Canada\naller aux（複數）→ aux États-Unis\naller chez（人）→ chez mes parents\nfaire du（陽性活動）→ du sport / du vélo\nfaire de la（陰性活動）→ de la natation / de la danse\njouer de（樂器）→ du piano / de la guitare\njouer à（運動）→ au tennis / au foot"},
    ],
    exercises:[
      {type:"選",q:"「她來自菲律賓。」",opts:["Elle vient de Philippines.","Elle vient des Philippines.","Elle vient aux Philippines."],ans:1,exp:"Philippines是複數→des：Elle vient DES Philippines."},
      {type:"選",q:"「我害怕去看牙醫。」",opts:["J'ai peur aller chez le dentiste.","J'ai peur d'aller chez le dentiste.","J'ai peur de aller chez le dentiste."],ans:1,exp:"avoir peur DE + infinitif（母音前縮為 d'）"},
      {type:"填",q:"Je viens ___ (du/de la) Japon. / Elle vient ___ (de/d') Espagne.",blanks:["du","d'"],hint:"Japon陽性→du / Espagne母音開頭→d'"},
    ],
    dialogue:[
      {s:"Secrétaire",t:"Cabinet du docteur Renoir, bonjour."},{s:"Patient",t:"Bonjour, je voudrais prendre un rendez-vous, s'il vous plaît."},
      {s:"Secrétaire",t:"Oui, c'est pour quand ?"},{s:"Patient",t:"Vendredi, si c'est possible."},
      {s:"Secrétaire",t:"Vendredi à 10h ou à 15h ?"},{s:"Patient",t:"À 15h, parfait. Merci !"},
    ],
    tip:"電話預約必備：Je voudrais prendre un rendez-vous avec + 人名 / pour + 日期."
  },
  {
    id:"0428", level:"2", noteLinks:[], date:"04/28", weekday:"二", topic:"書信邀請・tout/toute/tous・節日",
    tags:["invitation écrite","tout/tous","week-end活動"],
    summary:[
      {text:"tout / toute / tous / toutes + 定冠詞 + 名詞："},
      {text:"tout le monde（所有人）、toute la journée（整天）、tous les jours（每天）、toutes les filles（所有女生）"},
      {text:"書信格式：Cher/Chère + 名字，正文，署名（Amitiés / Bises / Cordialement）"},
      {text:"邀請書信：感謝語 Merci pour + nom / Merci de + infinitif"},
      {text:"描述過去假期（PC）：Je suis allée... J'ai visité... J'ai déjeuné..."},
    ],
    flashcards:[
      {word:"tout le monde",meaning:"所有人/大家",example:"Tout le monde doit participer."},
      {word:"tous les jours",meaning:"每天",example:"Il va au marché tous les jours."},
      {word:"toute la journée",meaning:"整天",example:"Il a peint toute la journée."},
      {word:"Merci pour...",meaning:"謝謝...（後接名詞）",example:"Merci pour ton invitation !"},
      {word:"Merci de...",meaning:"謝謝...（後接動詞）",example:"Merci de venir à la fête."},
      {word:"Amitiés",meaning:"致意（書信結尾）",example:"Bises et amitiés, Noémie"},
    ],
    grammar:[
      {title:"tout/toute/tous/toutes",content:"tout + 陽性單數名詞：tout le temps / tout le monde\ntoute + 陰性單數名詞：toute la journée / toute la nuit\ntous + 陽性複數名詞：tous les jours / tous mes amis\ntoutes + 陰性複數名詞：toutes les filles / toutes les semaines\n\n★ tous（代名詞）發音 [tus]，tous（形容詞）發音 [tu]"},
      {title:"書信結尾常見表達",content:"給熟人（Cher/Chère + prénom）：\nBises !（吻）/ Bisous !（小吻）/ Amitiés（致意）\n\n給長輩或比較正式：\nCordialement（誠摯地）/ Bien à vous（祝您一切順利）\n\n開頭：Cher Max, / Chère Marie, / Chers amis,"},
    ],
    exercises:[
      {type:"選",q:"「每天」",opts:["tout le jour","tous les jours","toute les jours"],ans:1,exp:"jour是陽性複數→tous les jours"},
      {type:"選",q:"「謝謝你的邀請。」",opts:["Merci de ton invitation.","Merci pour ton invitation.","Merci à ton invitation."],ans:1,exp:"Merci POUR + 名詞：Merci POUR ton invitation."},
      {type:"填",q:"___ le monde aime le chocolat. / Je travaille ___ la journée.",blanks:["Tout","toute"],hint:"monde陽性→Tout / journée陰性→toute"},
    ],
    dialogue:[
      {s:"Noémie",t:"Cher Maxime, tu vas bien ?"},{s:"Noémie",t:"Je suis allée à Cannes pour le 14 juillet."},
      {s:"Noémie",t:"Je suis restée 3 nuits. J'ai visité le musée de la Castre."},{s:"Noémie",t:"C'était très intéressant !"},
      {s:"Noémie",t:"Et toi, tu as passé de bonnes vacances ? Bises, Noémie."},
    ],
    tip:"書信寫法：地點+日期開頭（Oléron, le 17 juillet）→ Chers amis → 正文 → Amitiés + 姓名"
  },
  {
    id:"0430", level:"2", noteLinks:[], date:"04/30", weekday:"四", topic:"期末複習・PC 修正練習",
    tags:["總複習","PC修正","代名詞複習"],
    summary:[
      {text:"複合過去式修正練習（avoir / être / 代動詞 / 陰陽性一致）"},
      {text:"代名詞強調形複習（moi, toi, lui, elle, nous, vous, eux, elles）"},
      {text:"Merci pour（名詞）vs Merci de（動詞）"},
      {text:"接受/拒絕邀請的完整表達複習"},
      {text:"（最後一堂課）Bravo à tous ! Félicitations !"},
    ],
    flashcards:[
      {word:"éteindre la lumière",meaning:"關燈",example:"Il a éteint la lumière avant de partir."},
      {word:"prendre une douche",meaning:"淋浴",example:"Il a pris une douche ce matin."},
      {word:"faire le lit",meaning:"整理床舖",example:"Elle n'a pas fait le lit."},
      {word:"se taire",meaning:"安靜/閉嘴",example:"Tout le monde s'est tu quand il est entré."},
      {word:"Bravo !",meaning:"太棒了！",example:"Bravo ! Tu as réussi ton examen !"},
      {word:"On y va !",meaning:"我們走！/我們開始！",example:"Tout le monde est prêt ? On y va !"},
    ],
    grammar:[
      {title:"複合過去式易錯點總整理",content:"① avoir 的 PP 不用配合主詞性別（除非有 COD 在前）\nIl a chanté. / Elle a chanté.（同樣）\n\n② être 的 PP 一定配合主詞：\nIl est parti. / Elle est partie. / Ils sont partis. / Elles sont parties.\n\n③ monter/descendre/sortir/passer/rentrer 可用 avoir 或 être，意思不同：\nIl est monté.（他爬上去了）\nIl a monté la valise.（他把行李搬上去）"},
    ],
    exercises:[
      {type:"選",q:"「她把車停進車庫。」（有受詞）",opts:["Elle est rentrée la voiture au garage.","Elle a rentré la voiture au garage.","Elle a rentré au garage."],ans:1,exp:"rentrer + 受詞（把...放進）→ avoir：elle A rentré la voiture."},
      {type:"選",q:"「你（男）幾點回家的？」",opts:["Tu es rentré à quelle heure ?","Tu as rentré à quelle heure ?","Tu es rentrée à quelle heure ?"],ans:0,exp:"rentrer（不及物）= 位移 → être：tu es rentré（男性，無 e）"},
      {type:"填",q:"Merci ___ (pour/de) ton message. / On ___ va. (y)",blanks:["pour","y"],hint:"Merci pour+nom / On y va = 走/開始"},
    ],
    dialogue:[
      {s:"A",t:"On y va ?"},{s:"B",t:"Oui, allons-y !"},
      {s:"A",t:"Merci pour ce cours de français."},{s:"Professeur",t:"Merci à vous tous !"},
      {s:"Professeur",t:"Vous avez beaucoup progressé. Félicitations !"},{s:"Classe",t:"Merci, professeur ! Bonne continuation !"},
    ],
    tip:"最後一課！你已經完成了整個 A1-A2 旅程。\n繼續練習：每天說一句法文，看法文影片，讀法文文章。Continuez ! 😊🇫🇷"
  },
  {
    id:"0519", level:"3", noteLinks:["g009"],
    vocabItems:[
      {word:"ce / cet",meaning:"這個（陽性）",example:"ce livre / cet opéra / cet hôtel"},
      {word:"cette",meaning:"這個（陰性）",example:"cette robe / cette bouteille"},
      {word:"ces",meaning:"這些（複數）",example:"ces livres / ces amis"},
      {word:"cher (adj)",meaning:"貴的（配合性別）",example:"Il est cher. / Elle est chère. / Elles sont chères."},
      {word:"coûter cher (adv)",meaning:"很貴（副詞不變）",example:"Ça coûte cher. / Ils coûtent cher."},
      {word:"plus fort",meaning:"更大聲（副詞）",example:"Vous pouvez parler plus fort ?"},
      {word:"je trouve que",meaning:"我覺得...",example:"Je trouve qu'elle est meilleures."},
      {word:"aussi...que",meaning:"和...一樣",example:"L'hôtel A est aussi cher que l'hôtel B."},
      {word:"plus...que",meaning:"比...更",example:"Ils ont un plus grand appartement que nous."},
      {word:"moins...que",meaning:"比...少/不",example:"Je suis moins fatigué que les autres."},
      {word:"mieux (adv)",meaning:"更好（動詞用）",example:"On mange mieux au restaurant Le Grenier."},
    ], date:"05/19", weekday:"一", topic:"指示形容詞・cher 副詞 vs 形容詞",
    tags:["ce/cet/cette/ces","cher","比較級"],
    summary:[
      {text:"指示形容詞：ce（陽性）/ cet（陽性母音前）/ cette（陰性）/ ces（複數）"},
      {text:"cher 形容詞：C'est cher. / Elle est chère.（配合性別）"},
      {text:"cher 副詞：Ça coûte cher.（永遠不變）"},
      {text:"比較級：aussi...que / plus...que / moins...que / mieux（動詞用）"},
    ],
    flashcards:[
      {word:"ce / cet",meaning:"這個（陽性）",example:"ce livre / cet opéra"},
      {word:"cette",meaning:"這個（陰性）",example:"cette bouteille"},
      {word:"ces",meaning:"這些（複數）",example:"ces livres"},
      {word:"cher / chère",meaning:"貴的",example:"Cette bouteille est chère."},
      {word:"coûter cher",meaning:"很貴（副詞）",example:"Ça coûte cher !"},
    ],
    grammar:[
      {title:"指示形容詞全表",table:{headers:["","陽性","陽性（母音前）","陰性","複數"],rows:[["指示形容詞","ce","cet","cette","ces"]]}},
      {title:"cher：形容詞 vs 副詞",content:"形容詞（配合性別）：\nIl est cher. / Elle est chère.\n\n副詞（永遠不變）：\nÇa coûte cher. / Ils coûtent cher."},
    ],
    exercises:[
      {type:"選",q:"「這個歌劇院。」",opts:["ce opéra","cet opéra","cette opéra"],ans:1,exp:"opéra 陽性且以母音開頭 → cet"},
      {type:"填",q:"___ bouteille est ___ (cher, f).",blanks:["Cette","chère"],hint:"陰性 → cette / chère"},
    ],
    dialogue:[
      {s:"A",t:"Tu as vu ce film ?"},{s:"B",t:"Oui, cet acteur est excellent !"},
      {s:"A",t:"Cette robe est belle, non ?"},{s:"B",t:"Oui, mais elle coûte cher..."},
    ],
    tip:"母音前的陽性 → cet（聽起來更順口！）"
  },
  {
    id:"0521", level:"3", noteLinks:[],
    vocabItems:[
      {word:"apporter",meaning:"帶來（往目的地）",example:"Je vais apporter une bouteille de bon vin."},
      {word:"emporter",meaning:"帶走（離開）",example:"Je voudrais une pizza à emporter."},
      {word:"faire sa valise",meaning:"打包行李",example:"Avant de partir, on fait sa valise."},
      {word:"réserver",meaning:"預訂",example:"J'ai réservé une chambre d'hôtel."},
      {word:"louer",meaning:"租",example:"Nous allons louer un appartement."},
      {word:"se renseigner",meaning:"詢問資訊",example:"Je vais me renseigner à l'office de tourisme."},
      {word:"un séjour",meaning:"一段旅居時光",example:"Un séjour dans un hôtel / dans un club de vacances."},
      {word:"une station balnéaire",meaning:"海水浴場/海濱度假地",example:"Passer les vacances dans une station balnéaire."},
      {word:"un vacancier",meaning:"度假者",example:"Les vacanciers aiment la mer."},
      {word:"prendre des congés",meaning:"放假/休假",example:"En France, on a 5 semaines de congés payés."},
      {word:"parcourir",meaning:"走遍/到處走",example:"Elle a parcouru toute l'Europe en sac à dos."},
      {word:"un voyage de noces",meaning:"蜜月旅行",example:"Ils sont partis en voyage de noces à Paris."},
    ], date:"05/21", weekday:"三", topic:"旅遊詞彙・apporter vs emporter",
    tags:["旅遊","vacances","apporter/emporter"],
    summary:[
      {text:"apporter = 帶來（往說話者方向）"},
      {text:"emporter = 帶走（離開說話者）"},
      {text:"住宿：hôtel / auberge de jeunesse / camping / chambre d'hôtes"},
      {text:"旅遊動作：réserver / louer / annuler / se renseigner"},
    ],
    flashcards:[
      {word:"apporter",meaning:"帶來",example:"Je vais apporter du vin."},
      {word:"emporter",meaning:"帶走/外帶",example:"Une pizza à emporter !"},
      {word:"faire sa valise",meaning:"打包行李",example:"Je dois faire ma valise ce soir."},
      {word:"réserver",meaning:"預訂",example:"J'ai réservé une chambre."},
      {word:"une auberge de jeunesse",meaning:"青年旅舍",example:"C'est moins cher qu'un hôtel."},
      {word:"une chambre d'hôtes",meaning:"民宿",example:"C'est plus authentique."},
    ],
    grammar:[
      {title:"apporter vs emporter",content:"apporter = 帶來（朝向目的地）\nJe vais apporter une bouteille de vin.\n\nemporter = 帶走（離開目前位置）\nJe voudrais une pizza à emporter.\nN'oublie pas d'emporter ton passeport !"},
    ],
    exercises:[
      {type:"選",q:"「我要外帶一份三明治。」",opts:["Je veux apporter un sandwich.","Je veux un sandwich à emporter.","J'apporte un sandwich."],ans:1,exp:"外帶：à emporter"},
      {type:"填",q:"N'oublie pas d'___ ton passeport ! / Je vais ___ du champagne.",blanks:["emporter","apporter"],hint:"帶走→emporter / 帶來→apporter"},
    ],
    dialogue:[
      {s:"A",t:"Vous partez en vacances bientôt ?"},{s:"B",t:"Oui, je pars en France !"},
      {s:"A",t:"Vous avez réservé un hôtel ?"},{s:"B",t:"Non, je préfère les chambres d'hôtes."},
    ],
    tip:"apporter = bring (to)\nemporter = take away"
  },
  {
    id:"0526", level:"3", noteLinks:[],
    vocabItems:[
      {word:"composter",meaning:"打票（紙本車票）",example:"N'oubliez pas de composter votre billet !"},
      {word:"valider",meaning:"感應驗票（電子票）",example:"Validez votre carte de transport."},
      {word:"embarquer",meaning:"登機/登船",example:"Nous allons embarquer dans 10 minutes."},
      {word:"enregistrer les bagages",meaning:"托運行李",example:"Vous devez enregistrer vos bagages."},
      {word:"la carte d'embarquement",meaning:"登機證",example:"Votre carte d'embarquement, s'il vous plaît."},
      {word:"un douanier",meaning:"海關人員",example:"Un douanier examine vos documents."},
      {word:"un voyage d'affaires",meaning:"商務出差",example:"Mon patron fait souvent des voyages d'affaires."},
      {word:"un déplacement",meaning:"出差（同 voyage d'affaires）",example:"C'est un déplacement professionnel."},
      {word:"le décalage horaire",meaning:"時差",example:"Il y a 7h de décalage horaire entre Taiwan et la France."},
      {word:"la climatisation",meaning:"冷氣",example:"Une chambre climatisée, s'il vous plaît."},
      {word:"ne...jamais",meaning:"從不",example:"Je ne fais jamais de camping."},
      {word:"ne...pas encore",meaning:"還沒",example:"Je n'ai pas encore visité Paris."},
      {word:"un aller simple",meaning:"單程票",example:"Un aller simple pour Lyon, s'il vous plaît."},
      {word:"un aller-retour",meaning:"來回票",example:"Un aller-retour Paris-Nice."},
    ], date:"05/26", weekday:"二", topic:"交通詞彙・機場・ne...jamais/pas encore",
    tags:["交通","機場","ne...jamais","比較級"],
    summary:[
      {text:"composter = 打票（紙本）/ valider = 感應（電子票）"},
      {text:"embarquer = 登機/登船 / enregistrer les bagages = 托運行李"},
      {text:"機場流程：acheter un billet → enregistrer → carte d'embarquement → douane → embarquer"},
      {text:"ne...pas encore = 還沒 / ne...jamais = 從不"},
      {text:"plus 發音：[plyz] + 母音 / [ply] + 子音"},
    ],
    flashcards:[
      {word:"composter",meaning:"打票（紙本車票）",example:"N'oubliez pas de composter votre billet !"},
      {word:"valider",meaning:"感應/驗票（電子）",example:"Validez votre carte !"},
      {word:"embarquer",meaning:"登機/登船",example:"Nous allons embarquer dans 10 minutes."},
      {word:"enregistrer les bagages",meaning:"托運行李",example:"J'ai enregistré mes bagages à l'aéroport."},
      {word:"la carte d'embarquement",meaning:"登機證",example:"Votre carte d'embarquement, s'il vous plaît."},
      {word:"passer à la douane",meaning:"過海關",example:"Un douanier examine vos documents."},
      {word:"un voyage d'affaires",meaning:"商務旅行",example:"Mon patron fait souvent des voyages d'affaires."},
      {word:"le décalage horaire",meaning:"時差",example:"Il y a 7h de décalage horaire entre Taiwan et la France."},
      {word:"ne...jamais",meaning:"從不/從來沒有",example:"Je ne fais jamais de camping."},
      {word:"ne...pas encore",meaning:"還沒",example:"Je n'ai pas encore visité Paris."},
    ],
    grammar:[
      {title:"ne...jamais vs ne...pas encore",content:"ne...jamais = 從不（never）\nJe ne fais jamais de camping.\n\nne...pas encore = 還沒（not yet）\nJe n'ai pas encore fait de camping.\n\nPC：ne + avoir/être + jamais/pas encore + PP\nJe n'ai jamais voyagé seule.\nElle n'est pas encore arrivée."},
      {title:"plus 的發音規則",content:"plus [plyz] + 母音開頭：\nplus agréable / plus actif / plus intéressant\n\nplus [ply] + 子音開頭：\nplus cher / plus content / plus joli\n\n⚠️ ne...plus（不再）永遠發 [ply]"},
    ],
    exercises:[
      {type:"選",q:"「我還沒去過巴黎。」",opts:["Je ne suis jamais allée à Paris.","Je ne suis pas encore allée à Paris.","Je n'ai pas encore allé à Paris."],ans:1,exp:"還沒 = pas encore；aller用être，女性加e"},
      {type:"填",q:"Je ne fais ___ de camping. / Elle n'est ___ arrivée.",blanks:["jamais","pas encore"],hint:"jamais = 從不 / pas encore = 還沒"},
    ],
    dialogue:[
      {s:"A",t:"Tu as déjà fait du camping ?"},{s:"B",t:"Non, je n'ai jamais fait de camping."},
      {s:"A",t:"Tu n'aimes pas ça ?"},{s:"B",t:"Je ne sais pas, je n'ai pas encore essayé !"},
      {s:"A",t:"N'oublie pas de composter ton billet !"},{s:"B",t:"Merci ! Et ma carte d'embarquement ?"},
    ],
    tip:"機場流程：acheter un billet → enregistrer les bagages → carte d'embarquement → douane → embarquer\nTrain：composter（papier）/ valider（électronique）"
  },
  {
    id:"0528", level:"3", noteLinks:["g013"],
    vocabItems:[
      {word:"mon / ma / mes",meaning:"我的",example:"mon ami / ma sœur / mes parents"},
      {word:"son / sa / ses",meaning:"他的/她的（看名詞性別）",example:"son papa / sa maman / ses amis"},
      {word:"notre / nos",meaning:"我們的",example:"notre maison / nos enfants"},
      {word:"votre / vos",meaning:"您的/你們的",example:"votre livre / vos affaires"},
      {word:"leur / leurs",meaning:"他們的",example:"leur voiture / leurs amis"},
      {word:"oublier + nom",meaning:"忘記帶（東西）",example:"J'ai oublié mon portable dans ma voiture."},
      {word:"oublier de + inf.",meaning:"忘記做（某事）",example:"J'ai oublié de prendre mon portable."},
      {word:"penser à",meaning:"想著...",example:"Je pense à toi. Tu me manques."},
      {word:"penser de + nom",meaning:"對...的看法",example:"Qu'est-ce que tu penses de ce travail ?"},
      {word:"ranger",meaning:"整理/收拾",example:"J'ai rangé ma chambre. Elle est bien rangée."},
      {word:"en ordre / en désordre",meaning:"整齊的/凌亂的",example:"Ma chambre est en ordre. / en désordre."},
      {word:"la canicule",meaning:"熱浪/酷暑",example:"Il fait très chaud, c'est la canicule."},
      {word:"être à + pronom",meaning:"屬於某人",example:"C'est à moi. / Ce livre est à lui."},
    ], date:"05/28", weekday:"四", topic:"所有格形容詞・oublier・penser",
    tags:["所有格","adjectif possessif","oublier"],
    summary:[
      {text:"所有格形容詞：mon/ma/mes, ton/ta/tes, son/sa/ses, notre/nos, votre/vos, leur/leurs"},
      {text:"⚠️ 陰性名詞但母音開頭 → 用 mon/ton/son：mon amie ✓（不說 ma amie）"},
      {text:"oublier + nom：J'ai oublié mon portable."},
      {text:"oublier de + infinitif：J'ai oublié de prendre mon portable."},
      {text:"penser à = 想著某人/事 / penser de = 對...的看法"},
    ],
    flashcards:[
      {word:"mon / ma / mes",meaning:"我的",example:"mon ami / ma sœur / mes parents"},
      {word:"son / sa / ses",meaning:"他的/她的",example:"son papa / sa maman / ses amis"},
      {word:"notre / nos",meaning:"我們的",example:"notre maison / nos enfants"},
      {word:"leur / leurs",meaning:"他們的",example:"leur voiture / leurs amis"},
      {word:"oublier de + inf.",meaning:"忘記做某事",example:"J'ai oublié de prendre mon portable."},
      {word:"penser à",meaning:"想著...",example:"Je pense à toi. Tu me manques."},
      {word:"ranger",meaning:"整理/收拾",example:"J'ai rangé ma chambre ce matin."},
      {word:"la canicule",meaning:"熱浪/酷暑",example:"Il fait très chaud, c'est la canicule."},
    ],
    grammar:[
      {title:"所有格形容詞完整表",table:{headers:["","陽性單數","陰性單數（母音前用陽性）","複數"],rows:[["我的","mon","ma（mon+母音）","mes"],["你的","ton","ta（ton+母音）","tes"],["他/她的","son","sa（son+母音）","ses"],["我們的","notre","notre","nos"],["你們的","votre","votre","vos"],["他們的","leur","leur","leurs"]]}},
      {title:"oublier + nom vs oublier de + inf.",content:"oublier + nom = 忘記帶某東西\nJ'ai oublié mon portable dans ma voiture.\n\noublier de + infinitif = 忘記做某事\nJ'ai oublié de prendre mon portable.\n\n類似規則：décider de / essayer de / arrêter de + infinitif"},
    ],
    exercises:[
      {type:"選",q:"「我忘記帶護照了。」",opts:["J'ai oublié de mon passeport.","J'ai oublié mon passeport.","J'oublie mon passeport."],ans:1,exp:"oublier + nom（東西）→ 直接接名詞，不加 de"},
      {type:"填",q:"C'est l'amie de Lucas. C'est ___ amie. / J'ai oublié ___ prendre mes clés.",blanks:["son","de"],hint:"母音前用 son / oublier de + infinitif"},
    ],
    dialogue:[
      {s:"A",t:"Tu as ton portable ?"},{s:"B",t:"Oh non, j'ai oublié mon portable à la maison !"},
      {s:"A",t:"Tu as oublié de le prendre ?"},{s:"B",t:"Oui... je pense à autre chose ce matin."},
    ],
    tip:"son ami（男友的朋友）vs son amie（女友的朋友）\n— son/sa 看名詞性別，不看主詞性別！"
  },
  {
    id:"0602", level:"3", noteLinks:[],
    vocabItems:[
      {word:"nouveau / nouvelle",meaning:"新的（剛有的）",example:"un nouveau film / une nouvelle amie"},
      {word:"nouvel + voyelle",meaning:"新的（陽性+母音前）",example:"un nouvel ami / un nouvel hôtel"},
      {word:"neuf / neuve",meaning:"全新的（未用過）",example:"une voiture neuve ≠ d'occasion"},
      {word:"d'occasion",meaning:"二手的",example:"une voiture d'occasion"},
      {word:"laisser",meaning:"留給/讓...照顧",example:"Elle propose de laisser le chien aux parents."},
      {word:"Laisse tomber.",meaning:"算了（口語）",example:"Laisse tomber, ce n'est pas grave."},
      {word:"s'installer",meaning:"定居/安頓",example:"On va s'installer à la campagne."},
      {word:"emménager",meaning:"搬進去",example:"Nous allons emménager le mois prochain."},
      {word:"déménager",meaning:"搬出去/搬家",example:"Il a déménagé à Lyon."},
      {word:"quitter",meaning:"離開（某地）",example:"Elle veut quitter Taipei."},
      {word:"Ça y est ?",meaning:"好了嗎？準備好了？",example:"Ça y est ? Tu es prête ?"},
      {word:"C'est noté.",meaning:"記下來了",example:"C'est noté, merci !"},
      {word:"un changement de train",meaning:"換車/轉乘",example:"Tu as un changement de train à Nancy."},
      {word:"trop de / assez de / beaucoup de",meaning:"太多/足夠/很多 + 名詞",example:"Il y a trop de bruit. Assez de temps."},
    ], date:"06/02", weekday:"二", topic:"nouveau/neuf・laisser・s'installer",
    tags:["形容詞","nouveau","laisser","s'installer"],
    summary:[
      {text:"nouveau/nouvelle = 新的（剛有的、最近的）：un nouveau film"},
      {text:"neuf/neuve = 全新的（從未用過）：une voiture neuve ≠ d'occasion"},
      {text:"laisser = 讓/留下：laisser le chien aux parents"},
      {text:"s'installer = 定居/搬進去 / emménager = 搬進去 / déménager = 搬出去"},
      {text:"Ça y est ? = 好了嗎？/準備好了嗎？/ C'est noté. = 記下來了。"},
    ],
    flashcards:[
      {word:"nouveau / nouvelle",meaning:"新的（剛有的）",example:"un nouveau film / une nouvelle amie"},
      {word:"neuf / neuve",meaning:"全新的（未用過）",example:"une voiture neuve ≠ d'occasion"},
      {word:"laisser",meaning:"讓/留下",example:"Elle a décidé de laisser le chien à ses parents."},
      {word:"s'installer",meaning:"定居/安頓",example:"On s'est bien installé à Montcaillou."},
      {word:"emménager",meaning:"搬進去",example:"Nous allons emménager dans un mois."},
      {word:"déménager",meaning:"搬出去/搬家",example:"Il a déménagé à Lyon."},
      {word:"Ça y est ?",meaning:"好了嗎？準備好了嗎？",example:"Ça y est ? Tu es prête ?"},
      {word:"C'est noté.",meaning:"記下來了",example:"C'est noté, merci !"},
      {word:"quitter",meaning:"離開（某地）",example:"Elle veut quitter Taipei."},
    ],
    grammar:[
      {title:"nouveau vs neuf",content:"nouveau/nouvelle = 新的（newly acquired, recently）\nun nouveau téléphone（新換的）\nune nouvelle amie（新認識的朋友）\n⚠️ nouvel + 母音：mon nouvel ami\n\nneuf/neuve = brand new（從未用過）\nune voiture neuve（全新車）\nune voiture d'occasion（二手車）"},
      {title:"laisser + COD + à + personne",content:"laisser = 留給某人/讓某人照顧\nElle propose de laisser le chien aux parents.\nLaisse-moi tranquille !（別煩我）\nLaisse tomber.（算了）"},
    ],
    exercises:[
      {type:"選",q:"「我剛買了一台全新的車。」",opts:["J'ai acheté une nouvelle voiture.","J'ai acheté une voiture neuve.","J'ai acheté une voiture nouvelle."],ans:1,exp:"全新未用過 → neuve"},
      {type:"填",q:"Ça y ___ ? Tu es prête ? / C'est ___, merci !",blanks:["est","noté"],hint:"Ça y est = 好了嗎 / C'est noté = 記下來了"},
    ],
    dialogue:[
      {s:"A",t:"Ça y est ? Tu es prête ?"},{s:"B",t:"Pas encore. J'en ai pour 5 minutes."},
      {s:"A",t:"On va s'installer à la campagne !"},{s:"B",t:"C'est noté. On quitte Taipei le mois prochain."},
    ],
    tip:"Laisse tomber. = 算了/沒關係（非常口語！）\nLaisse-moi tranquille. = 讓我靜一靜/別煩我"
  },
  {
    id:"0604", level:"3", noteLinks:[],
    vocabItems:[
      {word:"ça prend combien de temps ?",meaning:"需要多久？",example:"Ça prend 35 minutes."},
      {word:"je mets...minutes",meaning:"我需要...分鐘",example:"Je mets 20 minutes pour aller au bureau."},
      {word:"un bouchon",meaning:"塞車",example:"Il y a des bouchons sur l'autoroute."},
      {word:"être en retard",meaning:"遲到",example:"Je vais être en retard, excuse-moi !"},
      {word:"être à l'heure",meaning:"準時",example:"Le train est à l'heure aujourd'hui."},
      {word:"être en avance",meaning:"提早到",example:"Je suis en avance, j'attends dehors."},
      {word:"Prends ton temps.",meaning:"不用急/慢慢來",example:"Prends ton temps, je t'attends."},
      {word:"le trajet",meaning:"行程/路程",example:"Le trajet dure 2 heures en TGV."},
      {word:"un aller simple",meaning:"單程票",example:"Un aller simple Paris-Lyon."},
      {word:"un aller-retour",meaning:"來回票",example:"Un aller-retour, s'il vous plaît."},
      {word:"côté fenêtre / couloir",meaning:"靠窗/靠走道",example:"Je préfère une place côté fenêtre."},
      {word:"TGV",meaning:"Train à Grande Vitesse（高速列車）",example:"Le TGV Paris-Lyon prend 2h."},
      {word:"être coincé dans les bouchons",meaning:"被困在車陣中",example:"Je suis coincée dans les bouchons !"},
    ], date:"06/04", weekday:"四", topic:"交通方式・ça prend・être en retard",
    tags:["交通","時間","en retard","être en avance"],
    summary:[
      {text:"Tu vas au bureau comment ? → Je prends le métro / Je vais en métro."},
      {text:"Ça prend combien de temps ? → Ça prend 35 minutes. = Je mets 35 minutes."},
      {text:"en retard = 遲到 / à l'heure = 準時 / en avance = 提早"},
      {text:"un bouchon = 塞車 / Prends ton temps. = 不用急"},
      {text:"被動語態入門：cet article a été écrit（這篇文章被寫的）"},
    ],
    flashcards:[
      {word:"ça prend combien de temps ?",meaning:"需要多久時間？",example:"Ça prend 35 minutes."},
      {word:"je mets...minutes",meaning:"我需要...分鐘",example:"Je mets 20 minutes pour aller au bureau."},
      {word:"un bouchon",meaning:"塞車",example:"Excuse-moi, il y a des bouchons."},
      {word:"être en retard",meaning:"遲到",example:"Je vais être en retard !"},
      {word:"être à l'heure",meaning:"準時",example:"Le train est à l'heure."},
      {word:"être en avance",meaning:"提早到",example:"Je suis en avance, j'attends."},
      {word:"Prends ton temps.",meaning:"不用急/慢慢來",example:"Prends ton temps, je t'attends."},
      {word:"le trajet",meaning:"行程/路程",example:"Le trajet dure 2 heures."},
      {word:"préférer + conditionnel",meaning:"用來表達婉轉偏好",example:"Je préférais voyager en TGV."},
    ],
    grammar:[
      {title:"交通方式表達",content:"Tu vas au bureau comment ?\n→ Je prends le métro / le bus / le train\n→ Je vais au bureau en métro / en voiture / à vélo / à scooter\n\nÇa prend combien de temps ?\n→ Ça prend 20 minutes. = Je mets 20 minutes.\n\nJ'y vais en métro.（y = à + lieu）"},
      {title:"en retard / à l'heure / en avance",content:"être en retard = 遲到\nêtre à l'heure = 準時\nêtre en avance = 提早\n\narriver en retard / partir à l'heure\n\n⚠️ 常考搭配：\nLe professeur arrive toujours en avance.\nJe suis en retard, excuse-moi !"},
    ],
    exercises:[
      {type:"選",q:"「我搭捷運上班，需要 30 分鐘。」",opts:["Je vais au bureau avec le métro, ça prend 30 minutes.","Je prends le métro pour aller au bureau, ça prend 30 minutes.","Je vais en métro au bureau, ça met 30 minutes."],ans:1,exp:"prendre le métro + ça prend...minutes"},
      {type:"填",q:"Excuse-moi, je vais être ___. Il y a des ___.",blanks:["en retard","bouchons"],hint:"遲到 = en retard / 塞車 = bouchons"},
    ],
    dialogue:[
      {s:"A",t:"Excuse-moi, je vais être en retard. Il y a des bouchons."},{s:"B",t:"Prends ton temps. Je lis à la terrasse."},
      {s:"A",t:"Tu vas au bureau comment ?"},{s:"B",t:"Je prends le métro. Ça prend 35 minutes."},
    ],
    tip:"Prends ton temps. = 不用急（很常用！）\nbouchon = 軟木塞 / 塞車（兩個意思）\nêtre coincé dans les bouchons = 被困在車陣中"
  },
  {
    id:"0609", level:"3", noteLinks:[],
    vocabItems:[
      {word:"le / la / l' / les",meaning:"定冠詞（特指/泛指）",example:"J'aime le chocolat. C'est la tour Eiffel."},
      {word:"un / une / des",meaning:"不定冠詞（不特定可數）",example:"Il y a une boulangerie. J'ai des amis."},
      {word:"du / de la / de l'",meaning:"部分冠詞（不可數的量）",example:"Je bois du café et de l'eau."},
      {word:"de / d'（否定後）",meaning:"否定句後冠詞變 de",example:"Je n'ai pas de pain. Il ne boit pas d'alcool."},
      {word:"avoir du courage",meaning:"有勇氣（抽象名詞用部分冠詞）",example:"Elle a du courage. Il a de la patience."},
      {word:"avoir de l'énergie",meaning:"有精力",example:"J'ai besoin d'avoir de l'énergie."},
      {word:"une bouteille de",meaning:"一瓶...",example:"une bouteille de vin / un verre d'eau"},
      {word:"une tasse de",meaning:"一杯...",example:"une tasse de café / une tasse de thé"},
      {word:"Je suis professeur.",meaning:"職業前不加冠詞",example:"Elle est médecin. Il est ingénieur."},
      {word:"au petit déjeuner",meaning:"早餐時",example:"Au petit déjeuner, je prends du café."},
      {word:"des tartines avec du beurre",meaning:"塗奶油的麵包片",example:"Je mange des tartines avec du beurre."},
      {word:"de la confiture",meaning:"果醬（部分冠詞）",example:"Des tartines avec de la confiture."},
    ], date:"06/09", weekday:"一", topic:"冠詞總複習 les articles",
    tags:["冠詞","articles","partitif","nourriture"],
    summary:[
      {text:"定冠詞 le/la/l'/les = 特指、泛指（aimer le vin）、唯一的事物（le soleil）"},
      {text:"不定冠詞 un/une/des = 不特定可數名詞 / 否定後變 de/d'"},
      {text:"部分冠詞 du/de la/de l' = 不可數的量（食物、飲料、抽象事物）"},
      {text:"否定後所有冠詞 → de/d'：Je n'ai pas de pain. / Je ne mange pas de viande."},
      {text:"職業前不加冠詞：Je suis professeur. ✓（但 C'est une bonne professeur. ✓）"},
    ],
    flashcards:[
      {word:"le/la/l'/les",meaning:"定冠詞（特指/泛指）",example:"J'aime le chocolat. C'est la tour Eiffel."},
      {word:"un/une/des",meaning:"不定冠詞（不特定可數）",example:"J'ai un chat et des livres."},
      {word:"du/de la/de l'",meaning:"部分冠詞（不可數的量）",example:"Je bois du café et de l'eau."},
      {word:"de/d'（否定後）",meaning:"否定句後冠詞變 de",example:"Je n'ai pas de pain. Je ne bois pas d'alcool."},
      {word:"avoir du courage",meaning:"有勇氣（抽象名詞用部分冠詞）",example:"Elle a du courage. Il a de la patience."},
      {word:"une bouteille de",meaning:"一瓶...",example:"une bouteille de vin / un verre d'eau"},
    ],
    grammar:[
      {title:"三種冠詞比較",table:{headers:["冠詞","用法","例子"],rows:[["le/la/l'/les","特指、泛指、唯一","J'aime le vin. Le soleil brille."],["un/une/des","不特定可數","Il y a une boulangerie. J'ai des amis."],["du/de la/de l'","不可數的量","Je mange du pain. J'écoute de la musique."]]}},
      {title:"否定後 → de/d'",content:"否定句中，un/une/des/du/de la → de/d'\nJ'ai du pain. → Je n'ai pas de pain.\nJe mange des légumes. → Je ne mange pas de légumes.\nIl boit de l'alcool. → Il ne boit pas d'alcool.\n\n⚠️ 例外：C'est un livre. → Ce n'est pas un livre.（c'est 後面不變）"},
      {title:"部分冠詞的特殊用法",content:"食物/飲料：manger du riz, boire de la bière\n抽象名詞：avoir du courage / de la patience / de l'énergie\n數量表達：une bouteille de vin / un verre d'eau / une tasse de café"},
    ],
    exercises:[
      {type:"選",q:"「我喜歡音樂。」",opts:["J'aime de la musique.","J'aime une musique.","J'aime la musique."],ans:2,exp:"泛指「音樂」這件事 → 定冠詞 la"},
      {type:"填",q:"Je bois ___ café le matin. / Je ne mange pas ___ viande.",blanks:["du","de"],hint:"部分冠詞：du café / 否定後：de"},
    ],
    dialogue:[
      {s:"A",t:"Qu'est-ce que tu manges le matin ?"},{s:"B",t:"Je prends du café, des tartines avec du beurre."},
      {s:"A",t:"Tu ne bois pas de lait ?"},{s:"B",t:"Non, je n'aime pas le lait !"},
      {s:"A",t:"Et des fruits ?"},{s:"B",t:"Oui, j'ai de la chance, j'adore les fruits !"},
    ],
    tip:"記憶法：\nle chocolat = 我喜歡巧克力（泛指這種東西）\ndu chocolat = 我吃了一些巧克力（一部分的量）\nun chocolat = 我吃了一顆巧克力（一個可數單位）"
  }
];

const GRAMMAR=[
  {id:"g014",date:"06/07",type:"grammar",title:"que 前置受詞 → PP 配合性別/數",tags:["複合過去式","關係代名詞","avoir"],rules:["avoir 的 PP 通常不變，但有一個例外！","直接受詞在動詞前面時，PP 要配合受詞的性別/數","que 作關係代名詞時，受詞前置 → PP 配合","⚠️ J'ai mangé une pizza.（受詞在後→不變）","⚠️ La pizza que j'ai mangée.（受詞在前→加e）"],myExamples:["des trucs que j'ai mangés en Europe（陽性複數→s）","la pizza que j'ai mangée（陰性單數→e）","les films que j'ai vus（陽性複數→s）","les filles que j'ai rencontrées（陰性複數→es）"],mySentences:[]},
    {id:"g013",date:"05/28",type:"grammar",title:"所有格形容詞 mon/ma/mes...",tags:["所有格","冠詞","名詞"],rules:["mon/ton/son + 陽性單數名詞","ma/ta/sa + 陰性單數名詞","mes/tes/ses + 複數名詞","⚠️ 陰性但母音開頭 → 用 mon/ton/son：mon amie ✓","notre/votre/leur + 單數，nos/vos/leurs + 複數"],table:{headers:["","陽性單數","陰性單數","複數"],rows:[["我的","mon","ma (mon+母音)","mes"],["你的","ton","ta (ton+母音)","tes"],["他/她的","son","sa (son+母音)","ses"],["我們的","notre","notre","nos"],["你們的","votre","votre","vos"],["他們的","leur","leur","leurs"]]},myExamples:["mon ami / mon amie（母音前用 mon）","ma famille / mes parents","son chat / sa voiture / ses livres"],mySentences:[]},
    {id:"g012",date:"05/26",type:"grammar",title:"ne...jamais / ne...pas encore",tags:["否定","副詞","時態"],rules:["ne...jamais = 從不（never）","ne...pas encore = 還沒（not yet）","PC：ne + avoir/être + jamais/pas encore + PP","⚠️ jamais 不需要 pas：Je n'ai JAMAIS（不說 pas jamais）"],myExamples:["Je ne fais jamais de camping.","Je n'ai pas encore visité Paris.","Elle n'est pas encore arrivée."],mySentences:[]},
    {id:"g011",date:"05/22",type:"grammar",title:"si + 現在式（條件句）",tags:["條件句","si","時態"],rules:["si 子句永遠用現在式，不用未來式！","Si + présent → 主句用近未來式或未來式","⚠️ Si je vais voyager ✗ → Si je voyage ✓"],myExamples:["Si je voyage, je vais prendre une chambre d'hôtel.","Si il fait beau, on va sortir."],mySentences:[]},
  {id:"g010",date:"05/22",type:"grammar",title:"動詞 + 介係詞（participer à / discuter de）",tags:["介係詞","動詞搭配"],rules:["participer à + 名詞","discuter de + 名詞","parler de + 名詞","penser à + 名詞","⚠️ 這些動詞後面不能直接接名詞！"],myExamples:["J'ai participé à un club de lecture.","On a discuté de nos opinions sur le livre."],mySentences:[]},
  {id:"g009",date:"05/19",type:"grammar",title:"指示形容詞 ce/cet/cette/ces",tags:["指示形容詞","冠詞"],rules:["ce + 陽性：ce livre","cet + 陽性（母音前）：cet opéra","cette + 陰性：cette bouteille","ces + 複數：ces amis"],table:{headers:["","陽性","陽性（母音前）","陰性","複數"],rows:[["","ce","cet","cette","ces"]]},myExamples:["Ce portable est à moi.","Cette bouteille est chère.","Cet opéra est très célèbre."],mySentences:[]},
  {id:"g008",date:"05/18",type:"grammar",title:"aimer 等喜好動詞 + 定冠詞",tags:["冠詞","喜好動詞"],rules:["aimer / adorer / détester / préférer 後面永遠接 le/la/les","⚠️ J'aime les films. ✓（不是 des films）"],myExamples:["J'aime les films d'action.","Je déteste la chaleur !"],mySentences:[]},
  {id:"g007",date:"05/15",type:"grammar",title:"j'allais / je devais + infinitif",tags:["imparfait","表達意圖"],rules:["j'allais + 原形動詞 = 本來打算要...","je devais + 原形動詞 = 本來應該要..."],myExamples:["J'allais aller chez mon ami, mais il est très occupé.","Je devais aller au parc mais il fait trop chaud."],mySentences:[]},
  {id:"g006",date:"05/14",type:"grammar",title:"比較級：plus / moins / mieux",tags:["比較級","形容詞"],rules:["plus + 形容詞：je suis plus patiente","moins + 形容詞：je suis moins anxieuse","mieux = 動詞「更好」（不修飾形容詞）"],myExamples:["Je suis plus ouverte maintenant.","Je vais mieux aujourd'hui !"],mySentences:[]},
  {id:"g005",date:"05/14",type:"grammar",title:"imparfait vs passé composé",tags:["imparfait","時態"],rules:["imparfait = 持續狀態/背景（舞台背景）","passé composé = 發生的事件（舞台上的動作）"],myExamples:["J'étais très anxieuse hier soir.","J'ai eu un cours de français ce soir."],mySentences:[]},
  {id:"g004",date:"05/13",type:"grammar",title:"encore / déjà / toujours / ne...plus",tags:["副詞"],rules:["déjà = 已經","encore = 還/又","toujours = 一直","ne...plus = 不再"],myExamples:["On a déjà fini le livre.","Je ne suis plus anxieuse."],mySentences:[]},
  {id:"g003",date:"05/13",type:"grammar",title:"複合過去式：avoir vs être",tags:["複合過去式","avoir","être"],rules:["avoir + PP：一般動詞（PP不配合性別）","être + PP：VANDERTRAMP + 反身動詞（PP配合性別）"],myExamples:["J'ai eu un cours ce soir.","Je suis allée à l'université."],mySentences:[]},
  {id:"g002",date:"05/12",type:"grammar",title:"反身動詞（Verbes pronominaux）",tags:["反身動詞","複合過去式"],rules:["se + 動詞，複合過去式用 être","PP 配合主詞性別","否定：ne + 反身代名詞 + suis + pas + PP"],table:{headers:["主詞","反身代名詞","複合過去式（f）"],rows:[["je","me (m')","je me suis levée"],["tu","te (t')","tu t'es levée"],["il/elle","se (s')","elle s'est levée"]]},myExamples:["Je me suis levée à 11h.","Je ne me suis pas endormie hier soir."],mySentences:[]},
  {id:"g001",date:"05/12",type:"grammar",title:"陰陽性規律表",tags:["陰陽性","名詞"],rules:["★ 這些規律涵蓋大部分法文名詞！"],table:{headers:["字尾","性別","例子"],rows:[["-ment/-age/-eau/-et/-at","陽性","le moment / le voyage"],["-phone/-graphe","陽性","le téléphone"],["-tion/-sion/-ité","陰性","la nation / la liberté"],["-eur（抽象）/-ance/-ence","陰性","la chaleur / la patience"],["-ure/-oire（抽象）","陰性","la culture / la victoire"],["-ie/-esse","陰性","la philosophie / la jeunesse"]]},myExamples:["la décision ✓（-tion → f）","le voyage ✓（-age → m）"],mySentences:[]},
];

const VOCAB=[
  {id:"v014",date:"06/07",type:"vocab",title:"音樂與感受",tags:["音樂","表達","文化"],items:[{fr:"nostalgique",zh:"懷舊的/令人懷念的",ex:"Cette chanson est très nostalgique."},{fr:"mélancolique",zh:"憂鬱感傷的",ex:"Une chanson mélancolique et belle."},{fr:"rétro",zh:"復古的（風格）",ex:"J'aime le style rétro de Vidéoclub."},{fr:"donner envie de",zh:"讓人想要...",ex:"Ça me donne envie de voyager."},{fr:"une chanson",zh:"一首歌",ex:"J'adore cette chanson !"},{fr:"Qui es-tu ?",zh:"你是誰？",ex:"Qui es-tu ? Où es-tu ?"},{fr:"Où es-tu ?",zh:"你在哪裡？",ex:"Où es-tu maintenant ?"}]},
  {id:"v013",date:"06/04",type:"vocab",title:"日常表達補充",tags:["日常","表達"],items:[{fr:"commander une livraison",zh:"點外送",ex:"J'ai commandé une livraison ce soir."},{fr:"décontracté(e)",zh:"悠閒的/放鬆的",ex:"C'était très décontracté !"},{fr:"bavarder",zh:"聊天/閒聊",ex:"J'aime bavarder avec mes amis."},{fr:"se concentrer sur",zh:"專注在...上",ex:"Je ne peux pas me concentrer sur la nourriture."},{fr:"il pleuvait",zh:"那時候在下雨",ex:"Il pleuvait encore aujourd'hui."},{fr:"il a plu",zh:"下了雨",ex:"Il a beaucoup plu ce week-end."},{fr:"réconfortant(e)",zh:"撫慰人心的",ex:"Un burger chaud, c'est réconfortant par temps de pluie."}]},
    {id:"v012",date:"05/31",type:"vocab",title:"電影與娛樂",tags:["電影","文化","表達"],items:[{fr:"passionnant(e)",zh:"精彩的/引人入勝的",ex:"C'est un film très passionnant !"},{fr:"palpitant(e)",zh:"扣人心弦的",ex:"Un film palpitant !"},{fr:"captivant(e)",zh:"引人入勝的",ex:"Ce livre est très captivant."},{fr:"plein de rebondissements",zh:"充滿轉折",ex:"C'est un film plein de rebondissements."},{fr:"plusieurs fois",zh:"好幾次",ex:"J'ai vu ce film plusieurs fois."},{fr:"qui s'appelle",zh:"叫做（介紹片名）",ex:"C'est un film qui s'appelle Cold War."},{fr:"je l'adore toujours",zh:"我還是很愛它",ex:"Je l'adore toujours après plusieurs visionnages."}]},
  {id:"v011",date:"05/28",type:"vocab",title:"電玩與休閒",tags:["休閒","日常"],items:[{fr:"jouer à un jeu vidéo",zh:"打電動",ex:"On va jouer à un jeu vidéo ce soir."},{fr:"une console de jeux",zh:"遊戲主機",ex:"J'ai une nouvelle console de jeux."},{fr:"un joueur / une joueuse",zh:"玩家",ex:"Je suis une bonne joueuse !"},{fr:"gagner / perdre",zh:"贏/輸",ex:"J'ai gagné ! Tu as perdu !"},{fr:"un niveau",zh:"關卡/等級",ex:"Je suis au niveau 50."},{fr:"relaxant(e)",zh:"放鬆的",ex:"Animal Crossing est très relaxant."},{fr:"à son rythme",zh:"按自己的節奏",ex:"On peut jouer à son rythme."}]},
    {id:"v010",date:"05/27",type:"vocab",title:"運動與身體",tags:["運動","身體","日常"],items:[{fr:"avoir des courbatures",zh:"肌肉痠痛",ex:"J'ai des courbatures partout après le gym !"},{fr:"les cuisses",zh:"大腿",ex:"J'ai des courbatures dans les cuisses."},{fr:"les fessiers",zh:"臀部/屁股",ex:"Mes fessiers sont douloureux."},{fr:"se concentrer",zh:"專注",ex:"J'ai besoin de me concentrer."},{fr:"être distraite",zh:"分心（女）",ex:"Quand je suis avec des amis, je suis distraite."},{fr:"se détendre",zh:"放鬆",ex:"Mon corps s'est détendu après le Pilates."},{fr:"être en forme",zh:"精神好/狀態好",ex:"Je voudrais être en forme."},{fr:"avoir de l'énergie",zh:"有精神/有活力",ex:"J'ai besoin d'avoir de l'énergie."},{fr:"avoir la pêche",zh:"精力充沛（口語）",ex:"Aujourd'hui j'ai la pêche !"},{fr:"la silhouette",zh:"身材線條",ex:"Je voudrais avoir une meilleure silhouette."},{fr:"c'est pour ça que",zh:"這就是為什麼",ex:"C'est pour ça que je vais au gym !"},{fr:"trois fois par mois",zh:"每個月三次",ex:"Je fais du Pilates trois fois par mois."}]},
  {id:"v009",date:"05/26",type:"vocab",title:"交通・機場詞彙",tags:["旅遊","交通","實用"],items:[{fr:"composter",zh:"打票（紙本）",ex:"N'oubliez pas de composter votre billet !"},{fr:"valider",meaning:"感應/驗票",zh:"感應驗票（電子）",ex:"Validez votre carte !"},{fr:"embarquer",zh:"登機/登船",ex:"Nous allons embarquer dans 10 minutes."},{fr:"enregistrer les bagages",zh:"托運行李",ex:"J'ai enregistré mes bagages."},{fr:"la carte d'embarquement",zh:"登機證",ex:"Votre carte d'embarquement !"},{fr:"passer à la douane",zh:"過海關",ex:"Un douanier examine vos documents."},{fr:"le décalage horaire",zh:"時差",ex:"Il y a 7h de décalage horaire."},{fr:"un voyage d'affaires",zh:"商務旅行",ex:"Il fait souvent des voyages d'affaires."},{fr:"ne...jamais",zh:"從不",ex:"Je ne fais jamais de camping."},{fr:"ne...pas encore",zh:"還沒",ex:"Je n'ai pas encore visité Paris."}]},
    {id:"v008",date:"05/22",type:"vocab",title:"讀書與文學",tags:["文學","文化"],items:[{fr:"un club de lecture",zh:"讀書會",ex:"Je participe à un club de lecture."},{fr:"un roman",zh:"小說",ex:"C'est facile à lire parce que c'est un roman."},{fr:"la littérature",zh:"文學",ex:"J'adore la littérature française."},{fr:"discuter de",zh:"討論",ex:"On a discuté de nos opinions."},{fr:"à l'époque",zh:"當時/那個年代",ex:"Ce n'était pas possible à l'époque."},{fr:"avoir de la chance",zh:"很幸運",ex:"Il a beaucoup de chance."}]},
  {id:"v007",date:"05/20",type:"vocab",title:"旅遊詞彙",tags:["旅遊","實用"],items:[{fr:"une valise",zh:"行李箱",ex:"Je fais ma valise pour le voyage."},{fr:"un passeport",zh:"護照",ex:"N'oublie pas ton passeport !"},{fr:"un billet",zh:"票（火車/飛機）",ex:"J'ai réservé un billet d'avion."},{fr:"réserver",zh:"預訂",ex:"J'ai réservé une chambre d'hôtel."},{fr:"une chambre d'hôtes",zh:"民宿",ex:"C'est plus authentique."},{fr:"faire sa valise",zh:"打包行李",ex:"Je dois faire ma valise ce soir."},{fr:"découvrir",zh:"探索/發現",ex:"Je voudrais découvrir d'autres villes."}]},
  {id:"v006",date:"05/19",type:"vocab",title:"天氣與感覺",tags:["天氣","日常"],items:[{fr:"il fait chaud",zh:"天氣熱",ex:"Il fait trop chaud aujourd'hui !"},{fr:"transpirer",zh:"流汗",ex:"J'ai beaucoup transpiré."},{fr:"dehors",zh:"外面",ex:"Il fait trop chaud dehors."},{fr:"la chaleur",zh:"熱度/酷熱",ex:"La chaleur est insupportable !"}]},
  {id:"v005",date:"05/18",type:"vocab",title:"電影相關",tags:["電影","文化"],items:[{fr:"un film hongkongais",zh:"香港電影",ex:"J'ai vu un film hongkongais."},{fr:"un film policier",zh:"犯罪片",ex:"C'est un film policier."},{fr:"un film d'action",zh:"動作片",ex:"J'aime les films d'action."},{fr:"un agent infiltré",zh:"臥底",ex:"Le film parle d'un agent infiltré."},{fr:"ce genre de films",zh:"這種類型的電影",ex:"J'aime bien ce genre de films."}]},
  {id:"v004",date:"05/15",type:"vocab",title:"日常實用表達",tags:["日常","表達"],items:[{fr:"j'ai mes règles",zh:"我月經來了",ex:"J'ai mes règles, donc je reste à la maison."},{fr:"tout à l'heure",zh:"等一下/待會",ex:"Je vais dormir tout à l'heure."},{fr:"pendant la journée",zh:"白天",ex:"J'ai travaillé pendant la journée."},{fr:"avoir besoin de",zh:"需要",ex:"J'ai besoin de beaucoup d'argent."}]},
  {id:"v003",date:"05/14",type:"vocab",title:"哲學詞彙入門",tags:["哲學","抽象名詞"],items:[{fr:"la liberté",zh:"自由",ex:"La liberté est essentielle."},{fr:"la conscience",zh:"意識/良知",ex:"Il a une conscience développée."},{fr:"l'existence (f)",zh:"存在",ex:"L'existence précède l'essence."},{fr:"la vérité",zh:"真理",ex:"Quelle est la vérité ?"},{fr:"la raison",zh:"理性",ex:"La raison guide nos actions."}]},
  {id:"v002",date:"05/12",type:"vocab",title:"反身動詞：日常作息",tags:["反身動詞","日常"],items:[{fr:"se lever",zh:"起床",ex:"Je me suis levée à 9h."},{fr:"se coucher",zh:"就寢",ex:"Je me couche tard."},{fr:"s'endormir",zh:"睡著",ex:"Je ne me suis pas endormie hier soir."},{fr:"se maquiller",zh:"化妝",ex:"Je me maquille le matin."},{fr:"se reposer",zh:"休息",ex:"Je me suis reposée à la maison."}]},
  {id:"v015",date:"06/09",type:"vocab",title:"🥩 肉類・家禽",tags:["食物","nourriture"],items:[
    {fr:"le bœuf",zh:"牛肉 (m)",ex:"Du bœuf bourguignon, s'il vous plaît."},
    {fr:"le porc",zh:"豬肉 (m)",ex:"Je mange du porc au dîner."},
    {fr:"le poulet",zh:"雞肉 (m)",ex:"Un poulet rôti pour dimanche !"},
    {fr:"le veau",zh:"小牛肉 (m)",ex:"La blanquette de veau est un classique."},
    {fr:"l'agneau (m)",zh:"羔羊 (m)",ex:"Des côtes d'agneau grillées."},
    {fr:"le canard",zh:"鴨 (m)",ex:"Le confit de canard est délicieux."},
    {fr:"la dinde",zh:"火雞 (f)",ex:"On mange de la dinde à Noël."},
    {fr:"le lapin",zh:"兔子 (m)",ex:"Un ragoût de lapin."},
    {fr:"l'oie (f)",zh:"鵝 (f)",ex:"Le foie gras d'oie."},
    {fr:"la caille",zh:"鵪鶉 (f)",ex:"Des cailles rôties aux raisins."},
    {fr:"le veau",zh:"小牛肉 (m)",ex:"Une escalope de veau."},
    {fr:"l'œuf (m)",zh:"蛋 (m)",ex:"Des œufs pour faire une omelette."}]},
  {id:"v016a",date:"06/09",type:"vocab",title:"🐟 魚類・海鮮",tags:["食物","nourriture"],items:[
    {fr:"le saumon",zh:"鮭魚 (m)",ex:"Du saumon grillé avec des légumes."},
    {fr:"le thon",zh:"鮪魚 (m)",ex:"Une salade niçoise avec du thon."},
    {fr:"la sardine",zh:"沙丁魚 (f)",ex:"Des sardines grillées au barbecue."},
    {fr:"la morue",zh:"鱈魚 (f)",ex:"La morue est utilisée dans beaucoup de plats."},
    {fr:"la daurade",zh:"鯛魚 (f)",ex:"Une daurade au four."},
    {fr:"la truite",zh:"鱒魚 (f)",ex:"Une truite aux amandes."},
    {fr:"le bar",zh:"海鱸 (m)",ex:"Un filet de bar grillé."},
    {fr:"l'anguille (f)",zh:"鰻魚 (f)",ex:"L'anguille fumée est un délice."},
    {fr:"la crevette",zh:"蝦 (f)",ex:"Des crevettes à l'ail."},
    {fr:"le homard",zh:"龍蝦 (m)",ex:"Un plateau de fruits de mer avec du homard."},
    {fr:"la moule",zh:"淡菜 (f)",ex:"Des moules frites, c'est délicieux !"},
    {fr:"l'huître (f)",zh:"生蠔 (f)",ex:"Les Français adorent les huîtres."},
    {fr:"le crabe",zh:"螃蟹 (m)",ex:"Du crabe en sauce."},
    {fr:"la crevette / les gambas",zh:"蝦/明蝦",ex:"Des gambas grillées."},
    {fr:"le calamar",zh:"烏賊 (m)",ex:"Des calamars à la romaine."},
    {fr:"la pieuvre",zh:"章魚 (f)",ex:"De la pieuvre grillée."},
    {fr:"l'écrevisse (f)",zh:"小龍蝦 (f)",ex:"Une bisque d'écrevisses."},
    {fr:"la palourde",zh:"蛤 (f)",ex:"Des palourdes à la marinière."}]},
  {id:"v016b",date:"06/09",type:"vocab",title:"🍽️ 法式經典菜餚",tags:["食物","nourriture","文化"],items:[
    {fr:"la blanquette de veau",zh:"白醬燉小牛肉",ex:"La blanquette de veau, c'est un plat traditionnel."},
    {fr:"le bœuf bourguignon",zh:"紅酒燉牛肉",ex:"Le bœuf bourguignon se mange avec des pâtes."},
    {fr:"la tomate farcie",zh:"烤番茄鑲肉",ex:"Des tomates farcies à la viande hachée."},
    {fr:"la bouillabaisse",zh:"馬賽魚湯",ex:"La bouillabaisse vient de Marseille."},
    {fr:"le cassoulet",zh:"卡酥萊砂鍋",ex:"Le cassoulet est un plat du sud-ouest."},
    {fr:"la choucroute",zh:"法式酸菜香腸豬肉",ex:"La choucroute alsacienne est célèbre."},
    {fr:"le steak frites",zh:"牛排薯條",ex:"Un steak frites, c'est le plat préféré des Français !"},
    {fr:"le hachis Parmentier",zh:"薯泥焗牛肉",ex:"Le hachis Parmentier, c'est du gratin de bœuf."},
    {fr:"le confit de canard",zh:"油封鴨",ex:"Le confit de canard vient du Périgord."},
    {fr:"la raclette",zh:"熔岩起司",ex:"On fait une raclette en hiver avec des amis."},
    {fr:"la tartiflette",zh:"焗烤馬鈴薯",ex:"La tartiflette vient de Savoie."},
    {fr:"le poulet rôti",zh:"烤雞",ex:"Le dimanche, on mange souvent un poulet rôti."},
    {fr:"le steak tartare",zh:"韃靼生牛肉",ex:"Le steak tartare se mange cru."},
    {fr:"le magret de canard à l'orange",zh:"橙汁鴨胸",ex:"Un magret de canard à l'orange, c'est raffiné."},
    {fr:"les côtes d'agneau",zh:"羊肋排",ex:"Des côtes d'agneau grillées au romarin."},
    {fr:"les moules frites",zh:"淡菜薯條",ex:"Les moules frites sont populaires dans le nord."},
    {fr:"la paella",zh:"西班牙海鮮飯",ex:"Une paella aux fruits de mer."},
    {fr:"le plateau de fruits de mer",zh:"海鮮拼盤",ex:"Un grand plateau de fruits de mer !"}]},
  {id:"v016c",date:"06/09",type:"vocab",title:"🥦 蔬菜 Les légumes",tags:["食物","nourriture","légumes"],items:[
    {fr:"la tomate",zh:"番茄 (f)",ex:"Une salade de tomates."},
    {fr:"la carotte",zh:"紅蘿蔔 (f)",ex:"Je mange des carottes râpées."},
    {fr:"l'oignon (m)",zh:"洋蔥 (m)",ex:"Je mets des oignons dans la soupe."},
    {fr:"l'ail (m)",zh:"蒜頭 (m)",ex:"De l'ail pour parfumer le plat."},
    {fr:"le poivron",zh:"彩椒 (m)",ex:"Des poivrons rouges et verts."},
    {fr:"la courgette",zh:"節瓜 (f)",ex:"Je fais sauter des courgettes."},
    {fr:"le champignon",zh:"蘑菇 (m)",ex:"Une omelette aux champignons."},
    {fr:"l'aubergine (f)",zh:"茄子 (f)",ex:"De l'aubergine grillée."},
    {fr:"la pomme de terre",zh:"馬鈴薯 (f)",ex:"Des frites ou de la purée ?"},
    {fr:"la patate douce",zh:"地瓜 (f)",ex:"J'adore la patate douce rôtie."},
    {fr:"les épinards (m)",zh:"菠菜",ex:"Je mange des épinards pour la santé."},
    {fr:"le brocoli",zh:"綠花椰菜 (m)",ex:"Du brocoli à la vapeur."},
    {fr:"le concombre",zh:"黃瓜 (m)",ex:"Du concombre dans la salade."},
    {fr:"le chou-fleur",zh:"花椰菜 (m)",ex:"Du chou-fleur au gratin."},
    {fr:"le chou",zh:"包心菜 (m)",ex:"De la choucroute avec du chou fermenté."},
    {fr:"le piment",zh:"辣椒 (m)",ex:"Un peu de piment pour relever le plat."},
    {fr:"le maïs",zh:"玉米 (m)",ex:"De la salade avec du maïs."},
    {fr:"les petits pois (m)",zh:"豌豆",ex:"Des petits pois avec du jambon."},
    {fr:"l'asperge (f)",zh:"蘆筍 (f)",ex:"Des asperges vertes à la vapeur."},
    {fr:"l'avocat (m)",zh:"酪梨 (m)",ex:"Un avocat avec du citron."},
    {fr:"la betterave",zh:"甜菜 (f)",ex:"Une salade de betteraves."},
    {fr:"le bambou",zh:"竹筍 (m)",ex:"Des pousses de bambou dans la soupe."},
    {fr:"le céleri",zh:"芹菜 (m)",ex:"Du céleri dans la soupe."},
    {fr:"la châtaigne d'eau",zh:"菱角/馬蹄",ex:"Des châtaignes d'eau sautées."},
    {fr:"la ciboule",zh:"蔥 (f)",ex:"De la ciboule hachée sur le plat."},
    {fr:"la citrouille",zh:"南瓜 (f)",ex:"Une soupe à la citrouille."},
    {fr:"l'échalote (f)",zh:"紅蔥頭 (f)",ex:"Des échalotes revenues dans le beurre."},
    {fr:"l'endive (f)",zh:"比利時小白菜 (f)",ex:"Une salade d'endives au roquefort."},
    {fr:"le gingembre",zh:"薑 (m)",ex:"Du gingembre dans le thé."},
    {fr:"le gombo / l'okra",zh:"秋葵 (m)",ex:"Du gombo sauté à l'ail."},
    {fr:"le haricot",zh:"四季豆 (m)",ex:"Des haricots verts au beurre."},
    {fr:"la laitue",zh:"萵苣 (f)",ex:"De la laitue dans la salade."},
    {fr:"le navet",zh:"白蘿蔔 (m)",ex:"Un ragoût de navets."},
    {fr:"le poireau",zh:"大蔥 (m)",ex:"Une quiche aux poireaux."},
    {fr:"la salade",zh:"生菜沙拉 (f)",ex:"Une salade verte à l'huile d'olive."},
    {fr:"le taro",zh:"芋頭 (m)",ex:"Du taro cuit à la vapeur."}]},
  {id:"v017",date:"06/09",type:"vocab",title:"🍓 水果 Les fruits",tags:["食物","nourriture","fruits"],items:[
    {fr:"la pomme",zh:"蘋果 (f)",ex:"Une pomme par jour."},
    {fr:"la banane",zh:"香蕉 (f)",ex:"Je mange une banane le matin."},
    {fr:"l'orange (f)",zh:"柳橙 (f)",ex:"Du jus d'orange frais."},
    {fr:"la fraise",zh:"草莓 (f)",ex:"Des fraises avec de la crème."},
    {fr:"le raisin",zh:"葡萄 (m)",ex:"Du raisin blanc ou rouge ?"},
    {fr:"la pêche",zh:"水蜜桃 (f)",ex:"Une pêche bien mûre."},
    {fr:"l'ananas (m)",zh:"鳳梨 (m)",ex:"De l'ananas dans la salade."},
    {fr:"le kiwi",zh:"奇異果 (m)",ex:"Un kiwi riche en vitamine C."},
    {fr:"la pastèque",zh:"西瓜 (f)",ex:"De la pastèque en été, c'est parfait."},
    {fr:"le litchi",zh:"荔枝 (m)",ex:"Des litchis de Taiwan."},
    {fr:"la mangue",zh:"芒果 (f)",ex:"Un smoothie à la mangue."},
    {fr:"la framboise",zh:"覆盆子 (f)",ex:"De la confiture de framboises."},
    {fr:"la cerise",zh:"櫻桃 (f)",ex:"Un gâteau aux cerises."},
    {fr:"le citron",zh:"檸檬 (m)",ex:"Du jus de citron sur le poisson."},
    {fr:"l'abricot (m)",zh:"杏桃 (m)",ex:"De la confiture d'abricots."},
    {fr:"la canneberge",zh:"蔓越莓 (f)",ex:"Du jus de canneberge."},
    {fr:"la carambole",zh:"楊桃 (f)",ex:"Une carambole bien mûre."},
    {fr:"le cassis",zh:"黑醋栗 (m)",ex:"De la confiture de cassis."},
    {fr:"la clémentine",zh:"小柑橘 (f)",ex:"Des clémentines en hiver."},
    {fr:"la datte",zh:"椰棗 (f)",ex:"Des dattes dans le couscous."},
    {fr:"le durian",zh:"榴槤 (m)",ex:"Le durian a une odeur très forte !"},
    {fr:"la figue",zh:"無花果 (f)",ex:"Des figues avec du fromage."},
    {fr:"le fruit de la passion",zh:"百香果",ex:"Du jus de fruit de la passion."},
    {fr:"le fruit du dragon",zh:"火龍果 (m)",ex:"Un fruit du dragon rose."},
    {fr:"la goyave",zh:"芭樂 (f)",ex:"De la goyave fraîche de Taiwan."},
    {fr:"la grenade",zh:"石榴 (f)",ex:"Les graines de grenade sont délicieuses."},
    {fr:"le jamalac",zh:"蓮霧 (m)",ex:"Le jamalac est un fruit taïwanais."},
    {fr:"le kaki",zh:"柿子 (m)",ex:"Des kakis en automne."},
    {fr:"le mangoustan",zh:"山竹 (m)",ex:"Le mangoustan, roi des fruits."},
    {fr:"la mandarine",zh:"橘子 (f)",ex:"Des mandarines pour le Nouvel An."},
    {fr:"le melon",zh:"哈密瓜 (m)",ex:"Du melon avec du jambon cru."},
    {fr:"la myrtille",zh:"藍莓 (f)",ex:"Des myrtilles dans le yaourt."},
    {fr:"le pamplemousse",zh:"葡萄柚 (m)",ex:"Du jus de pamplemousse le matin."},
    {fr:"la papaye",zh:"木瓜 (f)",ex:"De la papaye fraîche au citron."},
    {fr:"la poire",zh:"西洋梨 (f)",ex:"Une tarte aux poires."},
    {fr:"la prune",zh:"李子 (f)",ex:"De la confiture de prunes."},
    {fr:"le pomélo",zh:"柚子 (m)",ex:"Le pomélo est un grand agrume."},
    {fr:"le ramboutan",zh:"紅毛丹 (m)",ex:"Le ramboutan ressemble au litchi."}]},
  {id:"v017b",date:"06/09",type:"vocab",title:"🥜 堅果・穀物 Les noix et céréales",tags:["食物","nourriture","fruits"],items:[
    {fr:"la cacahouète",zh:"花生 (f)",ex:"Du beurre de cacahouètes."},
    {fr:"la noisette",zh:"榛果 (f)",ex:"Du Nutella, c'est des noisettes !"},
    {fr:"la noix",zh:"核桃 (f)",ex:"Des noix dans le gâteau."},
    {fr:"la noix de cajou",zh:"腰果",ex:"Des noix de cajou grillées."},
    {fr:"la noix de coco",zh:"椰子",ex:"Du lait de coco dans le curry."},
    {fr:"le macadamia",zh:"夏威夷豆 (m)",ex:"Des biscuits aux macadamias."},
    {fr:"le marron",zh:"栗子 (m)",ex:"De la dinde aux marrons à Noël."},
    {fr:"le pignon",zh:"松子 (m)",ex:"Des pignons dans le pesto."},
    {fr:"la pistache",zh:"開心果 (f)",ex:"De la glace à la pistache."},
    {fr:"l'avoine (f)",zh:"燕麥 (f)",ex:"Du porridge à l'avoine le matin."},
    {fr:"le blé",zh:"小麥 (m)",ex:"La farine de blé pour le pain."},
    {fr:"la lentille",zh:"扁豆 (f)",ex:"Une soupe de lentilles."},
    {fr:"le pois chiche",zh:"鷹嘴豆 (m)",ex:"Du houmous avec des pois chiches."},
    {fr:"la graine de soja",zh:"黃豆 (f)",ex:"Du lait de soja."},
    {fr:"le riz complet",zh:"糙米 (m)",ex:"Du riz complet, c'est plus sain."},
    {fr:"le riz gluant",zh:"糯米 (m)",ex:"Du riz gluant pour les mochis."}]},
  {id:"v017c",date:"06/09",type:"vocab",title:"🌿 Herbes et épices 香料・香草",tags:["食物","nourriture"],items:[
    {fr:"le basilic",zh:"羅勒 (m)",ex:"Du basilic frais dans la sauce tomate."},
    {fr:"la cannelle",zh:"肉桂 (f)",ex:"De la cannelle dans le café."},
    {fr:"la ciboulette",zh:"細香蔥 (f)",ex:"De la ciboulette sur les œufs."},
    {fr:"la coriandre",zh:"香菜 (f)",ex:"De la coriandre dans le curry."},
    {fr:"la feuille de laurier",zh:"月桂葉 (f)",ex:"Une feuille de laurier dans la soupe."},
    {fr:"la menthe",zh:"薄荷 (f)",ex:"Du thé à la menthe."},
    {fr:"le persil",zh:"巴西里香菜 (m)",ex:"Du persil haché sur le poisson."},
    {fr:"le romarin",zh:"迷迭香 (m)",ex:"Du romarin avec l'agneau rôti."},
    {fr:"le gingembre",zh:"薑 (m)",ex:"Du gingembre frais dans le thé."}]},
  {id:"v018",date:"06/09",type:"vocab",title:"🍞 基本食材",tags:["食物","nourriture"],items:[
    {fr:"le pain",zh:"麵包 (m)",ex:"Je mange du pain au petit déjeuner."},
    {fr:"le beurre",zh:"奶油 (m)",ex:"Des tartines avec du beurre."},
    {fr:"la confiture",zh:"果醬 (f)",ex:"De la confiture de fraises."},
    {fr:"le fromage",zh:"起司 (m)",ex:"Un plateau de fromages français."},
    {fr:"les pâtes (f)",zh:"義大利麵",ex:"Je prépare des pâtes ce soir."},
    {fr:"le riz",zh:"米 (m)",ex:"Du riz blanc ou du riz complet ?"},
    {fr:"la farine",zh:"麵粉 (f)",ex:"Il faut de la farine pour faire un gâteau."},
    {fr:"le sucre",zh:"糖 (m)",ex:"Pas trop de sucre !"},
    {fr:"l'huile d'olive (f)",zh:"橄欖油",ex:"Je mets de l'huile d'olive dans la salade."},
    {fr:"le lait",zh:"牛奶 (m)",ex:"Un café au lait."},
    {fr:"l'œuf (m)",zh:"蛋 (m)",ex:"Des œufs pour faire une omelette."},
    {fr:"la viande",zh:"肉（泛稱）(f)",ex:"Je ne mange pas beaucoup de viande."},
    {fr:"le poisson",zh:"魚（泛稱）(m)",ex:"Mangez du poisson, c'est bon pour la santé."},
    {fr:"la soupe",zh:"湯 (f)",ex:"Une bonne soupe chaude en hiver."},
    {fr:"les frites (f)",zh:"薯條",ex:"Un steak frites, s'il vous plaît."},
    {fr:"les crêpes (f)",zh:"可麗餅",ex:"Des crêpes bretonnes au beurre."},
    {fr:"le gâteau",zh:"蛋糕 (m)",ex:"Un gâteau au chocolat pour l'anniversaire."}]},
    {id:"v001",date:"05/12",type:"vocab",title:"個性形容詞",tags:["個性","形容詞"],items:[{fr:"timide",zh:"害羞",ex:"Avant, j'étais timide."},{fr:"ouvert(e)",zh:"開朗",ex:"Je suis plus ouverte."},{fr:"patient(e)",zh:"有耐心",ex:"Je suis plus patiente."},{fr:"anxieux/anxieuse",zh:"焦慮",ex:"J'étais anxieuse hier soir."},{fr:"occupé(e)",zh:"忙碌",ex:"Il est très occupé."}]},
];

const ERRORS_INIT=[
  {id:"e036",date:"06/07",category:"副詞位置",wrong:"Il encore pleuvait",correct:"Il pleuvait encore",reason:"副詞放在動詞後面：il pleuvait encore / il a encore plu",myNote:"現在式/imparfait → 動詞後 / PC → 助動詞和PP中間",attempts:0,mastered:false},
  {id:"e035",date:"06/04",category:"反身動詞",wrong:"J'ai me suis relaxée",correct:"Je me suis relaxée",reason:"反身動詞只用 être，不用 avoir",myNote:"反身動詞永遠用 être！",attempts:0,mastered:false},
  {id:"e034",date:"06/04",category:"縮寫",wrong:"parce que il（又犯了）",correct:"parce qu'il",reason:"parce que + 母音 → parce qu'，這個要變成直覺！",myNote:"⚠️ 高頻錯誤！que → qu' 在母音前",attempts:0,mastered:false},
  {id:"e033",date:"06/04",category:"複合過去式",wrong:"j'ai dîner",correct:"j'ai dîné",reason:"-er 動詞 PP 要加 accent：dîner → dîné",myNote:"PC：j'ai + dîné（不是 dîner）",attempts:0,mastered:false},
    {id:"e032",date:"05/31",category:"介係詞",wrong:"dîner à un resto",correct:"dîner dans un resto",reason:"餐廳用 dans，à 接城市或特定地點名稱",myNote:"dans un restaurant / au restaurant",attempts:0,mastered:false},
  {id:"e031",date:"05/28",category:"介係詞",wrong:"jouer un jeu vidéo",correct:"jouer à un jeu vidéo",reason:"jouer + à（固定搭配，運動/遊戲都用 à）",myNote:"jouer À un jeu / jouer AU tennis",attempts:0,mastered:false},
  {id:"e030",date:"05/28",category:"介係詞",wrong:"rester à maison de quelqu'un",correct:"rester chez quelqu'un",reason:"在某人家裡用 chez + 人，不用 à maison de",myNote:"chez moi / chez toi / chez quelqu'un",attempts:0,mastered:false},
  {id:"e029",date:"05/28",category:"詞彙",wrong:"le loué",correct:"le loyer",reason:"louer = 動詞（租），le loyer = 名詞（房租）",myNote:"le loyer est cher = 房租很貴",attempts:0,mastered:false},
    {id:"e027",date:"05/27",category:"陰陽性",wrong:"un app",correct:"une app",reason:"app 是陰性（application → une application）",myNote:"une app / une application",attempts:0,mastered:false},
  {id:"e026",date:"05/27",category:"時態",wrong:"c'est très chaud（描述過去）",correct:"c'était très chaud",reason:"描述過去的狀態用 imparfait：c'était",myNote:"c'est = 現在 / c'était = 過去狀態",attempts:0,mastered:false},
  {id:"e025",date:"05/27",category:"反身動詞",wrong:"je suis rentré",correct:"je suis rentrée",reason:"rentrer 用 être，女性 PP 要加 e",myNote:"être + PP 配合性別！",attempts:0,mastered:false},
  {id:"e024",date:"05/27",category:"介係詞",wrong:"à 3 fois un mois",correct:"trois fois par mois",reason:"「每個月幾次」用 par，不用 à",myNote:"par semaine / par mois / par an",attempts:0,mastered:false},
    {id:"e022",date:"05/22",category:"介係詞",wrong:"discuté ses opinions",correct:"discuté de nos opinions",reason:"discuter + de（固定搭配），而且是「我們的」→ nos",myNote:"discuter DE / parler DE / penser À",attempts:0,mastered:false},
  {id:"e021",date:"05/22",category:"介係詞",wrong:"j'ai participé un club",correct:"j'ai participé à un club",reason:"participer + à（固定搭配）",myNote:"participer À un club",attempts:0,mastered:false},
  {id:"e020",date:"05/22",category:"時態",wrong:"Si je vais voyager...",correct:"Si je voyage...",reason:"si 子句永遠用現在式，不用未來式",myNote:"Si + présent → 主句用未來式",attempts:0,mastered:false},
  {id:"e019",date:"05/22",category:"冠詞",wrong:"habiter avec l'étrangers",correct:"habiter avec les étrangers",reason:"複數用 les，不是 l'",myNote:"複數 → les",attempts:0,mastered:false},
  {id:"e018",date:"05/22",category:"詞彙",wrong:"une personne de beaucoup de chance",correct:"avoir beaucoup de chance",reason:"法文說幸運用 avoir de la chance",myNote:"il a beaucoup de chance",attempts:0,mastered:false},
  {id:"e017",date:"05/22",category:"形容詞",wrong:"ses parents sont très pauvre",correct:"ses parents sont très pauvres",reason:"複數名詞 → 形容詞加 s",myNote:"複數 → 形容詞加 s！",attempts:0,mastered:false},
  {id:"e016",date:"05/19",category:"形容詞",wrong:"Cette bouteille est cher",correct:"Cette bouteille est chère",reason:"bouteille 陰性 → chère",myNote:"陰性 → 形容詞加 e！",attempts:0,mastered:false},
  {id:"e015",date:"05/19",category:"複合過去式",wrong:"J'ai un cours（已發生）",correct:"J'ai eu un cours",reason:"已發生用複合過去式：avoir → j'ai eu",myNote:"avoir 的 PC：j'ai eu",attempts:0,mastered:false},
  {id:"e014",date:"05/19",category:"複合過去式",wrong:"je beaucoup transpiré",correct:"j'ai beaucoup transpiré",reason:"需要助動詞 avoir，beaucoup 放 PP 前",myNote:"j'ai + beaucoup + PP",attempts:0,mastered:false},
  {id:"e013",date:"05/18",category:"冠詞",wrong:"j'aime des films",correct:"j'aime les films",reason:"aimer + 泛指 → 定冠詞 les",myNote:"喜好動詞後永遠用 le/la/les！",attempts:0,mastered:false},
  {id:"e012",date:"05/18",category:"詞彙",wrong:"un film hongkong",correct:"un film hongkongais",reason:"地名要形容詞化",myNote:"taïwanais / américain / hongkongais",attempts:0,mastered:false},
  {id:"e011",date:"05/18",category:"冠詞",wrong:"j'ai bu vin rouge",correct:"j'ai bu du vin rouge",reason:"飲料用部分冠詞，不能省略",myNote:"boire + du/de la/de l'",attempts:0,mastered:false},
  {id:"e010",date:"05/15",category:"縮寫",wrong:"parce que il",correct:"parce qu'il",reason:"parce que + 母音 → parce qu'",myNote:"que → qu' 在母音前",attempts:0,mastered:false},
  {id:"e009",date:"05/15",category:"縮寫",wrong:"je étudie",correct:"j'étudie",reason:"je + 母音 → j'",myNote:"je → j' 在母音前！",attempts:0,mastered:false},
  {id:"e008",date:"05/13",category:"複合過去式",wrong:"j'ai étudiée",correct:"j'ai étudié",reason:"avoir 的 PP 不配合主詞性別",myNote:"avoir → PP 永遠不變！",attempts:0,mastered:false},
  {id:"e007",date:"05/12",category:"比較級",wrong:"je suis ouverte mieux",correct:"je suis plus ouverte",reason:"形容詞「更...」用 plus + adj",myNote:"mieux 只修飾動詞！",attempts:0,mastered:false},
  {id:"e006",date:"05/12",category:"反身動詞",wrong:"je me s'endormi",correct:"je me suis endormie",reason:"je 的反身代名詞是 me；女性加 e",myNote:"je → me，il/elle → se",attempts:0,mastered:false},
  {id:"e005",date:"05/12",category:"時態",wrong:"j'ai été fermée",correct:"j'étais fermée",reason:"過去持續狀態用 imparfait",myNote:"avant 後面要用 imparfait！",attempts:0,mastered:false},
  {id:"e004",date:"05/12",category:"否定",wrong:"je ne me suis maquillée pas",correct:"je ne me suis pas maquillée",reason:"ne...pas 夾住助動詞，PP 在最後",myNote:"ne + me suis + pas + PP",attempts:0,mastered:false},
  {id:"e003",date:"05/12",category:"avoir/être",wrong:"je suis toujours trop faim",correct:"j'ai toujours trop faim",reason:"faim 是名詞，身體感覺用 avoir",myNote:"avoir faim/soif/chaud/froid！",attempts:0,mastered:false},
];

function getTodayKey(){const now=new Date();if(now.getHours()<3){now.setDate(now.getDate()-1);}return now.toISOString().slice(0,10);}
function getQuoteOfDay(){const d=new Date();return QUOTES[(d.getFullYear()*366+d.getMonth()*31+d.getDate())%QUOTES.length];}
function normalizeAns(s){return s.trim().toLowerCase().replace(/[''`´]/g,"'").replace(/\s+/g,' ');}

// 大分類篩選元件
function CategoryFilter({categories,activeMain,activeSub,onSelectMain,onSelectSub}){
  const[openMain,setOpenMain]=useState(null);
  const handleMain=(id)=>{
    if(id==='all'){setOpenMain(null);onSelectMain('all');onSelectSub(null);return;}
    if(openMain===id){setOpenMain(null);}else{setOpenMain(id);}
    onSelectMain(id);onSelectSub(null);
  };
  const cat=categories.find(c=>c.id===openMain);
  return(
    <div className="filter-wrap">
      <div className="filter-main-row">
        {categories.map(c=>(
          <button key={c.id} className={`filter-main-btn ${activeMain===c.id&&!activeSub?'active':''} ${openMain===c.id&&c.subs.length>0?'open':''}`} onClick={()=>handleMain(c.id)}>
            {c.label}{c.subs.length>0&&<span>{openMain===c.id?'▲':'▼'}</span>}
          </button>
        ))}
      </div>
      {openMain&&cat&&cat.subs.length>0&&(
        <div className="filter-sub-row">
          {cat.subs.map(s=>(
            <button key={s} className={`filter-sub-btn ${activeSub===s?'active':''}`} onClick={()=>onSelectSub(activeSub===s?null:s)}>{s}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function Confetti({onDone}){
  const pieces=Array.from({length:40},(_,i)=>({id:i,x:Math.random()*100,color:['#c97a8a','#c4906a','#7a9e7e','#7a9ab5','#f5e6ea','#e8f2e8'][i%6],delay:Math.random()*.5,duration:1.2+Math.random()*.8,size:6+Math.random()*6}));
  useEffect(()=>{const t=setTimeout(onDone,2000);return()=>clearTimeout(t);},[]);
  return(<div className="confetti-wrap">{pieces.map(p=><div key={p.id} className="confetti-piece" style={{left:`${p.x}%`,background:p.color,width:p.size,height:p.size,animationDelay:`${p.delay}s`,animationDuration:`${p.duration}s`}}/>)}</div>);
}

function VocabCard({item}){
  const[flipped,setFlipped]=useState(false);
  return(<div className={`vocab-flip-wrap ${flipped?'flipped':''}`} onClick={()=>setFlipped(f=>!f)}><div className="vocab-flip-inner"><div className="vocab-front"><div className="vocab-fr">{item.fr}</div>{item.ex&&<div className="vocab-ex">{item.ex}</div>}<div className="vocab-hint">點擊看中文 →</div></div><div className="vocab-back"><div className="vocab-zh">{item.zh}</div><div className="vocab-ex" style={{color:'#5a8a5a'}}>{item.fr}</div></div></div></div>);
}

function ErrorPracticeCard({err,onUpdate}){
  const[input,setInput]=useState('');
  const[result,setResult]=useState(null);
  const[revealed,setRevealed]=useState(false);
  const check=()=>{const ok=input.trim()===err.correct.trim();setResult(ok?'correct':'wrong');if(ok){setRevealed(true);const na=err.attempts+1;onUpdate(err.id,{attempts:na,mastered:na>=3});}};
  return(
    <div className="error-practice">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <div style={{display:'flex',alignItems:'center',gap:6}}><div className="note-date">{err.date}</div><span className="tag tag-error">{err.category}</span>{err.mastered&&<span className="mastered-badge">✓ 已掌握</span>}</div>
        {err.attempts>0&&<div className="attempts-dots">{Array.from({length:Math.min(err.attempts,5)}).map((_,i)=><div key={i} className="attempt-dot"/>)}</div>}
      </div>
      {!revealed&&<div className="error-wrong-display"><div className="error-wrong-label">❌ 我寫的</div><div className="error-wrong-text">{err.wrong}</div></div>}
      {!revealed?(<>
        <div style={{fontSize:'.78rem',color:'var(--navy)',fontWeight:600,marginBottom:6}}>✏️ 正確版本是？</div>
        <div className="error-input-row"><input className={`error-input ${result==='correct'?'correct':result==='wrong'?'wrong':''}`} value={input} onChange={e=>{setInput(e.target.value);setResult(null);}} placeholder="輸入正確的句子..." onKeyDown={e=>e.key==='Enter'&&check()} disabled={result==='correct'}/>{result!=='correct'&&<button className="error-submit-btn" onClick={check}>確認</button>}</div>
        {result==='wrong'&&<div style={{display:'flex',gap:8,marginTop:4}}><button onClick={()=>{setInput('');setResult(null);}} style={{background:'none',border:'1px solid var(--rose)',borderRadius:8,padding:'5px 12px',cursor:'pointer',fontSize:'.78rem',color:'var(--rose)',fontFamily:"'DM Sans',sans-serif"}}>再試</button><button onClick={()=>setRevealed(true)} style={{background:'none',border:'1px solid #ddd',borderRadius:8,padding:'5px 12px',cursor:'pointer',fontSize:'.78rem',color:'var(--muted)',fontFamily:"'DM Sans',sans-serif"}}>看答案</button></div>}
      </>):(<div className="error-reveal"><div className="error-correct-label">✓ 正確</div><div className="error-correct-text">{err.correct}</div><div className="error-reason-text">💡 {err.reason}</div>{err.myNote&&<div className="error-note-text">📝 {err.myNote}</div>}</div>)}
    </div>
  );
}

function MySentenceInput({onSave}){
  const[val,setVal]=useState('');
  const[toast,setToast]=useState(false);
  const submit=()=>{if(!val.trim())return;onSave(val);setVal('');};
  const copy=()=>{if(!val.trim())return;navigator.clipboard.writeText(val).then(()=>{setToast(true);setTimeout(()=>setToast(false),2500);});};
  return(<div><div style={{display:'flex',gap:6,marginTop:4}}><input value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()} placeholder="Écris une phrase avec cette règle..." style={{flex:1,border:'1.5px solid #e8d8d4',borderRadius:8,padding:'6px 10px',fontSize:'.82rem',fontFamily:"'DM Sans',sans-serif",outline:'none',background:'white'}}/><button onClick={submit} style={{background:'var(--rose)',color:'white',border:'none',borderRadius:8,padding:'6px 12px',cursor:'pointer',fontSize:'.78rem',fontFamily:"'DM Sans',sans-serif",fontWeight:600}}>+</button></div>{val.trim()&&<button onClick={copy} style={{marginTop:5,background:'none',border:'1px dashed var(--rose-mid)',borderRadius:8,padding:'5px 12px',cursor:'pointer',fontSize:'.75rem',color:'var(--rose)',fontFamily:"'DM Sans',sans-serif",width:'100%'}}>📤 複製句子，貼給 Claude 批改</button>}{toast&&<div className="copy-toast">✓ 已複製！貼到 Claude 對話 😊</div>}</div>);
}

function MCQ({ex}){const[sel,setSel]=useState(null);return(<div className="exo-wrap"><div className="exo-type">選擇題</div><div className="exo-q">{ex.q}</div>{ex.opts.map((o,n)=><button key={n} disabled={sel!==null} className={`opt-btn ${sel===null?'':n===ex.ans?'correct':sel===n?'wrong':''}`} onClick={()=>setSel(n)}>{String.fromCharCode(65+n)}. {o}</button>)}{sel!==null&&<div className={`feedback ${sel===ex.ans?'correct':'wrong'}`}>{sel===ex.ans?'✓ 正確！':'✗ 再想想！'} {ex.exp}</div>}</div>);}

function FillIn({ex}){
  const[vals,setVals]=useState(ex.blanks.map(()=>''));const[done,setDone]=useState(false);const[hint,setHint]=useState(false);
  const isOk=(v,b)=>normalizeAns(v)===normalizeAns(b);const allOk=done&&vals.every((v,i)=>isOk(v,ex.blanks[i]));
  return(<div className="exo-wrap"><div className="exo-type">填空題</div><div className="exo-q">{ex.q}</div><div style={{display:'flex',flexWrap:'wrap',gap:5,marginBottom:6}}>{ex.blanks.map((b,i)=><span key={i} style={{display:'flex',alignItems:'center',gap:3}}><span style={{fontSize:'.72rem',color:'#bbb'}}>({i+1})</span><input className={`fill-input ${done?(isOk(vals[i],b)?'correct':'wrong'):''}`} value={vals[i]} disabled={done} onChange={e=>{const nv=[...vals];nv[i]=e.target.value;setVals(nv);}} placeholder="填入..."/></span>)}</div><button onClick={()=>setHint(h=>!h)} style={{background:'none',border:'none',cursor:'pointer',fontSize:'.74rem',color:'var(--gold)',fontFamily:"'DM Sans',sans-serif",marginBottom:4}}>💡 提示 {hint?'▲':'▼'}</button>{hint&&<p style={{fontSize:'.74rem',color:'var(--muted)',marginBottom:5}}>{ex.hint}</p>}{!done?<button className="check-btn" onClick={()=>setDone(true)}>確認答案</button>:<div><div className={`feedback ${allOk?'correct':'wrong'}`}>{allOk?'✓ 全對！':'答案：'+ex.blanks.join(' / ')}</div><button className="check-btn" style={{marginTop:4}} onClick={()=>{setVals(ex.blanks.map(()=>''));setDone(false);}}>重試</button></div>}</div>);
}

function Section({icon,title,children,defaultOpen=false}){
  const[open,setOpen]=useState(defaultOpen);
  return(<div className="section"><div className="sec-hdr" onClick={()=>setOpen(!open)}><span className="sec-icon">{icon}</span><span className="sec-title">{title}</span><span className={`sec-toggle ${open?'open':''}`}>▼</span></div>{open&&<div className="sec-body">{children}</div>}</div>);
}

function FlashCards({cards}){
  const[i,setI]=useState(0);const[flipped,setFlipped]=useState(false);
  const go=(n)=>{setFlipped(false);setTimeout(()=>setI(n),150);};
  const card=cards[i];
  return(<><p className="card-flip-hint">👆 點擊卡片翻面</p><div className="fc-wrap"><div className={`fc ${flipped?'flipped':''}`} onClick={()=>setFlipped(!flipped)}><div className="fc-f">{card.gender&&<span className={`fc-gender ${card.gender}`}>{card.gender==='m'?'陽性':'陰性'}</span>}<div className="fc-word">{card.word}</div><div className="fc-hint">法文 → 點擊看中文</div></div><div className="fc-b"><div className="fc-meaning">{card.meaning}</div><div className="fc-ex">{card.example}</div></div></div></div><div className="card-nav"><button className="cnav-btn" onClick={()=>go(Math.max(0,i-1))} disabled={i===0}>← 上一張</button><span className="card-counter">{i+1} / {cards.length}</span><button className="cnav-btn" onClick={()=>go(Math.min(cards.length-1,i+1))} disabled={i===cards.length-1}>下一張 →</button></div></>);
}


function VocabList({items}){
  return(
    <div style={{display:'flex',flexDirection:'column',gap:0}}>
      {items.map((item,i)=>(
        <div key={i} style={{display:'grid',gridTemplateColumns:'1fr 1fr 2fr',gap:'8px',padding:'9px 12px',borderBottom:'1px solid #f5ece8',alignItems:'start',background:i%2===0?'white':'#fdf8f5'}}>
          <div style={{fontStyle:'italic',color:'var(--blue)',fontWeight:600,fontSize:'.85rem'}}>{item.word}</div>
          <div style={{color:'var(--navy)',fontSize:'.83rem',fontWeight:500}}>{item.meaning}</div>
          <div style={{color:'var(--muted)',fontSize:'.78rem',fontStyle:'italic'}}>{item.example}</div>
        </div>
      ))}
    </div>
  );
}

function ChapterView({chapter,onGoNote}){
  return(
    <div>
      <div style={{marginBottom:14}}>
        {chapter.tags.map(t=><span key={t} className="tag" style={{background:'#f5ece8',color:'var(--muted)'}}>{t}</span>)}
      </div>
      <Section icon="📋" title="本課重點" defaultOpen={true}>
        {chapter.summary.map((pt,i)=><div key={i} className="sum-pt"><div className="sum-bullet">{i+1}</div><div className="sum-text">{pt.text}{pt.fr&&<><br/><span className="fr">{pt.fr}</span></>}</div></div>)}
      </Section>
      <Section icon="🗂️" title={chapter.level==="3"?"詞彙":"單字卡"}>
        {chapter.level==="3" && chapter.vocabItems
          ? <><div style={{display:'grid',gridTemplateColumns:'1fr 1fr 2fr',gap:'8px',padding:'7px 12px',background:'var(--navy)',borderRadius:'8px 8px 0 0'}}><span style={{color:'white',fontSize:'.72rem',fontWeight:700}}>法文</span><span style={{color:'white',fontSize:'.72rem',fontWeight:700}}>中文</span><span style={{color:'white',fontSize:'.72rem',fontWeight:700}}>例句</span></div><VocabList items={chapter.vocabItems}/></>
          : <FlashCards cards={chapter.flashcards}/>
        }
      </Section>
      {chapter.grammar&&chapter.grammar.length>0&&(
        <Section icon="📐" title="文法">
          {chapter.grammar.map((g,i)=>(
            <div key={i} className="gram-blk">
              <div className="gram-title">{g.title}</div>
              {g.table&&<table className="conj-table"><thead><tr>{g.table.headers.map((h,j)=><th key={j}>{h}</th>)}</tr></thead><tbody>{g.table.rows.map((row,j)=><tr key={j}>{row.map((c,k)=><td key={k}>{c}</td>)}</tr>)}</tbody></table>}
              {g.content&&<div className="highlight">{g.content}</div>}
            </div>
          ))}
          {chapter.noteLinks&&chapter.noteLinks.length>0&&(
            <button className="link-btn" onClick={()=>onGoNote(chapter.noteLinks[0])} style={{marginTop:6}}>📗 查看我的筆記</button>
          )}
        </Section>
      )}
      {chapter.exercises&&chapter.exercises.length>0&&(
        <Section icon="✏️" title="練習題">
          {chapter.exercises.map((ex,i)=>ex.type==='填'?<FillIn key={i} ex={ex}/>:<MCQ key={i} ex={ex}/>)}
        </Section>
      )}
      {chapter.dialogue&&chapter.dialogue.length>0&&(
        <Section icon="💬" title="對話">
          {chapter.dialogue.map((line,i)=><div key={i} className="dialogue-line"><span className="dl-speaker">{line.s}</span><span className="dl-text">{line.t}</span></div>)}
        </Section>
      )}
      {chapter.tip&&<div className="tip-box">💡 {chapter.tip}</div>}
    </div>
  );
}

function SearchView({onGoChapter,onGoNote}){
  const[q,setQ]=useState('');
  if(!q.trim())return(<div><div className="search-input-wrap"><span className="search-icon">🔍</span><input className="search-input" placeholder="搜尋單字、文法、例句..." value={q} onChange={e=>setQ(e.target.value)} autoFocus/></div><div style={{textAlign:'center',color:'var(--muted)',fontSize:'.85rem',marginTop:40}}>輸入關鍵字搜尋所有課程、筆記、詞彙</div></div>);
  const kw=q.toLowerCase();
  const hl=(text)=>{if(!text)return text;return text.split(new RegExp(`(${q})`,'gi')).map((p,i)=>p.toLowerCase()===kw?<mark key={i}>{p}</mark>:p);};
  const results=[];
  CHAPTERS.forEach(ch=>{
    const hit=[ch.topic,...ch.tags,...ch.summary.map(s=>s.text+' '+(s.fr||'')),...(ch.flashcards||[]).map(f=>f.word+' '+f.meaning),...(ch.grammar||[]).map(g=>g.title+' '+(g.content||''))].join(' ').toLowerCase().includes(kw);
    if(hit)results.push({type:'course',id:ch.id,title:`${ch.date} ${ch.topic}`,meta:`課程 · ${ch.level==='3'?'三級':ch.level==='2'?'二級':'一級'}`,snippet:ch.tags.join(' / '),onClick:()=>onGoChapter(ch.id)});
  });
  GRAMMAR.forEach(g=>{
    const hit=[g.title,...(g.rules||[]),...(g.myExamples||[])].join(' ').toLowerCase().includes(kw);
    if(hit)results.push({type:'grammar',id:g.id,title:g.title,meta:`筆記 · ${g.date}`,snippet:(g.myExamples||[])[0]||'',onClick:()=>onGoNote(g.id)});
  });
  VOCAB.forEach(v=>{
    v.items.forEach(item=>{
      if((item.fr+' '+item.zh+' '+(item.ex||'')).toLowerCase().includes(kw))
        results.push({type:'vocab',id:v.id+item.fr,title:item.fr+' - '+item.zh,meta:`詞彙 · ${v.title}`,snippet:item.ex||'',onClick:()=>{}});
    });
  });
  return(<div><div className="search-input-wrap"><span className="search-icon">🔍</span><input className="search-input" placeholder="搜尋單字、文法、例句..." value={q} onChange={e=>setQ(e.target.value)} autoFocus/></div><div style={{fontSize:'.76rem',color:'var(--muted)',marginBottom:10}}>{results.length} 個結果</div>{results.length===0&&<div style={{textAlign:'center',color:'var(--muted)',fontSize:'.85rem',marginTop:20}}>找不到「{q}」</div>}{results.map((r,i)=><div key={i} className="search-result" onClick={r.onClick}><div className="search-result-title">{hl(r.title)}</div><div className="search-result-meta">{r.meta}</div>{r.snippet&&<div className="search-result-snippet">{hl(r.snippet)}</div>}</div>)}</div>);
}

function AddModal({type,onClose,onSave}){
  const[form,setForm]=useState({});const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const today=new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'});
  return(<div className="modal-overlay" onClick={onClose}><div className="modal" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}>✕</button>
    {type==='error'&&<><div className="modal-title">❌ Nouvelle erreur</div><label className="form-label">分類</label><input className="form-input" placeholder="時態" onChange={e=>set('category',e.target.value)}/><div className="form-row"><div><label className="form-label">❌ 我寫的</label><input className="form-input" onChange={e=>set('wrong',e.target.value)}/></div><div><label className="form-label">✓ 正確版本</label><input className="form-input" onChange={e=>set('correct',e.target.value)}/></div></div><label className="form-label">原因</label><input className="form-input" onChange={e=>set('reason',e.target.value)}/><label className="form-label">我的筆記（可選）</label><input className="form-input" onChange={e=>set('myNote',e.target.value)}/><button className="big-btn" onClick={()=>{if(!form.wrong||!form.correct)return;onSave({...form,id:`e${Date.now()}`,date:today,attempts:0,mastered:false});onClose();}}>儲存</button></>}
    {type==='grammar'&&<><div className="modal-title">📗 Nouvelle note</div><label className="form-label">標題</label><input className="form-input" onChange={e=>set('title',e.target.value)}/><label className="form-label">規則（每行一條）</label><textarea className="form-input" rows={4} onChange={e=>set('rules',e.target.value)} style={{resize:'vertical'}}/><label className="form-label">標籤（逗號分隔）</label><input className="form-input" onChange={e=>set('tags',e.target.value)}/><button className="big-btn" onClick={()=>{if(!form.title)return;onSave({id:`g${Date.now()}`,date:today,type:'grammar',title:form.title,tags:(form.tags||'').split(',').map(t=>t.trim()).filter(Boolean),rules:(form.rules||'').split('\n').filter(Boolean),myExamples:[],mySentences:[]});onClose();}}>儲存</button></>}
    {type==='vocab'&&<><div className="modal-title">📘 Nouveau vocabulaire</div><label className="form-label">標題</label><input className="form-input" onChange={e=>set('title',e.target.value)}/><label className="form-label">標籤</label><input className="form-input" onChange={e=>set('tags',e.target.value)}/><label className="form-label">詞彙（每行：法文|中文|例句）</label><textarea className="form-input" rows={5} placeholder="la liberté|自由|La liberté est essentielle." onChange={e=>set('items',e.target.value)} style={{resize:'vertical'}}/><button className="big-btn" onClick={()=>{if(!form.title)return;const items=(form.items||'').split('\n').filter(Boolean).map(l=>{const[fr,zh,ex]=l.split('|');return{fr:fr?.trim(),zh:zh?.trim(),ex:ex?.trim()};}).filter(i=>i.fr&&i.zh);onSave({id:`v${Date.now()}`,date:today,type:'vocab',title:form.title,tags:(form.tags||'').split(',').map(t=>t.trim()).filter(Boolean),items});onClose();}}>儲存</button></>}
  </div></div>);
}

export default function App(){
  const[tab,setTab]=useState('today');
  const[darkMode,setDarkMode]=useState(false);
  useEffect(()=>{document.body.className=darkMode?'dark':'';},[ darkMode]);
  const[grammar,setGrammar]=useState(GRAMMAR);
  const[vocab,setVocab]=useState(VOCAB);
  const[errors,setErrors]=useState(ERRORS_INIT);
  const[modal,setModal]=useState(null);
  const[apiKey,setApiKey]=useState('');
  const[exercises,setExercises]=useState([]);
  const[generating,setGenerating]=useState(false);
  const[genError,setGenError]=useState('');
  const[showApi,setShowApi]=useState(false);
  const[activeExId,setActiveExId]=useState(null);
  const[showConfetti,setShowConfetti]=useState(false);
  const[selectedChapter,setSelectedChapter]=useState(null);
  const[levelFilter,setLevelFilter]=useState('all');
  const[highlightNote,setHighlightNote]=useState(null);

  // 大分類篩選狀態
  const[gramMainFilter,setGramMainFilter]=useState('all');
  const[gramSubFilter,setGramSubFilter]=useState(null);
  const[vocabMainFilter,setVocabMainFilter]=useState('all');
  const[vocabSubFilter,setVocabSubFilter]=useState(null);
  const[errFilter,setErrFilter]=useState('all');

  const todayFr=new Date().toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  const quote=getQuoteOfDay();

  const handleSave=(type,data)=>{if(type==='error')setErrors(p=>[data,...p]);if(type==='grammar')setGrammar(p=>[data,...p]);if(type==='vocab')setVocab(p=>[data,...p]);};
  const updateError=(id,updates)=>setErrors(p=>p.map(e=>e.id===id?{...e,...updates}:e));
  const addMySentence=(gramId,s)=>{if(!s.trim())return;setGrammar(p=>p.map(g=>g.id===gramId?{...g,mySentences:[...(g.mySentences||[]),s]}:g));};

  const goToNote=(noteId)=>{setTab('notes');setHighlightNote(noteId);setTimeout(()=>setHighlightNote(null),3000);};
  const goToChapter=(chapterId)=>{setSelectedChapter(chapterId);setTab('course');};

  const generateEx=async(tg)=>{
    if(!apiKey.trim()){setShowApi(true);return;}
    setGenerating(true);setGenError('');setExercises([]);
    const ctx=tg?`文法主題：${tg.title}\n規則：${(tg.rules||[]).join('\n')}`:`錯誤記錄：${errors.slice(0,6).map(e=>`${e.wrong} → ${e.correct}（${e.reason}）`).join('\n')}`;
    const prompt=`根據以下內容，為 A1-A2 法語學習者出 5 道練習題（選擇題或填空題混合）：\n${ctx}\n只輸出純 JSON 陣列：\n[{"type":"選","q":"題目","opts":["A","B","C"],"ans":0,"exp":"解釋"},{"type":"填","q":"___","blanks":["答案"],"hint":"提示"}]`;
    try{
      const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':apiKey.trim(),'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:1200,messages:[{role:'user',content:prompt}]})});
      const data=await res.json();if(!res.ok)throw new Error(data.error?.message||`HTTP ${res.status}`);
      const raw=(data.content?.[0]?.text||'').trim();let parsed;
      try{parsed=JSON.parse(raw);}catch{const m=raw.match(/\[[\s\S]*\]/);if(!m)throw new Error('格式錯誤');parsed=JSON.parse(m[0]);}
      setExercises(parsed);
    }catch(e){setGenError(`生成失敗：${e.message}`);}
    setGenerating(false);
  };

  // 篩選邏輯
  const filterByCategory=(items,mainFilter,subFilter,categories)=>{
    if(mainFilter==='all')return items;
    const cat=categories.find(c=>c.id===mainFilter);
    if(!cat)return items;
    const relevantTags=subFilter?[subFilter]:cat.subs;
    return items.filter(item=>item.tags&&item.tags.some(t=>relevantTags.includes(t)));
  };

  const fGram=filterByCategory(grammar,gramMainFilter,gramSubFilter,GRAM_CATEGORIES);
  const fVocab=filterByCategory(vocab,vocabMainFilter,vocabSubFilter,VOCAB_CATEGORIES);
  const errCats=['all','未掌握','已掌握',...new Set(errors.map(e=>e.category))];
  const fErr=errFilter==='all'?errors:errFilter==='已掌握'?errors.filter(e=>e.mastered):errFilter==='未掌握'?errors.filter(e=>!e.mastered):errors.filter(e=>e.category===errFilter);
  const masteredCount=errors.filter(e=>e.mastered).length;

  const filteredChapters=levelFilter==='all'?CHAPTERS:CHAPTERS.filter(c=>c.level===levelFilter);
  const filteredGrouped=filteredChapters.reduce((acc,ch)=>{
    const m=ch.date.slice(0,2);
    const key=m==='01'?'一月':m==='02'?'二月':m==='03'?'三月':m==='04'?'四月':m==='05'?'五月（三級）':'其他';
    if(!acc[key])acc[key]=[];acc[key].push(ch);return acc;
  },{});
  const currentChapter=CHAPTERS.find(c=>c.id===selectedChapter);

  return(
    <div className="app">
      <style>{style}</style>
      {showConfetti&&<Confetti onDone={()=>setShowConfetti(false)}/>}
      <div className="header">
        <div className="header-top"><span style={{fontSize:'1.4rem'}}>🌿</span><div style={{flex:1}}><h1>Mon Journal d'Apprentissage</h1><div className="subtitle">課程 · 筆記 · 詞彙 · 錯誤日記</div></div><button onClick={()=>{setDarkMode(d=>!d);}} style={{background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.2)',borderRadius:20,padding:'5px 12px',cursor:'pointer',color:'white',fontSize:'.78rem',fontFamily:"'Nunito',sans-serif"}}>{darkMode?'☀️ 日間':'🌙 夜間'}</button></div>
        <div className="nav">
          {[{id:'today',l:"📅 Aujourd'hui"},{id:'course',l:'📚 課程'},{id:'notes',l:'📗 筆記'},{id:'vocab',l:'📘 詞彙'},{id:'errors',l:'❌ 錯誤日記'},{id:'search',l:'🔍 搜尋'}].map(t=>(
            <button key={t.id} className={`nav-btn ${tab===t.id?'active':''}`} onClick={()=>{setTab(t.id);if(t.id!=='course')setSelectedChapter(null);}}>{t.l}</button>
          ))}
        </div>
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
          <div style={{background:'var(--card)',borderRadius:'var(--radius)',padding:'14px 16px',boxShadow:'0 2px 10px rgba(201,122,138,.08)',marginBottom:14}}>
            <div style={{fontSize:'.7rem',fontWeight:700,color:'var(--navy)',marginBottom:10,letterSpacing:'.05em',textTransform:'uppercase'}}>📊 Statistiques</div>
            <div className="stat-grid">
              <div className="stat-card"><div className="stat-num">{CHAPTERS.length}</div><div className="stat-label">cours</div></div>
              <div className="stat-card"><div className="stat-num">{grammar.length}</div><div className="stat-label">notes</div></div>
              <div className="stat-card"><div className="stat-num">{masteredCount}<span style={{fontSize:'1rem',color:'#ccc'}}>/{errors.length}</span></div><div className="stat-label">maîtrisées</div></div>
            </div>
          </div>
          <div style={{background:'var(--card)',borderRadius:'var(--radius)',padding:'14px 16px',boxShadow:'0 2px 10px rgba(201,122,138,.08)',borderLeft:'4px solid var(--navy)'}}>
            <div style={{fontSize:'.7rem',fontWeight:700,color:'var(--navy)',marginBottom:8,letterSpacing:'.05em',textTransform:'uppercase'}}>📝 Erreurs récentes</div>
            {errors.filter(e=>!e.mastered).slice(0,3).map(e=><div key={e.id} style={{display:'flex',alignItems:'center',gap:6,marginBottom:5,fontSize:'.81rem'}}><span style={{color:'var(--rose)',fontStyle:'italic',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{e.wrong}</span><span style={{color:'#ccc',flexShrink:0}}>→ ?</span></div>)}
            <button onClick={()=>setTab('errors')} style={{background:'none',border:'none',cursor:'pointer',fontSize:'.73rem',color:'var(--muted)',fontFamily:"'DM Sans',sans-serif",padding:0,marginTop:3}}>Pratiquer →</button>
          </div>
        </div>}

        {tab==='course'&&<div>
          {!selectedChapter?(
            <div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                <div style={{fontSize:'.79rem',color:'var(--muted)'}}>{CHAPTERS.length} cours</div>
              </div>
              <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:12}}>
                {[{id:'all',l:'全部'},{id:'1',l:'一級'},{id:'2',l:'二級'},{id:'3',l:'三級 🆕'}].map(f=>(
                  <button key={f.id} className={`filter-main-btn ${levelFilter===f.id?'active':''}`} onClick={()=>setLevelFilter(f.id)}>{f.l}</button>
                ))}
              </div>
              {Object.entries(filteredGrouped).map(([month,chs])=>(
                <div key={month} className="week-group">
                  <div className="week-label">{month}</div>
                  <div className="chapter-grid">
                    {chs.map(ch=>(
                      <div key={ch.id} className={`chapter-card ${selectedChapter===ch.id?'active':''}`} onClick={()=>setSelectedChapter(ch.id)}>
                        <div className={`clevel ${ch.level==='3'?'lv3':ch.level==='2'?'lv2':'lv1'}`}>{ch.level==='3'?'三級':ch.level==='2'?'二級':'一級'}</div>
                        <div className="cdate">{ch.date} {ch.weekday}</div>
                        <div className="ctopic">{ch.topic}</div>
                        <div className="ctag">{ch.tags[0]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ):(
            <div>
              <button onClick={()=>setSelectedChapter(null)} style={{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',cursor:'pointer',fontSize:'.82rem',color:'var(--muted)',fontFamily:"'DM Sans',sans-serif",marginBottom:14,padding:0}}>← 返回課程列表</button>
              <div style={{marginBottom:12}}>
                <div style={{fontSize:'.72rem',color:'var(--muted)',marginBottom:2}}>{currentChapter?.date} {currentChapter?.weekday}</div>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.1rem',fontWeight:700,color:'var(--navy)'}}>{currentChapter?.topic}</h2>
              </div>
              {currentChapter&&<ChapterView chapter={currentChapter} onGoNote={goToNote}/>}
            </div>
          )}
        </div>}

        {tab==='notes'&&<div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div style={{fontSize:'.79rem',color:'var(--muted)'}}>{fGram.length} / {grammar.length} notes</div>
            <button className="add-btn" onClick={()=>setModal('grammar')}>+ Ajouter</button>
          </div>
          <CategoryFilter categories={GRAM_CATEGORIES} activeMain={gramMainFilter} activeSub={gramSubFilter} onSelectMain={setGramMainFilter} onSelectSub={setGramSubFilter}/>
          {fGram.map(note=>(
            <div key={note.id} className="note-card grammar" style={highlightNote===note.id?{borderLeftColor:'var(--rose)',boxShadow:'0 0 0 2px var(--rose-mid)'}:{}}>
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
            <div style={{fontSize:'.79rem',color:'var(--muted)'}}>{fVocab.reduce((s,n)=>s+n.items.length,0)} / {vocab.reduce((s,n)=>s+n.items.length,0)} mots</div>
            <button className="add-btn" onClick={()=>setModal('vocab')}>+ Ajouter</button>
          </div>
          <CategoryFilter categories={VOCAB_CATEGORIES} activeMain={vocabMainFilter} activeSub={vocabSubFilter} onSelectMain={setVocabMainFilter} onSelectSub={setVocabSubFilter}/>
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
          <div style={{display:'flex',gap:5,flexWrap:'wrap',marginBottom:12}}>
            {errCats.map(c=><button key={c} className={`filter-main-btn ${errFilter===c?'active':''}`} onClick={()=>setErrFilter(c)}>{c==='all'?'Tout':c}</button>)}
          </div>
          {fErr.map(err=><ErrorPracticeCard key={err.id} err={err} onUpdate={updateError}/>)}
          <div style={{marginTop:14,background:'var(--rose-light)',borderRadius:12,padding:14,border:'1px dashed var(--rose-mid)'}}>
            <div style={{fontSize:'.84rem',fontWeight:600,color:'var(--navy)',marginBottom:7}}>🤖 Générer exercices ciblés</div>
            {showApi&&<div className="api-box"><div style={{fontSize:'.73rem',fontWeight:600,color:'var(--navy)',marginBottom:3}}>Anthropic API Key</div><input className="api-input" type="password" value={apiKey} onChange={e=>setApiKey(e.target.value)} placeholder="sk-ant-..."/></div>}
            {genError&&<div style={{fontSize:'.77rem',color:'var(--rose)',marginBottom:6}}>{genError}</div>}
            <div style={{display:'flex',gap:7}}>
              <button onClick={()=>generateEx(null)} disabled={generating} style={{background:generating?'#ddd':'var(--rose)',color:generating?'#999':'white',border:'none',borderRadius:9,padding:'8px 16px',cursor:generating?'not-allowed':'pointer',fontWeight:700,fontSize:'.82rem',fontFamily:"'DM Sans',sans-serif"}}>{generating?'⏳ Génération...':'✨ Générer'}</button>
              {!showApi&&<button onClick={()=>setShowApi(true)} style={{background:'none',border:'1px solid var(--rose-mid)',borderRadius:9,padding:'7px 11px',cursor:'pointer',fontSize:'.77rem',color:'var(--rose)',fontFamily:"'DM Sans',sans-serif"}}>API Key</button>}
            </div>
            {exercises.length>0&&<div style={{marginTop:12}}>{exercises.map((ex,i)=>ex.type==='填'?<FillIn key={i} ex={ex}/>:<MCQ key={i} ex={ex}/>)}</div>}
          </div>
        </div>}

        {tab==='search'&&<SearchView onGoChapter={goToChapter} onGoNote={goToNote}/>}
      </div>
      {modal&&<AddModal type={modal} onClose={()=>setModal(null)} onSave={data=>handleSave(modal,data)}/>}
    </div>
  );
}
