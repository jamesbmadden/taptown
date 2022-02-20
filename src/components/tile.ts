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

  // @ts-ignore
  static styles = css([styles]);

  close () {
    // delete this element
    this.remove();
    // then in the future we have to reset the camera but for now we're good
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
            // build a road at this tile, then close
            buildings.setTile(this.x, this.z, 255);
            this.close();
          }}>Build Cafe</button>
        </div>
      </div>
    `;

  }

}