console.log('instaimg')

chrome.runtime.onMessage.addListener( (req, sender, res) => {
    console.log('click', sender.id)
    res(urls())
})

function urls() {
    let links = tag => {
	let div = 'div:not([class])[role="button"]'
	return Array.from(document.querySelectorAll(`${div} ${tag}`))
	    .filter( node => node.src)
	    .map( node => ({parent: node.parentNode, href: node.src}))
    }

    let videos = links('video')
    let images = links('img').filter( link => { // ignore video thumbnails
	return videos.findIndex( val => val.parent === link.parent) === -1
    })

    return videos.concat(images).map( val => val.href)
}
