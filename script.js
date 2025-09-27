<script>
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');

  // === Burger toggle + a11y
  if (burger && nav) {
    burger.setAttribute('aria-expanded', 'false');
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('active');
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Закрыть по Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    // Закрыть по клику вне меню (на мобильном)
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // === Footer form toast + защита от дабл-клика
  const form  = document.getElementById('footerForm');
  const toast = document.getElementById('footerToast');
  if (form && toast) {
    const submitBtn = form.querySelector('button[type="submit"]');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (submitBtn) submitBtn.disabled = true;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
        if (submitBtn) submitBtn.disabled = false;
      }, 3000);
      form.reset();
    });
  }

  // === Smooth scroll по якорям
  const header = document.querySelector('.header-bar');
  const headerH = () => header ? header.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      // Если нужен учёт фикс-хедера — используй прокрутку с offset:
      const y = target.getBoundingClientRect().top + window.pageYOffset - headerH();
      window.scrollTo({ top: y, behavior: 'smooth' });

      if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      }
    });
  });
});
</script>