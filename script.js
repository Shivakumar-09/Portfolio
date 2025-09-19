const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent default form submission

  const data = {
    name: form.inputName.value,
    email: form.inputEmail.value,
    phone: form.inputPhone.value
  };

  try {
    const response = await fetch('https://formspree.io/f/mdklrdpe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Important!
      },
      body: JSON.stringify(data) // Convert JS object to JSON
    });

    if (response.ok) {
      alert('Form submitted successfully!');
      form.reset();
    } else {
      alert('Error submitting form.');
    }
  } catch (error) {
    console.error(error);
    alert('Something went wrong.');
  }
});