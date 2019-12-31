import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';

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
          width: 100%;
          --dmp-multi-numeric-input-primary :  var(--primary-color, #13C1AC);
          --dmp-multi-numeric-input-secundary :  var(--accent-color, #636363);
          --dmp-multi-numeric-input-text :  var(--primary-text-color, #636363);
          --dmp-multi-numeric-input-disabled-text :  var(--disabled-text-color, #A6A6A6);
          --dmp-multi-numeric-input-error :  var(--error-color, #DE7A7A);
          --dmp-multi-numeric-input-warning :  var(--warning-color, #FFD64E);
          --dmp-multi-numeric-input-removable-space :  40px;
        }
        .row{
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
        }
        .label_side{
          width: 60%;
          display: flex;
          flex-flow: row nowrap;
        }
        .label{
          width: calc(100% - var(--dmp-multi-numeric-input-removable-space));
        }
        .value{
          width: 10%;
          min-width: 60px;
        }
        .clear{
          width: var(--dmp-multi-numeric-input-removable-space);
          margin-top: 20px;
          color: var(--dmp-multi-numeric-input-error);

        }
        .removable_space {
          width: var(--dmp-multi-numeric-input-removable-space);
          height: var(--dmp-multi-numeric-input-removable-space);
        }
        .add_container{
          text-align: center;
          margin-top: 40px;
        }
        .add{
          --paper-icon-button-ink-color: white;
          background: var(--dmp-multi-numeric-input-primary);
          border-radius: 50%;
          color: white;
          margin: 0 auto;
        }
        paper-input{
          --paper-input-container-color: var(--dmp-multi-numeric-input-disabled-text); /** linea y labels */
          --paper-input-container-focus-color: var(--dmp-multi-numeric-input-primary); /** linea y labels focused */
          --paper-input-container-invalid-color: var(--dmp-multi-numeric-input-error); /** linea error */
          --paper-input-container-input-color: var(--dmp-multi-numeric-input-text); /** texto */
          /** grosor de linea */
        }
        .error_msg {
          color: var(--dmp-multi-numeric-input-error);
        }

        .headerLeft {
          margin-left: 40px;
        }

      </style>
      
      <h2>[[title]]</h2>
      <p class="error_msg" hidden="[[!invalid]]">
        [[errorMsg]]
      </p> 
      <div class="list_container">
        <div class="header_container row">
          <div class='headerLeft'>[[headerLeft]]</div>
          <div>[[headerRight]]</div>
        </div>
        <div class="body_container">
          <template is="dom-repeat" items="{{value}}">
            <!-- <iron-icon icon="close"></iron-icon> -->
            <div class="row">
            <div class="label_side">
              <div class="removable_space">
                <paper-icon-button 
                  on-click="removeItem"
                  hidden="[[!item.removable]]"
                  icon="clear" alt="clear"
                  class="clear"
                  data-index$="[[index]]"
                  data-removable$="[[item.removable]]"
                ></paper-icon-button>
              </div>
              <paper-input readonly="[[!item.removable]]" class="label" label="[[item.label]]" value="{{item.name}}"></paper-input>
            </div>
              <paper-input  required="[[item.required]]" min="10" auto-validate invalid="{{item.invalid}}" type="number" class="value" value="{{item.value}}">
                <span slot="suffix">[[currency]]</span>
              </paper-input>
            </div>
          </template>
          <div class='add_container'>
            <paper-icon-button on-click="newItem" icon="add" alt="add" class="add"> </paper-icon-button>          
          </div>
        </div>
      </div>
    `;
  }
  static get properties() {
    return {
      /** Input/Output of component */
      value: {
        type: Array,
      },
      /** Currency of each value */
      currency: {
        type: String,
        value: "€"
      },
      /** header left label */
      headerLeft: {
        type: String,
        value: "Items"
      },
      /** header right label */
      headerRight: {
        type: String,
        value: "Value"
      },
      /** Msg error. It shows when component validate and return invalid */
      errorMsg: {
        type: String,
        value: "Please fill required fields"
      },
      /** Proverty save the validation value */
      invalid: {
        type: Boolean,
        value: false
      },
      /** This prop is a flag to validate if required fields of the component are filled */
      required: {
        type: Boolean,
        value: false
      },
      title: {
        type: String,
        value: 'Im the title'
      }
    };
  }

  newItem() {
    this.push("value", { removable: true, label: "Otras tarifas" })
  }

  removeItem(e) {
    const index = e.currentTarget.dataset.index;
    const removable = e.currentTarget.dataset.removable;
    if (removable || removable === "") {
      this.splice("value", index, 1);
    }
  }

  validate() {
    if (this.required) { // Valida que los elementos que son requeridos tengan valor
      const items = [].slice.call(this.shadowRoot.querySelectorAll("paper-input.value") || []);
      items.forEach(item => item.validate());
      const itemsInvalid = this.value.filter(item => item.invalid);
      this.invalid = itemsInvalid.length > 0 ? true : false;
    }
    return !this.invalid;
  }

  reset() {
    this.value = [];
    this.invalid = false;
  }
}

window.customElements.define('dmp-multi-numeric-input', DmpMultiNumericInput);
