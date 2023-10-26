// Banner script
function banner() {
  const overlay = document.getElementById("overlay");
  overlay.style.display = "block";
}
setTimeout(banner, 15000);

// Form script
const refs = {
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  modal: document.querySelector("[data-modal]"),
  body: document.querySelector("[data-page]"),
};

refs.openModalBtn.addEventListener("click", toggleModal);
refs.closeModalBtn.addEventListener("click", toggleModal);

function toggleModal() {
  refs.modal.classList.toggle("is-hidden");
  refs.body.classList.toggle("no-scroll");
}
