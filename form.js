/* ฟอร์มบันทึกการนิเทศ — ต้องโหลดหลังสคริปต์หลักใน index.html */
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzc4YcepM007R3BqDtOc1xq3UcRbZek72s26fFzVY1jOIzlP3n_GkmoMc1PulAcR9Z7lw/exec';

(function () {
  const CRITERIA = [
    'การเตรียมและการใช้สื่อ/นวัตกรรมการสอน',
    'วิธีการสอนและการกระตุ้นการเรียนรู้',
    'ลำดับขั้นตอนการจัดกิจกรรมการสอน',
    'การวัดและประเมินผลในชั้นเรียน',
    'การจัดบรรยากาศและสิ่งแวดล้อมการเรียนรู้'
  ];
  const SCALE = ['ปรับปรุง', 'พอใช้', 'ปานกลาง', 'ดี', 'ดีมาก'];
  const SPORTS = ['ฟุตบอล', 'ฟุตซอล', 'วอลเลย์บอล', 'บาสเกตบอล', 'แบดมินตัน', 'เทเบิลเทนนิส', 'เทนนิส', 'ว่ายน้ำ', 'กรีฑา', 'เปตอง', 'รักบี้', 'ยิมนาสติก', 'กายบริหาร/นันทนาการ'];
  const GRADES = ['ป.4', 'ป.5', 'ป.6', 'ม.1', 'ม.2', 'ม.3', 'ม.4', 'ม.5', 'ม.6'];
  const OTHER_VAL = '__other__';

  const css = `
  .f-btn{background:#fff;color:var(--navy)}.f-btn:hover{background:#ffe0e2}
  #fdlg{max-width:640px}
  #fdlg .dlg-head{padding:22px 26px}
  #fdlg .dlg-head .eyebrow{opacity:.82}
  #fdlg form{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}
  .fbody{padding:22px 26px 8px;overflow:auto;flex:1;min-height:0}
  .fsec{margin-bottom:22px}
  .fsec:last-child{margin-bottom:6px}
  .fsec-h{display:flex;align-items:center;gap:9px;margin-bottom:14px}
  .fsec-h .n{width:22px;height:22px;border-radius:7px;background:linear-gradient(135deg,var(--navy2),var(--navy));color:#fff;font-size:12px;font-weight:700;display:grid;place-items:center;flex:none}
  .fsec-h .t{font-size:13px;font-weight:700;letter-spacing:.03em;color:var(--text);text-transform:uppercase;opacity:.9}
  .fsec-h .hint{margin-left:auto;font-size:12px;color:var(--muted);font-weight:500;text-transform:none;letter-spacing:0}
  .fg{margin-bottom:14px}.fg:last-child{margin-bottom:0}
  .fg label{display:block;font-weight:600;font-size:13px;margin-bottom:7px;color:var(--muted)}
  .fg .req{color:var(--navy2)}
  .fg input,.fg textarea,.fg select{width:100%;min-width:0;font-family:inherit;font-size:16px;padding:11px 14px;border:1px solid var(--line);border-radius:12px;background:var(--input);color:var(--text);transition:.15s;appearance:none}
  .fg input:hover,.fg textarea:hover,.fg select:hover{border-color:#5a2a2e}
  .fg input:focus,.fg textarea:focus,.fg select:focus{outline:0;border-color:var(--navy2);box-shadow:0 0 0 3px rgba(255,71,87,.18)}
  .fg input::placeholder,.fg textarea::placeholder{color:var(--muted)}
  .fg textarea{min-height:80px;resize:vertical;line-height:1.5}
  .fsel-wrap{position:relative}
  .fsel-wrap select{padding-right:38px;cursor:pointer}
  .fsel-wrap::after{content:"";position:absolute;right:14px;top:50%;width:9px;height:9px;border-right:2px solid var(--muted);border-bottom:2px solid var(--muted);transform:translateY(-65%) rotate(45deg);pointer-events:none}
  .fpass-wrap{position:relative}
  .fpass-wrap input{padding-right:44px}
  .fpass-eye{position:absolute;right:4px;top:50%;transform:translateY(-50%);width:40px;height:40px;border:0;background:transparent;color:var(--muted);cursor:pointer;border-radius:8px;display:grid;place-items:center;touch-action:manipulation}
  .fpass-eye:hover{background:var(--chip);color:var(--text)}
  .fpass-eye .i{width:17px;height:17px}
  .frow{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .fq{padding:13px 14px;border:1px solid var(--line);border-radius:14px;margin-bottom:10px;background:rgba(255,255,255,.015);transition:border-color .15s}
  .fq:last-child{margin-bottom:0}
  .fq:focus-within{border-color:rgba(255,71,87,.4)}
  .fq-top{display:flex;align-items:baseline;gap:8px;margin-bottom:10px}
  .fq-num{font-size:12px;font-weight:700;color:var(--navy2);flex:none}
  .fq-t{font-weight:600;font-size:13.5px;color:var(--text);line-height:1.35}
  .seg{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}
  .seg input{position:absolute;opacity:0;pointer-events:none}
  .seg label{margin:0;text-align:center;padding:10px 2px;min-height:40px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:9px;background:var(--chip);cursor:pointer;font-weight:700;font-size:14px;color:var(--muted);transition:.12s;line-height:1.15;border:1px solid transparent;touch-action:manipulation}
  .seg label:hover{border-color:rgba(255,71,87,.35)}
  .seg label small{display:block;font-size:9.5px;font-weight:500;margin-top:2px;opacity:.85}
  .seg input:checked+label{background:linear-gradient(120deg,var(--navy2),var(--navy));color:#fff;border-color:transparent;box-shadow:0 3px 10px rgba(255,71,87,.35)}
  .seg input:focus-visible+label{outline:2px solid var(--navy2);outline-offset:1px}
  .fmsg{display:flex;align-items:flex-start;gap:9px;padding:11px 13px;border-radius:12px;font-size:13.5px;margin:0 26px 14px;line-height:1.45}
  .fmsg .i{flex:none;margin-top:1px;width:16px;height:16px}
  .fmsg.err{background:#3a1418;color:#ff9298}
  .fmsg.warn{background:#3a2a0c;color:#f5c563}
  .fchk{display:flex;align-items:center;gap:8px;font-weight:500;font-size:13px;color:var(--muted);cursor:pointer;user-select:none}
  .fchk input{position:absolute;opacity:0;width:18px;height:18px;margin:0;cursor:pointer}
  .fchk .box{width:18px;height:18px;border-radius:6px;border:1.5px solid var(--line);background:var(--input);flex:none;display:grid;place-items:center;transition:.15s}
  .fchk .box svg{width:11px;height:11px;stroke:#fff;stroke-width:3;fill:none;opacity:0;transform:scale(.6);transition:.12s}
  .fchk input:checked+.box{background:linear-gradient(120deg,var(--navy2),var(--navy));border-color:transparent}
  .fchk input:checked+.box svg{opacity:1;transform:scale(1)}
  .fchk input:focus-visible+.box{outline:2px solid var(--navy2);outline-offset:2px}
  .fact{display:flex;gap:10px;justify-content:flex-end;align-items:center;flex-wrap:wrap;padding:16px 26px;border-top:1px solid var(--line);background:var(--card);flex:none;border-radius:0 0 22px 22px}
  .fact .fchk{margin-right:auto}
  .fact .btn-line{background:var(--chip);color:var(--navy2)}
  .fact .btn-line:hover{background:#2c1518}
  .fact .btn-primary{min-width:132px;justify-content:center}
  .fact .btn-primary:disabled{opacity:.7;cursor:default}
  .toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(30px);background:var(--navy);color:#fff;padding:14px 22px;border-radius:14px;box-shadow:0 12px 36px rgba(0,0,0,.5);opacity:0;transition:.3s;z-index:99;font-weight:600;display:flex;align-items:center;gap:8px}
  .toast.show{opacity:1;transform:translateX(-50%)}
  @media(max-width:520px){.frow{grid-template-columns:1fr}.seg label small{display:none}.fmsg{margin-left:20px;margin-right:20px}.fbody{padding-left:20px;padding-right:20px}.fact{padding-left:20px;padding-right:20px}}`;
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);

  // ปุ่มบนหัวเว็บ
  const bar = document.querySelector('.hero-top > div:last-child');
  bar.insertAdjacentHTML('afterbegin', `<button class="btn f-btn" id="btnAdd">${ic('plus')}บันทึกการนิเทศ</button>`);

  const q = CRITERIA.map((c, i) => `
    <div class="fq">
      <div class="fq-top"><span class="fq-num">${i + 1}</span><span class="fq-t">${esc(c)}</span></div>
      <div class="seg" role="radiogroup" aria-label="${esc(c)}">${[1, 2, 3, 4, 5].map(n =>
        `<input type="radio" name="s${i}" id="s${i}_${n}" value="${n}" required><label for="s${i}_${n}">${n}<small>${SCALE[n - 1]}</small></label>`).join('')}
      </div></div>`).join('');

  document.body.insertAdjacentHTML('beforeend', `
  <dialog id="fdlg">
    <div class="dlg-head"><div><div class="eyebrow">แบบบันทึกการนิเทศการสอน</div><h2 style="color:#fff;font-size:22px">บันทึกผลการนิเทศ</h2></div>
      <button class="x" type="button" id="fClose" aria-label="ปิด">${ic('x')}</button></div>
    <form id="fform" autocomplete="off">
      <div id="fmsgWrap"></div>
      <div class="fbody">
        <div class="fsec">
          <div class="fsec-h"><span class="n">1</span><span class="t">ข้อมูลการนิเทศ</span></div>
          <div class="frow">
            <div class="fg"><label for="fTeacher">ชื่อครูพลศึกษาผู้รับการนิเทศ <span class="req">*</span></label>
              <div class="fsel-wrap"><select id="fTeacher" required><option value="">กำลังโหลดรายชื่อ…</option></select></div>
            </div>
            <div class="fg"><label for="fSportType">ชนิดกีฬา <span class="req">*</span></label>
              <div class="fsel-wrap"><select id="fSportType" required>
                <option value="">— เลือกชนิดกีฬา —</option>
                ${SPORTS.map(s => `<option value="${esc(s)}">${esc(s)}</option>`).join('')}
                <option value="${OTHER_VAL}">อื่นๆ (ระบุ)</option>
              </select></div>
            </div>
          </div>
          <div class="frow" id="fSportOtherRow" style="display:none">
            <div class="fg" style="grid-column:1/-1"><label for="fSportOther">ระบุชนิดกีฬา <span class="req">*</span></label><input id="fSportOther" placeholder="เช่น เซปักตะกร้อ"></div>
          </div>
          <div class="frow">
            <div class="fg"><label for="fGrade">ชั้นปี <span class="req">*</span></label><input id="fGrade" list="fGrades" required placeholder="เช่น ม.2"><datalist id="fGrades"></datalist></div>
            <div class="fg"><label for="fSuper">ชื่อผู้นิเทศ <span class="req">*</span></label>
              <div class="fsel-wrap"><select id="fSuper" required><option value="">กำลังโหลดรายชื่อ…</option></select></div>
            </div>
          </div>
          <div class="frow" id="fSuperOtherRow" style="display:none">
            <div class="fg" style="grid-column:1/-1"><label for="fSuperOther">ระบุชื่อผู้นิเทศ <span class="req">*</span></label><input id="fSuperOther" placeholder="ชื่อ-นามสกุลผู้นิเทศ"></div>
          </div>
          <div class="frow">
            <div class="fg"><label for="fPass">รหัสผู้นิเทศ <span class="req">*</span></label>
              <div class="fpass-wrap"><input id="fPass" type="password" required autocomplete="off">
                <button type="button" class="fpass-eye" id="fPassToggle" aria-label="แสดงรหัสผ่าน">${ic('eye')}</button>
              </div>
            </div>
          </div>
        </div>

        <div class="fsec">
          <div class="fsec-h"><span class="n">2</span><span class="t">ผลการนิเทศ</span><span class="hint">1 = ปรับปรุง · 5 = ดีมาก</span></div>
          ${q}
        </div>

        <div class="fsec">
          <div class="fsec-h"><span class="n">3</span><span class="t">ข้อเสนอแนะเพิ่มเติม</span></div>
          <div class="fg"><textarea id="fNote" maxlength="2000" placeholder="ข้อสังเกตหรือคำแนะนำสำหรับครูผู้รับการนิเทศ (ถ้ามี)"></textarea></div>
        </div>
      </div>
      <div class="fact">
        <label class="fchk" for="fRemember"><input type="checkbox" id="fRemember"><span class="box">${ic('check')}</span>จำชื่อผู้นิเทศ/รหัสในเครื่องนี้</label>
        <button type="button" class="btn btn-line" id="fCancel">ยกเลิก</button>
        <button type="submit" class="btn btn-primary" id="fSubmit">บันทึกข้อมูล</button>
      </div>
    </form>
  </dialog><div class="toast" id="toast"></div>`);

  const d = document.getElementById('fdlg'), form = document.getElementById('fform');
  const msg = (t, c) => document.getElementById('fmsgWrap').innerHTML = t ? `<div class="fmsg ${c}">${ic('alert')}<span>${esc(t)}</span></div>` : '';
  const toast = t => { const el = document.getElementById('toast'); el.innerHTML = ic('check') + '<span>' + esc(t) + '</span>'; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 3200); };
  const opts = (id, vals) => document.getElementById(id).innerHTML = [...new Set(vals)].filter(Boolean).sort().map(v => `<option value="${esc(v)}">`).join('');

  document.getElementById('fPassToggle').onclick = () => {
    const inp = document.getElementById('fPass');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  };

  // --- cross-device dialog fallback -----------------------------------
  // Older/less-common browsers (some in-app webviews, older Android/iOS
  // builds) don't implement <dialog>.showModal(), which would otherwise
  // leave the form permanently invisible and unfillable on those devices.
  // Patch in a minimal manual implementation when the native one is missing.
  if (typeof d.showModal !== 'function') {
    d.showModal = function () { this.setAttribute('open', ''); document.body.style.overflow = 'hidden'; };
    d.close = function () { this.removeAttribute('open'); document.body.style.overflow = ''; };
  }

  const fSportType = document.getElementById('fSportType'), fSportOtherRow = document.getElementById('fSportOtherRow'), fSportOther = document.getElementById('fSportOther');
  fSportType.onchange = () => {
    const isOther = fSportType.value === OTHER_VAL;
    fSportOtherRow.style.display = isOther ? '' : 'none';
    fSportOther.required = isOther;
    if (isOther) fSportOther.focus();
  };

  let STAFF = null;
  async function loadStaff() {
    if (STAFF) return STAFF;
    try {
      const t = await fetch(url('บุคลากร')).then(r => r.text());
      const names = parseCSV(t).slice(1).map(r => [r[1], r[2], r[3]].map(x => (x || '').trim()).filter(Boolean).join(' ')).filter(Boolean);
      STAFF = [...new Set(names)].sort((a, b) => a.localeCompare(b, 'th'));
    } catch (e) { STAFF = []; }
    return STAFF;
  }
  function fillSelect(id, list, placeholder, withOther) {
    document.getElementById(id).innerHTML = `<option value="">${esc(placeholder)}</option>` + list.map(n => `<option value="${esc(n)}">${esc(n)}</option>`).join('') + (withOther ? `<option value="${OTHER_VAL}">อื่นๆ (ระบุ)</option>` : '');
  }

  const fSuperSel = document.getElementById('fSuper'), fSuperOtherRow = document.getElementById('fSuperOtherRow'), fSuperOther = document.getElementById('fSuperOther');
  const syncSuperOther = focus => {
    const isOther = fSuperSel.value === OTHER_VAL;
    fSuperOtherRow.style.display = isOther ? '' : 'none';
    fSuperOther.required = isOther;
    if (isOther && focus) fSuperOther.focus();
  };
  fSuperSel.onchange = () => syncSuperOther(true);

  document.getElementById('btnAdd').onclick = async () => {
    fillSelect('fTeacher', [], 'กำลังโหลดรายชื่อ…'); fillSelect('fSuper', [], 'กำลังโหลดรายชื่อ…');
    opts('fGrades', GRADES);
    fSportType.value = ''; fSportOtherRow.style.display = 'none'; fSportOther.value = ''; fSportOther.required = false;
    fSuperOther.value = ''; syncSuperOther();
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem('supForm') || 'null'); } catch (e) {}
    if (saved) { fPass.value = saved.pass || ''; fRemember.checked = true; }
    msg(SCRIPT_URL ? '' : 'ยังไม่ได้เชื่อมต่อกับชีต — ต้องตั้งค่า SCRIPT_URL ใน form.js ก่อนจึงจะบันทึกได้', 'warn');
    d.showModal();
    const names = await loadStaff();
    const uniq = a => [...new Set(a.filter(Boolean))].sort((x, y) => x.localeCompare(y, 'th'));
    fillSelect('fTeacher', names.length ? names : uniq(DATA.map(x => x.teacher)), '— เลือกชื่อครู —');
    const sups = uniq([...names, ...DATA.map(x => x.sup)]);
    fillSelect('fSuper', sups, '— เลือกชื่อผู้นิเทศ —', true);
    if (saved && saved.sup) {
      if (sups.includes(saved.sup)) fSuperSel.value = saved.sup;
      else { fSuperSel.value = OTHER_VAL; fSuperOther.value = saved.sup; }
    }
    syncSuperOther();
  };
  const close = () => d.close();
  document.getElementById('fClose').onclick = close; document.getElementById('fCancel').onclick = close;

  function parseSheetTimestamps(s) {
    // Timestamp cell written by Apps Script's `new Date()`. The sheet's locale decides whether it
    // reads M/D/YYYY or D/M/YYYY (sometimes with a comma), so return both readings as candidates.
    const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s+(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec((s || '').trim());
    if (!m) return [];
    const [a, b, yr, h, mi, se] = m.slice(1).map(x => Number(x || 0));
    const out = [];
    if (a <= 12) out.push(new Date(yr, a - 1, b, h, mi, se).getTime());
    if (b <= 12) out.push(new Date(yr, b - 1, a, h, mi, se).getTime());
    return out;
  }

  // Google Apps Script's post-POST redirect ("echo") response is occasionally flaky right after a
  // deploy/cold-start: the browser gets a non-JSON (e.g. 404) response even though doPost() already
  // wrote the row. Rather than report a false failure, double-check the sheet for the row we just sent.
  async function wasActuallySaved(payload, submittedAt) {
    try {
      const t = await fetch(url('Data'), { cache: 'no-store' }).then(r => r.text());
      const rows = parseCSV(t).slice(1);
      return rows.some(r => {
        if ((r[1] || '').trim() !== payload.teacher || (r[3] || '').trim() !== payload.supervisor) return false;
        return parseSheetTimestamps(r[0]).some(ts => Math.abs(ts - submittedAt) < 60000);
      });
    } catch (e) { return false; }
  }

  form.onsubmit = async ev => {
    ev.preventDefault();
    if (!SCRIPT_URL) return msg('ยังไม่ได้ตั้งค่า SCRIPT_URL', 'err');
    const sport = fSportType.value === OTHER_VAL ? fSportOther.value.trim() : fSportType.value;
    if (!sport) return msg('กรุณาเลือกหรือระบุชนิดกีฬา', 'err');
    const supervisor = fSuperSel.value === OTHER_VAL ? fSuperOther.value.trim() : fSuperSel.value;
    if (!supervisor) return msg('กรุณาเลือกหรือระบุชื่อผู้นิเทศ', 'err');
    const subject = `พลศึกษา (${sport}) ${fGrade.value.trim()}`.trim();
    const btn = document.getElementById('fSubmit'); btn.disabled = true; btn.textContent = 'กำลังบันทึก…'; msg('');
    const payload = {
      passcode: fPass.value, teacher: fTeacher.value, subject, supervisor, note: fNote.value,
      scores: CRITERIA.map((_, i) => +form.querySelector(`input[name=s${i}]:checked`).value)
    };
    const submittedAt = Date.now();
    let ok = false, errMsg = 'บันทึกไม่สำเร็จ';
    let sendFailed = false;
    try {
      // Some browsers (notably Safari/WebKit) can hang, throw, or otherwise fail to read the
      // response from this cross-origin POST-with-redirect to Apps Script, even though the
      // request itself reached the server and doPost() already wrote the row. We no longer try
      // to read the response at all (mode: 'no-cors') — we always confirm success by polling
      // the sheet below, which works the same way in every browser regardless of CORS/redirect
      // quirks. A short timeout still guards against the request itself hanging forever.
      const ac = new AbortController();
      const timer = setTimeout(() => ac.abort(), 6000);
      try {
        await fetch(SCRIPT_URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), signal: ac.signal });
      } finally { clearTimeout(timer); }
    } catch (e) {
      // Only a genuine network failure (offline, DNS, etc.) lands here — with no-cors the
      // promise resolves even on a 4xx/redirect response, it just can't be read.
      sendFailed = true;
      errMsg = e.name === 'AbortError' ? 'เชื่อมต่อล่าช้าเกินไป กำลังตรวจสอบว่าบันทึกสำเร็จหรือไม่…' : (e.message === 'Failed to fetch' ? 'เชื่อมต่อไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ต' : e.message);
    }
    // Always confirm via the sheet itself — this is the only reliable signal across browsers.
    btn.textContent = 'กำลังตรวจสอบ…';
    for (let attempt = 0; attempt < 5 && !ok; attempt++) {
      await new Promise(res => setTimeout(res, 1500));
      if (await wasActuallySaved(payload, submittedAt)) ok = true;
    }
    if (!ok && sendFailed) errMsg = 'ไม่สามารถเชื่อมต่อและตรวจสอบไม่พบข้อมูลที่บันทึก กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองใหม่';
    else if (!ok) errMsg = 'บันทึกไม่สำเร็จ หรือระบบตรวจสอบไม่พบข้อมูลในชีต กรุณาลองใหม่อีกครั้ง';
    try {
      if (!ok) throw new Error(errMsg);
      try { fRemember.checked ? localStorage.setItem('supForm', JSON.stringify({ sup: supervisor, pass: fPass.value })) : localStorage.removeItem('supForm'); } catch (e) {}
      form.reset(); fSportOtherRow.style.display = 'none'; syncSuperOther(); d.close(); toast('บันทึกการนิเทศเรียบร้อย'); load();
    } catch (e) {
      msg(e.message, 'err');
    } finally { btn.disabled = false; btn.textContent = 'บันทึกข้อมูล'; }
  };
})();
