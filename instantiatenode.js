document.getElementById("msgSubmit").addEventListener("click", function() {
  var msgField    = document.getElementById("msg");
  var msgTemplate = document.getElementById("msgTemplate");
  var msgDisplay  = document.getElementById("messages");
  
  var data = {
    username: "Alice",
    message: msgField.value
  };


dataToStr(msgTemplate);


msgDisplay


  msgField.value = "";
});


function instantiateNode(rootNode){
    var clonedNode = rootNode.clonedNode(false);//creates a shallow copy of the intial root node
    if (clonedNode.nodeType == document.ELEMENT_NODE) {//checks if the node is an element node
     for(var i = 0; i < rootNode.childNodes.length; i++){//goes through all children
        clonedNode.appendChild(instantiateNode(rootNode.childNodes[i]));//recursive call to copy the template, node by node
    }
  }
    else{
      clonedNode.appendChild(dataToStr(rootNode.childNodes))//base case for text nodes
    }
    return clonedNode;
    //^^^ goes in if statement for element nodes
    //need to make a base case for text nodes
}
//replace text node with new string from dataToStr


function dataToStr(message){
  var dataArray = multiSubStr(msgTemplate, "{{", "}}")//calling function to get array of msgTemplate and convert it to a string.
  return dataArray.reduce(function(acc, element, index){//call an anonymous function as an argument for the .reduce
    if(index % 2 == 1)
      return acc + data [element];//if an even index, it is an element node
    else
      return acc + element;//if an odd index, it is a text node
  });
}
function getBefore(string, subString){//gets characters before the substring
  return string.substring(0, string.indexOf(subString));
} 


function getAfter(string, subString){//gets characters after substring
  return string.substring(string.indexOf(subString) + 2, string.length);
}


function betweenSubStr(string, startSub, endSub){//gets characters in between substrings
  return getAfter(getBefore(string, endSub), startSub);
}


function multiSubStr(string, startSub, endSub){//creates an array and fills the array with each section from the string.
  var dataNames = [];//creates empty array
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
//concatinate the array into a string copy
//make a recursive call to append all child nodes into an array.
