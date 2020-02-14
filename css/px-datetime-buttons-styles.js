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

$_documentContainer.innerHTML = `<dom-module id="px-datetime-buttons-styles">
<template>
<style>
@charset "UTF-8";/*! normalize.css v3.0.2 | MIT License | git.io/normalize */html{background-color:var(--px-base-background-color,#fff);font-size:15px;overflow-y:scroll;min-height:100%;box-sizing:border-box}:host,html{color:var(--px-base-text-color,#2c404c);line-height:1.33333;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased}body,figure{margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block;vertical-align:baseline}audio:not([controls]){display:none;height:0}[hidden],template{display:none}address,blockquote,dl,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,ol,p,pre,table,ul{margin-bottom:1rem}li>ol,li>ul{margin-bottom:0}dd,ol,ul{margin-left:2rem}img{max-width:100%;border:0}svg:not(:root){overflow:hidden}hr{box-sizing:content-box;height:0}pre{overflow:auto}*,:after,:before{box-sizing:inherit}:host{/*! Comment to prevent cssmin munging this rule with html above and borking Safari */box-sizing:border-box}.flex{display:flex}.inline--flex{display:inline-flex}.flex--row{flex-direction:row}.flex--row--rev{flex-direction:row-reverse}.flex--col{flex-direction:column}.flex--col--rev{flex-direction:column-reverse}.flex--nowrap{flex-wrap:nowrap}.flex--wrap{flex-wrap:wrap}.flex--wrap--rev{flex-wrap:wrap-reverse}.flex--left{justify-content:flex-start}.flex--center{justify-content:center}.flex--right{justify-content:flex-end}.flex--justify{justify-content:space-between}.flex--spaced{justify-content:space-around}.flex--top{align-items:flex-start}.flex--middle{align-items:center}.flex--bottom{align-items:flex-end}.flex--stretch{align-items:stretch}.flex--baseline{align-items:baseline}.flex--top--multi{align-content:flex-start}.flex--middle--multi{align-content:center}.flex--bottom--multi{align-content:flex-end}.flex--stretch--multi{align-content:stretch}.flex--justify--multi{align-content:space-between}.flex--spaced--multi{align-content:space-around}.flex__item{flex:1}.flex__item--msfix{flex:1 1 auto}.flex__item--top{align-self:flex-start}.flex__item--middle{-ms-grid-row-align:center;align-self:center}.flex__item--bottom{align-self:flex-end}.flex__item--baseline{align-self:baseline}.btn{display:inline-block;overflow:visible;height:var(--px-btn-height,2em);min-width:var(--px-btn-min-width,4.66667em);margin:0;border:1px solid var(--px-btn-border-color,transparent);border-radius:0!important;padding:0 calc(var(--px-btn-height,2em)/ 2);box-shadow:var(--px-btn-shadow--light,none);font:inherit;line-height:calc(var(--px-btn-height,2em) - 2px);-webkit-font-smoothing:antialiased;cursor:pointer;text-align:center;text-decoration:none;text-transform:none;white-space:nowrap;background-color:var(--px-btn-background,#d8e0e5);transition:background .4s,border-color .4s,color .4s}.u-mh-,.u-mr-{margin-right:.66667rem!important}.u-mt-,.u-mv-{margin-top:.66667rem!important}.u-mb-,.u-mv-{margin-bottom:.66667rem!important}.btn,.btn:active,.btn:hover,.btn:link,.btn:visited{color:var(--px-btn-color,#2c404c)}.btn:focus,.btn:hover{border-color:var(--px-btn-border-color--hover,transparent);box-shadow:var(--px-btn-shadow,none);background-color:var(--px-btn-background--hover,#a3b5bf)}.btn:active{border-color:var(--px-btn-border-color--pressed,transparent);box-shadow:none;background-color:var(--px-btn-background--pressed,#889aa5);outline:0}@-moz-document url-prefix(){.btn:not(button){line-height:1.8em}}button.btn{-webkit-appearance:button}.btn+.btn{margin-left:.66667rem}.u-mh-,.u-ml-{margin-left:.66667rem!important}.btn--primary{border-color:var(--px-btn-primary-border-color,transparent);box-shadow:var(--px-btn-shadow,none);background-color:var(--px-btn-primary-background,#364c59)}.btn--primary,.btn--primary:active,.btn--primary:hover,.btn--primary:link,.btn--primary:visited{color:var(--px-btn-primary-color,#fff)}.btn--primary:focus,.btn--primary:hover{border-color:transparent;background-color:var(--px-btn-primary-background--hover,#23343f)}.btn--primary:active{border-color:transparent;background-color:var(--px-btn-primary-background--pressed,#121f26)}.btn--disabled,.btn--disabled:active,.btn--disabled:focus,.btn--disabled:hover,.btn--disabled:link,.btn--disabled:visited,.btn[disabled],.btn[disabled]:active,.btn[disabled]:focus,.btn[disabled]:hover,.btn[disabled]:link,.btn[disabled]:visited{color:var(--px-btn-disabled-color,rgba(0,0,0,.2));border:1px solid;border-color:var(--px-btn-disabled-border-color,rgba(0,0,0,.2));box-shadow:none;background-color:var(--px-btn-disabled-background,transparent);pointer-events:none}.dt-btn-wrapper{display:flex}:host([space-between]) .dt-btn-wrapper{width:100%;justify-content:space-between}.u-m-{margin:.66667rem!important}
</style>
</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
;
