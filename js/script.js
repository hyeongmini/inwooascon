(function () {
  var header = document.getElementById('siteHeader');
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 40 || !document.querySelector('.hero')); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // 모바일 메뉴
  var drawer = document.getElementById('drawer');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  var b = document.getElementById('burger'), c = document.getElementById('drawerClose');
  if (b) b.addEventListener('click', function () { setDrawer(true); });
  if (c) c.addEventListener('click', function () { setDrawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setDrawer(false); });
  if (drawer) drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setDrawer(false); }); });

  // 히어로 슬라이더
  var hero = document.getElementById('hero');
  if (hero) {
    var slides = hero.querySelectorAll('.slide'), copies = hero.querySelectorAll('.hero-copy'), dots = hero.querySelectorAll('.hero-dots button');
    var cur = 0, timer;
    function go(n) {
      slides[cur].classList.remove('active'); copies[cur].classList.remove('on'); if (dots[cur]) dots[cur].classList.remove('on');
      cur = (n + slides.length) % slides.length;
      slides[cur].classList.add('active'); copies[cur].classList.add('on'); if (dots[cur]) dots[cur].classList.add('on');
    }
    function auto() { clearInterval(timer); timer = setInterval(function () { go(cur + 1); }, 7500); }
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); auto(); }); });
    go(0); auto();
  }

  // 스크롤 등장
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else { items.forEach(function (el) { el.classList.add('in'); }); }
})();
