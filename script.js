/* ============================================================
   DeStack_ Studio — configuração do site
   Edite só este bloco. O resto do site lê daqui.
   ============================================================ */
const CONFIG = {
  whatsapp: '5500000000000',            // só números, com DDI 55 + DDD. Ex: 5511999998888
  instagram: 'https://www.instagram.com/destack_studio/',
  email: 'contato@seudominio.com.br',
  cidade: 'Sua cidade, UF',
  mensagemPadrao: 'Olá! Vim pelo site da DeStack_ Studio e quero um orçamento.',
};

/* ---- WhatsApp: todo link com data-wa vira wa.me com mensagem ---- */
(function () {
  const base = 'https://wa.me/' + CONFIG.whatsapp.replace(/\D/g, '');
  document.querySelectorAll('[data-wa]').forEach((el) => {
    const msg = el.getAttribute('data-wa') || CONFIG.mensagemPadrao;
    el.setAttribute('href', base + '?text=' + encodeURIComponent(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
  document.querySelectorAll('[data-instagram]').forEach((el) => {
    el.setAttribute('href', CONFIG.instagram);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
  document.querySelectorAll('[data-email]').forEach((el) => {
    el.setAttribute('href', 'mailto:' + CONFIG.email);
    const label = el.querySelector('[data-email-label]');
    if (label) label.textContent = CONFIG.email;
  });
  document.querySelectorAll('[data-cidade]').forEach((el) => {
    el.textContent = CONFIG.cidade;
  });
})();

/* ---- Menu mobile ---- */
(function () {
  const toggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
})();

/* ---- Animação de entrada ---- */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  // Segurança: se algo impedir o observer, tudo aparece depois de 2s.
  setTimeout(() => items.forEach((el) => el.classList.add('is-visible')), 2000);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => io.observe(el));
})();

/* ---- Ano no rodapé ---- */
(function () {
  const y = document.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
