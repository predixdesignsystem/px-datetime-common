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

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="px-datetime-entry-cell-styles">
<template>
<style>
@charset "UTF-8";/*! normalize.css v3.0.2 | MIT License | git.io/normalize */html{background-color:var(--px-base-background-color,#fff);font-size:15px;overflow-y:scroll;min-height:100%;box-sizing:border-box}:host,html{color:var(--px-base-text-color,#2c404c);line-height:1.33333;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased}body,figure{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}address,blockquote,dl,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,ol,p,pre,table,ul{margin-bottom:1rem}li>ol,li>ul{margin-bottom:0}dd,ol,ul{margin-left:2rem}img{max-width:100%;border:0}svg:not(:root){overflow:hidden}hr{box-sizing:content-box;height:0}pre{overflow:auto}*,:after,:before{box-sizing:inherit}:host{/*! Comment to prevent cssmin munging this rule with html above and borking Safari */box-sizing:border-box;color:inherit;height:2rem;display:flex;align-items:center}.text-input--bare{text-align:right;cursor:text;color:inherit;background:0 0;margin:0;padding:0;border:0;width:0;font-family:inherit;font-size:var(--px-datetime-entry-font-size,inherit);-moz-appearance:textfield}.text-input--bare::-webkit-inner-spin-button,.text-input--bare::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}.text-input--bare:focus{background-color:var(--px-datetime-entry-selected,#87cefa);outline:0}.text-input--bare:-ms-input-placeholder{color:var(--px-datetime-text-color--placeholder,#748b99)}.text-input--bare::placeholder{color:var(--px-datetime-text-color--placeholder,#748b99)}.text-input--bare:focus:-ms-input-placeholder{color:var(--px-datetime-text-color--placeholder--focused,#748b99)}.text-input--bare:focus::placeholder{color:var(--px-datetime-text-color--placeholder--focused,#748b99)}input:invalid{color:var(--px-validation-error-text-color,red)}
</style>
</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);