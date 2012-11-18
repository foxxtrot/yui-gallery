YUI.add('module-tests', function(Y) {

var Assert = Y.Assert,
    ArrayAssert = Y.ArrayAssert,
    suite = new Y.Test.Suite("yuisuite"),
    $ = Y.Selector.query;
    byId = function(id) {
        return document.getElementById(id);
    };

suite.add( new Y.Test.Case({
	name: 'NodeList Filtering',
	"filter nodelist with a string should filter using selector": function() {
	    var list = Y.all("#test-nodes li"),
		filteredList = list.filter(".bar"),
		rejectList = list.reject(".bar");
	    Assert.areEqual(list.size(), 8, "Expected 8 li's under #test-nodes");
	    Assert.areEqual(filteredList.size(), 2, "Expected 2 li's in filtered NodeList");
	    Assert.areEqual(rejectList.size(), 6, "Expected 6 li's in reject NodeList");
	    Assert.areEqual(list.size(), filteredList.size() + rejectList.size(), "Symmetry Test");
	},
	"filter NodeList with a function should iterate over the list exectuing a boolean function on each": function() {
	    var list = Y.all("#test-select option"),
		filterFunc = function(node) {
		    return Y.Lang.isNumber(+node.get('value'));
		},
		filteredList = list.filter(filterFunc),
		rejectList = list.reject(filterFunc);

	    Assert.areEqual(list.size(), 3, "Expected 3 options under #test-select.");
	    Assert.areEqual(filteredList.size(), 2, "Expected 2 options after filtering.");
	    Assert.areEqual(rejectList.size(), 1, "Expected 1 option in reject NodeList");
	    Assert.areEqual(list.size(), filteredList.size() + rejectList.size(), "Symmetry Test");
	},
	"NodeList.first should return the same as Y.one": function() {
	    var optFromNode = Y.one("#test-select option"),
		optFromFirst = Y.all("#test-select option").first();

	    Assert.isInstanceOf(Y.Node, optFromFirst, "First did not return a Y.Node");
	    Assert.areEqual(optFromNode, optFromFirst);
	},
	"NodeList.first with a numeric argument should return a new NodeList containing the first 'x' items in the NodeList": function() {
	    var nl = Y.all("#test-select option"),
		sublist = nl.first(3);

	    Assert.areEqual(3, sublist.size());
	    Assert.areEqual(nl.item(0), sublist.item(0));
	    Assert.areEqual(nl.item(1), sublist.item(1));
	    Assert.areEqual(nl.item(2), sublist.item(2));
	},
	"NodeList.last with a numeric argument should return a new NodeList containing the last 'x' items in the NodeList": function() {
	    var nl = Y.all("#test-select option"),
		sublist = nl.last(3),
		length = nl.size();

	    Assert.areEqual(3, sublist.size());
	    Assert.areEqual(nl.item(length-1), sublist.item(2));
	    Assert.areEqual(nl.item(length-2), sublist.item(1));
	    Assert.areEqual(nl.item(length-3), sublist.item(0));
	},
	"NodeList.last should return the same as Y.one with the :last-child modifier": function() {
	    var optFromNode = Y.one("#test-select option:last-child"),
		optFromLast = Y.all("#test-select option").last();

	    Assert.isInstanceOf(Y.Node, optFromLast, "Last did not return a Y.Node");
	    Assert.areEqual(optFromNode, optFromLast);
	},
	"NodeList.first with a function should return a Y.Node": function() {
	    var optFromNode = Y.one("#test-select option"),
		optFromFirst = Y.all("#test-select option").first(function(node) { return true; });

	    Assert.isInstanceOf(Y.Node, optFromFirst, "First did not return a Y.Node");
	    Assert.areEqual(optFromNode.get('yuid'), optFromFirst.get('yuid'));
	},
	"NodeList.last with a function should return a Y.Node": function() {
	    var optFromNode = Y.one("#test-select option:last-child"),
		optFromLast = Y.all("#test-select option").last(function(node) { return true; });

	    Assert.isInstanceOf(Y.Node, optFromLast, "Last did not return a Y.Node");
	    Assert.areEqual(optFromNode.get('yuid'), optFromLast.get('yuid'));
	}
}));
Y.Test.Runner.add(suite);

},'', { requires: [ 'gallery-nodelist-extras', 'test' ] });

