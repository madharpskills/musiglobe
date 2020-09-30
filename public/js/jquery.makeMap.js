const message = document.querySelector('#message')
let mode = 'track'
let myCode = ''
let myRegion = ''

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
            message.textContent = `Global:\r\n ${data.globalData.field2}, by ${data.globalData.field3}`
        })
    })
}

function getData(code, region) {
    fetch('country?code=' + code).then((response) => {
        response.json().then((data) => {
            if (mode == 'track') {
                message.title = data.topSong
                message.textContent = `${region}:\r\n${data.topSong}`
            } else if (mode == 'artist') {
                message.title = data.topArtist
                message.textContent = `${region}:\r\n${data.topArtist}`
            }
        })
    })
}

function selectArtistOrTrack(v) {
    mode = v
    getData(myCode, myRegion)
}