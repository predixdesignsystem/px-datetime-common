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

import './px-datetime-shared-behavior.js';
var PxDatetimeBehavior = window.PxDatetimeBehavior = window.PxDatetimeBehavior || {};
/**
 * For all `px-{datetime}-{picker}` components.
 * Dependencies: luxon
 *
 * @polymerBehavior PxDatetimeBehavior.SingleMoment
 */

PxDatetimeBehavior.SingleMoment = [{
  properties: {
    /**
     * DateTime (Luxon) value with the date or time to display.  Will be parsed according to the moment format. (See momentFormat property.)
     * TODO: Change momentFormat to Luxon compatibile string
     */
    dateTimeObj: {
      type: Object,
      notify: true,
      value: function () {
        return null;
      }
    }
  },
  observers: ['_localeChanged(language)', '_timeZoneChanged(timeZone)'],

  /**
   * Make sure the DateTime obj pick up the possibly new locale
   */
  _localeChanged: function () {
    if (this.language !== undefined && this.dateTimeObj) {
      this.set('dateTimeObj', this.dateTimeObj.setLocale(DateTime.local().locale));
    }
  },

  /**
   * Makes sure the DateTime object reflects the right timezone.
   */
  _timeZoneChanged: function () {
    if (this.timeZone !== undefined && this.dateTimeObj) {
      var newMom = this.dateTimeObj.setZone(this.timeZone);
      this.set('dateTimeObj', newMom);
    }
  }
}, PxDatetimeBehavior.Shared];
/**
 * Adds a temp DateTime object that can be applied or used to rollback
 * Dependencies: luxon
 *
 * @polymerBehavior PxDatetimeBehavior.TempMoment
 */

PxDatetimeBehavior.TempMoment = [{
  properties: {
    /**
     * temporary DateTime object used for validation and display. This
     * object should be used by subcomponents when we want to "try"
     * a value and see the result of validation AND/OR give us the
     * ability to rollback (cancel) or apply
     */
    _tempDateTimeObj: {
      type: Object,
      notify: true
    }
  },
  observers: ['_localeChangedTemp(language)', '_timeZoneChangedTemp(timeZone)', //dateTimeObj is the source of truth and should always
  //trump temp if changed
  '_rollbackTempMoment(dateTimeObj)'],

  /**
   * Applies value of temp moment to public dateTimeObj
   */
  _applyTempMoment: function () {
    if (this.dateTimeObj === null || this._tempDateTimeObj === null || this.dateTimeObj.toISOString() !== this._tempDateTimeObj.toISOString()) {
      this.set('dateTimeObj', this._tempDateTimeObj);
    }
  },

  /**
   * Rollback value of temp moment to use public dateTimeObj
   */
  _rollbackTempMoment: function () {
    this.set('_tempDateTimeObj', this.dateTimeObj);
  },

  /**
   * Make sure the Date Time obj pick up the possibly new locale
   */
  _localeChangedTemp: function () {
    if (this.language !== undefined && this._tempDateTimeObj) {
      this.set('_tempDateTimeObj', this._tempDateTimeObj.locale(DateTime.local().locale));
    }
  },

  /**
   * Makes sure the Date Time object reflects the right timezone.
   */
  _timeZoneChangedTemp: function () {
    if (this.timeZone !== undefined && this._tempDateTimeObj) {
      var newMom = this._tempDateTimeObj.setZone(this.timeZone);

      this.set('_tempDateTimeObj', newMom);
    }
  }
}, PxDatetimeBehavior.SingleMoment];