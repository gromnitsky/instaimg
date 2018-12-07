console.log('instaimg')

chrome.runtime.onMessage.addListener( (req, sender, res) => {
    console.log('click', sender.id)
    res(url())
})

function url() {
    let div = 'div:not([class])[role="button"]'
    for (let tag of ['video', 'img']) {
	let el = document.querySelector(`${div} ${tag}`)
	if (el && el.src) return el.src
    }
}
