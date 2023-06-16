function ajaxCallPHP(endpoint, name, errMsg) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Origin": "*",
  };
  const data = {
    "name": name,
  };
  fetch(`./php/controller.php?action=${endpoint}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => console.log(response.json()))
    .then((response) => {
      let res = response.discussion;
      if (res != false) {
        sessionStorage.setItem("discussion", res);
        changeVisible(`#${endpoint}`, "#pseudo");
      } else {
        document
          .querySelector(`#${endpoint} h3`)
          .insertAdjacentHTML("afterend", `<p>${errMsg}</p>`);
      }
    });
}

function rejoindre() {
  if (!!document.querySelector("#join p")) {
    document.querySelector("#join p").remove();
  }
  const name = document.querySelector("#join input").value;
  ajaxCallPHP("join", name, "Cette discussion n'existe pas");
}

function creer() {
  if (!!document.querySelector("#create p")) {
    document.querySelector("#create p").remove();
  }
  const name = document.querySelector("#create input").value;
  ajaxCallPHP("create", name, "Cette discussion existe déjà");
}

function pseudoRejoindre() {
  const pseudo = document.querySelector("#pseudo input").value;
  if (pseudo != "") {
    sessionStorage.setItem("pseudo", pseudo);
    location.href = "chat.html";
  } else {
    document
      .querySelector(`#pseudo h3`)
      .insertAdjacentHTML("afterend", `<p>Veuillez entrer un pseudo</p>`);
  }
}

/* Cache l'élement el1 et rend visible el2
 */
function changeVisible(el1, el2) {
  if (!!document.querySelector(el1 + " p")) {
    document.querySelector(el1 + " p").remove();
  }
  document.querySelector(el1).classList.add("hide");
  document.querySelector(el2).classList.remove("hide");
}

document.querySelector("#join a").addEventListener("click", () => {
  changeVisible("#join", "#create");
});

document.querySelector("#create a").addEventListener("click", () => {
  changeVisible("#create", "#join");
});

document.querySelector("#join button").addEventListener("click", rejoindre);
document.querySelector("#create button").addEventListener("click", creer);
document
  .querySelector("#pseudo button")
  .addEventListener("click", pseudoRejoindre);
