console.log("RSVP script loaded");

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwV74EJYwOWLw2N6jdoWJzmLdTDMmssspNjjFCQlj_z939CNEXmUeQT-YsdoHgBp1XNuA/exec";

const form = document.getElementById('rsvpForm');
// const success = document.getElementById('successMessage');

const successOverlay = document.getElementById('successOverlay');
const errorOverlay = document.getElementById('errorOverlay');
document.getElementById('successClose').addEventListener('click', () => successOverlay.classList.add('hidden'));
document.getElementById('errorClose').addEventListener('click', () => errorOverlay.classList.add('hidden'));


let submitting = false;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (submitting) return;
  submitting = true;

  const btn = form.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      redirect: 'follow',
      body: JSON.stringify(data),
    });

    form.reset();
    successOverlay.classList.remove('hidden');

  } catch (err) {
    console.error("RSVP submission error:", err);
    errorOverlay.classList.remove('hidden');

  } finally {
    btn.textContent = originalText;
    btn.disabled = false;
    submitting = false;
  }
});