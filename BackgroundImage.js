window.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('heroSection');  // Make sure the ID matches!

  const images = [
    'https://raw.githubusercontent.com/amarendrachaudhary/AmloChandPublicSchool/main/school1.png',
    'https://raw.githubusercontent.com/amarendrachaudhary/AmloChandPublicSchool/main/school2.png',
    'https://raw.githubusercontent.com/amarendrachaudhary/AmloChandPublicSchool/main/school3.png'
  ];

  let index = 0;

  function changeBackground() {
    hero.style.backgroundImage = `url('${images[index]}')`;
    index = (index + 1) % images.length;
  }

  changeBackground();
  setInterval(changeBackground, 3000);
});
