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
          /** 
          textos #636363
          textos disabled: #A6A6A6
          primary: #13C1AC 
          primary-soft: #96DDD1
          amarillos: #FFD64E;
          rojos: #DE7A7A 
          rojos-soft: #DE7A7A 
          */

          display: block;
          --dmp-multi-numeric-input-primary :  #13C1AC;
          --dmp-multi-numeric-input-secundary :  #636363;
          --dmp-multi-numeric-input-text :  #636363;
          --dmp-multi-numeric-input-disabled-text :  #A6A6A6;
          --dmp-multi-numeric-input-error :  #DE7A7A;
          --dmp-multi-numeric-input-warning :  #FFD64E;
          --dmp-multi-numeric-input-removable-space :  35px;
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
          min-width: 30px;
        }
        .clear{
          width: var(--dmp-multi-numeric-input-removable-space);
          margin-top: 20px;
          color: var(--dmp-multi-numeric-input-error)
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
          --paper-icon-button-ink-color: var(--dmp-multi-numeric-input-primary);;
          background: var(--dmp-multi-numeric-input-primary);
          border-radius: 50%;
          color: white;
          margin: 0 auto;
        }
        paper-input{
          --paper-input-container-color: var(--dmp-multi-numeric-input-disabled-text); /** linea y labels */
          --paper-input-container-focus-color: var(--dmp-multi-numeric-input-primary); /** linea y labels focused */
          --paper-input-container-invalid-color: var(--dmp-multi-numeric-input-red); /** linea error */
          --paper-input-container-input-color: var(--dmp-multi-numeric-input-text); /** texto */
          /** grosor de linea */
        }
        
      </style>
      
      <div class="list_container">
        <div class="header_container row">
          <div>[[headerLeft]]</div>
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
              <paper-input required min="10" auto-validate invalid="{{item.invalid}}" type="number" class="value" value="{{item.value}}">
                <span slot="suffix">[[currency]]</span>
              </paper-input>
            </div>
          </template>
          <div class='add_container'>
            <paper-icon-button on-click="newItem" icon="add" alt="add" class="add"> </paper-icon-button>          
          </div>
        </div>
      </div>
      <div class="error_msg" hidden="[[!invalid]]">
        [[errorMsg]]
      </div>
    `;
  }
  static get properties() {
    return {
      _initialValue: {
        type: Array,
        value: [
          {required: true, name: "30 Minutos", removable: false, label: "Tarifa 30 min"},
          {required: true, name: "1 hora", removable: false, label: "Tarifa 1 hora"},
          {required: true, name: "Toda la noche", removable: false, label: "Toda la noche"}
        ]
      },
      value: {
        type: Array,
      },
      currency: {
        type: String,
        value: "€"
      },
      headerLeft: {
        type: String,
        value: "Tarifas"
      },
      headerRight: {
        type: String,
        value: "Valor"
      },
      errorMsg: {
        type: String,
        value: "Rellene los campos requeridos"
      },
      invalid: {
        type: Boolean,
        value: false
      },
      required: {
        type: Boolean,
        value: false
      }
    };
  }

  ready(){
    super.ready();
    this.value = this._initialValue;
    // ojo cuando sea una modificacion, en el ready sobrescribira los datos
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
    if (this.required) {
      const itemsInvalid = this.value.filter(item => item.invalid);
      this.invalid = itemsInvalid.length > 0 ? true : false;
    }
    return !this.invalid;
  }

  reset() {
    this.value = this._initialValue;
  }
}

window.customElements.define('dmp-multi-numeric-input', DmpMultiNumericInput);
