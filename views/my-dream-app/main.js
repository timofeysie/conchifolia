(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./pages/detail/detail.module": [
		"./src/app/pages/detail/detail.module.ts",
		"pages-detail-detail-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error('Cannot find module "' + req + '".');
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return __webpack_require__.e(ids[1]).then(function() {
		var module = __webpack_require__(ids[0]);
		return module;
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [
    { path: 'detail/:id/:listLanguage', loadChildren: './pages/detail/detail.module#DetailPageModule' },
    { path: 'detail/:id/:listLanguage/:title', loadChildren: './pages/detail/detail.module#DetailPageModule' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes, { scrollPositionRestoration: 'enabled' })],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mw-cite-backlink,.cite-accessibility-label {\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    user-select: none\n}\n\n.mw-references-columns {\n    -webkit-column-width: 30em;\n    column-width: 30em\n}\n\n.mw-references-columns li {\n    -webkit-column-break-inside: avoid;\n    page-break-inside: avoid;\n    break-inside: avoid-column\n}\n\nsup.reference {\n    unicode-bidi: -webkit-isolate;\n    unicode-bidi: isolate;\n    white-space: nowrap\n}\n\nol.references li:target,sup.reference:target {\n    background-color: #eaf3ff\n}\n\n.mw-ext-cite-error {\n    font-weight: bold;\n    unicode-bidi: embed\n}\n\n.mw-cite-dir-ltr .reference-text {\n    direction: ltr;\n    unicode-bidi: embed\n}\n\n.mw-cite-dir-rtl .reference-text {\n    direction: rtl;\n    unicode-bidi: embed\n}\n\n@media print {\n    .mw-cite-backlink {\n        display: none\n    }\n}\n\n#p-lang .uls-settings-trigger {\n    background: transparent no-repeat center top;\n    background-image: url(/w/extensions/UniversalLanguageSelector/resources/images/cog-sprite.png?30312);\n    background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 width=%2214%22 height=%2232%22%3E %3Cdefs%3E %3Cpath id=%22a%22 d=%22M14 9.3V6.73l-1.575-.264a4.947 4.947 0 0 0-.496-1.2l.93-1.285-1.81-1.84-1.31.908c-.38-.205-.79-.38-1.196-.497L8.284 1H5.716l-.263 1.578a5.489 5.489 0 0 0-1.196.497L2.975 2.17 1.137 3.98l.934 1.287c-.2.38-.376.79-.493 1.228L0 6.73V9.3l1.575.264c.117.438.292.818.496 1.198l-.93 1.315L2.95 13.89l1.312-.938c.38.205.787.38 1.224.497L5.746 15h2.566l.263-1.578a6.13 6.13 0 0 0 1.196-.497l1.315.935 1.81-1.812-.935-1.315c.203-.38.38-.76.495-1.2L14 9.303zm-7 1.404c-1.488 0-2.683-1.2-2.683-2.69S5.542 5.327 7 5.327a2.698 2.698 0 0 1 2.683 2.69A2.678 2.678 0 0 1 7 10.705z%22/%3E %3C/defs%3E %3Cuse fill=%22%2372777d%22 xlink:href=%22%23a%22/%3E %3Cuse fill=%22%2354595d%22 transform=%22translate%280 16%29%22 xlink:href=%22%23a%22/%3E %3C/svg%3E\");\n    border: 0;\n    min-height: 16px;\n    min-width: 16px;\n    float: right;\n    cursor: pointer\n}\n\n#p-lang .uls-settings-trigger::-moz-focus-inner {\n    border: 0\n}\n\n#p-lang .uls-settings-trigger:focus {\n    outline: 1px solid #36c\n}\n\n.skin-vector #p-lang .uls-settings-trigger {\n    margin-top: 3px\n}\n\n#p-lang .uls-settings-trigger:hover {\n    background-position: center -16px\n}\n\n.client-nojs #ca-ve-edit,.client-nojs .mw-editsection-divider,.client-nojs .mw-editsection-visualeditor,.ve-not-available #ca-ve-edit,.ve-not-available .mw-editsection-divider,.ve-not-available .mw-editsection-visualeditor {\n    display: none\n}\n\n.client-js .mw-content-ltr .mw-editsection-bracket:first-of-type,.client-js .mw-content-rtl .mw-editsection-bracket:not(:first-of-type) {\n    margin-right: 0.25em;\n    color: #54595d\n}\n\n.client-js .mw-content-rtl .mw-editsection-bracket:first-of-type,.client-js .mw-content-ltr .mw-editsection-bracket:not(:first-of-type) {\n    margin-left: 0.25em;\n    color: #54595d\n}\n\n.badge-goodarticle,.badge-goodlist,.badge-recommendedarticle {\n    list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAANCAIAAAD0YtNRAAAABnRSTlMAAAAAAABupgeRAAAAVklEQVR4AWIYSFBfX49TDtDWNBgAEMPAgZ+1B8jWtd0kp/u+z4AQImDh7SPnHCHkHtb7vmES5hFGCN3zQgh1deAegVW6YjlGa50NOgAAxpjWhjpMQuEBjxA1QR08A1oAAAAASUVORK5CYII=);\n    list-style-image: url(/w/extensions/WikimediaBadges/resources/images/badge-silver-star.png?70a8c)\n}\n\n.badge-featuredarticle,.badge-featuredportal,.badge-featuredlist {\n    list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAANCAIAAAD0YtNRAAAABnRSTlMA/AD+APzoM1ogAAAAWklEQVR4AWP48+8PLkR7uUdzcMvtU8EhdykHKAciEXL3pvw5FQIURaBDJkARoDhY3zEXiCgCHbNBmAlUiyaBkENoxZSDWnOtBmoAQu7TnT+3WuDOA7KBIkAGAGwiNeqjusp/AAAAAElFTkSuQmCC);\n    list-style-image: url(/w/extensions/WikimediaBadges/resources/images/badge-golden-star.png?ed948)\n}\n\n.badge-problematic {\n    list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAWUlEQVR4AWMYLGDz5v9y69f/X7thw//XULxu48b/KnBJoMA7IP6PjKFisgxQnf9x4NUMQOITHgUfQAo+41HwEWTFBnxWgBypgcORb0GORPfmJ5CxQLwGJgkA1li/0fHRlXsAAAAASUVORK5CYII=);\n    list-style-image: url(/w/extensions/WikimediaBadges/resources/images/badge-problematic.png?f3177)\n}\n\n.badge-proofread {\n    list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAYElEQVR4AWMYLOD/szS5/8/T1/5/kf4aitf9f5WlgpB8mf4OKPgfGYPFnmbJMoB0wgUxFa1mADI+gTg48AeQgs94FHwEKdiA34pnaRowR6LhtyBHonvzE8jY/8/T1sAkAfA0u7wNTQyVAAAAAElFTkSuQmCC);\n    list-style-image: url(/w/extensions/WikimediaBadges/resources/images/badge-proofread.png?e81f9)\n}\n\n.badge-validated {\n    list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAAW0lEQVR4AWMYLGDi/4lyE/5PWAvEr6F4Xd//PhVkyXdAjA7f9f7vlWWA6MQOgZpXgxR8wqPgA0jBZyDGBT8y9P/v34DXisn/J2vgcORbkCPRvfkJZCwQr4FJAgAYMLC53pOcnQAAAABJRU5ErkJggg==);\n    list-style-image: url(/w/extensions/WikimediaBadges/resources/images/badge-validated.png?6232c)\n}\n\n.badge-digitaldocument {\n    list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAMCAYAAABfnvydAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABLSURBVBjTY/j//z8DPsxAJwV79+6V37Vr1/Ldu3c/A2EQGyQGVgBiAAU/APF/NPwBJMcA1fkfGwbJMUCN/Y8DPyOsgKAVBB1JyJsAxwIgOIvhJQMAAAAASUVORK5CYII=);\n    list-style-image: url(/w/extensions/WikimediaBadges/resources/images/badge-digitaldocument.png?d1c50)\n}\n\n@media print {\n    .noprint,.catlinks,.magnify,.mw-cite-backlink,.mw-editsection,.mw-editsection-like,.mw-hidden-catlinks,.mw-indicators,.mw-redirectedfrom,.patrollink,.usermessage,#column-one,#footer-places,#mw-navigation,#siteNotice,#f-poweredbyico,#f-copyrightico,li#about,li#disclaimer,li#mobileview,li#privacy {\n        display: none\n    }\n\n    body {\n        background: #fff;\n        color: #000;\n        margin: 0;\n        padding: 0\n    }\n\n    a {\n        background: none !important;\n        padding: 0 !important\n    }\n\n    a,a.external,a.new,a.stub {\n        color: #000 !important;\n        text-decoration: none !important;\n        color: inherit !important;\n        text-decoration: inherit !important\n    }\n\n    .mw-parser-output a.external.text:after,.mw-parser-output a.external.autonumber:after {\n        content: ' (' attr(href) ')';\n        word-break: break-all;\n        word-wrap: break-word\n    }\n\n    .mw-parser-output a.external.text[href^='//']:after,.mw-parser-output a.external.autonumber[href^='//']:after {\n        content: ' (https:' attr(href) ')'\n    }\n\n    dt {\n        font-weight: bold\n    }\n\n    h1,h2,h3,h4,h5,h6 {\n        font-weight: bold;\n        page-break-after: avoid;\n        page-break-before: avoid\n    }\n\n    p {\n        margin: 1em 0;\n        line-height: 1.2;\n        orphans: 3;\n        widows: 3\n    }\n\n    img,figure,.wikitable,.thumb {\n        page-break-inside: avoid\n    }\n\n    img {\n        border: 0;\n        vertical-align: middle\n    }\n\n    pre,.mw-code {\n        background: #fff;\n        color: #000;\n        border: 1pt dashed #000;\n        padding: 1em 0;\n        font-size: 8pt;\n        white-space: pre-wrap;\n        word-wrap: break-word\n    }\n\n    sup,sub {\n        line-height: 1\n    }\n\n    ul {\n        list-style-type: square\n    }\n\n    #globalWrapper {\n        width: 100% !important;\n        min-width: 0 !important\n    }\n\n    .mw-body {\n        background: #fff;\n        color: #000;\n        border: 0 !important;\n        padding: 0 !important;\n        margin: 0 !important;\n        direction: ltr\n    }\n\n    #column-content {\n        margin: 0 !important\n    }\n\n    #column-content .mw-body {\n        padding: 1em;\n        margin: 0 !important\n    }\n\n    .toc {\n        background-color: #f9f9f9;\n        border: 1pt solid #aaa;\n        padding: 5px;\n        display: table\n    }\n\n    .tocnumber,.toctext {\n        display: table-cell\n    }\n\n    .tocnumber {\n        padding-left: 0;\n        padding-right: 0.5em\n    }\n\n    .mw-content-ltr .tocnumber {\n        padding-left: 0;\n        padding-right: 0.5em\n    }\n\n    .mw-content-rtl .tocnumber {\n        padding-left: 0.5em;\n        padding-right: 0\n    }\n\n    table.floatright,div.floatright,div.tright {\n        float: right;\n        clear: right;\n        position: relative\n    }\n\n    table.floatleft,div.floatleft,div.tleft {\n        float: left;\n        clear: left;\n        position: relative\n    }\n\n    div.tleft {\n        margin: 0.5em 1.4em 1.3em 0\n    }\n\n    div.tright {\n        margin: 0.5em 0 1.3em 1.4em\n    }\n\n    table.floatright,div.floatright {\n        margin: 0 0 0.5em 0.5em;\n        border: 0\n    }\n\n    table.floatleft,div.floatleft {\n        margin: 0 0.5em 0.5em 0;\n        border: 0\n    }\n\n    div.floatleft p,div.floatright p {\n        font-style: italic\n    }\n\n    .center {\n        text-align: center\n    }\n\n    div.thumb {\n        background-color: transparent;\n        width: auto\n    }\n\n    div.thumb a {\n        border-bottom: 0\n    }\n\n    div.thumbinner {\n        background-color: #fff;\n        border: 0;\n        border-radius: 2px;\n        padding: 5px;\n        font-size: 10pt;\n        color: #666;\n        text-align: center;\n        overflow: hidden;\n        min-width: 100px\n    }\n\n    html .thumbcaption {\n        text-align: left;\n        line-height: 1.4;\n        padding: 3px\n    }\n\n    img.thumbborder {\n        border: 1pt solid #ddd\n    }\n\n    table.wikitable,.mw_metadata {\n        background: #fff;\n        margin: 1em 0;\n        border: 1pt solid #aaa;\n        border-collapse: collapse;\n        font-size: 10pt\n    }\n\n    table.wikitable > caption,.mw_metadata caption {\n        padding: 5px;\n        font-size: 10pt\n    }\n\n    table.wikitable > tr > th,table.wikitable > tr > td,table.wikitable > * > tr > th,table.wikitable > * > tr > td,.mw_metadata th,.mw_metadata td {\n        background: #fff !important;\n        color: #000 !important;\n        border: 1pt solid #aaa;\n        padding: 0.4em 0.6em\n    }\n\n    table.wikitable > tr > th,table.wikitable > * > tr > th,.mw_metadata th {\n        text-align: center\n    }\n\n    table.listing,table.listing td {\n        border: 1pt solid #000;\n        border-collapse: collapse\n    }\n\n    .catlinks ul {\n        display: inline;\n        padding: 0;\n        list-style: none none\n    }\n\n    .catlinks li {\n        display: inline-block;\n        line-height: 1.15;\n        margin: 0.1em 0;\n        border-left: 1pt solid #aaa;\n        padding: 0 0.4em\n    }\n\n    .catlinks li:first-child {\n        border-left: 0;\n        padding-left: 0.2em\n    }\n\n    .printfooter {\n        padding: 1em 0\n    }\n\n    #footer {\n        background: #fff;\n        color: #000;\n        margin-top: 1em;\n        border-top: 1pt solid #aaa;\n        padding-top: 5px;\n        direction: ltr\n    }\n}\n\n@media screen {\n    .mw-content-ltr {\n        direction: ltr\n    }\n\n    .mw-content-rtl {\n        direction: rtl\n    }\n\n    .sitedir-ltr textarea,.sitedir-ltr input {\n        direction: ltr\n    }\n\n    .sitedir-rtl textarea,.sitedir-rtl input {\n        direction: rtl\n    }\n\n    .mw-userlink {\n        unicode-bidi: embed\n    }\n\n    mark {\n        background-color: #ff0;\n        color: #000\n    }\n\n    wbr {\n        display: inline-block\n    }\n\n    input[type='submit'],input[type='button'],input[type='reset'],input[type='file'] {\n        direction: ltr\n    }\n\n    textarea[dir='ltr'],input[dir='ltr'] {\n        direction: ltr\n    }\n\n    textarea[dir='rtl'],input[dir='rtl'] {\n        direction: rtl\n    }\n\n    abbr[title],.explain[title] {\n        border-bottom: 1px dotted;\n        cursor: help\n    }\n\n    @supports ((-webkit-text-decoration: underline dotted) or (text-decoration: underline dotted)) {\n        abbr[title],.explain[title] {\n            border-bottom:0;\n            -webkit-text-decoration: underline dotted;\n                    text-decoration: underline dotted\n        }\n    }\n\n    span.comment {\n        font-style: italic;\n        unicode-bidi: -webkit-isolate;\n        unicode-bidi: isolate\n    }\n\n    #editform,#toolbar,#wpTextbox1 {\n        clear: both\n    }\n\n    #toolbar {\n        height: 22px\n    }\n\n    .mw-underline-always a {\n        text-decoration: underline\n    }\n\n    .mw-underline-never a {\n        text-decoration: none\n    }\n\n    li span.deleted,span.history-deleted {\n        text-decoration: line-through;\n        color: #72777d;\n        font-style: italic\n    }\n\n    .not-patrolled {\n        background-color: #ffa\n    }\n\n    .unpatrolled {\n        font-weight: bold;\n        color: #d33\n    }\n\n    div.patrollink {\n        font-size: 75%;\n        text-align: right\n    }\n\n    td.mw-label {\n        text-align: right;\n        vertical-align: middle\n    }\n\n    td.mw-input {\n        text-align: left\n    }\n\n    td.mw-submit {\n        text-align: left;\n        white-space: nowrap\n    }\n\n    .mw-input-with-label {\n        white-space: nowrap;\n        display: inline-block\n    }\n\n    .mw-content-ltr .thumbcaption {\n        text-align: left\n    }\n\n    .mw-content-ltr .magnify {\n        float: right\n    }\n\n    .mw-content-rtl .thumbcaption {\n        text-align: right\n    }\n\n    .mw-content-rtl .magnify {\n        float: left\n    }\n\n    #catlinks {\n        text-align: left\n    }\n\n    .catlinks ul {\n        display: inline;\n        margin: 0;\n        padding: 0;\n        list-style: none;\n        list-style-type: none;\n        list-style-image: none;\n        vertical-align: middle \n    }\n\n    .catlinks li {\n        display: inline-block;\n        line-height: 1.25em;\n        border-left: 1px solid #a2a9b1;\n        margin: 0.125em 0;\n        padding: 0 0.5em;\n        zoom:1;display: inline \n    }\n\n    .catlinks li:first-child {\n        padding-left: 0.25em;\n        border-left: 0\n    }\n\n    .catlinks li a.mw-redirect {\n        font-style: italic\n    }\n\n    .mw-hidden-cats-hidden {\n        display: none\n    }\n\n    .catlinks-allhidden {\n        display: none\n    }\n\n    p.mw-protect-editreasons,p.mw-filedelete-editreasons,p.mw-delete-editreasons {\n        font-size: 90%;\n        text-align: right\n    }\n\n    .autocomment {\n        color: #72777d\n    }\n\n    .newpage,.minoredit,.botedit {\n        font-weight: bold\n    }\n\n    div.mw-warning-with-logexcerpt {\n        padding: 3px;\n        margin-bottom: 3px;\n        border: 2px solid #2a4b8d;\n        clear: both\n    }\n\n    div.mw-warning-with-logexcerpt ul li {\n        font-size: 90%\n    }\n\n    span.mw-revdelundel-link,strong.mw-revdelundel-link {\n        font-size: 90%\n    }\n\n    span.mw-revdelundel-hidden,input.mw-revdelundel-hidden {\n        visibility: hidden\n    }\n\n    td.mw-revdel-checkbox,th.mw-revdel-checkbox {\n        padding-right: 10px;\n        text-align: center\n    }\n\n    a.new {\n        color: #ba0000\n    }\n\n    .plainlinks a.external {\n        background: none !important;\n        padding: 0 !important\n    }\n\n    .rtl a.external.free,.rtl a.external.autonumber {\n        direction: ltr;\n        unicode-bidi: embed\n    }\n\n    table.wikitable {\n        background-color: #f8f9fa;\n        color: #222;\n        margin: 1em 0;\n        border: 1px solid #a2a9b1;\n        border-collapse: collapse\n    }\n\n    table.wikitable > tr > th,table.wikitable > tr > td,table.wikitable > * > tr > th,table.wikitable > * > tr > td {\n        border: 1px solid #a2a9b1;\n        padding: 0.2em 0.4em\n    }\n\n    table.wikitable > tr > th,table.wikitable > * > tr > th {\n        background-color: #eaecf0;\n        text-align: center\n    }\n\n    table.wikitable > caption {\n        font-weight: bold\n    }\n\n    .error,.warning,.success {\n        font-size: larger\n    }\n\n    .error {\n        color: #d33\n    }\n\n    .warning {\n        color: #705000\n    }\n\n    .success {\n        color: #009000\n    }\n\n    .errorbox,.warningbox,.successbox {\n        border: 1px solid;\n        padding: 0.5em 1em;\n        margin-bottom: 1em;\n        display: inline-block;\n        zoom:1;*display: inline\n    }\n\n    .errorbox h2,.warningbox h2,.successbox h2 {\n        font-size: 1em;\n        color: inherit;\n        font-weight: bold;\n        display: inline;\n        margin: 0 0.5em 0 0;\n        border: 0\n    }\n\n    .errorbox {\n        color: #d33;\n        border-color: #fac5c5;\n        background-color: #fae3e3\n    }\n\n    .warningbox {\n        color: #705000;\n        border-color: #fde29b;\n        background-color: #fdf1d1\n    }\n\n    .successbox {\n        color: #008000;\n        border-color: #b7fdb5;\n        background-color: #e1fddf\n    }\n\n    .mw-infobox {\n        border: 2px solid #ff7f00;\n        margin: 0.5em;\n        clear: left;\n        overflow: hidden\n    }\n\n    .mw-infobox-left {\n        margin: 7px;\n        float: left;\n        width: 35px\n    }\n\n    .mw-infobox-right {\n        margin: 0.5em 0.5em 0.5em 49px\n    }\n\n    .previewnote {\n        color: #d33;\n        margin-bottom: 1em\n    }\n\n    .previewnote p {\n        text-indent: 3em;\n        margin: 0.8em 0\n    }\n\n    .visualClear {\n        clear: both\n    }\n\n    .mw-datatable {\n        border-collapse: collapse\n    }\n\n    .mw-datatable,.mw-datatable td,.mw-datatable th {\n        border: 1px solid #a2a9b1;\n        padding: 0 0.15em 0 0.15em\n    }\n\n    .mw-datatable th {\n        background-color: #ddf\n    }\n\n    .mw-datatable td {\n        background-color: #fff\n    }\n\n    .mw-datatable tr:hover td {\n        background-color: #eaf3ff\n    }\n\n    .mw-content-ltr ul,.mw-content-rtl .mw-content-ltr ul {\n        margin: 0.3em 0 0 1.6em;\n        padding: 0\n    }\n\n    .mw-content-rtl ul,.mw-content-ltr .mw-content-rtl ul {\n        margin: 0.3em 1.6em 0 0;\n        padding: 0\n    }\n\n    .mw-content-ltr ol,.mw-content-rtl .mw-content-ltr ol {\n        margin: 0.3em 0 0 3.2em;\n        padding: 0\n    }\n\n    .mw-content-rtl ol,.mw-content-ltr .mw-content-rtl ol {\n        margin: 0.3em 3.2em 0 0;\n        padding: 0\n    }\n\n    .mw-content-ltr dd,.mw-content-rtl .mw-content-ltr dd {\n        margin-left: 1.6em;\n        margin-right: 0\n    }\n\n    .mw-content-rtl dd,.mw-content-ltr .mw-content-rtl dd {\n        margin-right: 1.6em;\n        margin-left: 0\n    }\n\n    .mw-ajax-loader {\n        background-image: url(/w/resources/src/mediawiki.legacy/images/ajax-loader.gif?57f34);\n        background-position: center center;\n        background-repeat: no-repeat;\n        padding: 16px;\n        position: relative;\n        top: -16px\n    }\n\n    .mw-small-spinner {\n        padding: 10px !important;\n        margin-right: 0.6em;\n        background-image: url(/w/resources/src/mediawiki.legacy/images/spinner.gif?ca65b);\n        background-position: center center;\n        background-repeat: no-repeat\n    }\n\n    h1:lang(anp),h1:lang(as),h1:lang(bh),h1:lang(bho),h1:lang(bn),h1:lang(gu),h1:lang(hi),h1:lang(kn),h1:lang(ks),h1:lang(ml),h1:lang(mr),h1:lang(my),h1:lang(mai),h1:lang(ne),h1:lang(new),h1:lang(or),h1:lang(pa),h1:lang(pi),h1:lang(sa),h1:lang(ta),h1:lang(te) {\n        line-height: 1.6em !important\n    }\n\n    h2:lang(anp),h3:lang(anp),h4:lang(anp),h5:lang(anp),h6:lang(anp),h2:lang(as),h3:lang(as),h4:lang(as),h5:lang(as),h6:lang(as),h2:lang(bho),h3:lang(bho),h4:lang(bho),h5:lang(bho),h6:lang(bho),h2:lang(bh),h3:lang(bh),h4:lang(bh),h5:lang(bh),h6:lang(bh),h2:lang(bn),h3:lang(bn),h4:lang(bn),h5:lang(bn),h6:lang(bn),h2:lang(gu),h3:lang(gu),h4:lang(gu),h5:lang(gu),h6:lang(gu),h2:lang(hi),h3:lang(hi),h4:lang(hi),h5:lang(hi),h6:lang(hi),h2:lang(kn),h3:lang(kn),h4:lang(kn),h5:lang(kn),h6:lang(kn),h2:lang(ks),h3:lang(ks),h4:lang(ks),h5:lang(ks),h6:lang(ks),h2:lang(ml),h3:lang(ml),h4:lang(ml),h5:lang(ml),h6:lang(ml),h2:lang(mr),h3:lang(mr),h4:lang(mr),h5:lang(mr),h6:lang(mr),h2:lang(my),h3:lang(my),h4:lang(my),h5:lang(my),h6:lang(my),h2:lang(mai),h3:lang(mai),h4:lang(mai),h5:lang(mai),h6:lang(mai),h2:lang(ne),h3:lang(ne),h4:lang(ne),h5:lang(ne),h6:lang(ne),h2:lang(new),h3:lang(new),h4:lang(new),h5:lang(new),h6:lang(new),h2:lang(or),h3:lang(or),h4:lang(or),h5:lang(or),h6:lang(or),h2:lang(pa),h3:lang(pa),h4:lang(pa),h5:lang(pa),h6:lang(pa),h2:lang(pi),h3:lang(pi),h4:lang(pi),h5:lang(pi),h6:lang(pi),h2:lang(sa),h3:lang(sa),h4:lang(sa),h5:lang(sa),h6:lang(sa),h2:lang(ta),h3:lang(ta),h4:lang(ta),h5:lang(ta),h6:lang(ta),h2:lang(te),h3:lang(te),h4:lang(te),h5:lang(te),h6:lang(te) {\n        line-height: 1.2em\n    }\n\n    ol:lang(azb) li,ol:lang(bcc) li,ol:lang(bgn) li,ol:lang(bqi) li,ol:lang(fa) li,ol:lang(glk) li,ol:lang(kk-arab) li,ol:lang(lrc) li,ol:lang(luz) li,ol:lang(mzn) li {\n        list-style-type: -moz-persian;\n        list-style-type: persian\n    }\n\n    ol:lang(ckb) li,ol:lang(sdh) li {\n        list-style-type: -moz-arabic-indic;\n        list-style-type: arabic-indic\n    }\n\n    ol:lang(hi) li,ol:lang(mai) li,ol:lang(mr) li,ol:lang(ne) li {\n        list-style-type: -moz-devanagari;\n        list-style-type: devanagari\n    }\n\n    ol:lang(as) li,ol:lang(bn) li {\n        list-style-type: -moz-bengali;\n        list-style-type: bengali\n    }\n\n    ol:lang(or) li {\n        list-style-type: -moz-oriya;\n        list-style-type: oriya\n    }\n\n    .toc ul {\n        margin: 0.3em 0\n    }\n\n    .mw-content-ltr .toc ul,.mw-content-rtl .mw-content-ltr .toc ul {\n        text-align: left\n    }\n\n    .mw-content-rtl .toc ul,.mw-content-ltr .mw-content-rtl .toc ul {\n        text-align: right\n    }\n\n    .mw-content-ltr .toc ul ul,.mw-content-rtl .mw-content-ltr .toc ul ul {\n        margin: 0 0 0 2em\n    }\n\n    .mw-content-rtl .toc ul ul,.mw-content-ltr .mw-content-rtl .toc ul ul {\n        margin: 0 2em 0 0\n    }\n\n    .toc .toctitle {\n        direction: ltr\n    }\n\n    #mw-clearyourcache,#mw-sitecsspreview,#mw-sitejspreview,#mw-usercsspreview,#mw-userjspreview {\n        direction: ltr;\n        unicode-bidi: embed\n    }\n\n    #mw-revision-info,#mw-revision-info-current,#mw-revision-nav {\n        direction: ltr\n    }\n\n    div.tright,div.floatright,table.floatright {\n        clear: right;\n        float: right\n    }\n\n    div.tleft,div.floatleft,table.floatleft {\n        float: left;\n        clear: left\n    }\n\n    div.floatright,table.floatright,div.floatleft,table.floatleft {\n        position: relative\n    }\n\n    #mw-credits a {\n        unicode-bidi: embed\n    }\n\n    .printfooter {\n        display: none\n    }\n\n    .xdebug-error {\n        position: absolute;\n        z-index: 99\n    }\n\n    .mw-editsection {\n        -moz-user-select: none;\n        -webkit-user-select: none;\n        -ms-user-select: none;\n        user-select: none\n    }\n\n    .mw-editsection,.mw-editsection-like {\n        font-size: small;\n        font-weight: normal;\n        margin-left: 1em;\n        vertical-align: baseline;\n        line-height: 1em\n    }\n\n    .mw-content-ltr .mw-editsection,.mw-content-rtl .mw-content-ltr .mw-editsection {\n        margin-left: 1em\n    }\n\n    .mw-content-rtl .mw-editsection,.mw-content-ltr .mw-content-rtl .mw-editsection {\n        margin-right: 1em\n    }\n\n    sup,sub {\n        line-height: 1\n    }\n}\n\n@media screen {\n    a {\n        text-decoration: none;\n        color: #0645ad;\n        background: none\n    }\n\n    a:not([href]) {\n        cursor: pointer\n    }\n\n    a:visited {\n        color: #0b0080\n    }\n\n    a:active {\n        color: #faa700\n    }\n\n    a:hover,a:focus {\n        text-decoration: underline\n    }\n\n    a:lang(ar),a:lang(kk-arab),a:lang(mzn),a:lang(ps),a:lang(ur) {\n        text-decoration: none\n    }\n\n    a.stub {\n        color: #723\n    }\n\n    a.new,#p-personal a.new {\n        color: #ba0000\n    }\n\n    a.mw-selflink {\n        color: inherit;\n        font-weight: bold;\n        text-decoration: inherit\n    }\n\n    a.mw-selflink:hover {\n        cursor: inherit;\n        text-decoration: inherit\n    }\n\n    a.mw-selflink:active,a.mw-selflink:visited {\n        color: inherit\n    }\n\n    a.new:visited,#p-personal a.new:visited {\n        color: #a55858\n    }\n\n    .mw-parser-output a.extiw,.mw-parser-output a.extiw:active {\n        color: #36b\n    }\n\n    .mw-parser-output a.extiw:visited {\n        color: #636\n    }\n\n    .mw-parser-output a.extiw:active {\n        color: #b63\n    }\n\n    .mw-parser-output a.external {\n        color: #36b\n    }\n\n    .mw-parser-output a.external:visited {\n        color: #636\n    }\n\n    .mw-parser-output a.external:active {\n        color: #b63\n    }\n\n    .mw-parser-output a.external.free {\n        word-wrap: break-word\n    }\n\n    img {\n        border: 0;\n        vertical-align: middle\n    }\n\n    hr {\n        height: 1px;\n        color: #a2a9b1;\n        background-color: #a2a9b1;\n        border: 0;\n        margin: 0.2em 0\n    }\n\n    h1,h2,h3,h4,h5,h6 {\n        color: #000;\n        background: none;\n        font-weight: normal;\n        margin: 0;\n        overflow: hidden;\n        padding-top: 0.5em;\n        padding-bottom: 0.17em;\n        border-bottom: 1px solid #a2a9b1\n    }\n\n    h1 {\n        font-size: 188%\n    }\n\n    h2 {\n        font-size: 150%\n    }\n\n    h3,h4,h5,h6 {\n        border-bottom: 0;\n        font-weight: bold\n    }\n\n    h3 {\n        font-size: 128%\n    }\n\n    h4 {\n        font-size: 116%\n    }\n\n    h5 {\n        font-size: 108%\n    }\n\n    h6 {\n        font-size: 100%\n    }\n\n    h1,h2 {\n        margin-bottom: 0.6em\n    }\n\n    h3,h4,h5 {\n        margin-bottom: 0.3em\n    }\n\n    p {\n        margin: 0.4em 0 0.5em 0\n    }\n\n    p img {\n        margin: 0\n    }\n\n    ul {\n        list-style-type: square;\n        margin: 0.3em 0 0 1.6em;\n        padding: 0\n    }\n\n    ol {\n        margin: 0.3em 0 0 3.2em;\n        padding: 0;\n        list-style-image: none\n    }\n\n    li {\n        margin-bottom: 0.1em\n    }\n\n    dt {\n        font-weight: bold;\n        margin-bottom: 0.1em\n    }\n\n    dl {\n        margin-top: 0.2em;\n        margin-bottom: 0.5em\n    }\n\n    dd {\n        margin-left: 1.6em;\n        margin-bottom: 0.1em\n    }\n\n    pre,code,tt,kbd,samp,.mw-code {\n        font-family: monospace,monospace\n    }\n\n    code {\n        color: #000;\n        background-color: #f8f9fa;\n        border: 1px solid #eaecf0;\n        border-radius: 2px;\n        padding: 1px 4px\n    }\n\n    pre,.mw-code {\n        color: #000;\n        background-color: #f8f9fa;\n        border: 1px solid #eaecf0;\n        padding: 1em;\n        white-space: pre-wrap\n    }\n\n    table {\n        font-size: 100%\n    }\n\n    fieldset {\n        border: 1px solid #2a4b8d;\n        margin: 1em 0 1em 0;\n        padding: 0 1em 1em\n    }\n\n    fieldset.nested {\n        margin: 0 0 0.5em 0;\n        padding: 0 0.5em 0.5em\n    }\n\n    legend {\n        padding: 0.5em;\n        font-size: 95%\n    }\n\n    form {\n        border: 0;\n        margin: 0\n    }\n\n    textarea {\n        width: 100%;\n        padding: 0.1em;\n        display: block;\n        box-sizing: border-box\n    }\n\n    .center {\n        width: 100%;\n        text-align: center\n    }\n\n    *.center * {\n        margin-left: auto;\n        margin-right: auto\n    }\n\n    .small {\n        font-size: 94%\n    }\n\n    table.small {\n        font-size: 100%\n    }\n\n    .toc,.mw-warning,.toccolours {\n        border: 1px solid #a2a9b1;\n        background-color: #f8f9fa;\n        padding: 5px;\n        font-size: 95%\n    }\n\n    .toc {\n        display: inline-block;\n        display: table;\n        zoom:1;*display: inline;\n        padding: 7px\n    }\n\n    table.toc {\n        border-collapse: collapse\n    }\n\n    table.toc td {\n        padding: 0\n    }\n\n    .toc h2 {\n        display: inline;\n        border: 0;\n        padding: 0;\n        font-size: 100%;\n        font-weight: bold\n    }\n\n    .toc .toctitle {\n        text-align: center\n    }\n\n    .toc ul {\n        list-style-type: none;\n        list-style-image: none;\n        margin-left: 0;\n        padding: 0;\n        text-align: left\n    }\n\n    .toc ul ul {\n        margin: 0 0 0 2em\n    }\n\n    .tocnumber,.toctext {\n        display: table-cell;\n        text-decoration: inherit\n    }\n\n    .tocnumber {\n        padding-left: 0;\n        padding-right: 0.5em;\n        color: #222\n    }\n\n    .mw-content-ltr .tocnumber {\n        padding-left: 0;\n        padding-right: 0.5em\n    }\n\n    .mw-content-rtl .tocnumber {\n        padding-left: 0.5em;\n        padding-right: 0\n    }\n\n    .mw-warning {\n        margin-left: 50px;\n        margin-right: 50px;\n        text-align: center\n    }\n\n    div.floatright,table.floatright {\n        margin: 0 0 0.5em 0.5em\n    }\n\n    div.floatright p {\n        font-style: italic\n    }\n\n    div.floatleft,table.floatleft {\n        margin: 0 0.5em 0.5em 0\n    }\n\n    div.floatleft p {\n        font-style: italic\n    }\n\n    div.thumb {\n        margin-bottom: 0.5em;\n        width: auto;\n        background-color: transparent\n    }\n\n    div.thumbinner {\n        border: 1px solid #c8ccd1;\n        padding: 3px;\n        background-color: #f8f9fa;\n        font-size: 94%;\n        text-align: center;\n        overflow: hidden\n    }\n\n    html .thumbimage {\n        background-color: #fff;\n        border: 1px solid #c8ccd1\n    }\n\n    html .thumbcaption {\n        border: 0;\n        line-height: 1.4em;\n        padding: 3px;\n        font-size: 94%;\n        text-align: left\n    }\n\n    div.magnify {\n        float: right;\n        margin-left: 3px\n    }\n\n    div.magnify a {\n        display: block;\n        text-indent: 15px;\n        white-space: nowrap;\n        overflow: hidden;\n        width: 15px;\n        height: 11px;\n        background-image: url(/w/resources/src/mediawiki.skinning/images/magnify-clip-ltr.png?4f704);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 11 15%22 width=%2215%22 height=%2211%22%3E %3Cg id=%22magnify-clip%22 fill=%22%23fff%22 stroke=%22%23000%22%3E %3Cpath id=%22bigbox%22 d=%22M1.509 1.865h10.99v7.919h-10.99z%22/%3E %3Cpath id=%22smallbox%22 d=%22M-1.499 6.868h5.943v4.904h-5.943z%22/%3E %3C/g%3E %3C/svg%3E\");\n        -moz-user-select: none;\n        -webkit-user-select: none;\n        -ms-user-select: none;\n        user-select: none\n    }\n\n    img.thumbborder {\n        border: 1px solid #eaecf0\n    }\n\n    .mw-content-ltr .thumbcaption {\n        text-align: left\n    }\n\n    .mw-content-ltr .magnify {\n        float: right;\n        margin-left: 3px;\n        margin-right: 0\n    }\n\n    .mw-content-ltr div.magnify a {\n        background-image: url(/w/resources/src/mediawiki.skinning/images/magnify-clip-ltr.png?4f704);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 11 15%22 width=%2215%22 height=%2211%22%3E %3Cg id=%22magnify-clip%22 fill=%22%23fff%22 stroke=%22%23000%22%3E %3Cpath id=%22bigbox%22 d=%22M1.509 1.865h10.99v7.919h-10.99z%22/%3E %3Cpath id=%22smallbox%22 d=%22M-1.499 6.868h5.943v4.904h-5.943z%22/%3E %3C/g%3E %3C/svg%3E\")\n    }\n\n    .mw-content-rtl .thumbcaption {\n        text-align: right\n    }\n\n    .mw-content-rtl .magnify {\n        float: left;\n        margin-left: 0;\n        margin-right: 3px\n    }\n\n    .mw-content-rtl div.magnify a {\n        background-image: url(/w/resources/src/mediawiki.skinning/images/magnify-clip-rtl.png?a9fb3);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 11 15%22 width=%2215%22 height=%2211%22%3E %3Cg id=%22magnify-clip%22 fill=%22%23fff%22 stroke=%22%23000%22%3E %3Cpath id=%22bigbox%22 d=%22M9.491 1.865h-10.99v7.919h10.99z%22/%3E %3Cpath id=%22smallbox%22 d=%22M12.499 6.868h-5.943v4.904h5.943z%22/%3E %3C/g%3E %3C/svg%3E\")\n    }\n\n    div.tright {\n        margin: 0.5em 0 1.3em 1.4em\n    }\n\n    div.tleft {\n        margin: 0.5em 1.4em 1.3em 0\n    }\n\n    body.mw-hide-empty-elt .mw-empty-elt {\n        display: none\n    }\n\n    .catlinks {\n        border: 1px solid #a2a9b1;\n        background-color: #f8f9fa;\n        padding: 5px;\n        margin-top: 1em;\n        clear: both\n    }\n\n    textarea {\n        border: 1px solid #c8ccd1\n    }\n\n    .editOptions {\n        background-color: #eaecf0;\n        color: #222;\n        border: 1px solid #c8ccd1;\n        border-top: 0;\n        padding: 1em 1em 1.5em 1em;\n        margin-bottom: 2em\n    }\n\n    .usermessage {\n        background-color: #ffce7b;\n        border: 1px solid #ffa500;\n        color: #000;\n        font-weight: bold;\n        margin: 2em 0 1em;\n        padding: 0.5em 1em;\n        vertical-align: middle\n    }\n\n    #siteNotice {\n        position: relative;\n        text-align: center;\n        margin: 0\n    }\n\n    #localNotice {\n        margin-bottom: 0.9em\n    }\n\n    .firstHeading {\n        margin-bottom: 0.1em;\n        line-height: 1.2em;\n        padding-bottom: 0\n    }\n\n    #siteSub {\n        display: none\n    }\n\n    #contentSub,#contentSub2 {\n        font-size: 84%;\n        line-height: 1.2em;\n        margin: 0 0 1.4em 1em;\n        color: #54595d;\n        width: auto\n    }\n\n    span.subpages {\n        display: block\n    }\n}\n\n.mw-wiki-logo {\n    background-image: url(/static/images/project-logos/enwiki.png)\n}\n\n@media (-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio:1.5), (-webkit-min-device-pixel-ratio:1.5), (min-resolution:1.5dppx), (min-resolution:144dpi) {\n    .mw-wiki-logo {\n        background-image:url(/static/images/project-logos/enwiki-1.5x.png);\n        background-size: 135px auto\n    }\n}\n\n@media (-webkit-min-device-pixel-ratio: 2), (min--moz-device-pixel-ratio:2), (-webkit-min-device-pixel-ratio:2), (min-resolution:2dppx), (min-resolution:192dpi) {\n    .mw-wiki-logo {\n        background-image:url(/static/images/project-logos/enwiki-2x.png);\n        background-size: 135px auto\n    }\n}\n\n@media screen {\n    html {\n        font-size: 100%\n    }\n\n    html,body {\n        margin: 0;\n        padding: 0;\n        font-family: sans-serif\n    }\n\n    body {\n        background-color: #f6f6f6\n    }\n\n    .mw-body,.parsoid-body {\n        padding: 1em;\n        background-color: #ffffff;\n        color: #222222;\n        direction: ltr\n    }\n\n    .mw-body {\n        margin-left: 10em;\n        border: 1px solid #a7d7f9;\n        border-right-width: 0;\n        margin-top: -1px\n    }\n\n    .mw-body h1,.mw-body-content h1,.mw-body-content h2 {\n        font-family: 'Linux Libertine','Georgia','Times',serif;\n        line-height: 1.3;\n        margin-bottom: 0.25em;\n        padding: 0\n    }\n\n    .mw-body h1:lang(ja),.mw-body-content h1:lang(ja),.mw-body-content h2:lang(ja),.mw-body h1:lang(he),.mw-body-content h1:lang(he),.mw-body-content h2:lang(he),.mw-body h1:lang(ko),.mw-body-content h1:lang(ko),.mw-body-content h2:lang(ko) {\n        font-family: sans-serif\n    }\n\n    .mw-body h1:lang(my),.mw-body-content h1:lang(my),.mw-body-content h2:lang(my) {\n        line-height: normal\n    }\n\n    .mw-body h1,.mw-body-content h1 {\n        font-size: 1.8em\n    }\n\n    .mw-body .firstHeading {\n        overflow: visible\n    }\n\n    .mw-body .mw-indicators {\n        float: right;\n        line-height: 1.6;\n        font-size: 0.875em;\n        position: relative;\n        z-index: 1\n    }\n\n    .mw-body .mw-indicator {\n        display: inline-block;\n        zoom:1;*display: inline\n    }\n\n    .mw-body-content {\n        position: relative;\n        line-height: 1.6;\n        font-size: 0.875em;\n        z-index: 0\n    }\n\n    .mw-body-content p {\n        line-height: inherit;\n        margin: 0.5em 0\n    }\n\n    .mw-body-content h1 {\n        margin-top: 1em\n    }\n\n    .mw-body-content h2 {\n        font-size: 1.5em;\n        margin-top: 1em\n    }\n\n    .mw-body-content h3,.mw-body-content h4,.mw-body-content h5,.mw-body-content h6 {\n        line-height: 1.6;\n        margin-top: 0.3em;\n        margin-bottom: 0;\n        padding-bottom: 0\n    }\n\n    .mw-body-content h3 {\n        font-size: 1.2em\n    }\n\n    .mw-body-content h3,.mw-body-content h4 {\n        font-weight: bold\n    }\n\n    .mw-body-content h4,.mw-body-content h5,.mw-body-content h6 {\n        font-size: 100%\n    }\n\n    .mw-body-content .toc h2 {\n        font-size: 100%;\n        font-family: sans-serif\n    }\n\n    .mw-editsection,.mw-editsection-like {\n        font-family: sans-serif\n    }\n\n    div.emptyPortlet {\n        display: none\n    }\n\n    ul {\n        list-style-type: disc;\n        list-style-image: url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%225%22 height=%2213%22%3E %3Ccircle cx=%222.5%22 cy=%229.5%22 r=%222.5%22 fill=%22%2300528c%22/%3E %3C/svg%3E\");\n        list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAANCAIAAADuXjPfAAAABnRSTlMA/wD/AP83WBt9AAAAHklEQVR4AWP4jwrowWcI6oEgEBtIISNCfFT9mOYDACO/lbNIGC/yAAAAAElFTkSuQmCC) \\9;\n        list-style-image: url(/w/skins/Vector/images/bullet-icon.png?e31f8) \\9\n    }\n\n    pre,.mw-code {\n        line-height: 1.3em\n    }\n\n    #siteNotice {\n        font-size: 0.8em\n    }\n\n    #p-personal {\n        position: absolute;\n        top: 0.33em;\n        right: 0.75em;\n        z-index: 100\n    }\n\n    #p-personal h3 {\n        display: none\n    }\n\n    #p-personal ul {\n        list-style-type: none;\n        list-style-image: none;\n        margin: 0;\n        padding-left: 10em\n    }\n\n    #p-personal li {\n        line-height: 1.125em;\n        float: left;\n        margin-left: 0.75em;\n        margin-top: 0.5em;\n        font-size: 0.75em;\n        white-space: nowrap\n    }\n\n    #pt-userpage,#pt-anonuserpage {\n        background-position: left top;\n        background-repeat: no-repeat;\n        background-image: url(/w/skins/Vector/images/user-icon.png?13155);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2213.836%22 viewBox=%220 0 12 13.836%22%3E %3Cpath fill=%22%2372777d%22 d=%22M1.938%2C6.656c-1.32%2C1.485-1.47%2C3.15-0.97%2C4.25c0.323%2C0.707%2C0.78%2C1.127%2C1.313%2C1.375 c0.496%2C0.229%2C1.074%2C0.273%2C1.658%2C0.282c0.023%2C0%2C0.04%2C0.03%2C0.062%2C0.03h4.187c0.61%2C0%2C1.225-0.125%2C1.75-0.405 c0.527-0.28%2C0.961-0.718%2C1.188-1.376c0.335-0.964%2C0.175-2.529-1.094-4.03C9.094%2C7.954%2C7.68%2C8.719%2C6.065%2C8.719 c-1.677%2C0-3.182-0.812-4.125-2.063H1.938z%22/%3E %3Cpath fill=%22%2372777d%22 d=%22M6.063%2C0c-1.89%2C0-3.595%2C1.674-3.594%2C3.563C2.467%2C5.45%2C4.173%2C7.155%2C6.06%2C7.155 c1.89%2C0%2C3.564-1.705%2C3.563-3.593C9.625%2C1.673%2C7.95%2C0%2C6.063%2C0L6.063%2C0z%22/%3E %3C/svg%3E\");\n        padding-left: 15px !important\n    }\n\n    #pt-anonuserpage {\n        color: #707070\n    }\n\n    #p-search {\n        float: left;\n        margin-right: 0.5em;\n        margin-left: 0.5em\n    }\n\n    #p-search h3 {\n        display: block;\n        position: absolute !important;\n        clip: rect(1px,1px,1px,1px);\n        width: 1px;\n        height: 1px;\n        margin: -1px;\n        border: 0;\n        padding: 0;\n        overflow: hidden\n    }\n\n    #p-search form,#p-search input {\n        margin: 0.4em 0 0\n    }\n\n    #simpleSearch {\n        background-color: #fff;\n        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAQCAIAAABY/YLgAAAAJUlEQVQIHQXBsQEAAAjDoND/73UWdnerhmHVsDQZJrNWVg3Dqge6bgMe6bejNAAAAABJRU5ErkJggg==);\n        background-image: url(/w/skins/Vector/images/search-fade.png?50f7b);\n        background-position: top left;\n        background-repeat: repeat-x;\n        color: #000;\n        display: block;\n        width: 12.6em;\n        width: 20vw;\n        min-width: 5em;\n        max-width: 20em;\n        padding-right: 1.4em;\n        height: 1.4em;\n        margin-top: 0.65em;\n        position: relative;\n        min-height: 1px;\n        border: 1px solid #a2a9b1;\n        border-radius: 2px;\n        transition: border-color 250ms\n    }\n\n    #simpleSearch:hover {\n        border-color: #72777d\n    }\n\n    #simpleSearch input {\n        background-color: transparent;\n        color: #000;\n        margin: 0;\n        padding: 0;\n        border: 0\n    }\n\n    #simpleSearch #searchInput {\n        width: 100%;\n        padding: 0.2em 0 0.2em 0.2em;\n        font-size: 0.8125em;\n        direction: ltr;\n        -webkit-appearance: textfield\n    }\n\n    #simpleSearch #searchInput:focus {\n        outline: 0\n    }\n\n    #simpleSearch #searchInput::-webkit-input-placeholder {\n        color: #72777d;\n        opacity: 1\n    }\n\n    #simpleSearch #searchInput:-ms-input-placeholder {\n        color: #72777d;\n        opacity: 1\n    }\n\n    #simpleSearch #searchInput::-ms-input-placeholder {\n        color: #72777d;\n        opacity: 1\n    }\n\n    #simpleSearch #searchInput::placeholder {\n        color: #72777d;\n        opacity: 1\n    }\n\n    #simpleSearch #searchInput::-webkit-search-decoration,#simpleSearch #searchInput::-webkit-search-cancel-button,#simpleSearch #searchInput::-webkit-search-results-button,#simpleSearch #searchInput::-webkit-search-results-decoration {\n        -webkit-appearance: textfield\n    }\n\n    #simpleSearch #searchButton,#simpleSearch #mw-searchButton {\n        position: absolute;\n        top: 0;\n        right: 0;\n        width: 1.65em;\n        cursor: pointer;\n        text-indent: -99999px;\n        direction: ltr;\n        white-space: nowrap;\n        overflow: hidden\n    }\n\n    #simpleSearch #searchButton {\n        background-image: url(/w/skins/Vector/images/search-ltr.png?39f97);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2213%22%3E %3Cg fill=%22none%22 stroke=%22%2354595d%22 stroke-width=%222%22%3E %3Cpath d=%22M11.29 11.71l-4-4%22/%3E %3Ccircle cx=%225%22 cy=%225%22 r=%224%22/%3E %3C/g%3E %3C/svg%3E\");\n        background-position: center center;\n        background-repeat: no-repeat\n    }\n\n    #simpleSearch #mw-searchButton {\n        z-index: 1\n    }\n\n    .vectorTabs h3 {\n        display: none\n    }\n\n    .vectorTabs {\n        float: left;\n        height: 2.5em;\n        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAuCAIAAABmjeQ9AAAAQ0lEQVR4AWVOhQEAIAzC/X+xAXbXeoDFGA3A9yk1n4juBROcUegfarWjP3ojZvEzxs6j+nygmo+zzsk79nY+tOxdEhlf3UHVgUFrVwAAAABJRU5ErkJggg==);\n        background-image: url(/w/skins/Vector/images/tab-break.png?09d4b);\n        background-position: bottom left;\n        background-repeat: no-repeat;\n        padding-left: 1px\n    }\n\n    .vectorTabs ul {\n        float: left;\n        list-style-type: none;\n        list-style-image: none;\n        margin: 0;\n        padding: 0;\n        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAuCAIAAABmjeQ9AAAAQ0lEQVR4AWVOhQEAIAzC/X+xAXbXeoDFGA3A9yk1n4juBROcUegfarWjP3ojZvEzxs6j+nygmo+zzsk79nY+tOxdEhlf3UHVgUFrVwAAAABJRU5ErkJggg==);\n        background-image: url(/w/skins/Vector/images/tab-break.png?09d4b);\n        background-position: right bottom;\n        background-repeat: no-repeat\n    }\n\n    .vectorTabs ul li {\n        float: left;\n        line-height: 1.125em;\n        display: block;\n        margin: 0;\n        padding: 0;\n        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABkCAIAAADITs03AAAAO0lEQVR4AeSKhREAMQzDdN5/5uixuEKDpqgBjl2f78wd2DVj1+26/h///PfteVMN7zoGebcg1/Y/ZQQAlAUtQCujIJMAAAAASUVORK5CYII=);\n        background-image: url(/w/skins/Vector/images/tab-normal-fade.png?1cc52);\n        background-position: bottom left;\n        background-repeat: repeat-x;\n        white-space: nowrap\n    }\n\n    .vectorTabs li.new a,.vectorTabs li.new a:visited {\n        color: #a55858\n    }\n\n    .vectorTabs li.selected {\n        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABkAQAAAABvV2fNAAAADElEQVR4AWNoGB4QAInlMgFKeRKBAAAAAElFTkSuQmCC);\n        background-image: url(/w/skins/Vector/images/tab-current-fade.png?22887)\n    }\n\n    .vectorTabs li.selected a,.vectorTabs li.selected a:visited {\n        color: #222;\n        text-decoration: none\n    }\n\n    .vectorTabs li.icon a {\n        background-position: bottom right;\n        background-repeat: no-repeat\n    }\n\n    .vectorTabs li a {\n        display: block;\n        height: 1.9em;\n        padding-left: 0.615em;\n        padding-right: 0.615em;\n        color: #0645ad;\n        cursor: pointer;\n        font-size: 0.8125em\n    }\n\n    .vectorTabs span {\n        display: inline-block;\n        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAuCAIAAABmjeQ9AAAAQ0lEQVR4AWVOhQEAIAzC/X+xAXbXeoDFGA3A9yk1n4juBROcUegfarWjP3ojZvEzxs6j+nygmo+zzsk79nY+tOxdEhlf3UHVgUFrVwAAAABJRU5ErkJggg==);\n        background-image: url(/w/skins/Vector/images/tab-break.png?09d4b);\n        background-position: bottom right;\n        background-repeat: no-repeat;\n    }\n\n    .vectorTabs span a {\n        float: left;\n        display: block;\n        padding-top: 1.25em\n    }\n\n    .vectorMenu {\n        direction: ltr;\n        float: left;\n        cursor: pointer;\n        position: relative;\n        line-height: 1.125em\n    }\n\n    #mw-head .vectorMenu h3 {\n        float: left;\n        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAuCAIAAABmjeQ9AAAAQ0lEQVR4AWVOhQEAIAzC/X+xAXbXeoDFGA3A9yk1n4juBROcUegfarWjP3ojZvEzxs6j+nygmo+zzsk79nY+tOxdEhlf3UHVgUFrVwAAAABJRU5ErkJggg==);\n        background-image: url(/w/skins/Vector/images/tab-break.png?09d4b);\n        background-repeat: no-repeat;\n        background-position: bottom right;\n        font-size: 1em;\n        height: 2.5em;\n        padding: 0 0.5em 0 0;\n        margin: 0 -1px 0 0\n    }\n\n    .vectorMenu h3 span {\n        position: relative;\n        display: block;\n        font-size: 0.8125em;\n        padding-left: 0.615em;\n        padding-top: 1.25em;\n        padding-right: 16px;\n        font-weight: normal;\n        color: #444\n    }\n\n    .vectorMenu h3 span:after {\n        content: '';\n        position: absolute;\n        top: 1.25em;\n        right: 0;\n        bottom: 0;\n        left: 0;\n        background-image: url(/w/skins/Vector/images/arrow-down.png?42edd);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 12 12%22%3E %3Cpath d=%22M11.05 3.996l-.965-1.053-4.035 3.86-3.947-3.86L1.05 3.996l5 5 5-5%22 fill=%22%23222%22/%3E %3C/svg%3E\");\n        background-position: 100% 50%;\n        background-repeat: no-repeat;\n        opacity: 0.85\n    }\n\n    .vectorMenu h3:hover span,.vectorMenu h3:focus span {\n        color: #222222\n    }\n\n    .vectorMenu h3:hover span:after,.vectorMenu h3:focus span:after {\n        opacity: 1\n    }\n\n    .vectorMenu .vectorMenuCheckbox:checked + h3 span:after {\n        -webkit-transform: scaleY(-1);\n                transform: scaleY(-1)\n    }\n\n    .vectorMenu .vectorMenuCheckbox:focus + h3 {\n        outline: dotted 1px;\n        outline: auto -webkit-focus-ring-color\n    }\n\n    .vectorMenu .menu {\n        min-width: 100%;\n        position: absolute;\n        top: 2.5em;\n        left: -1px;\n        background-color: #ffffff;\n        border: 1px solid #a2a9b1;\n        border-top-width: 0;\n        clear: both;\n        box-shadow: 0 1px 1px 0 rgba(0,0,0,0.1);\n        text-align: left;\n        display: none;\n        z-index: 2\n    }\n\n    .vectorMenu:hover .menu {\n        display: block\n    }\n\n    .vectorMenu .vectorMenuCheckbox:checked ~ .menu {\n        display: block\n    }\n\n    .vectorMenu ul {\n        list-style-type: none;\n        list-style-image: none;\n        padding: 0;\n        margin: 0;\n        text-align: left\n    }\n\n    .vectorMenu ul,x:-moz-any-link {\n        min-width: 5em\n    }\n\n    .vectorMenu ul,x:-moz-any-link,x:default {\n        min-width: 0\n    }\n\n    .vectorMenu li {\n        padding: 0;\n        margin: 0;\n        text-align: left;\n        line-height: 1em\n    }\n\n    .vectorMenu li a {\n        display: block;\n        padding: 0.625em;\n        white-space: nowrap;\n        color: #0645ad;\n        cursor: pointer;\n        font-size: 0.8125em\n    }\n\n    .vectorMenu li.selected a,.vectorMenu li.selected a:visited {\n        color: #222;\n        text-decoration: none\n    }\n\n    .vectorMenuCheckbox {\n        cursor: pointer;\n        position: absolute;\n        top: 0;\n        left: 0;\n        z-index: 1;\n        opacity: 0;\n        width: 100%;\n        margin: 0;\n        padding: 0;\n        display: none\n    }\n\n    :not(:checked) > .vectorMenuCheckbox {\n        display: block\n    }\n\n    @-webkit-keyframes rotate {\n        from {\n            -webkit-transform: rotate(0deg);\n            transform: rotate(0deg)\n        }\n\n        to {\n            -webkit-transform: rotate(360deg);\n            transform: rotate(360deg)\n        }\n    }\n\n    @keyframes rotate {\n        from {\n            -webkit-transform: rotate(0deg);\n            transform: rotate(0deg)\n        }\n\n        to {\n            -webkit-transform: rotate(360deg);\n            transform: rotate(360deg)\n        }\n    }\n\n    .vectorTabs #ca-unwatch.icon a,.vectorTabs #ca-watch.icon a {\n        margin: 0;\n        padding: 0;\n        display: block;\n        width: 28px;\n        padding-top: 3.07692308em;\n        height: 0;\n        overflow: hidden;\n        background-position: 5px 60%;\n        background-repeat: no-repeat\n    }\n\n    .vectorTabs #ca-unwatch.icon a {\n        background-image: url(/w/skins/Vector/images/unwatch-icon.png?fccbe);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22%3E %3Cdefs%3E %3ClinearGradient id=%22a%22%3E %3Cstop offset=%220%22 stop-color=%22%23c2edff%22/%3E %3Cstop offset=%22.5%22 stop-color=%22%2368bdff%22/%3E %3Cstop offset=%221%22 stop-color=%22%23fff%22/%3E %3C/linearGradient%3E %3ClinearGradient id=%22b%22 x1=%2213.47%22 x2=%224.596%22 y1=%2214.363%22 y2=%223.397%22 xlink:href=%22%23a%22 gradientUnits=%22userSpaceOnUse%22/%3E %3C/defs%3E %3Cpath fill=%22url%28%23b%29%22 stroke=%22%237cb5d1%22 stroke-width=%22.99992%22 d=%22M8.103 1.146l2.175 4.408 4.864.707-3.52 3.431.831 4.845-4.351-2.287-4.351 2.287.831-4.845-3.52-3.431 4.864-.707z%22/%3E %3C/svg%3E\")\n    }\n\n    .vectorTabs #ca-watch.icon a {\n        background-image: url(/w/skins/Vector/images/watch-icon.png?e1b42);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22%3E %3Cpath fill=%22%23fff%22 stroke=%22%237cb5d1%22 stroke-width=%22.99992%22 d=%22M8.103 1.146l2.175 4.408 4.864.707-3.52 3.431.831 4.845-4.351-2.287-4.351 2.287.831-4.845-3.52-3.431 4.864-.707z%22/%3E %3C/svg%3E\")\n    }\n\n    .vectorTabs #ca-unwatch.icon a:hover,.vectorTabs #ca-unwatch.icon a:focus {\n        background-image: url(/w/skins/Vector/images/unwatch-icon-hl.png?c4723);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22%3E %3Cdefs%3E %3ClinearGradient id=%22a%22%3E %3Cstop offset=%220%22 stop-color=%22%23c2edff%22/%3E %3Cstop offset=%22.5%22 stop-color=%22%2368bdff%22/%3E %3Cstop offset=%221%22 stop-color=%22%23fff%22/%3E %3C/linearGradient%3E %3ClinearGradient id=%22b%22 x1=%2213.47%22 x2=%224.596%22 y1=%2214.363%22 y2=%223.397%22 xlink:href=%22%23a%22 gradientUnits=%22userSpaceOnUse%22/%3E %3C/defs%3E %3Cpath fill=%22url%28%23b%29%22 stroke=%22%23c8b250%22 stroke-width=%22.99992%22 d=%22M8.103 1.146l2.175 4.408 4.864.707-3.52 3.431.831 4.845-4.351-2.287-4.351 2.287.831-4.845-3.52-3.431 4.864-.707z%22/%3E %3C/svg%3E\")\n    }\n\n    .vectorTabs #ca-watch.icon a:hover,.vectorTabs #ca-watch.icon a:focus {\n        background-image: url(/w/skins/Vector/images/watch-icon-hl.png?f4c7e);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22%3E %3Cpath fill=%22%23fff%22 stroke=%22%23c8b250%22 stroke-width=%22.99992%22 d=%22M8.103 1.146l2.175 4.408 4.864.707-3.52 3.431.831 4.845-4.351-2.287-4.351 2.287.831-4.845-3.52-3.431 4.864-.707z%22/%3E %3C/svg%3E\")\n    }\n\n    .vectorTabs #ca-unwatch.icon a.loading,.vectorTabs #ca-watch.icon a.loading {\n        background-image: url(/w/skins/Vector/images/watch-icon-loading.png?5cb92);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22%3E %3Cpath fill=%22%23fff%22 stroke=%22%23c8ccd1%22 stroke-width=%22.99992%22 d=%22M8.103 1.146l2.175 4.408 4.864.707-3.52 3.431.831 4.845-4.351-2.287-4.351 2.287.831-4.845-3.52-3.431 4.864-.707z%22/%3E %3C/svg%3E\");\n        -webkit-animation: rotate 700ms infinite linear;\n        animation: rotate 700ms infinite linear;\n        outline: 0;\n        cursor: default;\n        pointer-events: none;\n        background-position: 50% 60%;\n        -webkit-transform-origin: 50% 57%;\n        transform-origin: 50% 57%\n    }\n\n    .vectorTabs #ca-unwatch.icon a span,.vectorTabs #ca-watch.icon a span {\n        display: none\n    }\n\n    #mw-navigation h2 {\n        position: absolute;\n        top: -9999px\n    }\n\n    .mw-jump-link:not(:focus) {\n        display: block;\n        position: absolute !important;\n        clip: rect(1px,1px,1px,1px);\n        width: 1px;\n        height: 1px;\n        margin: -1px;\n        border: 0;\n        padding: 0;\n        overflow: hidden\n    }\n\n    #mw-page-base {\n        height: 5em;\n        background-position: bottom left;\n        background-repeat: repeat-x;\n        background-image: url(/w/skins/Vector/images/page-fade.png?1d168);\n        background-color: #f6f6f6;\n        background-image: linear-gradient(#ffffff 50%,#f6f6f6 100%);\n        background-color: #ffffff\n    }\n\n    #mw-head-base {\n        margin-top: -5em;\n        margin-left: 10em;\n        height: 5em\n    }\n\n    #mw-head {\n        position: absolute;\n        top: 0;\n        right: 0;\n        width: 100%\n    }\n\n    #left-navigation {\n        float: left;\n        margin-left: 10em;\n        margin-top: 2.5em;\n        margin-bottom: -2.5em\n    }\n\n    #right-navigation {\n        float: right;\n        margin-top: 2.5em\n    }\n\n    #p-logo {\n        width: 10em;\n        height: 160px\n    }\n\n    #p-logo a {\n        display: block;\n        width: 10em;\n        height: 160px;\n        background-repeat: no-repeat;\n        background-position: center center;\n        text-decoration: none\n    }\n\n    #mw-panel {\n        font-size: inherit;\n        position: absolute;\n        top: 0;\n        width: 10em;\n        left: 0\n    }\n\n    #mw-panel .portal {\n        margin: 0 0.6em 0 0.7em;\n        padding: 0.25em 0;\n        direction: ltr;\n        background-position: top left;\n        background-repeat: no-repeat\n    }\n\n    #mw-panel .portal h3 {\n        font-size: 0.75em;\n        color: #444444;\n        font-weight: normal;\n        margin: 0.5em 0 0 0.66666667em;\n        padding: 0.25em 0;\n        cursor: default;\n        border: 0\n    }\n\n    #mw-panel .portal .body {\n        margin-left: 0.5em;\n        padding-top: 0;\n        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIwAAAABCAAAAAAphRnkAAAAJ0lEQVQIW7XFsQEAIAyAMPD/b7uLWz8wS5youFW1UREfiIpH1Q2VBz7fGPS1dOGeAAAAAElFTkSuQmCC);\n        background-image: url(/w/skins/Vector/images/portal-break.png?3ea1b);\n        background-repeat: no-repeat\n    }\n\n    #mw-panel .portal .body ul {\n        list-style: none none;\n        margin: 0;\n        padding: 0.3em 0 0 0\n    }\n\n    #mw-panel .portal .body li {\n        line-height: 1.125em;\n        margin: 0;\n        padding: 0.25em 0;\n        font-size: 0.75em;\n        word-wrap: break-word\n    }\n\n    #mw-panel .portal .body li a {\n        color: #0645ad\n    }\n\n    #mw-panel .portal .body li a:visited {\n        color: #0b0080\n    }\n\n    #mw-panel #p-logo + .portal {\n        background-image: none;\n        margin-top: 1em\n    }\n\n    #mw-panel #p-logo + .portal h3 {\n        display: none\n    }\n\n    #mw-panel #p-logo + .portal .body {\n        background-image: none;\n        margin-left: 0.5em\n    }\n\n    #footer {\n        margin-left: 10em;\n        margin-top: 0;\n        padding: 0.75em;\n        direction: ltr\n    }\n\n    #footer ul {\n        list-style-type: none;\n        list-style-image: none;\n        margin: 0;\n        padding: 0\n    }\n\n    #footer ul li {\n        color: #222;\n        margin: 0;\n        padding: 0;\n        padding-top: 0.5em;\n        padding-bottom: 0.5em;\n        font-size: 0.7em\n    }\n\n    #footer #footer-icons {\n        float: right\n    }\n\n    #footer #footer-icons li {\n        float: left;\n        margin-left: 0.5em;\n        line-height: 2em;\n        text-align: right\n    }\n\n    #footer #footer-info li {\n        line-height: 1.4em\n    }\n\n    #footer #footer-places li {\n        float: left;\n        margin-right: 1em;\n        line-height: 2em\n    }\n\n    .mw-parser-output .external {\n        background-position: center right;\n        background-repeat: no-repeat;\n        background-image: url(/w/skins/Vector/images/external-link-ltr-icon.png?325de);\n        background-image: linear-gradient(transparent,transparent),url(\"data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22%3E %3Cpath fill=%22%23fff%22 stroke=%22%2336c%22 d=%22M1.5 4.518h5.982V10.5H1.5z%22/%3E %3Cpath fill=%22%2336c%22 d=%22M5.765 1H11v5.39L9.427 7.937l-1.31-1.31L5.393 9.35l-2.69-2.688 2.81-2.808L4.2 2.544z%22/%3E %3Cpath fill=%22%23fff%22 d=%22M9.995 2.004l.022 4.885L8.2 5.07 5.32 7.95 4.09 6.723l2.882-2.88-1.85-1.852z%22/%3E %3C/svg%3E\");\n        padding-right: 13px\n    }\n}\n\n@media screen and (min-width: 982px) {\n    .mw-body {\n        margin-left:11em;\n        padding: 1.25em 1.5em 1.5em 1.5em\n    }\n\n    #footer {\n        margin-left: 11em;\n        padding: 1.25em\n    }\n\n    #mw-panel {\n        padding-left: 0.5em\n    }\n\n    #p-search {\n        margin-right: 1em\n    }\n\n    #left-navigation {\n        margin-left: 11em\n    }\n\n    #p-personal {\n        right: 1em\n    }\n\n    #mw-head-base {\n        margin-left: 11em\n    }\n}\n\n.firstHeading:before {\n    content: url(//en.wikipedia.org/static/images/mobile/copyright/wikipedia-wordmark-en.svg);\n    display: block;\n    height: 18px;\n    left: -9999px;\n    line-height: 0;\n    margin-bottom: 20px;\n    position: absolute;\n    width: 116px\n}\n\n@media print {\n    .toc,body {\n        padding: 10px;\n        font-family: 'Linux Libertine','Georgia','Times',serif\n    }\n\n    .printfooter,#footer,.thumb,table,ol,dl,ul,h3,h4,h5,h6 {\n        font-family: sans-serif\n    }\n\n    img {\n        font-family: 'Linux Libertine','Georgia','Times',serif\n    }\n\n    a {\n        border-bottom: 1px solid #aaa\n    }\n\n    .firstHeading {\n        font-size: 25pt;\n        line-height: 28pt;\n        margin-bottom: 20px;\n        padding-bottom: 5px\n    }\n\n    .firstHeading:before {\n        left: auto;\n        position: relative\n    }\n\n    .firstHeading,h2 {\n        overflow: hidden;\n        border-bottom: 2px solid #000000\n    }\n\n    h3,h4,h5,h6 {\n        margin: 30px 0 0\n    }\n\n    h2,h3,h4,h5,h6 {\n        padding: 0;\n        position: relative\n    }\n\n    h2 {\n        font-size: 18pt;\n        line-height: 24pt;\n        margin-bottom: 0.25em\n    }\n\n    h3 {\n        font-size: 13pt;\n        line-height: 20pt\n    }\n\n    h4,h5,h6 {\n        font-size: 10pt;\n        line-height: 15pt\n    }\n\n    p {\n        font-size: 10pt;\n        line-height: 16pt;\n        margin-top: 5px;\n        text-align: justify\n    }\n\n    p:before {\n        content: '';\n        display: block;\n        overflow: hidden;\n        width: 120pt\n    }\n\n    blockquote {\n        border-left: 2px solid #000000;\n        padding-left: 20px\n    }\n\n    ol,ul {\n        margin: 10px 0 0 1.6em;\n        padding: 0\n    }\n\n    ol li,ul li {\n        padding: 2px 0;\n        font-size: 10pt\n    }\n\n    table ol li,table ul li {\n        font-size: inherit\n    }\n\n    .toc {\n        page-break-before: avoid;\n        page-break-after: avoid;\n        background: none;\n        border: 0;\n        display: table\n    }\n\n    .toc a {\n        border: 0;\n        font-weight: normal\n    }\n\n    .toc > ul > li {\n        margin-bottom: 4px;\n        font-weight: bold\n    }\n\n    .toc ul {\n        margin: 0;\n        list-style: none\n    }\n\n    .toc ul ul {\n        padding-left: 30px\n    }\n\n    .toc li.toclevel-1 > a {\n        font-weight: bold;\n        font-size: 10pt\n    }\n\n    .mw-jump-link,.toc .tocnumber {\n        display: none\n    }\n\n    .printfooter {\n        margin-top: 10px;\n        border-top: 3px solid #000000;\n        padding-top: 10px;\n        font-size: 10pt;\n        clear: both\n    }\n\n    #footer {\n        margin-top: 12px;\n        border-top: 1px solid #eeeeee;\n        padding-top: 5px\n    }\n\n    #footer-info {\n        margin: 0;\n        padding: 0\n    }\n\n    #footer-info li {\n        color: #999;\n        list-style: none;\n        display: block;\n        padding-bottom: 10px;\n        font-size: 10pt\n    }\n\n    #footer-info li a {\n        color: #999 !important\n    }\n\n    #footer-info-lastmod {\n        color: #000000;\n        font-size: 12pt;\n        font-weight: bold\n    }\n}\n\n.wb-langlinks-link {\n    line-height: 1.125em;\n    font-size: 0.75em;\n    float: right\n}\n\n.wb-langlinks-link {\n    list-style: none none;\n    text-align: right;\n    padding-right: 0.5em !important\n}\n\n.wb-langlinks-link > a {\n    padding-left: 11px;\n    background: no-repeat left center\n}\n\n.wb-langlinks-link > a:link,.wb-langlinks-link > a:visited {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAD1BMVEUZAAD///95eXmqqqrY2NjEIQ0cAAAAAXRSTlMAQObYZgAAACdJREFUCNdjYGBgYGIAASUFENNJCUiqmADZTM5OqExFFZAKRSG4YgBjcwODynSgDwAAAABJRU5ErkJggg==);\n    background-image: url(/w/extensions/Wikibase/client/resources/images/WBC-Asset-Pencil.png?3bd62);\n    color: #797979 !important\n}\n\n.wb-langlinks-link > a:hover {\n    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKBAMAAAB/HNKOAAAAD1BMVEWBAADY2Nj///8GRa0zZrtW2AECAAAAAXRSTlMAQObYZgAAACdJREFUCNdjYGBgYGYAAWMDEFPYGEgaOgLZzCLCqEwjQ5AKI2W4YgBg5QOTQPzBuAAAAABJRU5ErkJggg==);\n    background-image: url(/w/extensions/Wikibase/client/resources/images/WBC-Asset-Pencil-Hover.png?718b0);\n    color: #0645ad !important\n}\n\ndiv.after-portlet-lang:after {\n    content: '';\n    clear: both;\n    display: block\n}\n"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n\n<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _services_backend_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/backend-api.service */ "./src/app/services/backend-api.service.ts");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/data.service */ "./src/app/services/data.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! .//app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _pages_list_list_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pages/list/list.module */ "./src/app/pages/list/list.module.ts");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");
/* harmony import */ var _components_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/shared-module */ "./src/app/components/shared-module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__["AppRoutingModule"],
                _pages_list_list_module__WEBPACK_IMPORTED_MODULE_7__["ListPageModule"],
                angular_webstorage_service__WEBPACK_IMPORTED_MODULE_8__["StorageServiceModule"],
                _components_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"]
            ],
            providers: [_services_backend_api_service__WEBPACK_IMPORTED_MODULE_3__["BackendApiService"], _services_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/components/icon/icon.component.css":
/*!****************************************************!*\
  !*** ./src/app/components/icon/icon.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/components/icon/icon.component.html":
/*!*****************************************************!*\
  !*** ./src/app/components/icon/icon.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <svg height=\"16px\" \n    id=\"Layer_1\" \n    style=\"enable-background:new 0 0 16 16;\" \n    version=\"1.1\" \n    viewBox=\"0 0 16 16\" \n    width=\"16px\" \n    xml:space=\"preserve\" \n    xmlns=\"http://www.w3.org/2000/svg\" \n    xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <path d=\"M14,8c-0.609,0-0.898,0.43-1,0.883C12.635,10.516,11.084,13,8,13c-0.757,0-1.473-0.172-2.114-0.474L6.414,12  C6.773,11.656,7,11.445,7,11c0-0.523-0.438-1-1-1H3c-0.609,0-1,0.492-1,1v3c0,0.541,0.428,1,1,1c0.484,0,0.688-0.273,1-0.594  l0.408-0.407C5.458,14.632,6.685,15,8,15c4.99,0,7-4.75,7-5.938C15,8.336,14.469,8,14,8z M3,7.117C3.365,5.485,4.916,3,8,3  c0.757,0,1.473,0.171,2.114,0.473L9.586,4C9.227,4.344,9,4.555,9,5c0,0.523,0.438,1,1,1h3c0.609,0,1-0.492,1-1V2  c0-0.541-0.428-1-1-1c-0.484,0-0.688,0.273-1,0.594l-0.408,0.407C10.542,1.368,9.315,1,8,1C3.01,1,1,5.75,1,6.938  C1,7.664,1.531,8,2,8C2.609,8,2.898,7.57,3,7.117z\"/></svg>\n</div>\n"

/***/ }),

/***/ "./src/app/components/icon/icon.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/icon/icon.component.ts ***!
  \***************************************************/
/*! exports provided: IconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconComponent", function() { return IconComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var IconComponent = /** @class */ (function () {
    function IconComponent() {
    }
    IconComponent.prototype.ngOnInit = function () {
    };
    IconComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-icon',
            template: __webpack_require__(/*! ./icon.component.html */ "./src/app/components/icon/icon.component.html"),
            styles: [__webpack_require__(/*! ./icon.component.css */ "./src/app/components/icon/icon.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], IconComponent);
    return IconComponent;
}());



/***/ }),

/***/ "./src/app/components/shared-module.ts":
/*!*********************************************!*\
  !*** ./src/app/components/shared-module.ts ***!
  \*********************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _spinner_spinner_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spinner/spinner.component */ "./src/app/components/spinner/spinner.component.ts");
/* harmony import */ var _icon_icon_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./icon/icon.component */ "./src/app/components/icon/icon.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [],
            declarations: [
                _spinner_spinner_component__WEBPACK_IMPORTED_MODULE_1__["SpinnerComponent"],
                _icon_icon_component__WEBPACK_IMPORTED_MODULE_2__["IconComponent"]
            ],
            exports: [
                _spinner_spinner_component__WEBPACK_IMPORTED_MODULE_1__["SpinnerComponent"],
                _icon_icon_component__WEBPACK_IMPORTED_MODULE_2__["IconComponent"]
            ]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/app/components/spinner/spinner.component.css":
/*!**********************************************************!*\
  !*** ./src/app/components/spinner/spinner.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".lds-ripple {\n    display: inline-block;\n    position: relative;\n    width: 64px;\n    height: 64px;\n    left: 40%;\n    position: relative;\n    top: 50px;\n  }\n  .lds-ripple div {\n    position: absolute;\n    border: 4px solid black;\n    opacity: 1;\n    border-radius: 50%;\n    -webkit-animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;\n  }\n  .lds-ripple div:nth-child(2) {\n    -webkit-animation-delay: -0.5s;\n            animation-delay: -0.5s;\n  }\n  @-webkit-keyframes lds-ripple {\n    0% {\n      top: 28px;\n      left: 28px;\n      width: 0;\n      height: 0;\n      opacity: 1;\n    }\n    100% {\n      top: -1px;\n      left: -1px;\n      width: 58px;\n      height: 58px;\n      opacity: 0;\n    } \n  }\n  @keyframes lds-ripple {\n    0% {\n      top: 28px;\n      left: 28px;\n      width: 0;\n      height: 0;\n      opacity: 1;\n    }\n    100% {\n      top: -1px;\n      left: -1px;\n      width: 58px;\n      height: 58px;\n      opacity: 0;\n    } \n  }"

/***/ }),

