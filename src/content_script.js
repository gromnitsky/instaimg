console.log('instaimg')

chrome.runtime.onMessage.addListener( (req, sender, res) => {
    console.log('click', sender.id)
    res(urls())
})

function urls() {
    let links = query => {
	return Array.from(document.querySelectorAll(query)).filter( v => v.src)
    }

    let videos = links('article video')
    let images = links('article [role=button] img[srcset]')

    return videos.concat(images).map( v => v.src)
}
