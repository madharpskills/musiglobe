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
            // message.innerHTML = `<b>Country:</b> Global<br>${text}`
            message.innerHTML = `<b>Country:</b> Global<br><b>Song Title:</b> ${data.globalData.field2}<br><b>Artist:</b> ${data.globalData.field3}`
            globalLink = spotifyLink + data.globalData.field5.split('/')[4]
            playa.setAttribute('src', globalLink)

            lyrics.innerHTML = `<b>Lyrics:<br></b>${data.lyrics}`
        })
    })
}

function getData(code, region) {
    fetch('country?code=' + code).then((response) => {
        response.json().then((data) => {
            if (mode == 'track') {
                message.setAttribute('title', data.topSong.text)
                if (data.topSong.title) {
                    message.innerHTML = `<b>Country:</b> ${region}<br><b>Song Title:</b> ${data.topSong.title}<br><b>Artist:</b> ${data.topSong.artist}`
                } else {
                    message.innerHTML = `<b>Country:</b> ${region}<br><b>Song Title:</b> No track data<br><b>Artist:</b> No artist data`
                }
                const oldLink = playa.src
                const newLink = data.topSong.link ? spotifyLink + data.topSong.link.split('/')[4] : globalLink
                if (newLink !== oldLink) {
                    playa.setAttribute('src', newLink)
                }

                lyrics.innerHTML = `<b>Lyrics:<br></b>${data.lyrics}`
            } else if (mode == 'artist') {
                message.setAttribute('title', data.topArtist)
                message.textContent = `${region}:\r\n${data.topArtist}`
            }
        })
    })
}

function toggleLyrics() {
    var x = document.getElementById("lyrics");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function selectArtistOrTrack(v) {
    mode = v
    getData(myCode, myRegion)
}