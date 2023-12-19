const darkModeToggle = document.getElementById('darkModeToggle');
const lightText = document.getElementById('lightText');
const darkText = document.getElementById('darkText');
const lightbulbImg = document.querySelector('.light-bulb');
const moonImg = document.querySelector('.half-moon');
const houseImg = document.getElementById('house-image');

darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkModeToggle.checked);
  updateImages();
  updateHouseImageSrc();
});

function updateImages() {
  lightbulbImg.style.display = darkModeToggle.checked ? 'none' : 'inline';
  moonImg.style.display = darkModeToggle.checked ? 'inline' : 'none';
  lightText.style.opacity = darkModeToggle.checked ? 0 : 1;
  darkText.style.opacity = darkModeToggle.checked ? 1 : 0;
  
}

function updateHouseImageSrc() {
  const newSrc = darkModeToggle.checked ? '/src/images/house-image-rain.png' : '/src/images/house-image.png';
  houseImg.src = newSrc;
}

// Initial update
updateImages();
updateHouseImageSrc();
