import { LitElement, html, css } from 'lit';
import {customElement, property} from 'lit/decorators.js';

import { ambient, buildings, people } from '../workers';

// @ts-ignore
import styles from './tile.scss';

/**
 * Component for info on property: building, demolishing, etc
 */
@customElement('tt-tile')
export default class TileMenu extends LitElement {

  @property() x: number;
  @property() z: number;
  @property() mouse: [number, number];

  @property() residents;

  // @ts-ignore
  static styles = css([styles]);

  close () {
    // trigger the close animation
    this.shadowRoot.querySelector('.tile-menu').classList.add('reverse');
    // delete this element after the animation ends
    setTimeout(() => this.remove(), 200);
    // then in the future we have to reset the camera but for now we're good
  }

  async connectedCallback() {

    super.connectedCallback();

    // set click position so popup can be by mouse on desktop
    let transformOrigin = '';

    // check what side to pop x up on
    // if its on the left, transform origin x must be set
    if (this.mouse[0] < innerWidth / 2) {
      this.style.setProperty('--mouse-x', `${this.mouse[0]}px`);
      transformOrigin = 'left ';
    }
    else {
      this.style.setProperty('--mouse-x', `${this.mouse[0] - 256}px`);
      transformOrigin = 'right ';
    }
    // check what side to pop y up on
    if (this.mouse[1] < innerHeight / 2) {
      this.style.setProperty('--mouse-y', `${this.mouse[1]}px`);
      transformOrigin += 'top';
    } else {
      this.style.setProperty('--mouse-y', `${this.mouse[1] - 386}px`);
      transformOrigin += 'bottom';
    }
    // set the transform origin
    this.style.setProperty('--transform-origin', transformOrigin);
    
    // load the residents
    this.residents = await people.getResidents(this.x, this.z);

  }

  render () {

    return html`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas"></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${this.close.bind(this)} />
        <h1>${this.x}, ${this.z}</h1>
        <div class="buttons">
          <button @click=${() => {
            // build a road at this tile, then close
            buildings.buildRoad(this.x, this.z);
            this.close();
          }}>Build Road</button>
          <button @click=${() => {
            // build a cafe at this tile, then close
            buildings.setTile(this.x, this.z, 255);
            this.close();
          }}>Build Cafe</button>
        </div>
        <div class="residents">
          <h2>Residents</h2>
          <ul>
            ${this.residents?.map(person => html`<li>${person.name[0]} ${person.name[1]}</li>`)}
          </ul>
        </div>
      </div>
    `;

  }

}