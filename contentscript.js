

var linksObject = {
	"relativeLinks": [], 
	"absoluteLinks": [], 
	"hashLinks": [], 
	"otherEnvLinks": [], 
	"uppercaseLinks" : []
}

var hostname = location.hostname; 
console.log(hostname); 

var vfbEnvURLS = [

	"www.vafb.com", 
	"fbatstevoq.vafb.com", 
	"vfbevoqfbatst.personifycloud.com"
];

function filterEnvURLs (linkToTest){
 
	var isOtherEnv = false; 

	for (var i = 0; i < vfbEnvURLS.length; i++){
		if (linkToTest.includes(vfbEnvURLS[i]))
		{
			if ( !linkToTest.includes(hostname) ){
				isOtherEnv = true; 
			}
		}
	}

	return isOtherEnv; 
}

function inspectUppercaseURLs(){
	for (var i = 0; i < linksObject.uppercaseLinks.length; i++){

			linksObject.uppercaseLinks[i].style = "background-color: orange;"
	}
}

function inspectOtherURLs(){
	console.log("inspectRelURLs"); 

	for (var i = 0; i < linksObject.otherEnvLinks.length; i++){

			linksObject.otherEnvLinks[i].style = "background-color: red;"
	}
}

function inspectRelURLs(){
	console.log("inspectRelURLs"); 

	for (var i = 0; i < linksObject.relativeLinks.length; i++){

			linksObject.relativeLinks[i].style = "background-color: green;"
	}
}

function inspectAbsURLs(){
	console.log("inspectAbsURLs"); 

	for (var i = 0; i < linksObject.absoluteLinks.length; i++){

			linksObject.absoluteLinks[i].style = "background-color: yellow;"
	}
}

function inspectHashURLs(){
	console.log("inspectAbsURLs"); 

	for (var i = 0; i < linksObject.hashLinks.length; i++){

			linksObject.hashLinks[i].style = "background-color: blue;"
	}
}


function getAllAnchors(){

	//Reinitialize the linksObject arrays 
	linksObject.relativeLinks = []; 
	linksObject.absoluteLinks = []; 
	linksObject.hashLinks = []; 
	linksObject.otherEnvLinks = [];
	linksObject.uppercaseLinks = [];  

	var onClickElems = document.querySelectorAll('[onclick]');

	var links = document.querySelectorAll('a');

	for (var i = 0; i < links.length; i++){
		
		var linkToTest = links[i];
		if (linkToTest.attributes['href'] !== undefined){ 
			linkToTestHref = linkToTest.attributes['href'].nodeValue;

			

			//test if uppercase 

			var regExp = /[A-Z]/; 
			if (linkToTestHref.match(regExp)){
				console.log(linkToTestHref); 
				linksObject.uppercaseLinks.push(linkToTest); 
			}

			//test if is mismatched environment
			if (filterEnvURLs(linkToTestHref)){
				linksObject.otherEnvLinks.push(linkToTest); 
			} else if ( linkToTestHref.includes('//') ){
				linksObject.absoluteLinks.push(linkToTest); 
			} else if (linkToTestHref.includes('#')){
				linksObject.hashLinks.push(linkToTest);
			} else {
				linksObject.relativeLinks.push(linkToTest); 
			}

		}
	}


	for (var i = 0; i < onClickElems.length; i++){
		var clickElemToTest = onClickElems[i]; 
		if (clickElemToTest.attributes['onclick'] !== undefined){

			onClickValue = clickElemToTest.attributes['onclick'].nodeValue;
			
			if (onClickValue.includes('location.href') && filterEnvURLs(onClickValue)){
				linksObject.otherEnvLinks.push(clickElemToTest); 
			} else if (onClickValue.includes('location.href') && onClickValue.includes('//')){
				linksObject.absoluteLinks.push(clickElemToTest); 
			} else if (onClickValue.includes('location.href') && onClickValue.includes('#')){
				linksObject.hashLinks.push(clickElemToTest);
			} else if (onClickValue.includes('location.href')) {
				linksObject.relativeLinks.push(clickElemToTest);
			}
		}
	}
	console.log(linksObject);

	inspectOtherURLs(); 
	inspectUppercaseURLs(); 
	//maybe transform link objects into a 
	//an object that I can send 
	return linksObject;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  		if (request.directive === 'getAllAnchors'){
  			console.log(request); 
      		sendResponse(getAllAnchors());
  		}

  		if (request.directive === 'inspectRelURLs'){
  			console.log(request); 
      		sendResponse(inspectRelURLs());
  		}

  		if (request.directive === 'inspectAbsURLs'){
  			console.log(request); 
      		sendResponse(inspectAbsURLs());
  		}

  		if (request.directive === 'inspectHashURLs'){
  			console.log(request); 
      		sendResponse(inspectHashURLs());
  		}
  });
