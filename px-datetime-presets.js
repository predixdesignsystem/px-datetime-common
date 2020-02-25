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
The list of preset ranges in the rangepicker modal.

### Usage

    <px-datetime-presets preset-ranges="{{...}}">
    </px-datetime-presets>


@element px-datetime-presets
@homepage index.html
@demo index.html
*/

import '@polymer/polymer/polymer-legacy.js';

import { DateTime } from 'luxon';
import { AppLocalizeBehavior } from '@polymer/app-localize-behavior/app-localize-behavior.js';
import './css/px-datetime-presets-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <style include="px-datetime-presets-styles"></style>

    <div class="presetTitle zeta">[[localize('Presets')]]</div>
    <ul class="list-bare u-mt--">
      <template is="dom-repeat" items="{{presetRanges}}" as="preset">
        <li class="presetList">
          <span class\$="{{_getButtonClass(selectedItem, preset)}}" on-tap="_usePreset">{{preset.displayText}}</span>
        </li>
      </template>
    </ul>
`,

  is: 'px-datetime-presets',

  behaviors: [
    AppLocalizeBehavior
  ],

  properties: {

    /**
     * (optional)
     *
     * The preset date/time ranges to be displayed.  If not set, will have no presets displayed.
     *
     *```
     *   [
     *    {
     *      "displayText": "Last 5 Minutes",
     *      "startDateTime": "2013-02-04T22:44:30.652Z",
     *      "endDateTime": "2013-02-04T22:49:30.652Z"
     *    },
     *    {
     *      "displayText": "Last 12 Hours",
     *      "startDateTime": function() {return DateTime.local().minus({ days: 1 }).toISO();},
     *      "endDateTime": function() {return DateTime.local().toISO();}
     *    }
     *   ]
     * ```
     *
     * startDateTime and endDateTime can also be functions, in which case
     * they need to either return an ISO string as seen above or a Luxon
     * DateTime object
     *
     * @default no presets
     */
    presetRanges: {
      type: Object,
      value: function(){
        return [];
      }
    },
    /**
     */
    selectedItem: {
      type: Object,
      value: function(){
        return {};
      }
    },
    /**
     * List of key/values to be included for translating this component
     */
    resources: {
      type: Object,
      value: function() {
        return {
          'en': {
           'Presets': 'Presets'
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

  /**
   */
  _usePreset: function(e) {
    this.set('selectedItem', e.model.preset);
    this.fire('px-preset-selected', e.model.preset);
  },

  /**
   */
  _getButtonClass: function(selectedItem, presetObject){
    var classlist = ['actionable'];

    if(selectedItem === presetObject){
      classlist.push('actionable--select');
    }else {
      classlist.push('actionable--action');
    }
    return classlist.join(' ');
  }
});
