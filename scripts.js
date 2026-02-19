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
  
  const skipperPart = skipperElem.closest('.parts > *');
  if (skipperPart === null) return;

  skipperPart.classList.add('skipper');
  location.hash = anchor;
  const hideElems = document.querySelectorAll('.parts > .skipper ~ :has(~ :target)');
  skipperPart.classList.remove('skipper');
  
  for (const hideElem of hideElems) {
    hideElem.classList.add('skip');
  }
}

function unskipToElem(e) {
  const skipperElem = e.target;
  const anchor = skipperElem.dataset.unskip;
  if (anchor === undefined) return;
  
  const skipperPart = skipperElem.closest('.parts > *');
  if (skipperPart === null) return;

  skipperPart.classList.add('skipper');
  location.hash = anchor;
  const hideElems = document.querySelectorAll('.parts > .skipper ~ :has(~ :target)');
  skipperPart.classList.remove('skipper');

  // scroll to first hidden element
  if (hideElems.length === 0) return;
  location.hash = '';
  hideElems[0].scrollIntoView();
  
  for (const hideElem of hideElems) {
    hideElem.classList.remove('skip');
  }
}