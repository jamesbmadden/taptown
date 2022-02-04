import { LitElement, html, css } from 'lit';
import {customElement, property} from 'lit/decorators.js';

// @ts-ignore
import styles from './tile.scss';

console.log(styles);

/**
 * Component for info on property: building, demolishing, etc
 */
@customElement('tt-tile')
export default class TileMenu extends LitElement {

  @property() x: number;
  @property() z: number;

  // @ts-ignore
  static styles = css([styles])

  render () {

    return html`
      <!-- cover canvas prevents further interaction with the canvas until the menu is closed -->
      <div class="cover-canvas"></div>
      <div class="tile-menu">
        <img src="../icons/close.png" alt="close" class="close-button" @click=${() => {
          // delete this element
          this.remove();
          // then in the future we have to reset the camera but for now we're good
        }} />
        <h1>${this.x}, ${this.z}</h1>
      </div>
    `;

  }

}