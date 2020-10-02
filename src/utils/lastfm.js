const axios = require('axios')
const lastFmKey = process.env.LASTFM_KEY

const getTopTrack = async (country) => {
    try {
        const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=${lastFmKey}&format=json&limit=1`)
        return res.data.tracks.track
    } catch (e) {
        console.error(e, country)
    }
}

const getTopArtist = async (country) => {
    try {
        const res = await axios.get(`http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=${lastFmKey}&format=json&limit=1`)
        return res.data.topartists.artist
    } catch (e) {
        console.error(e, country)
    }
}

module.exports = {
    getTopTrack,
    getTopArtist        
}