/***/ "./src/app/components/spinner/spinner.component.html":
/*!***********************************************************!*\
  !*** ./src/app/components/spinner/spinner.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"lds-ripple\">\n  <div></div>\n  <div></div>\n</div>"

/***/ }),

/***/ "./src/app/components/spinner/spinner.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/components/spinner/spinner.component.ts ***!
  \*********************************************************/
/*! exports provided: SpinnerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinnerComponent", function() { return SpinnerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
    }
    SpinnerComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-spinner',
            template: __webpack_require__(/*! ./spinner.component.html */ "./src/app/components/spinner/spinner.component.html"),
            styles: [__webpack_require__(/*! ./spinner.component.css */ "./src/app/components/spinner/spinner.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SpinnerComponent);
    return SpinnerComponent;
}());



/***/ }),

/***/ "./src/app/models/detail.model.ts":
/*!****************************************!*\
  !*** ./src/app/models/detail.model.ts ***!
  \****************************************/
/*! exports provided: DetailModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailModel", function() { return DetailModel; });
/**
 * cognitive_biasDescription
 * type:"literal"
 * value:"social phenomenon"
 * xml:lang:"en"
 *
 * cognitive_biasLabel
 * type:"literal"
 * value:"Hawthorne effect"
 * xml:lang :"en"
 *
 * wikiMedia label & description.
 * the sortName is a label from either
 */
