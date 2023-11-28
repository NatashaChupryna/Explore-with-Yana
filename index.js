"use strict";
import notie from "notie";

function hello() {
  return notie.alert({ text: "Info!" });
}
hello();
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
}

// перший варіант
function submit() {
  const form = document.getElementsByClassName("modal-form")[0];

  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      try {
        let response = await fetch("https://planvoyage.fr/sendMail.php", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          let result = await response.json();
          console.log("form", form);
          form.reset();

          console.log("Form sended!)");
        } else {
          console.error("Form submit error:", response.statusText);
        }
        alert("Thanks. I will reach out to you soon.");
        // notie.alert({ text: "Info!" });
      } catch (error) {
        console.error("Form submit error:", error.message);
      }
    } else {
      alert("Fill in required fields");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = form.getElementsByClassName("_req");

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
          alert("Fill in the email correctly");
        }
      }
      if (input.classList.contains("_tel")) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
          alert("Fill in the phone number correctly");
          notie.alert({ text: "Info!" });
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

  function phoneTest(input) {
    return !/(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?/.test(
      input.value
    );
  }
}
