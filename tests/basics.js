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
    // expect(fixture.el.childNodes[childIndex].innerHTML).to.match(/^[hH]ello [wW]orld/);
    // accept any string with some letters but not an empty one. symbols are fine.
    expect(fixture.el.childNodes[childIndex].innerHTML).to.match(/^[a-zA-Z0-9!\-]+/);
  });

  it('should source in JavaScript', function () {
    var childIndex = getIndexOfType(HTMLScriptElement, fixture.el.childNodes);
    expect(fixture.el.childNodes[childIndex].src).to.contain('.js');
  });

  it('should source in CSS', function () {
    // pull out all link element nodes
    var linkNodes = getIndicesOfType(HTMLLinkElement, fixture.el.childNodes);
    // we should have at least 1
    expect(linkNodes.length).to.be.above(0);

    // check each link element node
    linkNodes.forEach(function(link) {
      // makes sure we have the proper relation set
      expect(link.rel).to.equal('stylesheet');
      // . checks to make sure there is either an extension or a domain. css is what we're looking for
      expect(link.href).to.contain('.')
        .and.to.contain('css');
    });

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

function getIndicesOfType(type, node) {
  var nodes = [];
  for (var i = 0; i < node.length; i++) {
    if (node[i] instanceof type) {
      nodes.push(node[i]);
    }
  }
  return nodes;
}
