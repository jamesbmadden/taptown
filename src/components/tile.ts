import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators';

// @ts-ignore
import styles from './tile.scss?raw';

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

    return html`<div class="tile-menu"></div>`;

  }

}