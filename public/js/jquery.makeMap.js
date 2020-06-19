const message = document.querySelector('#message')

jQuery(document).ready(function() {
    jQuery('#vmap').vectorMap({ 
        map: 'world_en',
        backgroundColor: '#0B3861',
        color: '#81BEF7',
        hoverOpacity: 0.7,
        enableZoom: true,
        showTooltip: true,
        scaleColors: ['#C8EEFF', '#006491'],
        onRegionOver: function (event, code, region) {
            fetch('country?code=' + code).then((response) => {
                response.json().then((data) => {
                    console.log(code, data.topSong)
                    message.textContent = data.topSong
                })
            })
        },
    })
})