fixture.setBase('assignment');

var logSpy;

beforeEach(function () {
        logSpy = sinon.spy(window.console, 'log');

        fixture.load('index.html');
      });

afterEach(function () {
  fixture.cleanup();
  logSpy.restore();
});

describe('basemode HTML content', function () {
  it('should have a title of Hello World', function () {
    var childIndex = getIndexOfType(HTMLTitleElement, fixture.el.childNodes);
    expect(fixture.el.childNodes[childIndex].innerHTML).to.equal('Hello World');
  });

  it('should source in JavaScript', function () {
    var childIndex = getIndexOfType(HTMLScriptElement, fixture.el.childNodes);
    expect(fixture.el.childNodes[childIndex].src).to.contain('.js');
  });

  it('should source in CSS', function () {
    var childIndex = getIndexOfType(HTMLLinkElement, fixture.el.childNodes);
    expect(fixture.el.childNodes[childIndex].href).to.contain('.css');
  });

  it('should have an H1 heading', function () {
    var childIndex = getIndexOfType(HTMLHeadingElement, fixture.el.childNodes);
    expect(fixture.el.childNodes[childIndex].tagName.toLowerCase()).to.equal('h1');
  });

  it('should have a paragraph', function () {
    var childIndex = getIndexOfType(HTMLParagraphElement, fixture.el.childNodes);
    expect(childIndex).to.exist;
  });
});

describe('basemode JavaScript', function () {
  it('should console log Hello World', function () {
    sayHello();
    var logArgs = logSpy.args[0][0];
    expect(logArgs.toLowerCase()).to.contain('hello world');
  });
});

function getIndexOfType(type, node) {
  var index = null;
  for (var i = 0; i < node.length; i++) {
    if (node[i] instanceof type) {
      index = i;
    }
  }
  return index;
}
