const axios = require('axios')

const getTopTrack = async (country) => {
    try {
        const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=fa1561766a2c55ddd4ea3088f5c89416&format=json&limit=1`)
        return res.data.tracks.track
    } catch (e) {
        console.error(e, country)
    }
}

const getTopArtist = async (country) => {
    try {
        const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=fa1561766a2c55ddd4ea3088f5c89416&format=json&limit=1`)
        return res.data.topartists.artist
    } catch (e) {
        console.error(e, country)
    }
}

module.exports = {
    getTopTrack,
    getTopArtist        
}