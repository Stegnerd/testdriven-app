import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
import jsdom from 'jsdom'

// added this to fix errors in app.test.jsx
// fixed: Enzyme's mount expects a DOM environment to be loaded, but found none
// fixed: ReferenceError: window is not defined
function setUpDomEnvironment() {
    const { JSDOM } = jsdom;
    const dom = new JSDOM('<!doctype html><html><body></body></html>', {url: 'http://localhost/'});
    const { window } = dom;

    global.window = window;
    global.document = window.document;
    global.navigator = {
        userAgent: 'node.js',
    };
    copyProps(window, global);
}

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}

setUpDomEnvironment();
configure({adapter: new Adapter ()});