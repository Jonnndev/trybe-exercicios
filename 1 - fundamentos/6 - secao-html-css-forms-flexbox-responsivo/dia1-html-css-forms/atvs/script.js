// SELETORES
const INPUT_TEXT = document.querySelector("#input-text");
const INPUT_CHECKBOX = document.querySelector("#input-checkbox");
const HREF_LINK = document.querySelector("#href");

function noEventLink(event) {
  event.preventDefault();
}
HREF_LINK.addEventListener('click', noEventLink);

function noEventCheck(event) {
  event.preventDefault();
}
INPUT_CHECKBOX .addEventListener('click', noEventCheck);

function noEventKeypress(event) {
  event.preventDefault();
}
INPUT_TEXT.addEventListener('keypress', noEventKeypress);