var DetailModel = /** @class */ (function () {
    function DetailModel() {
    }
    return DetailModel;
}());



/***/ }),

/***/ "./src/app/pages/list/list.module.ts":
/*!*******************************************!*\
  !*** ./src/app/pages/list/list.module.ts ***!
  \*******************************************/
/*! exports provided: ListPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPageModule", function() { return ListPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _list_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list.page */ "./src/app/pages/list/list.page.ts");
/* harmony import */ var _components_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/shared-module */ "./src/app/components/shared-module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var ListPageModule = /** @class */ (function () {
    function ListPageModule() {
    }
    ListPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _components_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _list_page__WEBPACK_IMPORTED_MODULE_3__["ListPage"]
                    }
                ])
            ],
            declarations: [_list_page__WEBPACK_IMPORTED_MODULE_3__["ListPage"]]
        })
    ], ListPageModule);
    return ListPageModule;
}());



/***/ }),

/***/ "./src/app/pages/list/list.page.html":
/*!*******************************************!*\
  !*** ./src/app/pages/list/list.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header\">\n  <div class=\"left\">\n    <span *ngIf=\"list\"> {{ list.length }}</span> \n      {{ title }} \n    <span class=\"header__refreshIcon\">\n      <app-icon (click)=\"refreshList()\"></app-icon>\n    </span>\n  </div>\n  <select name=\"listLang\" \n    class=\"right\"\n    (change)=\"onLanguageChange($event.target.value)\">\n    <option value=\"en\" selected=\"{{listLanguage === 'en'}}\">English</option>\n    <option value=\"ko\" selected=\"{{listLanguage === 'ko'}}\">Korean</option>\n  </select>\n</div>\n<app-spinner *ngIf=\"!list\"></app-spinner>\n<ul class=\"list\">\n  <div *ngFor=\"let item of list; let i = index\">\n    <li *ngIf=\"item.cognitive_biasLabel || item.wikiMedia_label\">\n      <h4 (click)=\"navigateAction(item.sortName, i)\"\n        [ngClass]=\"{\n          'list__both': item.cognitive_biasLabel && item.wikiMedia_label, \n          'list__text-wikimedia': !item.cognitive_biasLabel,\n          'list__item--viewed': item.detailState ==='viewed'}\">\n        {{ item.sortName }} <span *ngIf=\"item.backupTitle !== undefined && item.sortName !== item.backupTitle && item.backupTitle.length > 1\">({{ item.backupTitle }})</span>\n      </h4>\n    </li>\n  </div>\n</ul>\n"

/***/ }),

