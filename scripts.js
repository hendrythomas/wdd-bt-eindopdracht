document.addEventListener('DOMContentLoaded', () => {
  listenSubmit();
  clearInput();
  listenInput();
  updateRequired();
  setMaxToday();
});

function clearInput() {
  const textElems = document.querySelectorAll('input:where([type="text"],[type="email"],[type="number"],[type="tel"],[type="date"])');
  for (const textElem of textElems) {
    textElem.value = '';
  }

  const radioElems = document.querySelectorAll('input[type="radio"]');
  for (const radioElem of radioElems) {
    radioElem.checked = false;
  }
}

function listenSubmit() {
  const formElem = document.querySelector('form');
  if (formElem === null) return;
  
  const submitElem = formElem.querySelector('[type="submit"]');
  if (submitElem === null) return;
  
  submitElem.addEventListener('click', (e) => {
    showValidity(formElem);
  });
}

function listenInput() {
  const inputElems = document.querySelectorAll('input');
  for (const inputElem of inputElems) {
    inputElem.addEventListener('change', updateRequired);
    inputElem.addEventListener('change', updateProgress);
  }
}

function showValidity(formElem) {
  const inputElems = formElem.querySelectorAll('input');
  for (const inputElem of inputElems) {
    if (inputElem.validity === undefined) continue;
    
    // delete previous messages
    const stepElem = inputElem.closest('.step');
    if (stepElem === null) continue;

    const oldMessageElems = stepElem.querySelectorAll('.validity');
    for (const oldMessageElem of oldMessageElems) {
      oldMessageElem.remove();
    }

    // add new message
    if (inputElem.checkValidity() === true) continue;

    const messageElem = document.createElement('p');
    messageElem.classList.add('validity');
    if (inputElem.validity.valueMissing) {
      messageElem.textContent = 'Vul deze vraag in';
    }
    else if (inputElem.validity.tooShort) {
      messageElem.textContent = 'Deze gegevens zijn te kort. Vul de juiste gegevens in'
    }
    else if (inputElem.validity.tooLong) {
      messageElem.textContent = 'Deze gegevens zijn te lang. Vul de juiste gegevens in';
    }
    else if (inputElem.validity.patternMismatch) {
      messageElem.textContent = 'Vul de juiste gegevens in';
    }
    stepElem.appendChild(messageElem);
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

function updateRequired() {
  // make everything without [data-required] optional
  const inputElems = document.querySelectorAll('.step input');
  for (const inputElem of inputElems) {
    inputElem.required = false;
  }

  // make everything with [data-required] required
  const requiredInputElems = document.querySelectorAll('.step input[data-required]');
  for (const requiredInputElem of requiredInputElems) {
    requiredInputElem.required = true;
  }
  
  // make everything that's hidden optional
  const skippedInputElems = document.querySelectorAll('.step:not(:has(> label > :checked:not([data-skip]))) > .step input');
  for (const skippedInputElem of skippedInputElems) {
    skippedInputElem.required = false;
  }
}

function updateProgress() {
  const progressElem = document.querySelector('[data-insert="progress"]');
  if (progressElem === null) return;

  const requiredSteps = document.querySelectorAll('.step:has([required])');
  progressElem.max = requiredSteps.length;
  const validRequiredSteps = document.querySelectorAll('.step:has([required]:valid)');
  progressElem.value = validRequiredSteps.length;
}