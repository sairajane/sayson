/* ═══════════════════════════════════════
   SAIRA JANE SAYSON — PORTFOLIO SCRIPT
   Pure hardcode — no admin, no database
═══════════════════════════════════════ */

// ── EmailJS ──
emailjs.init("SK9le-xyx9yAtBZ7O");
function sendEmail(e) {
  e.preventDefault();
  const btn = document.getElementById("sendBtn");
  const feedback = document.getElementById("formFeedback");
  btn.disabled = true; btn.classList.add("loading");
  feedback.className = "form-feedback"; feedback.textContent = "";
  const params = {
    from_name:  document.getElementById("fromName").value.trim(),
    from_email: document.getElementById("fromEmail").value.trim(),
    message:    document.getElementById("message").value.trim(),
    to_email:   "sairajanesayson@gmail.com"
  };
  emailjs.send("service_4ifljvc", "template_1ll3s59", params)
    .then(() => {
      btn.disabled = false; btn.classList.remove("loading");
      feedback.textContent = "✓ Message sent! I'll get back to you soon.";
      feedback.className = "form-feedback success show";
      document.getElementById("contactForm").reset();
    })
    .catch(err => {
      btn.disabled = false; btn.classList.remove("loading");
      feedback.textContent = "✗ Something went wrong. Please try again.";
      feedback.className = "form-feedback error show";
      console.error(err);
    });
}

// ── GALLERY LIGHTBOX — reads photos directly from HTML ──
function initGalleryLightbox() {
  const cells = document.querySelectorAll("#galleryGrid .gallery-cell");
  const photos = Array.from(cells).map(cell => {
    const img = cell.querySelector("img");
    return { dataUrl: img ? img.src : "", name: img ? img.alt : "" };
  });
  cells.forEach((cell, idx) => {
    cell.style.cursor = "pointer";
    cell.onclick = () => openLightbox(photos, idx);
  });
}

// ── LIGHTBOX ──
let lbPhotos = [], lbIndex = 0;
function openLightbox(photos, index) {
  lbPhotos = photos; lbIndex = index; showLbPhoto();
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function showLbPhoto() {
  const p = lbPhotos[lbIndex];
  document.getElementById("lbImg").src = p.dataUrl || p.url || p.src || "";
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
function lbNav(dir, e) {
  if (e) e.stopPropagation();
  lbIndex = (lbIndex + dir + lbPhotos.length) % lbPhotos.length;
  showLbPhoto();
}
document.addEventListener("keydown", e => {
  if (!document.getElementById("lightbox").classList.contains("open")) return;
  if (e.key === "ArrowLeft")  lbNav(-1);
  if (e.key === "ArrowRight") lbNav(1);
  if (e.key === "Escape")     closeLightbox();
});
const lb = document.getElementById("lightbox");
if (lb) lb.addEventListener("click", function(e) { if (e.target === this) closeLightbox(); });

// ── TYPED ANIMATION ──
const phrases = [
  "Computer Engineering Student, University of Bohol.",
  "Passionate about hardware & software.",
  "Building the future, one circuit at a time."
];
let tI = 0, tJ = 0, tDel = false;
const typedEl = document.getElementById("typed");
function type() {
  if (!typedEl) return;
  typedEl.textContent = phrases[tI].slice(0, tJ += (tDel ? -1 : 1));
  if (!tDel && tJ === phrases[tI].length) { tDel = true; setTimeout(type, 1400); return; }
  if (tDel && tJ === 0) { tDel = false; tI = (tI + 1) % phrases.length; setTimeout(type, 500); return; }
  setTimeout(type, tDel ? 40 : 80);
}

// ── TOAST ──
function showToast(msg, type) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.className = "toast " + type + " show";
  setTimeout(() => t.classList.remove("show"), 3500);
}

// ── NAVIGATION ──
function showSection(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-links a[data-section]").forEach(a => a.classList.remove("active"));
  const sec = document.getElementById(id);
  if (sec) sec.classList.add("active");
  const lnk = document.querySelector('.nav-links a[data-section="' + id + '"]');
  if (lnk) lnk.classList.add("active");
}
function nav(e, id)   { e.preventDefault(); showSection(id); closeDD(); }
function navDD(e, id) { e.preventDefault(); showSection(id); closeDD(); }
function toggleDD()   { document.getElementById("projectsDD").classList.toggle("open"); }
function closeDD()    { document.getElementById("projectsDD").classList.remove("open"); }
document.addEventListener("click", e => {
  const dd = document.getElementById("projectsDD");
  if (dd && !dd.contains(e.target)) closeDD();
});

// ── START ──
initGalleryLightbox();
type();
