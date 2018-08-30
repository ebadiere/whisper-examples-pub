"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.decodeFromHex = decodeFromHex;
exports.encodeToHex = encodeToHex;
// hexutils.js - Helper functions for hex string to ascii string conversion

function decodeFromHex(hex) {
	if (!hex || hex.length < 4 || hex[0] != "0" || hex[1] != "x" || hex.length % 2 != 0) {
		console.log("Invalid hex string: " + hex);
		return "";
	} else {
		var result = "";

		for (var i = 2; i < hex.length; i += 2) {
			var n = parseInt(hex.slice(i, i + 2), 16);
			result += String.fromCharCode(n);
		}

		try {
			return JSON.parse(result);
		} catch (e) {
			return "Error: message could not be decrypted";
		}
	}
}

function encodeToHex(string) {
	var hexEncodedMessage = "0x";

	try {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = string[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var c = _step.value;

				hexEncodedMessage += c.charCodeAt(0).toString(16);
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	} catch (e) {}

	return hexEncodedMessage;
}