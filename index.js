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

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementsByClassName("modal-form")[0];
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    let formData = new FormData(form);
    console.log("formData", formData);
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

          console.log("форма відправилась");
        } else {
          console.error("Помилка відправки форми:", response.statusText);
        }
        alert("Thanks. I`ll get in contact with you");
      } catch (error) {
        console.error("Помилка відправки форми:", error.message);
      }
    } else {
      alert("Fill in required fields");
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = form.getElementsByClassName("_req");
    console.log("помилка в _req");
    console.log("formReq", formReq);

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);
      console.log("formReq[i]", formReq[i]);

      if (input.classList.contains("_email")) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
          console.log("помилка в пошті");
          alert("Fill in the email correctly");
        }
      }
      if (input.classList.contains("_tel")) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
          console.log("помилка в телефоні");
          alert("Fill in the phone number correctly");
        }
      }

      if (input.value === "") {
        formAddError(input);
        error++;
        console.log("помилка в пустому інпуті");
      }
      console.log("помилка валідації");
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
});

// function send(event, php) {
//   console.log("Отправка запроса");
//   event.preventDefault ? event.preventDefault() : (event.returnValue = false);
//   var req = new XMLHttpRequest();
//   req.open("POST", php, true);
//   req.onload = function () {
//     if (req.status >= 200 && req.status < 400) {
//       json = JSON.parse(this.response); // Ебанный internet explorer 11
//       console.log(json);

//       // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
//       if (json.result == "success") {
//         // Если сообщение отправлено
//         alert("Сообщение отправлено");
//       } else {
//         // Если произошла ошибка
//         alert("Ошибка. Сообщение не отправлено");
//       }
//       // Если не удалось связаться с php файлом
//     } else {
//       alert("Ошибка сервера. Номер: " + req.status);
//     }
//   };

//   // Если не удалось отправить запрос. Стоит блок на хостинге
//   req.onerror = function () {
//     alert("Ошибка отправки запроса");
//   };
//   req.send(new FormData(event.target));
// }
