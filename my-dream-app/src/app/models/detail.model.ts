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
export class DetailModel {
    cognitive_biasLabel: string;
    cognitive_biasDescription: string;
    wikiMedia_label: string;
    wikiMedia_description: string;
    wikiMedia_category: string;
    sortName: string;
    lang: string;
    // item state
    detailState:  string; // un-viewed/viewed
    descriptionState:  string; // un-viewed/viewed
    itemState:  string; // show/removed
    itemOrder:  string; // itemOrderNumber
    listSortingProperty:  string; // property name (default sortName)
}