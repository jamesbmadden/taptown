/**
 * UI handles DOM interaction
 */

const money = document.querySelector('.money');

/**
 * get properties from player worker and update it
 */
export function updateUIFromProperties (properties) {

  // update the money counter
  money.textContent = `$${properties.money}`;

}