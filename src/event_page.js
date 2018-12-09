chrome.tabs.onUpdated.addListener(icon_activate)
chrome.pageAction.onClicked.addListener(img_open)

function icon_activate(tabId, changeInfo, tab) {
    if (!(tab.url && changeInfo.status === 'complete')) return
    let url = new URL(tab.url); if (!/^\/p\/./.test(url.pathname)) {
	chrome.pageAction.hide(tabId) // doesn't work!
	return
    }

    chrome.pageAction.show(tabId, () =>
			   console.log("the listener is activated", tab.url))
}

function img_open(tab) {
    console.log('click', tab.url)
    chrome.tabs.sendMessage(tab.id, "video/image", urls => {
	if (urls.length)
	    urls.forEach( url => chrome.tabs.create({ url }))
	else
	    alert("Failed to extract URLs")
    })
}
