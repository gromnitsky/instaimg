chrome.tabs.onUpdated.addListener(icon_activate)
chrome.pageAction.onClicked.addListener(img_open)

function icon_activate(tabId, changeInfo, tab) {
    if (!(changeInfo.status === 'complete' && tab.url)) return
    let url = new URL(tab.url); if (!/^\/p\/./.test(url.pathname)) {
	chrome.pageAction.hide(tabId) // doesn't work!
	return
    }

    chrome.pageAction.show(tabId, () =>
			   console.log("the listener is activated", tab.url))
}

function img_open(tab) {
    console.log('click', tab.url)
    chrome.tabs.sendMessage(tab.id, "video/image", url => {
	url ? chrome.tabs.create({ url }) : alert("Failed to extract the URL")
    })
}
