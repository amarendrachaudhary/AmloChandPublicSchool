window.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('heroSection');

  const images = [
    'school1.png',
    'school2.png',
    'school3.png'
  ];

  let index = 0;

  function changeBackground() {
    hero.style.backgroundImage = `url('${images[index]}')`;
    index = (index + 1) % images.length;
  }

  // Initial image
  changeBackground();

  // Change every 3 seconds
  setInterval(changeBackground, 3000);
});

