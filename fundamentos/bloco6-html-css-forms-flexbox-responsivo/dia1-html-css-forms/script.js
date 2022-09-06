// SELETORES
const btnSend = document.getElementById('btnSend');
const checkBoxImage = document.getElementById('input-checkImage');
const inputEmailValue = document.getElementById('input-email').value;

function noSend(event) {
  event.preventDefault();
}
btnSend.addEventListener('click', noSend);

function check() {
  if (checkBoxImage.checked === false) {
    alert('Aceita divulgar suas imagens?');
    event.preventDefault();
  }
}
btnSend.addEventListener('click', check);

console.log(inputEmailValue);
