//betweenSubStr("hello my name is {{username}}. My message is {{message}}.", "{{", "}}")
//getBefore("hello my name is {{username}}.", "{{")
//getAfter("hello my name is {{username}}. My message is {{message}}.", "}}")
multiSubStr("hello my name is {{username}}. My message is {{message}}. Thank you for using *chatroom name here*.", "{{", "}}");
multiSubStr("{{userna")


function getBefore(string, subString){
	return string.substring(0, string.indexOf(subString));
}

function getAfter(string, subString){
	return string.substring(string.indexOf(subString) + 2, string.length);
}

function betweenSubStr(string, startSub, endSub){
	return getAfter(getBefore(string, endSub), startSub);
}

function multiSubStr(string, startSub, endSub){
	var dataNames = [];
	var stringRemaining = string;
	while(stringRemaining.indexOf(endSub)!=-1){
		dataNames.push(getBefore(stringRemaining, startSub));
		dataNames.push(betweenSubStr(stringRemaining, startSub, endSub));
		stringRemaining = getAfter(stringRemaining, endSub);
	}
		dataNames.push(stringRemaining);
	return dataNames;
//every odd position in the array will be a variable and every even position will be the string.
}