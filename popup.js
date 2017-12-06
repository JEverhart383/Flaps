document.addEventListener("DOMContentLoaded", function(){

	
var popupLinksObject; 

	
	/*******
	Functions to display link details 
	********/

	//DOM vars to cache for details functions
		var linkDetailsDisplay = document.querySelector('#link-details-display');
		var linksDiv = document.querySelector('#links');
		var linksDetailsDiv = document.querySelector('#link-details');

	function showLinkDetails(typeOfLinks){

		//Clear links div of previously appended children 
		var elemsToRemove = document.querySelectorAll('#link-details-display p'); 
		for (var i = 0; i < elemsToRemove.length; i++){
			linkDetailsDisplay.removeChild(elemsToRemove[i]);
		}

		linksDiv.style.display = "none";
		linksDetailsDiv.style.display = "block";

		var linksArray;
		switch (typeOfLinks){
			case "relativeLinks":
				linksArray = popupLinksObject.relativeLinks;
				break;
			case "absoluteLinks":
				linksArray = popupLinksObject.absoluteLinks;
				break;
			case "hashLinks": 
				linksArray = popupLinksObject.hashLinks;
				break;
		}

		console.log(linksArray);
		for (var i = 0; i < linksArray.length; i++){
			var newElem = document.createElement('p');
			var linkString = linksArray[i].href;
			newElem.innerHTML = linkString;
			linkDetailsDisplay.appendChild(newElem);
		}

	}

	function hideLinkDetails(){
		linksDiv.style.display = "block";
		linksDetailsDiv.style.display = "none";
	}


	var relDetailsBtn = document.getElementById('relDetailsBtn');

	relDetailsBtn.addEventListener('click', function(){
		showLinkDetails("relativeLinks");
	});

	var absDetailsBtn = document.getElementById('absDetailsBtn');

	absDetailsBtn.addEventListener('click', function(){
		showLinkDetails("absoluteLinks");
	});

	var hashDetailsBtn = document.getElementById('hashDetailsBtn');

	hashDetailsBtn.addEventListener('click', function(){
		showLinkDetails("hashLinks");
	});

	var backToLinksBtn = document.getElementById('backToLinks');

	backToLinksBtn.addEventListener('click', function(){
		hideLinkDetails();
	});	



	/******

	Click Event Listeners to communicate with the content script; 

	******/

	var btn = document.getElementById("check-urls"); 

	btn.addEventListener("click", function(){

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			console.log(tabs); 
		  chrome.tabs.sendMessage(tabs[0].id, {directive: "getAllAnchors"}, function(response) {
		    console.log(response);
		    popupLinksObject = response; 
		    document.querySelector('.relURL').innerHTML = response.relativeLinks.length; 
		    document.querySelector('.absURL').innerHTML = response.absoluteLinks.length; 
		    document.querySelector('.hashURL').innerHTML = response.hashLinks.length; 
		    document.querySelector('.otherURL').innerHTML = response.otherEnvLinks.length;
		    document.querySelector('.uppercaseURL').innerHTML = response.uppercaseLinks.length; 
		  
		  });
		});

	}); 


	var relInspectBtn = document.getElementById('relInspectBtn'); 

	relInspectBtn.addEventListener("click", function(){

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			console.log(tabs); 
		  chrome.tabs.sendMessage(tabs[0].id, {directive: "inspectRelURLs"}, function(response) {
		  
		  });
		});

	}); 

	var absInspectBtn = document.getElementById('absInspectBtn'); 

	absInspectBtn.addEventListener("click", function(){

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			console.log(tabs); 
		  chrome.tabs.sendMessage(tabs[0].id, {directive: "inspectAbsURLs"}, function(response) {
		  
		  });
		});

	});

	var hashInspectBtn = document.getElementById('hashInspectBtn'); 

	hashInspectBtn.addEventListener("click", function(){

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			console.log(tabs); 
		  chrome.tabs.sendMessage(tabs[0].id, {directive: "inspectHashURLs"}, function(response) {
		  
		  });
		});

	}); 


});
