const form = document.getElementById('rsvpForm');
const success = document.getElementById('successMessage');

form.addEventListener('submit', async (e) => {

```
e.preventDefault();

const data = new FormData(form);

const response = await fetch(
    form.action,
    {
        method: 'POST',
        body: data,
        headers: {
            Accept: 'application/json'
        }
    }
);

if (response.ok) {

    form.reset();

    success.classList.remove('hidden');

    success.scrollIntoView({
        behavior: 'smooth'
    });

} else {

    alert(
        'There was a problem submitting your RSVP.'
    );
}
```

});
