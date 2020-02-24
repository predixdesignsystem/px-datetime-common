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
Datetime input element. Includes iron-ally-keys-behavior to limit keystrokes to only valid characters.

### Usage

  <px-datetime-entry-cell
    id="cell{{index}}"
    class="cell"
    order='{{index}}'
    date-time-obj="[[dateTimeObj]]"
    date-time-format='[[item]]'
    time-zone="[[timeZone]]">
  </px-datetime-entry-cell>


@element px-datetime-entry-cell
@homepage index.html
@demo index.html
*/

import '@polymer/polymer/polymer-legacy.js';

import { IronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import './px-datetime-validate.js';
import './px-datetime-behavior.js';
import './css/px-datetime-entry-cell-styles.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
Polymer({
  _template: html`
    <style include="px-datetime-entry-cell-styles"></style>
    <input order="{{order}}" class="datetime-entry-input text-input--bare" on-focus="_handleFocus" on-blur="_handleBlur" on-paste="_handlePaste" on-beforepaste="_beforePaste" on-beforecopy="_beforeCopy" on-copy="_handleCopy" disabled="[[_getDisabled(dateTimeFormat)]]" type="[[_getType(_isNumber)]]" pattern\$="[[_getPattern(_isNumber)]]" placeholder="[[_placeholderText(dateTimeFormat)]]" on-keypress="_keyPress" max\$="[[_max]]" min\$="[[_min]]" step="1">
`,

  is: 'px-datetime-entry-cell',

  behaviors: [
    PxDatetimeBehavior.SingleMoment,
    PxDatetimeBehavior.Validate,
    IronA11yKeysBehavior
  ],

  properties: {
    /**
     * DateTime format tokens for the format to display/validate this field against (see https://moment.github.io/luxon/docs/manual/formatting.html#macro-tokens)
     *
     * Can only be configured statically; not data-bindable
     *
     *`example: 'YYYY'`
     *
     * @private
     */
    dateTimeFormat: {
      type: String,
      observer: '_formatChanged'
    },
    /**
     * The separator character, passed down from px-datetime-entry
     *
     * @private
     */
    symbol:{
      type:String
    },
    /**
     * Order number this cell is in px-datetime-entry, passed down from px-datetime-entry
     *
     * @private
     */
    order: {
      type: Number,
      reflectToAttribute: true
    },
    /**
    * Whether the cell is currently selected. Read-only.
    */
    isSelected: {
      type: Boolean,
      readOnly: true,
      notify: true,
      value: false
    },
    /**
     * Maximum numeric value for given field type.
     */
    _max: {
      type: Number,
      computed: '_getMax(dateTimeFormat)'
    },
    /**
     * Minimum numeric value for given field type.
     */
    _min: {
      type: Number,
      computed: '_getMin(dateTimeFormat)'
    },
    /**
     * Determine is the cell is a number
     * based off the `dateTimeFormat`
     */
    _isNumber: {
      type: Boolean,
      computed: '_computeIsNumber(dateTimeFormat)'
    },
    /**
     * Number of characters the cell is allow to be
     */
    _cellLength: {
      type: Number,
      value: 0
    }
  },

  observers:[
    '_updateInputValue(dateTimeObj, timeZone)',
    '_onResourcesUpdated(resources)'
  ],

  /**
   * Key bindings for iron-a11y-keys-behavior
   *
   * More keyBindings are added in _addGeneralKeyBindings
   *
   * @private
   */
  keyBindings: {
    'right' : '_moveFocusForward',
    'left' : '_moveFocusBack'
  },

  /**
   * On attached, set up key bindings.
   */
  attached: function(){
    this._addGeneralKeyBindings();
  },

  /**
   * Clears the input value for the cell.
   */
  clear: function() {
    this.$$('.datetime-entry-input').value = '';
  },

  /**
   * Sets the value of the cell to the current dateTime obj
   */
  setValueFromDateTime: function() {
    //if DateTime is null (or somehow undefined) => clear
    if(!this.dateTimeObj) {
      this.clear();
    } else {
      this.$$('.datetime-entry-input').value = this.dateTimeObj.setZone(this.timeZone).toLocaleString(this.dateTimeFormat);
    }
  },

  _computeIsNumber: function(dateTimeFormat) {
    return !(/^(?:a|A|MMM|MMMM|Do|ddd|dddd|Z|ZZ)$/.test(dateTimeFormat));
  },

  _getPattern: function() {
    if(this._isNumber === undefined) {
      return null;
    }
    if(this._isNumber) {
      //should help with mobile keyboard (i.e get the number keyboard rather than the phone one)
      return '[0-9]*';
    } else {
      return null;
    }
  },

  /**
   * Set the correct type of input field based on the dateTimeFormat
   */
  _getType: function() {
    if(this._isNumber === undefined) {
      return;
    }
    return this._isNumber ? 'tel' : 'text';
  },

  /**
   * Disables the input field for time zone entry cells.
   */
  _getDisabled: function(dateTimeFormat) {
    return (this.dateTimeFormat === 'Z' || this.dateTimeFormat === 'ZZ');
  },

  _formatChanged: function() {
    if(this.dateTimeFormat !== undefined) {
      this._updateInputValue();
      this._sizeInputs();

      if(this.dateTimeFormat === 'A' || this.dateTimeFormat === 'a'){
        this._cellLength = 2;
      } else if(this.dateTimeFormat !== 'Z' && this.dateTimeFormat !== 'ZZ') {
        this._cellLength = this.dateTimeFormat.length;
      } else {
        //don't prevent timezone size
        this._cellLength = -1;
      }
    }
  },

  /**
   * Size the input fields based on the value or placeholder text
   */
  _sizeInputs: function(){
    //create a dummy canvas to measure string and make size the input correctly
    var style = window.getComputedStyle(this.$$('.datetime-entry-input'), null),
        fontSize = style.getPropertyValue('font-size'),
        fontFamily = style.getPropertyValue('font-family'),
        c = document.createElement('canvas'),
        ctx=c.getContext('2d'),
        length;

    if(fontSize === "0px" || fontSize === "0" || fontSize === ""){
      setTimeout(function(){
        this._sizeInputs();
      }.bind(this),50);
      return;
    }
    ctx.font = fontSize + " " + fontFamily;
    if(this.$$('.datetime-entry-input').value) {
      length = ctx.measureText(this.$$('.datetime-entry-input').value.toUpperCase()).width + 1;
    }
    else {
      // the extra width is needed for the placeholder ONLY on Edge and Firefox
      length = ctx.measureText(this.$$('.datetime-entry-input').placeholder).width + 2;
    }
    length = Math.ceil(length);
    this.$$('.datetime-entry-input').style['width'] = length + 'px';
  },

  /**
   * Sets up regular key bindings
   */
  _addGeneralKeyBindings: function(){
    if(this.dateTimeFormat === 'A' || this.dateTimeFormat === 'a'){
      this.addOwnKeyBinding('a p','_toggleAMPM');
      this.addOwnKeyBinding('down up', '_toggleAMPM');
      this.addOwnKeyBinding('backspace del','_preventDeleteDefault');
    } else if(this.dateTimeFormat !== 'Z' && this.dateTimeFormat !== 'ZZ') {
      this.addOwnKeyBinding('down up', '_wraparound');
    }
  },

  /**
   * Sets up separator keybindings
   */
  _addSeparatorKeyBinding: function(){
    var separator = (this.symbol.trim() === '') ? 'space' : this.symbol.trim();
    this.addOwnKeyBinding(separator,'_moveFocusForward');
  },

  /**
   * If `dateTimeObj` or `timeZone` update, reflect this in the cell
   */
  _updateInputValue: function() {
    if(this.dateTimeObj !== undefined && this.timeZone !== undefined) {
      this.setValueFromDateTime();
      this._sizeInputs();
    }
  },

  /**
   * When resources is changed, update placeholder text and resize input if need.
   */
  _onResourcesUpdated: function(resources) {
    const entryInput = this.$$('.datetime-entry-input');
    const currentPlaceholderText = entryInput.placeholder;
    const nextPlaceholderText = this._placeholderText(this.dateTimeFormat);
    if (nextPlaceholderText !== currentPlaceholderText) {
      entryInput.placeholder = nextPlaceholderText;
      if (!this.dateTimeObj) {
        this._sizeInputs();
      }
    }
  },

  /**
   * Fires when 'left' key is hit
   *
   * @event px-entry-cell-move
   * @param {number} dir - Values -1
   */
  _moveFocusBack : function(){
    setTimeout(function(){
      this.fire('px-entry-cell-move', { 'dir' : -1 });
    }.bind(this),10);
  },

  /**
   * Fires when 'right' key is hit
   *
   * @event px-entry-cell-move
   * @param {number} dir - Values 1
   */
  _moveFocusForward : function(){
    setTimeout(function(){
      this.fire('px-entry-cell-move', { 'dir' : 1 });
    }.bind(this),10);
  },

  /**
  * Propagate the focus event up to entry to apply inline edit styles if applicable.
  */
  _handleFocus: function(evt) {
    if(this.dateTimeFormat !== 'Z' && this.dateTimeFormat !== 'ZZ') {
      this._setIsSelected(true);
    }
    this.fire('px-cell-focused');
  },

  /**
   * Allow the user to loop through valid cell values
   * ex If the dateTimeFormat is MM the cell value can go from 12 to 1 by hitting the up arrow
   */
  _wraparound: function(evt) {
    var key = evt.detail.combo;
        dtEntryValue = this.$$('.datetime-entry-input').value,
        currentVal = dtEntryValue ? parseInt(dtEntryValue) : (this._min - 1),
        isUpDown = false;

    if(key === 'up') {
      currentVal++;
      currentVal = currentVal > this._max ? this._min : currentVal;
      currentVal = currentVal < this._min ? this._min : currentVal;
      this.$$('.datetime-entry-input').value = currentVal;
      evt.preventDefault();
    }
    else if(key === 'down') {
      currentVal--;
      currentVal = currentVal > this._max ? this._max : currentVal;
      currentVal = currentVal < this._min ? this._max : currentVal;
      this.$$('.datetime-entry-input').value = currentVal;
      evt.preventDefault();
    }
  },

  /**
   * Checks that the value has the correct number of digits for our format
   * Autocomplete function
   */
  _checkValue: function(){
    //if our format requires two digits and we only have one, add a 0 in front
    if(this.$$('.datetime-entry-input').value && this.$$('.datetime-entry-input').value.length === 1 &&
      /^(?:MM|DD|HH|hh|kk|mm|ss|YY)$/.test(this.dateTimeFormat)){
      this.$$('.datetime-entry-input').value =  '0' + this.$$('.datetime-entry-input').value;
    }
    //if the format is YYYY or Y and the input is 2 characters then convert the input to a 4 character year representation
    else if(this.$$('.datetime-entry-input').value && this.$$('.datetime-entry-input').value.length === 2 && this.dateTimeFormat === 'YYYY'){
      var mo = Px.moment(this.$$('.datetime-entry-input').value, 'YY');
      this.$$('.datetime-entry-input').value = mo.format(this.dateTimeFormat);
    }
    else if(this.$$('.datetime-entry-input').value && this.dateTimeFormat[0] === 'S' && this.$$('.datetime-entry-input').value.length < this.dateTimeFormat.length){
      var dtNumber = parseInt(this.$$('.datetime-entry-input').value);
      dtNumber = dtNumber.toPrecision(this.dateTimeFormat.length) * Math.pow(10, (this.dateTimeFormat.length - this.$$('.datetime-entry-input').value.length));
      this.$$('.datetime-entry-input').value =  dtNumber.toString();
    }
    this._sizeInputs();
  },

  /**
   * Fires on blur
   *
   * @event px-cell-blurred
   */
  _handleBlur: function(evt) {
    var ne = dom(evt);
    this._setIsSelected(false);
    this._checkValue();
    this.fire('px-cell-blurred');
  },

  /**
   * Toggles AM & PM when up/down or A/P keys are pressed.
   */
  _toggleAMPM : function(evt){
    evt.preventDefault();
    var ne = dom(evt),
        key = evt.detail.combo;

    if(key === 'A' || key === 'a'){
      this._setAMPM('AM');
      this._moveFocusForward();

    } else if(key === 'P' || key === 'p'){
      this._setAMPM('PM');
      this._moveFocusForward();

    } else if(key === 'up' || key === 'down'){
      if(this.$$('.datetime-entry-input').value === 'AM' || this.$$('.datetime-entry-input').value === 'am'){
        this._setAMPM('PM');
      } else {
        this._setAMPM('AM');
      }
    }
  },

  /**
   * Sets the AM/PM value.
   */
  _setAMPM: function(ampm){
    //TODO: Convert from moment to DateTime
    var mo = Px.moment.tz('01:00:00 ' + ampm, 'hh:mm:ss ' + this.dateTimeFormat, this.timeZone);
    this.$$('.datetime-entry-input').value = mo.tz(this.timeZone).format(this.dateTimeFormat);
  },

  /**
  * Prevent the delete button from navigating back
  */
  _preventDeleteDefault: function(evt){
    evt.preventDefault();
    this.clear();
  },

  /**
   * If the dateTimeFormat format is not 'Z', 'ZZ', 'X', 'x', 'A' or 'a' then return the dateTimeFormat
   * Note: placeholder text supports i18n
   */
  _placeholderText: function(dateTimeFormat){
    var phText = {
      'Z': String.fromCharCode(177) + 'xx:xx',
      'ZZ': String.fromCharCode(177) + 'xxxx',
      'X': 'epoch time (s)',
      'x': 'epoch time (ms)',
      'a': 'AM',
      'A': 'AM'
    };

    let text = dateTimeFormat;

    if(phText[dateTimeFormat]){
      text = phText[dateTimeFormat];
    }
    return this.localize(text);
  },

  /**
  * Handles before copy event
  *
  * @event px-request-datetime-entry-copy
  * @param {string} dir - Values clipboardData
  */
  /**
  * Handles before copy event, used for IE instead of the copy event
  */
  _beforeCopy: function(evt) {
    //IE only
    if(!evt.clipboardData) {
      this.fire('px-request-datetime-entry-copy', window.clipboardData);
    }
  },

  /**
   * Handles before paste event, used for IE instead of the paste event
   */
  _beforePaste: function(evt) {
    //IE stores the data in window.clipboardData
    if(!evt.clipboardData) {
      this.fire('px-request-datetime-entry-paste', window.clipboardData);
    }
  },

  /**
   * Handles paste event
   */
  _handlePaste: function(evt){
    //IE stores the data in window.clipboardData and will deal with it on _beforePaste
    if(evt.clipboardData) {
      this.fire('px-request-datetime-entry-paste', evt.clipboardData);
    }
    evt.preventDefault();
  },

  /**
   * Handles copy event
   */
  _handleCopy: function(evt){
    //IE stores the data in window.clipboardData and will deal with it on _beforePaste
    if(evt.clipboardData) {
      this.fire('px-request-datetime-entry-copy', evt.clipboardData);
    }
    evt.preventDefault();
  },

  /**
   * Format strings and setting/modification strings are different (?!?!)
   * This method converts one to the other
   */
  _convertDateTimeFormat: function(){
    var dateTimeTypeConversion = {
      'Y' : 'y',  //years
      'M' : 'M',  //months
      'D' : 'd',  // days
      'H' : 'h',  //hours
      'h' : 'h',  //hours
      'k' : 'h',  //hours
      'm' : 'm',  //minutes
      's' : 's',  //seconds
      'X' : 's',  //seconds
      'S' : 'ms', //milliseconds
      'x' : 'ms'  //milliseconds
    };
    // take the first char of the DateTime format and convert it to the other format
    return dateTimeTypeConversion[this.dateTimeFormat[0]]
  },

  /**
   * Set the max value a token can be
   */
  _getMax: function(dateTimeFormat) {
    if( /^(?:M|MM|h|hh)$/.test(dateTimeFormat) ) {
      return 12;
    }
    if( /^(?:D|DD)$/.test(dateTimeFormat) ) {
      return 31;
    }
    if( /^(?:H|HH)$/.test(dateTimeFormat) ) {
      return 23;
    }
    if( /^(?:k|kk)$/.test(dateTimeFormat) ) {
      return 24;
    }
    if( /^(?:m|mm|ss|s)$/.test(dateTimeFormat) ) {
      return 59;
    }
    if(dateTimeFormat === "S") {
      return 9;
    }
    if(dateTimeFormat === "SS") {
      return 99;
    }
    if(dateTimeFormat === "SSS") {
      return 999;
    }
    if(dateTimeFormat === "YY") {
      return 99;
    }
    if(dateTimeFormat === "YYYY") {
      return 9999;
    }
    return '';
  },

  /**
   * Set the min value a token can be
   */
  _getMin: function(dateTimeFormat) {
    if( /^(?:YY|YYYY|X|x|H|HH|m|mm|s|ss|S|SS|SSS)$/.test(dateTimeFormat) ) {
      return 0;
    }
    if( /^(?:M|MM|D|DD|h|hh|k|kk)$/.test(dateTimeFormat) ) {
      return 1;
    }
    return '';
  },

  _keyPress: function(evt) {

    if(evt.key !== 'Backspace' && evt.key !== 'Delete' && evt.key !== 'Cut' && evt.key !== 'Copy' && evt.key !== 'ArrowLeft' && evt.key !== 'ArrowRight') {

      //AM PM, only accept A and P
      if((this.dateTimeFormat === 'A' || this.dateTimeFormat === 'a') && !/[aApP]/.test(evt.key)) {
        evt.preventDefault();
        return;
      }

      //ensure for numbers we only accept digits
      if(this._isNumber && !/[0-9]/.test(evt.key)) {
        evt.preventDefault();
        return;
      }

      //already at full length, delete current value and let this new value be applied
      if(this._cellLength !== -1 && this.$$('.datetime-entry-input').value.length === this._cellLength) {
        this.$$('.datetime-entry-input').value = '';
        this._addSeparatorKeyBinding();
      }

      // if it is full, we're done with this cell, go to the next
      if(this.$$('.datetime-entry-input').value.length === this._cellLength - 1) {
        this._moveFocusForward();
      }
    }
  }
});
