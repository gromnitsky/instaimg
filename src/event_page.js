chrome.tabs.onUpdated.addListener(icon_activate)
chrome.pageAction.onClicked.addListener(img_open)

function icon_activate(tabId, changeInfo, tab) {
    if (!tab.url) return
    let url = new URL(tab.url); if (!/^\/p\/./.test(url.pathname)) {
	chrome.pageAction.hide(tab.id) // doesn't work!
	return
    }

    chrome.pageAction.show(tabId, () =>
			   console.log("the listener is activated", tab.url))
}

function img_open(tab) {
    console.log('click', tab.url)
    chrome.tabs.sendMessage(tab.id, "img_url", res => {
	if (!(res && res.url)) {
	    alert("Failed to extract the image URL")
	    return
	}
	chrome.tabs.create({ url: res.url })
    })
}
