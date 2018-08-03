(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-list-list-module"],{

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

module.exports = "<h2 class=\"header\">{{ title }} <span *ngIf=\"list\">{{list.length}}</span></h2>\n<ul class=\"list\">\n  <div *ngFor=\"let item of list\">\n    <li *ngIf=\"item.cognitive_biasLabel || item.wikiMedia_label\">\n      <h4 (click)=\"navigateAction(item.sortName)\"\n        [ngClass]=\"{list_both: item.cognitive_biasLabel && item.wikiMedia_label}\"\n        >{{ item.cognitive_biasLabel }}</h4>\n    </li>\n  </div>\n</ul>\n"

/***/ }),

/***/ "./src/app/pages/list/list.page.scss":
/*!*******************************************!*\
  !*** ./src/app/pages/list/list.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  text-align: center;\n  border-bottom: 1px solid #a2a9b1; }\n\n.small_arrow {\n  font-size: 1em; }\n\nion-item-options {\n  background-color: tomato; }\n\n.version_text {\n  font-size: 0.4em; }\n\n.list__text::first-letter {\n  text-transform: capitalize; }\n\n.list li {\n  list-style-type: none;\n  color: green; }\n\n.list__both {\n  color: black; }\n\n.list__text-wikimedia {\n  color: teal; }\n"

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
    function ListPage(backendApiService, router) {
        this.backendApiService = backendApiService;
        this.router = router;
        this.title = 'List of Cognitive Bias';
        this.repeats = 0;
    }
    ListPage.prototype.ngOnInit = function () {
        var _this = this;
        this.backendApiService.getList().subscribe(function (data) {
            _this.list = data['list'];
            _this.list.forEach(function (item) {
                item.sortName = item.cognitive_biasLabel;
            });
        }, function (error) {
            console.error('error', error);
        });
        // get WikiMedia sections
        this.backendApiService.loadWikiMedia('1').subscribe(function (data) {
            var section1 = _this.parseList(data);
            _this.addItems(section1);
            _this.list.sort(_this.dynamicSort('sortName'));
        }, function (error) {
            console.error('error', error);
        });
        this.backendApiService.loadWikiMedia('2').subscribe(function (data) {
            var section2 = _this.parseList(data);
            _this.addItems(section2);
            _this.list.sort(_this.dynamicSort('sortName'));
        }, function (error) {
            console.error('error', error);
        });
        this.backendApiService.loadWikiMedia('3').subscribe(function (data) {
            var section3 = _this.parseList(data);
            _this.addItems(section3);
            _this.list.sort(_this.dynamicSort('sortName'));
        }, function (error) {
            console.error('error', error);
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
            var found = false;
            for (var j = 0; j < this.list.length; j++) {
                if ((typeof this.list[i].cognitive_biasLabel !== 'undefined' && typeof itemName !== 'undefined') && this.list[i].cognitive_biasLabel.toLocaleUpperCase() === itemName.toLocaleUpperCase()) {
                    found = true;
                    this.list[j].wikiMedia_label = itemName;
                    this.list[j].wikiMedia_description = section[i].description;
                    this.list[j].wikiMedia_category = section[i].category;
                    this.list[j].sortName = itemName;
                    break;
                }
                this.repeats++;
            }
            if (!found) {
                var wikiMediaObj = new _models_detail_model__WEBPACK_IMPORTED_MODULE_2__["DetailModel"]();
                wikiMediaObj.wikiMedia_label = itemName;
                wikiMediaObj.wikiMedia_description = section[i].description;
                wikiMediaObj.wikiMedia_category = section[i].category;
                wikiMediaObj.sortName = itemName;
                this.list.push(wikiMediaObj);
            }
        }
    };
    /**
     * Usually the name of item can be gotten from the inner text of an <a> tag inside the table cell.
     * A few however, like 'frequency illusion' are not links, so are just the contents of the <td> tag.
     * Some, such as 'regression bias' have a <span> inside the tag.
     * @param data result of a WikiMedia section API call
     * @returns Array of name/desc objects
     */
    ListPage.prototype.parseList = function (data) {
        var content = data['parse']['text']['*'];
        var one = this.createElementFromHTML(content);
        var desc = one.getElementsByClassName('mw-parser-output')[0].children;
        var descriptions = [];
        var category = desc[0].getElementsByClassName('mw-headline')[0].innerText;
        // might use category descriptions later
        // if (typeof desc[1].getElementsByTagName('a')[0] !== 'undefined') {
        //   console.log('desc1',desc[1].getElementsByTagName('a')[0].innerText);
        // } else {
        //   console.log(desc[1]);
        // }
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
                if (typeof tableDiv[0].getElementsByTagName('a')[0] !== 'undefined') {
                    itemName = tableDiv[0].getElementsByTagName('a')[0].innerText;
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
                var newItem = {
                    'name': itemName,
                    'desc': itemDesc,
                    'category': category
                };
                descriptions.push(newItem);
            }
        }
        return descriptions;
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
    ListPage.prototype.navigateAction = function (item) {
        var itemRoute = item.replace(/\s+/g, '_').toLowerCase();
        this.router.navigate(['detail/' + itemRoute]);
    };
    ListPage = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-list',
            template: __webpack_require__(/*! ./list.page.html */ "./src/app/pages/list/list.page.html"),
            styles: [__webpack_require__(/*! ./list.page.scss */ "./src/app/pages/list/list.page.scss")],
        }),
        __metadata("design:paramtypes", [_services_backend_api_service__WEBPACK_IMPORTED_MODULE_1__["BackendApiService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], ListPage);
    return ListPage;
}());



/***/ })

}]);
//# sourceMappingURL=pages-list-list-module.js.map