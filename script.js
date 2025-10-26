// Générateur de multiplications et logique PWA / install
let a = 2, b = 2;
const questionEl = document.getElementById('question');
const answerInput = document.getElementById('answer');
const form = document.getElementById('answerForm');
const feedback = document.getElementById('feedback');
const scoreEl = document.getElementById('score');
const streakEl = document.getElementById('streak');
const nextBtn = document.getElementById('nextBtn');
const installBtn = document.getElementById('installBtn');
let score = 0, streak = 0;


function randDigit(){ return Math.floor(Math.random()*8); }
function newQuestion(){ a = randDigit(); b = randDigit(); questionEl.textContent = `${a} × ${b} = ?`; feedback.textContent = ''; answerInput.value = ''; answerInput.focus(); nextBtn.classList.add('hidden'); }


function showCorrect(){ feedback.innerHTML = `Réponse : <strong>${a*b}</strong>`; }


form.addEventListener('submit', e => {
e.preventDefault();
const val = parseInt(answerInput.value, 10);
if (isNaN(val)) { feedback.textContent = 'Entre un nombre'; return; }
if (val === a*b){
feedback.textContent = 'Correct ✔️';
score += 1; streak += 1;
scoreEl.textContent = score;
streakEl.textContent = streak;
nextBtn.classList.remove('hidden');
} else {
feedback.innerHTML = `Faux ✖️ — Bonne réponse : <strong>${a*b}</strong>`;
streak = 0;
streakEl.textContent = streak;
nextBtn.classList.remove('hidden');
}
});


nextBtn.addEventListener('click', () => newQuestion());


// démarrage
newQuestion();


// Installation PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
e.preventDefault();
deferredPrompt = e;
installBtn.removeAttribute('aria-hidden');
installBtn.style.display = 'inline-block';
});


installBtn.addEventListener('click', async () => {
if (!deferredPrompt) return;
deferredPrompt.prompt();
const choice = await deferredPrompt.userChoice;
if (choice.outcome === 'accepted') {
console.log('User accepted install');
} else {
console.log('User dismissed install');
}
deferredPrompt = null;
installBtn.style.display = 'none';
});


// raccourci : appuie sur Enter dans l'input déclenche la validation
answerInput.addEventListener('keydown', (e)=>{
if(e.key === 'Enter'){
e.preventDefault();
form.requestSubmit();
}
});