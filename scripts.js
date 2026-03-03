document.addEventListener('DOMContentLoaded', () => {
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

//TODO: pick one input