import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `dmp-multi-numeric-input`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DmpMultiNumericInput extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'dmp-multi-numeric-input',
      },
    };
  }
}

window.customElements.define('dmp-multi-numeric-input', DmpMultiNumericInput);
