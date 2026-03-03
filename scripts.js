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
  if (day.length === 1) day = `0${day}`;
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

  location.hash = anchor;

  // set required
}

function unskipToElem(e) {
  const skipperElem = e.target;
  const anchor = skipperElem.dataset.unskip;
  if (anchor === undefined) return;

  location.hash = '';

  // scroll to closest fieldset element
  skipperElem.classList.add('skipper');
  const fieldsetElem = document.querySelector('fieldset:has(> .skipper), fieldset:has(> * > .skipper)');
  skipperElem.classList.remove('skipper');
  if (fieldsetElem === null) return;

  fieldsetElem.scrollIntoView();

  // set required
}

//TODO: pick one input