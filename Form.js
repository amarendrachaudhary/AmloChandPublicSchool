const form = document.getElementById('admissionForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};

  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  try {
    const response = await fetch("https://sheetdb.io/api/v1/37dqmbda3yhj3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });

    if (response.ok) {
      alert("Form submitted successfully!");
      form.reset();
    } else {
      alert("Submission failed. Please try again.");
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
});

