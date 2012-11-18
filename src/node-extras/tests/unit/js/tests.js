YUI.add('module-tests', function(Y) {

var Assert = Y.Assert,
    ArrayAssert = Y.ArrayAssert,
    suite = new Y.Test.Suite("yuisuite");

var byId = function(id) {
    return document.getElementById(id);
};

var $ = Y.Selector.query;

suite.add( new Y.Test.Case({
    name: 'Node frag',
    "frag should return a Document Fragment Node": function() {
        var node = Y.Node.frag();
        Y.Assert.areEqual(11, node.get('nodeType'));
    }
}));

suite.add( new Y.Test.Case({
    name: 'Node outerHTML',
    "outerHTML of a fragment should return the fragment": function() {
            Y.Assert.areEqual("<p>oops</p>", Y.Node.create("<p>oops</p>").get('outerHTML'));
        },
        // In the following test, I allow the result to be one of several options because of how IE will
        // tend to return outerHTML. Since either output can be sent to Y.Node.create to create a new DOM
        // fragment which is functionally identical to the earlier fragment, I find this behaviour acceptable
        "outerHTML of a node not a valid child of a div should return the appropriate string": function() {
            var node = Y.one("#test-outerHTML li"),
                node2 = Y.one("#test-outerHTML option"),
                liExpected = [ "<li>item 1</li>", // Firefox, Chrome, etc
                               "<li>item 1"], // IE
                optionExpected = ['<option value="1">option 1</option>', // Firefox, Chrome, etc
                                  '<option value=1>option 1</option>']; // IE
                
            ArrayAssert.contains(node.get('outerHTML'), liExpected, "Failed to process LI");
            ArrayAssert.contains(node2.get('outerHTML'), optionExpected, "Failed to process OPTION");
        }
    }));

    suite.add( new Y.Test.Case({
        name: 'Node one and all',
        'one with no arguments should return the first child': function() {
            var node = Y.one('#test-swap'),
                oneNoArgs = node.one(),
                oneChildSelector = node.one('> *');

            Y.Assert.areEqual(oneNoArgs, oneChildSelector);
        },
        'all with no arugemnts should return all children': function() {
            var node = Y.one('#test-swap'),
                allNoArgs = node.all(),
                allChildSelector = node.all('> *');

            Y.Assert.areEqual(allNoArgs.size(), allChildSelector.size());
            Y.ArrayAssert.itemsAreEqual(allNoArgs._nodes, allChildSelector._nodes);
        }
    }));

    suite.add( new Y.Test.Case({
        name: 'Node WrapInner',
        "Node.wrapInner should create a simple wrapper around a Node's contents": function() {
            var node = Y.one('#test-frag'), nl;
            node.wrapInner('<div class="inner" />');
            nl = node.all('> *');
            Y.Assert.areEqual(1, nl.size());
            Y.Assert.isTrue(nl.item(0).test('.inner'));
        },
        "test Node.wrapInner creating a multi-layered wrapper around text node": function() {
            var node = Y.one('#test-computed'), nl;
            node.wrapInner('<div class="outer"><div class="inner" /></div>');
            nl = node.all('> *');
            Y.Assert.areEqual(1, nl.size());
            Y.Assert.isTrue(nl.item(0).test('.outer'));
            nl = nl.item(0).all('> *');
            Y.Assert.areEqual(1, nl.size());
            Y.Assert.isTrue(nl.item(0).test('.inner'));
            Y.Assert.areEqual('test computed style', nl.item(0).getContent());
        },
        "test NodeList.wrapInner": function() {
            var list = Y.all("#test-nodes li");
            list.wrapInner("<span class='test' />");
            list.each(function(n) {
                Y.Assert.isTrue(n.one('> *').test('span.test'));
            });
        }
    }));

    suite.add( new Y.Test.Case({
        name: 'Node nextAll/prevAll',
        "nextAll/prevAll  should return a NodeList": function() {
            var start = Y.one("#test-nextAll .start");
            
            Assert.isInstanceOf(Y.NodeList, start.nextAll('p'), "nextAll");
            Assert.isInstanceOf(Y.NodeList, start.prevAll('p'), "prevAll");
        },
        "the length of the NodeList returned by nextAll should be correct": function() {
            var start = Y.one("#test-nextAll .start");

            Assert.areEqual(1, start.nextAll('p').size());
            Assert.areEqual(2, start.nextAll('div').size());
        },
        "the length of the NodeList returned by prevAll should be correct": function() {
            var start = Y.one("#test-nextAll .start");

            Assert.areEqual(2, start.prevAll('p').size(), "p check");
            Assert.areEqual(1, start.prevAll('div').size(), "div check");
        }
    }));

    Y.Test.Runner.add(suite);

},'', { requires: [ 'gallery-node-extras', 'test' ] });

