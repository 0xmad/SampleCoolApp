'use strict';

export const topPosition = (elem) => {
  if (!elem) {
    return 0;
  }
  return elem.offsetTop + topPosition(elem.offsetParent);
};

export const leftPosition = (domElt) => {
  if (!domElt) {
    return 0;
  }
  return domElt.offsetLeft + leftPosition(domElt.offsetParent);
};