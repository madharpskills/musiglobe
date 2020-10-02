const axios = require('axios')
const qs = require('qs')

let token
let currentDateTime
let expirationDateTime

const getSpotifyToken = async () => {
    currentDateTime = new Date()
    if (!token || (currentDateTime - expirationDateTime) > 3590000) {
        try {
            const res = await axios.post('https://accounts.spotify.com/api/token', qs.stringify({ 
                'grant_type': 'client_credentials' 
            }), {
                headers: { 'Authorization': process.env.AUTH, 'Content-Type': 'application/x-www-form-urlencoded' },
            })
            expirationDateTime = new Date()
            token = res.data.access_token
            return token
        } catch (e) {
            console.log(e)
        }
    } else {
        return token
    }
}

const getSpotifySearchQuery = async (track, artist) => {
    try {
        track = track.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
        
        const res = await axios.get(`https://api.spotify.com/v1/search?q=track:${track}%20artist:${artist}&limit=50&type=track`, {
            headers: { 'Authorization': `Bearer ${await getSpotifyToken()}` }
        })

        for (const track of res.data.tracks.items) {
            for (const spotifyArtist of track.artists) {
                if (spotifyArtist.name.toLowerCase() === artist.toLowerCase()) {
                    return track.external_urls.spotify
                }
            }
        }

        return ''
    } catch (e) {
        console.error(e)
        throw e
    }
}

module.exports = {
    getSpotifySearchQuery
}