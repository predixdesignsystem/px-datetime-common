/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/**
Date time button component.

### Usage

    <px-datetime-button>
    </px-datetime-button>

@element px-datetime-buttons
@homepage index.html
@demo index.html
*/

import '@polymer/polymer/polymer-legacy.js';

import './px-datetime-behavior.js';
import './px-datetime-validate.js';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import './css/px-datetime-buttons-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="px-datetime-buttons-styles"></style>
    <div class="dt-btn-wrapper">
      <template is="dom-if" if="{{ !hideCancel }}">
        <button type="button" class="btn u-mr-" on-tap="_fireCancelEvent">[[localize('Cancel')]]</button>
      </template>
      <template is="dom-if" if="{{ !hideSubmit }}">
        <button class\$="{{submitBtnClasses('btn btn--primary', isSubmitButtonValid)}}" type="button" on-tap="_fireSubmitEvent" id="submitButton" disabled="{{!isSubmitButtonValid}}">
        <i class\$="{{submitIcon}}"></i>[[localize('Apply')]]</button>
      </template>
    </div>
`,

  is: 'px-datetime-buttons',

  behaviors: [
    PxDatetimeBehavior.Validate,
    AppLocalizeBehavior
  ],

  properties: {
    /**
     * Whether the Submit button should be valid
     */
    isSubmitButtonValid: {
      type: Boolean,
      value: true
    },
    /**
     * Hides the Submit button when true
     */
    hideSubmit:{
      type:Boolean,
      value: false
    },
     /**
      * Hides the Cancel button when true
      */
    hideCancel:{
      type:Boolean,
      value: false
    },
    /**
     * Icon to be used for the Submit button
     */
    submitIcon: {
      type: String
    },
    /**
     * If true buttons will be set to `justify-content: space-between;`
     */
    spaceBetween: {
      type: Boolean,
      value: false,
      reflectToAttribute: true
    },
    /**
     * List of key/values to be included for translating this component
     */
    resources: {
      type: Object,
      value: function() {
        return {
          'en': {
            'Cancel': 'Cancel',
            'Apply': 'Apply'
          }
        };
      }
    },
   /**
    * set a default for localizing
    */
   language: {
     type: String,
     value: 'en'
   },
   /**
    * Use the key for localization if value for  language is missing. Should
    * always be true for  our components
    */
   useKeyIfMissing: {
     type: Boolean,
     value: true
   }

  },

  observers: [
    '_submitButtonState(isSubmitButtonValid)'
  ],

  /**
   *
   */
  _fireCancelEvent:function(){
    this.fire('px-datetime-button-clicked',{ action:false });
  },

  /**
   *
   */
  _fireSubmitEvent:function(){
    this.fire('px-datetime-button-clicked',{ action:true });
  },

  /**
   *
   */
  submitBtnClasses: function(base, submitButtonValid) {
    return (submitButtonValid) ? base : base + ' btn--disabled';
  },

  /**
   *
   */
  _isEqual: function(source, target) {
    return source === target;
  }
});
