// Small vanilla JS used by the scaffold
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => navList.classList.toggle('show'))
  }

  // set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // contact form handler: POST to form.dataset.action if present, otherwise open mailto fallback
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      status.textContent = 'Sending...';
      const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

      const action = form.getAttribute('data-action') || '';
      try {
        if (action) {
          // POST to configured endpoint (e.g., Formspree, Netlify Forms, etc.)
          const res = await fetch(action, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error(`Server responded ${res.status}`);
          status.textContent = 'Message sent — thank you.';
          form.reset();
        } else {
          // mailto fallback
          const subject = encodeURIComponent(payload.subject || 'Message from portfolio site');
          const bodyParts = [];
          if (payload.name) bodyParts.push(`Name: ${payload.name}`);
          if (payload.email) bodyParts.push(`Email: ${payload.email}`);
          if (payload.phone) bodyParts.push(`Phone: ${payload.phone}`);
          if (payload.country) bodyParts.push(`Country: ${payload.country}`);
          if (payload.industry) bodyParts.push(`Industry: ${payload.industry}`);
          if (payload.message) bodyParts.push(`\n${payload.message}`);
          const body = encodeURIComponent(bodyParts.join('\n'));
          const mailto = `mailto:stephen.joseph@example.com?subject=${subject}&body=${body}`;
          window.location.href = mailto;
          status.textContent = 'Opened email client as fallback.';
        }
      } catch (err) {
        console.error(err);
        status.textContent = 'There was an error sending your message.';
      }
    });
  }
});

// Theme handling (outside DOMContentLoaded to ensure functions available)
function applyTheme(theme){
  const root = document.documentElement;
  if(theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  const btn = document.getElementById('themeToggle');
  if(btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme(){
  const saved = localStorage.getItem('site-theme');
  if(saved){
    applyTheme(saved);
    return;
  }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded',()=>{
  initTheme();
  const themeToggle = document.getElementById('themeToggle');
  if(themeToggle){
    themeToggle.addEventListener('click',()=>{
      const isDark = document.documentElement.classList.toggle('dark');
      const theme = isDark ? 'dark' : 'light';
      localStorage.setItem('site-theme', theme);
      applyTheme(theme);
    });
  }
  // smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href=a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth',block:'start'});
      }
    })
  })

  // simple reveal on scroll
  const reveals=document.querySelectorAll('.reveal');
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('show'); obs.unobserve(en.target); } })
  },{threshold:0.12});
  reveals.forEach(r=>obs.observe(r));
});
