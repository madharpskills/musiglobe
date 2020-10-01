const message = document.querySelector('#message')
const playa = document.querySelector('#playa')
let mode = 'track'
let myCode = ''
let myRegion = ''
const spotifyLink = 'https://open.spotify.com/embed/track/'
let globalLink = ''

jQuery(document).ready(function () {
    jQuery('#vmap').vectorMap({
        map: 'world_en',
        backgroundColor: '#0B3861',
        color: '#81BEF7',
        hoverOpacity: 0.7,
        enableZoom: true,
        showTooltip: true,
        scaleColors: ['#C8EEFF', '#006491'],
        selectedColor: '#0080FF',
        onLoad: function (event, map) {
            getGlobalData()
        },
        onRegionClick: function (event, code, region) {
            myCode = code
            myRegion = region
            getData(myCode, myRegion)
        },
    })
})

function getGlobalData() {
    fetch('global').then((response) => {
        response.json().then((data) => {
            const text = `${data.globalData.field2}, by ${data.globalData.field3}`
            message.setAttribute('title', text)
            message.textContent = `Global:\r\n${text}`
            globalLink = spotifyLink + data.globalData.field5.split('/')[4]
            playa.setAttribute('src', globalLink)
        })
    })
}

function getData(code, region) {
    fetch('country?code=' + code).then((response) => {
        response.json().then((data) => {
            if (mode == 'track') {
                message.setAttribute('title', data.topSong.text)
                message.textContent = `${region}:\r\n${data.topSong.text}`
                const oldLink = playa.src
                const newLink = data.topSong.link ? spotifyLink + data.topSong.link.split('/')[4] : globalLink
                if (newLink !== oldLink) {
                    playa.setAttribute('src', newLink)
                }
                playa.setAttribute('src', )
            } else if (mode == 'artist') {
                message.setAttribute('title', data.topArtist)
                message.textContent = `${region}:\r\n${data.topArtist}`
            }
        })
    })
}

function selectArtistOrTrack(v) {
    mode = v
    getData(myCode, myRegion)
}