/***/ "./src/app/pages/list/list.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/list/list.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  text-align: center;\n  border-bottom: 1px solid black;\n  padding-bottom: 25px;\n  position: fixed;\n  left: -1px;\n  width: 100%;\n  margin-top: 5px;\n  margin-top: -16px;\n  padding-top: 5px;\n  background-color: beige; }\n\n.header__refreshIcon {\n  position: relative;\n  top: -17px;\n  right: -90px; }\n\n.small_arrow {\n  font-size: 1em; }\n\nion-item-options {\n  background-color: tomato; }\n\n.version_text {\n  font-size: 0.4em; }\n\n.list__text::first-letter {\n  text-transform: capitalize; }\n\n.list {\n  padding-top: 7px; }\n\n.list li {\n    list-style-type: none;\n    color: green; }\n\n.list__both {\n  color: black; }\n\n.list__text-wikimedia {\n  color: LightSalmon; }\n\n.list__item--viewed {\n  opacity: 0.3; }\n\n.left {\n  position: absolute;\n  margin-left: 5px; }\n\n.right {\n  position: absolute;\n  right: 0;\n  border: 0px;\n  outline: 0px;\n  background-color: beige; }\n\n.right:focus, select:focus {\n  outline: none; }\n"

/***/ }),

/***/ "./src/app/pages/list/list.page.ts":
/*!*****************************************!*\
  !*** ./src/app/pages/list/list.page.ts ***!
  \*****************************************/
