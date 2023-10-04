function ConvertToHTML(element) {
    var domElement = m('div', element);

    if(Array.isArray(element)) {
        if(element.length == 2) {
            domElement = ConvertToDOM(element[0], element[1]);
        } else {
            domElement = m(element[0], element[1], element[2]);
        }
    }

    return domElement;
}

function ConvertToDOM(tag, content) {
    var domElement = m(tag, content);

    if(Array.isArray(content)) {
        domElement = m(tag, content.map((element) => typeof(element) === 'object' ? ConvertToHTML(element) : element));
    }

    return domElement;
}

m.render(document.body, resume.map((element) => ConvertToHTML(element)));