document.addEventListener('DOMContentLoaded', () => {
  const skipperElems = document.querySelectorAll('[data-skip]');
  for (const skipperElem of skipperElems) {
    skipperElem.addEventListener('change', skipToElem);
  }
  const unskipperElems = document.querySelectorAll('[data-unskip]');
  for (const unskipperElem of unskipperElems) {
    unskipperElem.addEventListener('change', unskipToElem);
  }
});

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
  location.hash = '';
  hideElems[0].scrollIntoView();
  
  for (const hideElem of hideElems) {
    hideElem.classList.remove('skip');
  }
}