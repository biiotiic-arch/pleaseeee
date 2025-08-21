// script.js

window.addEventListener("scroll", () => {
  const header = document.getElementById("site-header");
  if(window.scrollY > 50){
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

// Preloader
document.getElementById("skip").addEventListener("click", () => {
  document.getElementById("preloader").style.display = "none";
});
