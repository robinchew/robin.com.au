/**
 * Takes in a list of elements and returns a list of virtual of DOM Elemnts
 */
function ConvertListToDOM(listOfElements) {
    var ListOfDOM = [];

    for(var i = 0; i < listOfElements.length; i++)
    {
        // Check if there is a nested/sub list by checking for an object instead of an array
        if(typeof(listOfElements[i]) === 'object' && !Array.isArray(listOfElements[i])) {
            if(Array.isArray(listOfElements[i].title)) {
                listOfElements[i].title.push(['ul', listOfElements[i].list]);
                ListOfDOM.push(ConvertToHTML(['li', listOfElements[i].title]));
            } else {
                ListOfDOM.push(ConvertToHTML(['li', [listOfElements[i].title, ['ul', listOfElements[i].list]]]));
            }
        // Checks if there is a Hyperlink as a item in the list
        } else if(listOfElements[i][0] === 'a') {
            ListOfDOM.push(ConvertToHTML(['li', ConvertToHTML(listOfElements[i])]));
        } else {
            ListOfDOM.push(ConvertToHTML(['li', listOfElements[i]]));
        }
    }

    return m('ul', ListOfDOM);
}

function ConvertToHTML(element) {
    var domElement = m('div', element);

    if(Array.isArray(element)) {
        if(element.length == 2) {
            if(element[0] === 'ul') {
                domElement = ConvertListToDOM(element[1]);
            } else {
                if(Array.isArray(element[1])) {
                    domElement = m(element[0], element[1].map((element) => typeof(element) === 'object' ? ConvertToHTML(element) : element));
                } else {
                    domElement = m(element[0], element[1]);
                }
            }
        } else {
            if(Array.isArray(element[2])){
                domElement = m(element[0], element[1], element[2].map((element) => typeof(element) === 'object' ? ConvertToHTML(element) : element));
            } else {
                domElement = m(element[0], element[1], element[2]);
            }
        }
    }

    return domElement;
}

m.render(document.body, resume.map((element) => ConvertToHTML(element)));