document.addEventListener('DOMContentLoaded', () => {
  clearInput();
  listenSkippers();
  updateRequired();
  setMaxToday();
});

function clearInput() {
  const textElems = document.querySelectorAll('input:where([type="text"],[type="email"],[type="number"],[type="tel"],[type="date"])');
  for (const textElem of textElems) {
    textElem.value = '';
  }
  const radioElems = document.querySelectorAll('input');
  for (const radioElem of radioElems) {
    radioElem.checked = false;
  }
}

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
  const skipperElems = document.querySelectorAll('input[type="radio"]');
  for (const skipperElem of skipperElems) {
    skipperElem.addEventListener('change', updateRequired);
  }
}

function updateRequired() {
  // make everything without [data-required] optional
  const visibleElems = document.querySelectorAll('.step input');
  for (const visibleElem of visibleElems) {
    visibleElem.required = false;
  }

  // make everything with [data-required] required
  const requiredVisibleElems = document.querySelectorAll('.step input[data-required]');
  for (const requiredVisibleElem of requiredVisibleElems) {
    requiredVisibleElem.required = true;
  }
  
  // make everything that's hidden optional
  const skippedElems = document.querySelectorAll('.step:not(:has(> label > :checked:not([data-skip]))) > .step input');
  for (const skippedElem of skippedElems) {
    skippedElem.required = false;
  }
}