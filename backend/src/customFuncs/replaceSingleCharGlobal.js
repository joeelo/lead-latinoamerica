const replaceSingleCharGlobal = (str, charToReplace, replaceWith) => {
	let newString = '';
	for (let i = 0; i < str.length; i++) {
		if (str[i] === charToReplace) {
			newString += replaceWith;
		} else {
			newString += str[i];
		}
	}
	return newString; 
}

replaceSingleCharGlobal('this is a test', ' ', '-');

module.exports = { replaceSingleCharGlobal };