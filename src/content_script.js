console.log('instaimg')

chrome.runtime.onMessage.addListener( (req, sender, res) => {
    if (req !== "img_url") return
    console.log('click', sender)
    res({ url: img_url() })
})

function img_url() {
    let div = 'div:not([class])[role="button"]'
    for (let tag of ['video', 'img']) {
	let el = document.querySelector(`${div} ${tag}`)
	if (el && el.src) return el.src
    }
}
