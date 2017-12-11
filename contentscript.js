
console.log('this is a content script')

const links = document.querySelectorAll('a')

console.log(links)


chrome.contextMenus.create({
	"title": "Open Link in New Flap",
	"type": "normal",
	"contexts": ["link"],
	"onclick": ""
})
