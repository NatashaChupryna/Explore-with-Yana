"use strict";
// Banner script
// function banner() {
//   const overlay = document.getElementById("overlay");
//   overlay.style.display = "block";
// }
// setTimeout(banner, 15000);

function banner() {
  const overlay = document.getElementById("overlay");
  const hasVisited = localStorage.getItem("hasVisited");

  if (!hasVisited) {
    overlay.style.display = "block";
    localStorage.setItem("hasVisited", true);
  } else {
    overlay.style.display = "none";
  }
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

// Mobile menu
// (() => {
//   const menuOpenBtn = document.querySelector("[data-menu-open]");
//   const menuCloseBtn = document.querySelector("[data-menu-close]");

//   const mobileMenu = document.querySelector("[data-menu]");
//   // const body = document.querySelector('body');

//   menuOpenBtn.addEventListener("click", openModal);
//   menuCloseBtn.addEventListener("click", openModal);

//   function openModal() {
//     mobileMenu.classList.toggle("is-open");
//     body.classList.toggle("no-scroll");
//   }
// })();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementsByClassName("modal-form")[0];
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add("_sending");
      if (form.classList.contains("sending")) {
        alert("Thanks. I`ll get in contact with you");
      }
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        form.reset();
      }
    } else {
      alert("Fill in required fields");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll("._req");

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      }

      if (input.value === "") {
        formAddError(input);
        error++;
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});
