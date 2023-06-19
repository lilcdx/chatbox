function ajaxCallPHP(endpoint, msg) {
  const id = sessionStorage.getItem("discussion");
  const pseudo = sessionStorage.getItem("pseudo");
  fetch(
    `./php/controller.php?action=${endpoint}&msg=${msg}&id=${id}&pseudo=${pseudo}`
  )
}

function ajax(endpoint) {
    const id = sessionStorage.getItem("discussion");
    fetch(
      `./php/controller.php?action=${endpoint}&id=${id}`
    )
      .then((response) => response.json())
      .then((response) => {
        for (let res of response){
          let sender = "rec";
          if(res.Pseudo == sessionStorage.getItem("pseudo")){
            sender = "sent";
          }
          afficherMsg(sender, res);
        }
      //   let res = response.message;
      //   // if (res != false){
          
      // console.log(res);
      //   sessionStorage.setItem("message", res);
      //   // } else {
      //   //     document.querySelector(`#${endpoint} h3`).insertAdjacentHTML("afterend", `<p>${errMsg}</p>`);
      //   // }
      });
  }


function envoyer() {
  const msg = document.querySelector("#contenu").value;
  ajaxCallPHP("addMessage", msg);
  afficherAllMsg();
}

function afficherAllMsg(){
    ajax("getMessages");
}

function afficherMsg(sender, response){
  document.querySelector("#messages").insertAdjacentHTML("beforeend", 
  `<div class="${sender}_msg_box">
    <p class="${sender}_msg message">${response.Contenu}</p>
    <p class="msg_infos">Envoyé par ${response.Pseudo} le ${response.Tempo}</p>
  </div>`)
}

document.querySelector("#pseudo").innerHTML = sessionStorage.getItem("pseudo");

document.querySelector("#submit").addEventListener("click", envoyer);

document.querySelector("#exit").addEventListener("click", () => {
  location.href = "./#";
})

afficherAllMsg();