/*! exports provided: ListPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListPage", function() { return ListPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_backend_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/backend-api.service */ "./src/app/services/backend-api.service.ts");
/* harmony import */ var _models_detail_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/detail.model */ "./src/app/models/detail.model.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/data.service */ "./src/app/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListPage = /** @class */ (function () {
    function ListPage(backendApiService, router, dataService) {
        this.backendApiService = backendApiService;
        this.router = router;
        this.dataService = dataService;
        this.title = 'Cognitive Biases';
        this.repeats = 0;
        this.media = 0;
        this.listName = 'list';
        this.optionsName = 'options';
    }
    /**
     *  Get the options find the current language settings, then get the list from storage.
     */
    ListPage.prototype.ngOnInit = function () {
        var _this = this;
        this.getOptionsViaStorage().then(function () {
            _this.getListViaStorage();
        });
    };
    /**
     * Load the list again via http which will overwrite the current list including options.
     */
    ListPage.prototype.refreshList = function () {
        this.getListViaHttp();
    };
    /**
     * Get the options from local storage.
     */
    ListPage.prototype.getOptionsViaStorage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.dataService.getItemViaStorage(_this.optionsName).then(function (result) {
                if (result) {
                    _this.listLanguage = result;
                    resolve();
                }
            }).catch(function () {
                _this.listLanguage = 'en';
                resolve();
            });
        });
    };
    /**
     * Get the list from local storage or if it doesn't exist, from the http service.
     */
    ListPage.prototype.getListViaStorage = function () {
        var _this = this;
        this.dataService.getItemViaStorage(this.listLanguage + '-' + this.listName).then(function (result) {
            if (result) {
                _this.list = result;
            }
        }).catch(function () {
            _this.getListViaHttp();
        });
    };
    /**
     * Get a list of items from the server using the language settings.
     */
    ListPage.prototype.getListViaHttp = function () {
        var _this = this;
        this.list = [];
        this.backendApiService.getList(this.listLanguage).subscribe(function (data) {
            _this.list = data['list'];
            // remove items that do not have a page in the requested language
            _this.list.slice().reverse().forEach(function (item, index, object) {
                if (!_this.languagePageDoesNotExist(item, index)) {
                    _this.list.splice(object.length - 1 - index, 1);
                }
                else {
                    item.sortName = item.cognitive_biasLabel;
                }
            });
            _this.getWikiSections();
        }, function (error) {
            console.error('error', error);
        });
    };
    /**
     * If a page only has a Q-code, it does not have data for that item in the language requested.
     * Example:
     * "cognitive_biasLabel" : {
     *     "type" : "literal",
     *     "value" : "Q177603"
     * }
     * @param item WikiData item to check if a language page exists
     */
    ListPage.prototype.languagePageDoesNotExist = function (item, index) {
        var label = item.cognitive_biasLabel;
        var first = label.substr(0, 1);
        var second = label.substr(1, 2);
        if (first === 'Q' && !isNaN(second) || typeof label === 'undefined') {
            // no page exists
            return false;
        }
        else {
            // page exists
            return true;
        }
    };
    /**
     * Fetch the section list from the server, parse its and add
     * it to the list then re-sort.
     * The three calls and adding items should all complete before the add
     * TODO: use async/await here.  This is just a temporary test to see
     * if it will indeed fix the occasional (list.page.ts:85) error.
     * @param sectionNum Number of section to get
     */
    ListPage.prototype.getWikiSections = function () {
        var _this = this;
        this.backendApiService.loadWikiMedia(1, this.listLanguage).subscribe(function (data) {
            var section = _this.parseSectionList(data);
            if (section) {
                _this.addItems(section);
                _this.backendApiService.loadWikiMedia(2, _this.listLanguage).subscribe(function (data) {
                    var section = _this.parseSectionList(data);
                    _this.addItems(section);
                    _this.backendApiService.loadWikiMedia(3, _this.listLanguage).subscribe(function (data) {
                        var section = _this.parseSectionList(data);
                        _this.addItems(section);
                        // finally sort the list and store it
                        _this.list.sort(_this.dynamicSort('sortName'));
                        _this.dataService.setItem(_this.listLanguage + '-' + _this.listName, _this.list);
                    }, function (error) {
                        console.error('error in 3', error);
                    });
                }, function (error) {
                    console.error('error in 2', error);
                });
            }
        }, function (error) {
            console.error('error in 1', error);
        });
    };
    /**
     * The Ege Özcan solution from [the answer to this question](https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript)
     * back in 2011.
     * @param property to sort by
     */
    ListPage.prototype.dynamicSort = function (property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    };
    /**
     * Take a complete section of names and descriptions and either add the content
     * to a pre-existing item or create a new item if it is not already on the list.
     *
     * @param section WIkiMedia section
     */
    ListPage.prototype.addItems = function (section) {
        for (var i = 0; i < section.length; i++) {
            //console.log('item:'+i+' ',section[i]);
            var itemName = section[i].name;
            var backupTitle = void 0;
            if (typeof section[i]['backupTitle'] !== 'undefined') {
                backupTitle = section[i]['backupTitle'];
            }
            var found = false;
            for (var j = 0; j < this.list.length; j++) {
                if ((typeof this.list[j].cognitive_biasLabel !== 'undefined' && typeof itemName !== 'undefined') && this.list[j].cognitive_biasLabel.toLocaleUpperCase() === itemName.toLocaleUpperCase()) {
                    found = true;
                    this.list[j].wikiMedia_label = itemName;
                    this.list[j].wikiMedia_description = section[i].description;
                    this.list[j].wikiMedia_category = section[i].category;
                    this.list[j].sortName = itemName.charAt(0).toUpperCase() + itemName.substr(1);
                    if (backupTitle) {
                        this.list[j].backupTitle = backupTitle;
                    }
                    this.repeats++;
                    break;
                }
            }
            if (!found) {
                var wikiMediaObj = new _models_detail_model__WEBPACK_IMPORTED_MODULE_2__["DetailModel"]();
                wikiMediaObj.wikiMedia_label = itemName;
                wikiMediaObj.wikiMedia_description = section[i].description;
                wikiMediaObj.wikiMedia_category = section[i].category;
                wikiMediaObj.sortName = itemName.split('"').join('');
                wikiMediaObj.sortName.charAt(0).toUpperCase() + wikiMediaObj.sortName.substr(1);
                if (backupTitle) {
                    wikiMediaObj.backupTitle = backupTitle;
                }
                this.list.push(wikiMediaObj);
                this.media++;
            }
        }
    };
    /**
     * Usually the name of item can be gotten from the inner text of an <a> tag inside the table cell.
     * A few however, like 'frequency illusion' are not links, so are just the contents of the <td> tag.
     * Some, such as 'regression bias' have a <span> inside the tag.
     * The category descriptions can be had like this:
     * if (typeof desc[1].getElementsByTagName('a')[0] !== 'undefined') {
     *    console.log('desc1',desc[1].getElementsByTagName('a')[0].innerText);
     * }
     * @param data result of a WikiMedia section API call
     * @returns Array of name/desc objects
     */
    ListPage.prototype.parseSectionList = function (data) {
        if (data['parse']) {
            var content = data['parse']['text']['*'];
            var one = this.createElementFromHTML(content);
            var desc = one.getElementsByClassName('mw-parser-output')[0].children;
            var descriptions = [];
            var category = desc[0].getElementsByClassName('mw-headline')[0].innerText;
            var allDesc = desc[2];
            var tableRows = allDesc.getElementsByTagName('tr');
            for (var i = 0; i < tableRows.length; i++) {
                var tableDiv = tableRows[i].getElementsByTagName('td');
                if (typeof tableDiv[0] !== 'undefined') {
                    var itemDesc = void 0;
                    if (typeof tableDiv[1] !== 'undefined') {
                        itemDesc = tableDiv[1].innerText;
                    }
                    var itemName = void 0;
                    var backupTitle = void 0; // used as a potential link when the name link returns a 500 error
                    if (typeof tableDiv[0].getElementsByTagName('a')[0] !== 'undefined') {
                        itemName = tableDiv[0].getElementsByTagName('a')[0].innerText;
                        backupTitle = this.getAnchorTitleForBackupTitle(tableDiv[0], itemName);
                    }
                    else if (typeof tableDiv[0].getElementsByTagName('span')[0] !== 'undefined') {
                        itemName = tableDiv[0].getElementsByTagName('span')[0].innerText;
                    }
                    else if (typeof tableDiv[0].innerText !== 'undefined') {
                        itemName = tableDiv[0].innerText;
                    }
                    else {
                        console.log('failed to get', tableDiv[0]);
                    }
                    var newItem = this.createNewItem(itemName, itemDesc, category, backupTitle);
                    descriptions.push(newItem);
                }
            }
            return descriptions;
        }
    };
    ListPage.prototype.createNewItem = function (itemName, itemDesc, category, backupTitle) {
        var newItem = {
            'name': itemName,
            'desc': itemDesc,
            'category': category
        };
        if (backupTitle) {
            newItem['backupTitle'] = backupTitle;
        }
        return newItem;
    };
    /**
     * Parse the anchor tag for the title of the item used in the tag,
     * which can be different from the name of the item.
     * @param tableDiv the DOM element
     * @param itemName the item name
     */
    ListPage.prototype.getAnchorTitleForBackupTitle = function (tableDiv, itemName) {
        var titleProp = tableDiv.getElementsByTagName('a')[0].title;
        var backupLink;
        var backupTitle;
        var href = tableDiv.getElementsByTagName('a')[0].href;
        if (href) {
            var slash = href.lastIndexOf('/');
            backupLink = href.substr(slash + 1, href.length);
        }
        if (href.indexOf('index.php') !== -1) {
            backupTitle = -1; // we have a missing detail page
        }
        if (itemName !== titleProp && backupTitle !== -1) {
            backupTitle = titleProp;
        }
        return backupTitle;
    };
    /**
     * Parse the anchor tag for the link section of the item title similar to the
     * getAnchorTitleForBackupTitle() function.  The element can look like this:
     * <tr>
     *  <td>
     *      <a href=\"/wiki/Zero-sum_thinking\"
     *          title=\"Zero-sum thinking\">Zero-sum bias</a>
     *  </td>
     * </tr>
     * Even though the title is a bias, the link and page redirects to thinking.
     * This will be used if the item name used as a link and lower-cased returns
     * a 500 error from the server.
     * @param tableDiv the DOM element
     * @param itemName the item name
     * @returns backup link which can be used in case of a redirect
     */
    ListPage.prototype.getAnchorTitleForBackupLink = function (tableDiv, itemName) {
        var backupLink;
        var titleProp = tableDiv.getElementsByTagName('a')[0].title;
        var href = tableDiv.getElementsByTagName('a')[0].href;
        if (href) {
            var slash = href.lastIndexOf('/');
            backupLink = href.substr(slash + 1, href.length);
        }
        if (href.indexOf('index.php') !== -1) {
            backupLink = null; // we have a missing detail page
        }
        // this will tell us if the name and the title are different
        // if they are then we want to add a backupTitle.
        // if they aren't then we will return null
        if (itemName !== titleProp && backupLink) {
            //console.log('backupLink',backupLink);
            return backupLink;
        }
        else {
            return null;
        }
    };
    /**
     * Set the lang, delete the list and call on init again.
     * This will have to change for local storage.
     * @param value event from the lang select
     */
    ListPage.prototype.onLanguageChange = function (value) {
        this.listLanguage = value;
        this.list = null;
        this.dataService.setItem(this.optionsName, this.listLanguage);
        this.ngOnInit();
    };
    /**
     * Convert the result content to an html node for easy access to the content.
     * Change this to div.childNodes to support multiple top-level nodes
     * @param htmlString
     */
    ListPage.prototype.createElementFromHTML = function (htmlString) {
        var div = document.createElement('div');
        var page = '<div>' + htmlString + '</div>';
        div.innerHTML = page.trim();
        return div;
    };
    /**
     * Remove the [edit] portion of the title.
     * @param HTMLDivElement
     */
    ListPage.prototype.parseTitle = function (html) {
        var title = html.getElementsByTagName('h2')[0].innerText;
        var bracket = title.indexOf('[');
        if (bracket > 0) {
            title = title.substr(0, bracket);
        }
        return title;
    };
    /**
     * Go to the detail page.  If an item has a backup title, add that to the route.
     * @param item Set state as viewed, get language setting, create list name, and/or title
     * And pass on to the detail page.
     * @param i item index
     */
    ListPage.prototype.navigateAction = function (item, i) {
        this.list[i].detailState = 'viewed';
        this.dataService.setItem(this.listLanguage + '-' + this.listName, this.list);
        var itemRoute = item.replace(/\s+/g, '_').toLowerCase();
        if (typeof this.list[i]['backupTitle'] !== 'undefined') {
            var backupTitle = this.list[i]['backupTitle'];
            this.router.navigate(['detail/' + itemRoute + '/' + this.listLanguage + '/' + backupTitle]);
        }
        else {
            this.router.navigate(['detail/' + itemRoute + '/' + this.listLanguage]);
        }
    };
    ListPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-list',
            template: __webpack_require__(/*! ./list.page.html */ "./src/app/pages/list/list.page.html"),
            styles: [__webpack_require__(/*! ./list.page.scss */ "./src/app/pages/list/list.page.scss")],
        }),
        __metadata("design:paramtypes", [_services_backend_api_service__WEBPACK_IMPORTED_MODULE_1__["BackendApiService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_data_service__WEBPACK_IMPORTED_MODULE_4__["DataService"]])
    ], ListPage);
    return ListPage;
}());



