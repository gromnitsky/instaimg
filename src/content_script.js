console.log('instaimg')

chrome.runtime.onMessage.addListener( (req, sender, res) => {
    if (req !== "img_url") return
    console.log('click', sender)
    res({ url: img_url() })
})

function img_url() {
    let img = document.querySelector('div:not([class])[role="button"] img')
    return img ? img.src : null
}
