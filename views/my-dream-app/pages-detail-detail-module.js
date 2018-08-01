(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-detail-detail-module"],{

/***/ "./src/app/pages/detail/detail.module.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/detail/detail.module.ts ***!
  \***********************************************/
/*! exports provided: DetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailPageModule", function() { return DetailPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _detail_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./detail.page */ "./src/app/pages/detail/detail.page.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: _detail_page__WEBPACK_IMPORTED_MODULE_3__["DetailPage"]
    }
];
var DetailPageModule = /** @class */ (function () {
    function DetailPageModule() {
    }
    DetailPageModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)
            ],
            declarations: [_detail_page__WEBPACK_IMPORTED_MODULE_3__["DetailPage"]]
        })
    ], DetailPageModule);
    return DetailPageModule;
}());



/***/ }),

/***/ "./src/app/pages/detail/detail.page.html":
/*!***********************************************!*\
  !*** ./src/app/pages/detail/detail.page.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<h2 class=\"title\">{{title}}</h2>\n<p [innerHTML]=\"descriptions\"></p>"

/***/ }),

/***/ "./src/app/pages/detail/detail.page.scss":
/*!***********************************************!*\
  !*** ./src/app/pages/detail/detail.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".back_arrow {\n  font-size: 1.5em !important; }\n\n.back_button {\n  background-color: transparent;\n  position: relative;\n  top: 2px; }\n\n.title::first-letter {\n  text-transform: capitalize; }\n"

/***/ }),

/***/ "./src/app/pages/detail/detail.page.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/detail/detail.page.ts ***!
  \*********************************************/
/*! exports provided: DetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailPage", function() { return DetailPage; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_backend_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/backend-api.service */ "./src/app/services/backend-api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DetailPage = /** @class */ (function () {
    function DetailPage(route, backendApiService) {
        this.route = route;
        this.backendApiService = backendApiService;
        this.descriptions = [];
    }
    DetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.itemName = this.route.snapshot.paramMap.get('id');
        this.title = this.itemName.split('_').join(' ');
        this.backendApiService.getDetail(this.itemName).subscribe(function (data) {
            _this.descriptions = data['description'];
            console.log('this.descriptions', _this.descriptions);
        }, function (error) {
            console.error('error', error);
        });
    };
    DetailPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-detail',
            template: __webpack_require__(/*! ./detail.page.html */ "./src/app/pages/detail/detail.page.html"),
            styles: [__webpack_require__(/*! ./detail.page.scss */ "./src/app/pages/detail/detail.page.scss")],
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _services_backend_api_service__WEBPACK_IMPORTED_MODULE_2__["BackendApiService"]])
    ], DetailPage);
    return DetailPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-detail-detail-module.js.map