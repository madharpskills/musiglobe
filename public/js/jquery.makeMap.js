const message = document.querySelector('#message')
let mode = 'track'

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
        onLoad: function(event, map) {
            message.textContent = `Country:\r\n<title>, by <artist>`
        },
        onRegionClick: function(event, code, region) {
            fetch('country?code=' + code).then((response) => {
                response.json().then((data) => {
                    if (mode == 'track') {
                        message.textContent = `${region}:\r\n${data.topSong}`
                    } else if (mode == 'artist') {
                        message.textContent = `${region}:\r\n${data.topArtist}`
                    }
                })
            })
        },
    })
})

function selectArtistOrTrack(v) {
    mode = v
}