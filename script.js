
/* ══════════════════════════════════════
   Mortal Kombat 1 — script.js
   ══════════════════════════════════════ */

/* ── Кнопка «Наверх» ── */
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  toTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
});

toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

toTop.style.display = 'none';


/* ══════════════════════════════════════
   МОДАЛЬНОЕ ОКНО
   ══════════════════════════════════════ */
const modal      = document.getElementById('modal');
const modalImg   = document.getElementById('modal-img');
const modalCap   = document.getElementById('modal-caption');
const modalClose = document.getElementById('modalClose');
const modalPrev  = document.getElementById('modalPrev');
const modalNext  = document.getElementById('modalNext');

/* Список всех карточек — собирается один раз */
const allCards = Array.from(document.querySelectorAll('.char-row'));
let currentIndex = 0;

/* Показать персонажа по индексу */
function showCard(index) {
  const card = allCards[index];
  const img  = card.querySelector('.char-img img');
  const name = card.querySelector('.char-info h3');

  modalImg.src         = img ? img.src : '';
  modalImg.alt         = img ? img.alt : '';
  modalCap.textContent = name ? name.textContent : '';

  /* Счётчик: "3 / 19" */
  document.getElementById('modal-counter').textContent =
    `${index + 1} / ${allCards.length}`;

  /* Затухание и появление картинки */
  modalImg.style.opacity = '0';
  setTimeout(() => { modalImg.style.opacity = '1'; }, 50);
}

/* Открыть */
function openModal(index) {
  currentIndex = index;
  showCard(currentIndex);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* Закрыть */
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/* Следующий */
function nextCard() {
  currentIndex = (currentIndex + 1) % allCards.length;
  showCard(currentIndex);
}

/* Предыдущий */
function prevCard() {
  currentIndex = (currentIndex - 1 + allCards.length) % allCards.length;
  showCard(currentIndex);
}

/* Клик по карточке */
allCards.forEach((card, index) => {
  card.addEventListener('click', () => openModal(index));
});

/* Кнопки стрелок */
modalPrev.addEventListener('click', e => { e.stopPropagation(); prevCard(); });
modalNext.addEventListener('click', e => { e.stopPropagation(); nextCard(); });

/* Крестик */
modalClose.addEventListener('click', closeModal);

/* Клик по тёмному фону */
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});

/* Клавиатура */
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('active')) return;
  if (e.key === 'Escape')     closeModal();
  if (e.key === 'ArrowRight') nextCard();
  if (e.key === 'ArrowLeft')  prevCard();
});
``