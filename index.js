function ConvertToHTML(element) {
    var domElement = m('div', element);

    if(Array.isArray(element)) {
        if(element.length == 2) {
            domElement = m(element[0], element[1]);
        } else {
            domElement = m(element[0], element[1], element[2]);
        }
    }

    return domElement;
}

m.render(document.body, resume.map((element) => ConvertToHTML(element)));