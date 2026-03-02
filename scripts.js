document.addEventListener('DOMContentLoaded', () => {
  listenSkippers();
  setMaxToday();
});

function setMaxToday() {
  const dateElems = document.querySelectorAll('[data-max-today]');
  if (dateElems.length === 0) return;

  const date = new Date();

  // fix 0s
  let day = date.getDate().toString();
  if (day.length === 1) day = `0${month}`;
  let month = date.getMonth().toString();
  if (month.length === 1) month = `0${month}`;

  const today = `${date.getFullYear()}-${month}-${day}`;

  for (const dateElem of dateElems) {
    dateElem.setAttribute('max', today);
  }
}

function listenSkippers() {
  const skipperElems = document.querySelectorAll('[data-skip]');
  for (const skipperElem of skipperElems) {
    skipperElem.addEventListener('change', skipToElem);
  }
  const unskipperElems = document.querySelectorAll('[data-unskip]');
  for (const unskipperElem of unskipperElems) {
    unskipperElem.addEventListener('change', unskipToElem);
  }
}

function skipToElem(e) {
  const skipperElem = e.target;
  const anchor = skipperElem.dataset.skip;
  if (anchor === undefined) return;

  // set anchor
  location.hash = anchor;

  // find skipped elements
  skipperElem.classList.add('skipper');
  const hideElems = document.querySelectorAll(
    '.question:has(.skipper) > * > :has(.skipper) ~ *, .question:has(:target) :has(~ :target)'
  );
  skipperElem.classList.remove('skipper');
  // .a ~ :has(~ .b)
  /*
    .question:has(.skipper) > * > :has(.skipper) ~ *,
    .question:has(.skipper) ~ :has(~ .question:has(:target)) > *,
    .question:has(:target) :has(~ :target)
  */

  // add required + class
  
  // add class
  for (const hideElem of hideElems) {
    hideElem.classList.add('skip');
  }
}

function unskipToElem(e) {
  const skipperElem = e.target;
  const anchor = skipperElem.dataset.unskip;
  if (anchor === undefined) return;

  // find skipped elements
  skipperElem.classList.add('skipper');
  const hideElems = document.querySelectorAll(
    '.question:has(.skipper) > * > :has(.skipper) ~ *, .question:has(:target) :has(~ :target)'
  );

  // remove required on class

  // scroll to closest fieldset element
  location.hash = '';
  const fieldsetElem = document.querySelector('fieldset:has(> .skipper), fieldset:has(> * > .skipper)');
  if (fieldsetElem === null) return;

  fieldsetElem.scrollIntoView();
  skipperElem.classList.remove('skipper');
  
  // remove class
  for (const hideElem of hideElems) {
    hideElem.classList.remove('skip');
  }
}

//TODO: pick one input