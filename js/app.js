/**
 * App de Benvinguda per al Taller de Docents
 * Repositori: miquelangelfuentes/prova4
 */

// --- 1. SO I SINTETITZADOR D'ÀUDIO AMB WEB AUDIO API ---
class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
  }

  playChime() {
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Acord d'alegria)
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0.15, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.65);
      });
    } catch (e) {
      console.log('Audio disabled or blocked by browser');
    }
  }

  playTick() {
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }
}

const sfx = new SoundEffects();

// --- 2. MOTOR DE CONFETI AMB CANVAS NADIU ---
class ConfettiCannon {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire() {
    const colors = ['#4f46e5', '#06b6d4', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6'];
    for (let i = 0; i < 90; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 1.2) * 15,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        life: 120 + Math.random() * 40
      });
    }

    if (!this.animationId) {
      this.animate();
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravetat
      p.rotation += p.rSpeed;
      p.life--;
      p.opacity = Math.max(0, p.life / 100);

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      this.ctx.restore();

      if (p.life <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
      }
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

let confetti;

// --- 3. DADES PER AL TRENCAGLAÇ I CITES ---
const ICEBREAKER_QUESTIONS = [
  "Quina és la situació d'aula més divertida o curiosa que has viscut aquest trimestre?",
  "Quin recurs o eina digital s'ha convertit en el teu imprescindible de classe?",
  "Si poguessis delegar una sola tasca docent a una intel·ligència artificial, quina triaries?",
  "Quin és el repte pedagògic principal que t'agradaria abordar durant aquest curs?",
  "Què és el que més t'apassiona d'ensenyar la teva matèria?",
  "Comparteix un truc o rutina d'aula que et funcioni de meravella amb l'alumnat.",
  "Si la teva manera d'ensenyar fos una pel·lícula o cançó, quin títol tindria?",
  "Quina és la millor pregunta que t'ha fet mai un alumne o alumna?",
  "Quin és el teu superpoder secret a la sala de professors?",
  "Quina competència o idea t'agradaria endur-te 'llesta per aplicar' d'aquest taller?"
];

const TEACHING_QUOTES = [
  {
    quote: "L'educació no canvia el món: canvia les persones que van a canviar el món.",
    author: "Paulo Freire"
  },
  {
    quote: "La tasca del docent modern no és talar selves, sinó regar deserts.",
    author: "C.S. Lewis"
  },
  {
    quote: "Sembrar en els nens bones idees encara que no les entenguin; els anys s'encarregaran de desxifrar-les.",
    author: "Maria Montessori"
  },
  {
    quote: "La creativitat ara és tan important en l'educació com l'alfabetització, i hauríem de donar-li el mateix estatus.",
    author: "Sir Ken Robinson"
  },
  {
    quote: "L'objectiu principal de l'educació a les escoles hauria de ser la creació d'homes i dones capaços de fer coses noves.",
    author: "Jean Piaget"
  },
  {
    quote: "Ensenyar és un acte de generositat i d'esperança en el futur compartit.",
    author: "Pedagogia Viva"
  }
];

// --- 4. GESTIÓ DEL MUR D'EXPECTATIVES (POST-ITS) ---
const STORAGE_KEY = 'taller_docents_expectatives';

function getSavedNotes() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return [
      {
        id: '1',
        name: 'Marta (Coordinadora)',
        text: 'Aprendre eines pràctiques per dinamitzar les classes i estalviar temps en la preparació de materials!',
        color: 'postit-yellow',
        date: 'Avui, inici del taller'
      },
      {
        id: '2',
        name: 'Jordi (Matemàtiques)',
        text: 'Descobrir com utilitzar la tecnologia per atendre millor la diversitat a l\'aula.',
        color: 'postit-green',
        date: 'Avui, inici del taller'
      }
    ];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function renderNotes() {
  const wall = document.getElementById('postit-wall');
  if (!wall) return;
  const notes = getSavedNotes();

  if (notes.length === 0) {
    wall.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
        <p style="font-size: 1.1rem; margin-bottom: 6px;">Encara no hi ha cap nota al mur.</p>
        <p style="font-size: 0.9rem;">Sigues el primer o la primera a compartir una expectativa o reflexió!</p>
      </div>
    `;
    return;
  }

  wall.innerHTML = notes.map(note => `
    <div class="postit-note ${note.color}">
      <div class="postit-text">${escapeHtml(note.text)}</div>
      <div class="postit-meta">
        <span><strong>${escapeHtml(note.name || 'Docent')}</strong> · ${escapeHtml(note.date)}</span>
        <button class="postit-delete-btn" onclick="deleteNote('${note.id}')" title="Eliminar nota">✕</button>
      </div>
    </div>
  `).join('');
}

function addNote() {
  const nameInput = document.getElementById('postit-author');
  const textInput = document.getElementById('postit-content');
  const activeColorEl = document.querySelector('.color-option.selected');
  const colorClass = activeColorEl ? activeColorEl.dataset.color : 'postit-yellow';

  const text = textInput.value.trim();
  if (!text) {
    alert('Si us plau, escriu una reflexió o expectativa abans de publicar-la.');
    return;
  }

  const name = nameInput.value.trim() || 'Docent participant';
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const notes = getSavedNotes();
  notes.unshift({
    id: Date.now().toString(),
    name: name,
    text: text,
    color: colorClass,
    date: `Avui a les ${timeStr}`
  });

  saveNotes(notes);
  renderNotes();
  textInput.value = '';
  sfx.playChime();
  confetti.fire();
}

function deleteNote(id) {
  const notes = getSavedNotes().filter(n => n.id !== id);
  saveNotes(notes);
  renderNotes();
}

function clearAllNotes() {
  if (confirm('Vols esborrar totes les notes del mur?')) {
    saveNotes([]);
    renderNotes();
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// --- 5. ACREDITACIÓ DIGITAL (GENERADOR DE TARGETA DOCENT) ---
function setupBadgeGenerator() {
  const nameInput = document.getElementById('badge-input-name');
  const schoolInput = document.getElementById('badge-input-school');
  const roleInput = document.getElementById('badge-input-role');
  const stageInput = document.getElementById('badge-input-stage');
  const powerInput = document.getElementById('badge-input-power');
  const avatarSelect = document.getElementById('badge-input-avatar');

  function updateBadge() {
    document.getElementById('badge-display-name').textContent = nameInput.value.trim() || 'La teva identitat docent';
    document.getElementById('badge-display-school').textContent = schoolInput.value.trim() || 'Centre Educatiu';
    document.getElementById('badge-display-role').textContent = roleInput.value.trim() || 'Docent Innovador/a';
    document.getElementById('badge-display-stage').textContent = stageInput.value.trim() || 'Etapa Educativa';
    document.getElementById('badge-display-power').textContent = powerInput.value.trim() || 'Innovació Pedagògica';
    document.getElementById('badge-display-avatar').textContent = avatarSelect.value;
  }

  [nameInput, schoolInput, roleInput, stageInput, powerInput, avatarSelect].forEach(el => {
    if (el) {
      el.addEventListener('input', updateBadge);
      el.addEventListener('change', updateBadge);
    }
  });

  // Botó descarregar carnet
  const downloadBtn = document.getElementById('btn-download-badge');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// --- 6. DINÀMICA TRENCAGLAÇ (ICEBREAKER) ---
let currentQuestionIndex = 0;

function setupIcebreaker() {
  const qEl = document.getElementById('icebreaker-text');
  const nextBtn = document.getElementById('btn-next-question');

  function showQuestion(index) {
    if (!qEl) return;
    qEl.style.opacity = '0';
    setTimeout(() => {
      qEl.textContent = ICEBREAKER_QUESTIONS[index];
      qEl.style.opacity = '1';
    }, 200);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      sfx.playTick();
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * ICEBREAKER_QUESTIONS.length);
      } while (nextIndex === currentQuestionIndex && ICEBREAKER_QUESTIONS.length > 1);

      currentQuestionIndex = nextIndex;
      showQuestion(currentQuestionIndex);
    });
  }

  showQuestion(0);
}

// --- 7. TEMPORITZADOR D'ACTIVITATS ---
class WorkshopTimer {
  constructor() {
    this.totalSeconds = 300; // 5 minuts per defecte
    this.remainingSeconds = 300;
    this.interval = null;
    this.isRunning = false;

    this.displayEl = document.getElementById('timer-display');
    this.startBtn = document.getElementById('timer-start-btn');
    this.pauseBtn = document.getElementById('timer-pause-btn');
    this.resetBtn = document.getElementById('timer-reset-btn');

    this.init();
  }

  init() {
    this.updateDisplay();

    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.start());
    }
    if (this.pauseBtn) {
      this.pauseBtn.addEventListener('click', () => this.pause());
    }
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.reset());
    }

    document.querySelectorAll('.timer-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const minutes = parseInt(e.target.dataset.minutes, 10);
        this.setDuration(minutes * 60);
      });
    });
  }

  setDuration(seconds) {
    this.pause();
    this.totalSeconds = seconds;
    this.remainingSeconds = seconds;
    this.updateDisplay();
    if (this.displayEl) {
      this.displayEl.classList.remove('ended');
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    sfx.playTick();
    if (this.displayEl) {
      this.displayEl.classList.add('running');
      this.displayEl.classList.remove('ended');
    }

    this.interval = setInterval(() => {
      if (this.remainingSeconds > 0) {
        this.remainingSeconds--;
        this.updateDisplay();
      } else {
        this.finish();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.interval);
    if (this.displayEl) {
      this.displayEl.classList.remove('running');
    }
  }

  reset() {
    this.pause();
    this.remainingSeconds = this.totalSeconds;
    this.updateDisplay();
    if (this.displayEl) {
      this.displayEl.classList.remove('ended');
    }
  }

  finish() {
    this.pause();
    if (this.displayEl) {
      this.displayEl.classList.add('ended');
    }
    sfx.playChime();
    confetti.fire();
    alert('⏱️ S\'ha acabat el temps de l\'activitat!');
  }

  updateDisplay() {
    if (!this.displayEl) return;
    const mins = Math.floor(this.remainingSeconds / 60);
    const secs = this.remainingSeconds % 60;
    this.displayEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
}

// --- 8. CITES PEDAGÒGIQUES ---
function setupQuotes() {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const newQuoteBtn = document.getElementById('btn-new-quote');

  function renderQuote() {
    const q = TEACHING_QUOTES[Math.floor(Math.random() * TEACHING_QUOTES.length)];
    if (quoteText && quoteAuthor) {
      quoteText.textContent = `"${q.quote}"`;
      quoteAuthor.textContent = `— ${q.author}`;
    }
  }

  if (newQuoteBtn) {
    newQuoteBtn.addEventListener('click', () => {
      sfx.playTick();
      renderQuote();
    });
  }

  renderQuote();
}

// --- 9. PESTANYES I NAVEGACIÓ ---
function setupTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playTick();
      const tabId = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(tabId);
      if (target) {
        target.classList.add('active');
      }
    });
  });
}

// --- 10. COLOR PICKER PER ALS POST-ITS ---
function setupColorPicker() {
  const options = document.querySelectorAll('.color-option');
  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });
}

// --- 11. INICIALITZACIÓ GLOBAL ---
document.addEventListener('DOMContentLoaded', () => {
  confetti = new ConfettiCannon('confetti-canvas');

  // Botó Benvinguda i Confeti
  const welcomeBtn = document.getElementById('btn-welcome-confetti');
  if (welcomeBtn) {
    welcomeBtn.addEventListener('click', () => {
      sfx.playChime();
      confetti.fire();
    });
  }

  setupTabs();
  setupBadgeGenerator();
  setupColorPicker();
  renderNotes();
  setupIcebreaker();
  new WorkshopTimer();
  setupQuotes();

  // Animació inicial de confeti
  setTimeout(() => {
    confetti.fire();
  }, 400);
});
