function ajaxCallPHP(endpoint, msg) {
  const id = sessionStorage.getItem("discussion");
  const pseudo = sessionStorage.getItem("pseudo");
  fetch(
    `./php/controller.php?action=${endpoint}&msg=${msg}&id=${id}&pseudo=${pseudo}`
  )
}

function ajaxCallPHP2(endpoint) {
    const id = sessionStorage.getItem("discussion");
    fetch(
      `./php/controller.php?action=${endpoint}&id=${id}`
    )
      .then((response) => console.log(response.text()))
    //   .then((response) => {
    //     let res = response.message;
    //     // if (res != false){
          
    //   console.log(res);
    //     sessionStorage.setItem("message", res);
    //     // } else {
    //     //     document.querySelector(`#${endpoint} h3`).insertAdjacentHTML("afterend", `<p>${errMsg}</p>`);
    //     // }
    //   });
  }


function envoyer() {
  const msg = document.querySelector("#contenu").value;
  ajaxCallPHP("addMessage", msg);
}

function afficherMsg(){
    ajaxCallPHP2("getMessages");
}

document.querySelector("#pseudo").innerHTML = sessionStorage.getItem("pseudo");

document.querySelector("#submit").addEventListener("click", envoyer);

document.querySelector("#exit").addEventListener("click", () => {
  location.href = "./#";
})

afficherMsg();

