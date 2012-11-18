YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('crypto');

    suite.add(new Y.Test.Case({
		name: "MD5 Test Cases",
		testMD5TestSuite: function() {
			var MD5 = Y.Crypto.MD5;
			Y.Assert.areEqual("d41d8cd98f00b204e9800998ecf8427e", MD5(""), 'MD5("")');
			Y.Assert.areEqual("0cc175b9c0f1b6a831c399e269772661", MD5("a"), 'MD5("a")');
			Y.Assert.areEqual("900150983cd24fb0d6963f7d28e17f72", MD5("abc"), 'MD5("abc")');
			Y.Assert.areEqual("f96b697d7cb7938d525a2f31aaf161d0", MD5("message digest"), 'MD5("message digest")');
			Y.Assert.areEqual("c3fcd3d76192e4007dfb496cca67e13b", MD5("abcdefghijklmnopqrstuvwxyz"), 'MD5("abcdefghijklmnopqrstuvwxyz")');
			Y.Assert.areEqual("d174ab98d277d9f5a5611c2c9f419d9f", MD5("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"), 'MD5("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")');
			Y.Assert.areEqual("57edf4a22be3c955ac49da2e2107b67a", MD5("12345678901234567890123456789012345678901234567890123456789012345678901234567890"), 'MD5("12345678901234567890123456789012345678901234567890123456789012345678901234567890")');
		}
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'gallery-crypto-md5', 'test' ] });