/***/ }),

/***/ "./src/app/services/backend-api.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/backend-api.service.ts ***!
  \*************************************************/
/*! exports provided: BackendApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackendApiService", function() { return BackendApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BackendApiService = /** @class */ (function () {
    function BackendApiService(httpClient) {
        this.httpClient = httpClient;
        this.backendListUrl = '/api/list';
        this.backendWikiListUrl = '/api/wiki-list';
        this.backendDetailUrl = '/api/detail';
    }
    // get("/api/contacts")
    BackendApiService.prototype.getList = function (lang) {
        var _this = this;
        return this.httpClient.get(this.backendListUrl + '/' + lang)
            .pipe(function (data) { return _this.listData = data; });
    };
    BackendApiService.prototype.getDetail = function (detailId, lang, leaveCaseAlone) {
        return this.httpClient.get(encodeURI(this.backendDetailUrl + '/' + detailId + '/' + lang + '/' + leaveCaseAlone))
            .pipe(function (data) { return data; });
    };
    BackendApiService.prototype.loadWikiMedia = function (sectionNum, lang) {
        return this.httpClient.get(encodeURI(this.backendWikiListUrl + '/' + sectionNum + '/' + lang))
            .pipe(function (data) { return data; });
    };
    BackendApiService.prototype.createElementFromHTML = function (htmlString) {
        var div = document.createElement('div');
        var page = '<div>' + htmlString + '</div>';
        div.innerHTML = page.trim();
        return div;
    };
    BackendApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], BackendApiService);
    return BackendApiService;
}());



/***/ }),

/***/ "./src/app/services/data.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/data.service.ts ***!
  \******************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angular_webstorage_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! angular-webstorage-service */ "./node_modules/angular-webstorage-service/bundles/angular-webstorage-service.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var DataService = /** @class */ (function () {
    function DataService(storage) {
        this.storage = storage;
    }
    DataService.prototype.setItem = function (itemName, item) {
        return this.storage.set(itemName, item);
    };
    DataService.prototype.getItemViaStorage = function (itemName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.storage.get(itemName)) {
                resolve((_this.storage.get(itemName)));
            }
            else {
                reject();
            }
        });
    };
    DataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(angular_webstorage_service__WEBPACK_IMPORTED_MODULE_1__["SESSION_STORAGE"])),
        __metadata("design:paramtypes", [Object])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/tim/repos/loranthifolia-teretifolia-curator/conchifolia/my-dream-app/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map