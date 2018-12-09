console.log('instaimg')

chrome.runtime.onMessage.addListener( (req, sender, res) => {
    console.log('click', sender.id)
    res(urls())
})

function urls() { // ignores video thumbnails
    let div = 'div:not([class])[role="button"]'
    let r = []
    let video_parents = {}
    for (let tag of ['video', 'img']) {
	document.querySelectorAll(`${div} ${tag}`)
	    .forEach( node => {
		if (node.src) {
		    if (tag === 'video') video_parents[node.parentNode] = 1
		    r.push({type: tag, src: node.src, parent: node.parentNode})
		}
	    })
    }
    return r.filter( val => !(video_parents[val.parent] && val.type === 'img'))
	.map( val => val.src)
}
