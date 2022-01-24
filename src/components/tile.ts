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

    return html`<div class="tile-menu">
      <h1>${this.x}, ${this.z}</h1>
    </div>`;

  }

}